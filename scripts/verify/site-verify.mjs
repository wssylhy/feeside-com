// Site-wide verification gate. Run after `pnpm build` and before any push:
//   node scripts/verify/site-verify.mjs
// Exit code 0 = every check passed.
//
// The expected values are produced here by an INDEPENDENT implementation (own
// YAML reader, own fee formulas written from the official wording). Nothing
// expected is taken from lib/fees.js or lib/guides.js, so a bug in the site's
// shared code cannot hide. The site's own function is then compared against
// this one over a grid of prices.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = path.join(ROOT, 'out');
const GUIDES = path.join(ROOT, 'content', 'guides');

// ---------------------------------------------------------------- independent
const readRates = () => {
  const R = {};
  let cur = null;
  for (const line of fs.readFileSync(path.join(ROOT, 'config', 'rates.yaml'), 'utf8').split(/\r?\n/)) {
    const h = line.match(/^  ([a-z]+):\s*$/);
    if (h) { cur = h[1]; R[cur] = {}; continue; }
    if (!cur) continue;
    const kv = line.match(/^    ([a-z0-9_]+):\s*([^#]*?)\s*(?:#.*)?$/);
    if (kv && kv[2] !== '') {
      const v = kv[2].replace(/^"|"$/g, '');
      // Typed like the site's own parser: numbers, booleans, null, else string.
      R[cur][kv[1]] = /^-?\d+(\.\d+)?$/.test(v) ? Number(v) : v === 'true' ? true : v === 'false' ? false : v === 'null' ? null : v;
    }
  }
  return R;
};
const R = readRates();
const num = (p, k) => Number(R[p][k]);
const r2 = (x) => Math.round(Number((x * 100).toFixed(6))) / 100;
const usd = (x) => '$' + r2(x).toFixed(2);

// Shipping the seller actually receives: on Poshmark and Vinted the buyer pays
// the platform for the label, so it never passes through the payout.
const receivesShip = (p) => R[p].shipping_in_payout !== false && R[p].fee_base !== 'item_only';
// Fee lines per platform, each as its own number.
const LINES = {
  ebay: (i, s) => { const t = i + s; return { fv: (t * num('ebay', 'final_value_percent')) / 100, fixed: t <= 10 ? num('ebay', 'per_order_fixed_under_10') : num('ebay', 'per_order_fixed'), pay: 0 }; },
  poshmark: (i) => ({ fv: i < num('poshmark', 'commission_threshold_price') ? num('poshmark', 'min_commission') : (i * num('poshmark', 'final_value_percent')) / 100, fixed: 0, pay: 0 }),
  mercari: (i, s) => ({ fv: ((i + s) * num('mercari', 'final_value_percent')) / 100, fixed: 0, pay: 0 }),
  vinted: () => ({ fv: 0, fixed: 0, pay: 0 }),
  depop: (i, s) => ({ fv: 0, fixed: 0, pay: ((i + s) * num('depop', 'payment_percent')) / 100 + num('depop', 'payment_fixed') }),
  etsy: (i, s) => { const t = i + s; return { fv: (t * num('etsy', 'final_value_percent')) / 100, fixed: 0, pay: (t * num('etsy', 'payment_percent')) / 100 + num('etsy', 'payment_fixed') }; },
};
// Per-sale fee as displayed: every line rounded to cents, then added.
const iFee = (p, item, ship = 0) => { const l = LINES[p](item, receivesShip(p) ? ship : 0); return r2(r2(l.fv) + r2(l.fixed) + r2(l.pay)); };
const iListing = (p, paid) => (R[p].listing_fee_free_per_month && !paid ? 0 : num(p, 'listing_fee'));
const PLATFORMS = ['ebay', 'poshmark', 'mercari', 'vinted', 'depop', 'etsy'];
const LABEL = { ebay: 'eBay', poshmark: 'Poshmark', mercari: 'Mercari', vinted: 'Vinted', depop: 'Depop', etsy: 'Etsy' };
const MONEY_FIELDS = new Set(['per_order_fixed', 'per_order_fixed_under_10', 'payment_fixed', 'listing_fee', 'min_commission']);

// eBay category table, own reader (maps only).
const readCats = () => {
  const root = {};
  const stack = [{ indent: -1, node: root }];
  for (const raw of fs.readFileSync(path.join(ROOT, 'config', 'ebay-categories.yaml'), 'utf8').split(/\r?\n/)) {
    const line = raw.replace(/(^|\s)#.*$/, '');
    if (!line.trim()) continue;
    const indent = line.match(/^\s*/)[0].length;
    const m = line.match(/^\s*([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    while (stack.length && indent <= stack[stack.length - 1].indent) stack.pop();
    const parent = stack[stack.length - 1].node;
    if (m[2] === '') { parent[m[1]] = {}; stack.push({ indent, node: parent[m[1]] }); }
    else parent[m[1]] = /^-?\d+(\.\d+)?$/.test(m[2]) ? Number(m[2]) : m[2] === 'true' ? true : m[2] === 'false' ? false : m[2].replace(/^"|"$/g, '');
  }
  return root;
};
const CATS = readCats();
const iEbayCat = (key, total) => {
  const c = CATS.categories[key];
  if (!c) return null;
  let fv;
  let perOrder;
  if (c.model === 'portion') {
    fv = 0;
    let lower = 0;
    for (let i = 1; c[`tier${i}_rate`] != null; i++) {
      const cap = c[`tier${i}_cap`] != null ? c[`tier${i}_cap`] : Infinity;
      fv += (Math.max(0, Math.min(total, cap) - lower) * c[`tier${i}_rate`]) / 100;
      lower = cap;
    }
    perOrder = c.per_order_fee === true;
  } else if (c.model === 'threshold') {
    const low = total < c.threshold;
    fv = (total * (low ? c.low_rate : c.high_rate)) / 100;
    perOrder = low ? c.low_per_order_fee === true : c.high_per_order_fee === true;
  } else return null;
  const per = perOrder ? (total <= 10 ? num('ebay', 'per_order_fixed_under_10') : num('ebay', 'per_order_fixed')) : 0;
  return r2(r2(fv) + per);
};

// ------------------------------------------------------------- expected text
// Render one placeholder to the exact string the page must contain.
function expected(full) {
  let m = full.match(/^\$?\{\{rates\.([a-z]+)\.([a-z0-9_]+)\}\}$/);
  if (m) {
    const v = R[m[1]][m[2]];
    if (v === undefined) return 'pending verification';
    return MONEY_FIELDS.has(m[2]) ? usd(Number(v)) : String(v);
  }
  m = full.match(/^\$?\{\{cat:([a-z]+)\.([a-z0-9_]+)\}\}$/);
  if (m) {
    const v = CATS.categories[m[1]] && CATS.categories[m[1]][m[2]];
    if (v === undefined) return 'see the category table';
    return /(_cap|threshold)$/.test(m[2]) ? Number(v).toLocaleString('en-US') : String(v);
  }
  m = full.match(/^\{\{calc:([a-z]+):([a-z_]+):([0-9.]+)(?::([0-9.]+))?\}\}$/);
  if (m) {
    const [, kind, key, a, b] = m;
    const item = Number(a);
    const ship = Number(b) || 0;
    const feeR = (p) => r2(iFee(p, item, ship));
    const inflow = (p) => (receivesShip(p) ? item + ship : item);
    switch (kind) {
      case 'fee': return usd(feeR(key));
      case 'keep': return usd(inflow(key) - feeR(key));
      case 'net': return usd(item - feeR(key));
      case 'pct': return ((feeR(key) / item) * 100).toFixed(1) + '%';
      case 'gap': { const [x, y] = key.split('_'); return usd(feeR(x) - feeR(y)); }
      case 'boost': return usd((item * num(key, 'boosting_percent')) / 100);
      case 'boosted': return usd(feeR(key) + (item * num(key, 'boosting_percent')) / 100);
      case 'listings': return usd(item * num(key, 'listing_fee'));
      case 'xfees': return usd(feeR(key) * ship);
      case 'xnet': return usd((item - feeR(key)) * ship);
      case 'ebaycat': { const f = iEbayCat(key, item); return f === null ? 'see the category table' : usd(f); }
      case 'ebaykeep': { const f = iEbayCat(key, item); return f === null ? 'see the category table' : usd(item - f); }
      default: throw new Error('unknown calc kind ' + kind);
    }
  }
  return null;
}
// {{rates.a.b}} and {{cat:a.b}} take an optional typed "$"; {{calc:…}} does not.
const renderAll = (text) => text.replace(/\$?\{\{(?:rates|cat)[:.][^}]+\}\}|\{\{calc:[^}]+\}\}/g, (f) => {
  const out = expected(f);
  if (out === null) throw new Error('unparsed placeholder ' + f);
  // A typed "$" is absorbed for money fields ("$0.40") and kept for others ("$15").
  return f.startsWith('$') && !/^\$?\{\{rates\.[a-z]+\.(per_order_fixed|per_order_fixed_under_10|payment_fixed|listing_fee|min_commission)\}\}$/.test(f)
    ? '$' + out
    : out;
});

// Expected rows for the config-rendered tables.
function expectedTable(kind, prices) {
  const ps = PLATFORMS;
  if (kind === 'fees') {
    const basis = (p) => (R[p].fee_base === 'item_only' ? 'of the item price' : 'of the sale total (item + shipping)');
    return [
      ['Fee line', ...ps.map((p) => LABEL[p])],
      ['Selling fee (final value fee)', ...ps.map((p) => `${R[p].final_value_percent}% ${basis(p)}` + (R[p].min_commission != null ? `, or a flat ${usd(num(p, 'min_commission'))} under $${R[p].commission_threshold_price}` : ''))],
      ['Fixed fee per order', ...ps.map((p) => (R[p].per_order_fixed_under_10 != null && R[p].per_order_fixed_under_10 !== R[p].per_order_fixed ? `${usd(num(p, 'per_order_fixed_under_10'))} on orders of $10 or less, ${usd(num(p, 'per_order_fixed'))} above` : Number(R[p].per_order_fixed) ? usd(num(p, 'per_order_fixed')) : 'none'))],
      ['Payment processing', ...ps.map((p) => (Number(R[p].payment_percent) || Number(R[p].payment_fixed) ? `${R[p].payment_percent}% + ${usd(num(p, 'payment_fixed'))}` : p === 'vinted' ? 'none' : 'none charged separately'))],
      ['Listing fee', ...ps.map((p) => (!Number(R[p].listing_fee) ? 'free' : R[p].listing_fee_free_per_month ? `${usd(num(p, 'listing_fee'))} after ${R[p].listing_fee_free_per_month} free listings a month` : `${usd(num(p, 'listing_fee'))} per listing`))],
    ];
  }
  if (kind === 'payouts') {
    return [
      ['Sale price (shipping not included)', ...ps.map((p) => LABEL[p])],
      ...prices.map((x) => [`$${x}`, ...ps.map((p) => usd(x - r2(iFee(p, x))))]),
    ];
  }
  if (kind === 'best') {
    return [
      ['Sale price', 'Keeps you the most', 'Runner-up', 'Difference'],
      ...prices.map((x) => {
        const r = ps.map((p) => ({ p, net: x - r2(iFee(p, x)) })).sort((a, b) => b.net - a.net);
        return [`$${x}`, `${LABEL[r[0].p]} (${usd(r[0].net)})`, `${LABEL[r[1].p]} (${usd(r[1].net)})`, usd(r[0].net - r[1].net)];
      }),
    ];
  }
  if (kind === 'ebay-categories') {
    const ins = (c) => (CATS.insertion[c.insertion] != null ? CATS.insertion[c.insertion] : c.insertion);
    return [
      ['Category', 'Insertion fee', 'Final value fee (per item)'],
      ...Object.values(CATS.categories).map((c) => [c.label, ins(c), c.display]),
    ];
  }
  throw new Error('unknown table ' + kind);
}

// ------------------------------------------------------------------ html side
const ENT = { '&#x27;': "'", '&#39;': "'", '&quot;': '"', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&nbsp;': ' ', '&ldquo;': '“', '&rdquo;': '”', '&mdash;': '—', '&ndash;': '–' };
const decode = (s) => s.replace(/&(?:#x27|#39|quot|amp|lt|gt|nbsp|ldquo|rdquo|mdash|ndash);/g, (e) => ENT[e]);
// Tag stripping turns "<code>6.5</code>%" into "6.5 %" and React's text
// separators put spaces before punctuation. Remove those so source and
// rendered text compare on content, not on markup.
const tidy = (s) => s.replace(/\$\s+(?=\d)/g, '$').replace(/\s+([.,;:!?)%])/g, '$1').replace(/([(\[])\s+/g, '$1');
const norm = (s) => tidy(decode(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
const pageText = (html) => {
  const m = html.match(/<article[\s\S]*?<\/article>/);
  return norm((m ? m[0] : html).replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' '));
};
const mdTables = (html) => {
  const m = html.match(/<article[\s\S]*?<\/article>/);
  const body = m ? m[0] : html;
  const tables = [];
  for (const t of body.matchAll(/<table>[\s\S]*?<\/table>/g)) {
    const rows = [];
    for (const tr of t[0].matchAll(/<tr>[\s\S]*?<\/tr>/g)) {
      rows.push([...tr[0].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((c) => norm(c[1])));
    }
    tables.push(rows);
  }
  return tables;
};
// Markdown source line → the plain text it must render to.
const stripMdRaw = (s) =>
  decode(s)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*/g, '')
    .replace(/^#+\s+/, '')
    .replace(/^[-*]\s+/, '')
    .replace(/^\d+\.\s+/, '')
    .replace(/\s+/g, ' ')
    .trim();
const stripMd = (s) => tidy(stripMdRaw(s));
const cellsOf = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());

// ------------------------------------------------------------------- checks
let pass = 0;
const fails = [];
const notes = [];
const ok = (name) => { pass++; };
const bad = (name, detail) => fails.push(`${name}${detail ? ' :: ' + detail : ''}`);

const exists = (p) => { try { return fs.statSync(p).isFile(); } catch { return false; } };
const htmlOf = (rel) => fs.readFileSync(path.join(OUT, rel), 'utf8');

// 1. The site's shared fee function must equal the independent one over a grid.
const site = await import(pathToFileURL(path.join(ROOT, 'lib', 'fees.js')).href);
const items = [0.5, 3, 5, 8, 9.99, 10, 10.01, 12, 14.99, 15, 15.01, 20, 25, 40, 50, 75, 100, 150, 250, 1000, 8000];
const ships = [0, 4, 8, 15, 30];
let grid = 0;
for (const p of PLATFORMS) for (const i of items) for (const s of ships) for (const paid of [false, true]) {
  const a = site.computeFees(R[p], i, s, { paidListings: paid });
  const inflow = receivesShip(p) ? i + s : i;
  const eFee = r2(iFee(p, i, s) + r2(iListing(p, paid)));
  const eNet = r2(inflow - eFee);
  grid++;
  if (r2(a.fee) !== eFee || r2(a.net) !== eNet) {
    bad('fee grid', `${p} item ${i} ship ${s} paid ${paid}: site fee ${r2(a.fee)} net ${r2(a.net)} vs independent ${eFee} / ${eNet}`);
  }
}
ok(`fee grid ${grid} cases`);
// eBay category function against eBay's own worked examples.
for (const [key, total, want] of [['cards', 10070, 1054.55], ['most', 424, 58.06], ['sneakers', 150, 12], ['watches', 2000, 215.4]]) {
  const got = r2(site.ebayCategoryFee(CATS.categories[key], total, R.ebay).fee);
  if (got !== want || got !== r2(iEbayCat(key, total))) bad('ebay category', `${key}@${total} got ${got} want ${want}`);
}
ok('ebay category worked examples');

// 2. Every guide: each placeholder and each table cell renders the expected value.
const files = fs.readdirSync(GUIDES).filter((f) => f.endsWith('.md'));
const hardcoded = {};
const hardcodedTokens = {};
for (const file of files) {
  const slug = file.replace(/^\d+-/, '').replace(/\.md$/, '');
  const rel = path.join('guides', slug, 'index.html');
  if (!exists(path.join(OUT, rel))) { bad('guide missing from build', slug); continue; }
  const html = htmlOf(rel);
  const text = pageText(html);
  const tables = mdTables(html);
  const md = fs.readFileSync(path.join(GUIDES, file), 'utf8').replace(/^---[\s\S]*?\n---\r?\n/, '');
  let checked = 0;
  for (const rawLine of md.split(/\r?\n/)) {
    // Same clean-up the site applies: drop italic drafting notes and any
    // Chinese-bearing sentence, so `line` is what the page should show.
    let line = rawLine
      .replace(/^Intro: /, '')
      .replace(/\*\([\s\S]*?\)\*/g, (n) => (/[\u4e00-\u9fff]/.test(n) ? '' : n))
      .replace(/[^.。！？!?]*[\u4e00-\u9fff][^.。！？!?]*[.。！？!?]\s*/g, '')
      .trim();
    if (!line.includes('{{')) continue;
    if (/^\|\s*-{3}/.test(line) || /^\{\{table:ebay-categories-status\}\}$/.test(line)) continue;
    if (/^\{\{table:(fees|payouts|best|ebay-categories)(?::[0-9,]+)?\}\}$/.test(line)) {
      const m = line.match(/\{\{table:([a-z-]+)(?::([0-9,]+))?\}\}/);
      const want = expectedTable(m[1], m[2] ? m[2].split(',').map(Number) : []);
      if (!tables.some((rows) => rows.length === want.length && rows.every((r, i) => r.length === want[i].length && r.every((c, j) => c === want[i][j])))) {
        bad(slug, `generated table {{table:${m[1]}}} differs from the independent rendering`);
      }
      checked++;
      continue;
    }
    if (line.startsWith('|')) {
      const want = cellsOf(line).map((c) => stripMd(renderAll(c)));
      if (!tables.some((rows) => rows.some((r) => r.length === want.length && r.every((c, j) => c === want[j])))) {
        bad(slug, `table row not found as expected: [${want.join(' | ')}]`);
      }
    } else {
      const want = stripMd(renderAll(line));
      if (!text.includes(want)) bad(slug, `line not found as expected: ${want.slice(0, 160)}`);
    }
    checked++;
    // Numbers typed by hand on this line, i.e. not produced by a placeholder.
    // These are sale inputs ($12 item, $8 shipping) and sourced facts; they
    // are listed for review at the end of the run.
    const typed = line.replace(/\$?\{\{[^}]+\}\}/g, ' ').match(/\$\s?\d[\d,.]*|\d+(\.\d+)?%/g) || [];
    if (typed.length) { hardcoded[slug] = (hardcoded[slug] || 0) + typed.length; (hardcodedTokens[slug] = hardcodedTokens[slug] || []).push(...typed); }
  }
  ok(`${slug}: ${checked} placeholder lines/cells verified`);
  // meta description and title sanity
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
  const desc = decode((html.match(/<meta name="description" content="([\s\S]*?)"/) || [])[1] || '');
  if (!/^(eBay|[A-Z0-9"'$])/.test(desc) || desc.length > 230 || !desc) bad(slug, `meta description looks wrong (${desc.length} chars): ${desc.slice(0, 90)}`);
  if (title.length > 75) notes.push(`long title (${title.length}): ${slug}`);
  if (/<link rel="canonical" href="[^"]*\/guides\/[^"]*[^/]">/.test(html)) bad(slug, 'canonical without trailing slash');
}

// 3. Regression guards over every built page: no leftovers, no known-wrong phrases.
const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') pages.push(path.relative(OUT, p).replace(/\\/g, '/'));
  }
})(OUT);
const GUARDS = [
  [/\{\{/, 'unrendered placeholder'],
  [/[\u4e00-\u9fff]/, 'Chinese text on an English page'],
  [/pending verification/, 'pending verification (rates should all be resolved)'],
  [/Internal links:/i, 'drafting label "Internal links:"'],
  [/roughly X|\$XX|\$YY\.|YY\.YY/i, 'template placeholder (X / $XX)'],
  [/待采集/, 'pending placeholder'],
  [/\(\d{3}-[a-z-]+\)/, 'raw internal reference like (020-vinted-fees-uk)'],
];
const GUIDE_GUARDS = [
  [/per 30-day|every 30 days|30-day cycle|30-day listing/i, 'eBay "30-day" insertion claim (official page does not say this)'],
  [/flat \$0\.00|\$0\.00 per order|0\.00 under/i, 'Poshmark flat fee rendering as $0.00 (per_order_fixed instead of min_commission)'],
  [/two stacked lines|stack two fee lines|stacked percentages/i, 'Mercari described as stacking fee lines'],
  [/quadruple/i, 'Depop Boosting "quadruples"'],
  [/its own calculator/i, 'claim of a calculator that does not exist'],
  [/\$1\.93/, 'eBay $12 fee tier error ($1.93)'],
  [/\$54\.05 versus \$46/, 'Etsy vs Vinted mixed-up example'],
];
for (const p of pages) {
  const html = htmlOf(p);
  const text = pageText(html);
  for (const [re, why] of GUARDS) if (re.test(text)) bad(p, why);
  if (p.startsWith('guides/')) for (const [re, why] of GUIDE_GUARDS) if (re.test(text)) bad(p, why);
  ok(`${p}: regression guards`);
}

// 4. Link integrity and reachability from the home page.
const resolve = (href, from) => {
  const h = href.split('#')[0].split('?')[0];
  if (!h.startsWith('/')) return null;
  let rel = h.replace(/^\//, '');
  if (rel === '') return 'index.html';
  const clean = rel.replace(/\/$/, '');
  const cands = [clean + '/index.html', clean, clean + '.html'];
  const hit = cands.find((c) => exists(path.join(OUT, c)));
  return hit || false;
};
const seen = new Set(['index.html']);
const queue = ['index.html'];
let depth = { 'index.html': 0 };
while (queue.length) {
  const cur = queue.shift();
  for (const m of htmlOf(cur).matchAll(/href="([^"]+)"/g)) {
    const href = decode(m[1]);
    const r = resolve(href, cur);
    if (r === false) bad(cur, `dead internal link: ${href}`);
    if (r && !seen.has(r)) { seen.add(r); depth[r] = depth[cur] + 1; queue.push(r); }
  }
}
// Deliberately unlinked: the 404 page, and the print edition (noindex; the
// paid PDF is generated from it, it is not a navigation target).
const UNLINKED = new Set(['404/index.html', '404.html', 'sheet/print/index.html']);
for (const p of pages) {
  if (!seen.has(p) && !UNLINKED.has(p)) bad(p, 'page not reachable from the home page');
}
if (!/<meta name="robots" content="noindex/.test(htmlOf('sheet/print/index.html'))) bad('sheet/print', 'print edition must be noindex');
const guidesBuilt = pages.filter((p) => /^guides\/[^/]+\/index\.html$/.test(p));
ok(`links: ${pages.length} pages, all internal links resolve, all pages reachable; ${guidesBuilt.length} guide pages (max depth ${Math.max(...guidesBuilt.map((g) => depth[g] ?? -1))})`);

// 5. /sheet and /sheet/print tables against the independent calculator.
{
  const html = htmlOf('sheet/index.html');
  const tables = mdTables(html);
  const prices = [8, 15, 30, 50, 100, 150];
  const want = prices.map((x) => [`$${x}`, ...PLATFORMS.map((p) => `${usd(x - r2(iFee(p, x)))} (${((iFee(p, x) / x) * 100).toFixed(1)}% fees)`)]);
  const found = want.every((row) => tables.some((rows) => rows.some((r) => r.length === row.length && r.every((c, j) => c === row[j]))));
  if (found) ok('/sheet payout table verified'); else bad('/sheet', 'payout table does not match the independent calculation');
  const html2 = htmlOf('sheet/print/index.html');
  const text2 = pageText(html2);
  const must = [
    `you keep $${(40 - r2(iFee('ebay', 40))).toFixed(2)}`,
    `you keep $${(40 - r2(iFee('poshmark', 40))).toFixed(2)} and $${(12 - r2(iFee('poshmark', 12))).toFixed(2)}`,
    `→ $${(38 - r2(iFee('mercari', 30, 8))).toFixed(2)} reaches your balance`,
    `→ you keep $30.00`,
    `fees $${r2(iFee('depop', 40, 8)).toFixed(2)}, leaving $${(48 - r2(iFee('depop', 40, 8))).toFixed(2)}`,
    `fees $${r2(iFee('etsy', 25, 5) + 0.2).toFixed(2)}, leaving $${(30 - r2(iFee('etsy', 25, 5)) - 0.2).toFixed(2)}`,
    `both platforms take $${r2(iFee('poshmark', 20, 20)).toFixed(2)}`,
    `free listings a month`,
  ];
  for (const s of must) if (!text2.includes(s)) bad('/sheet/print', `expected text missing: ${s}`);
  ok('/sheet/print worked examples verified');
}

// 6. Home page carries every platform's fee summary built by the site.
{
  const text = pageText(htmlOf('index.html'));
  for (const p of PLATFORMS) {
    const s = site.feeSummary(R[p]);
    if (!s || !text.includes(s)) bad('index.html', `fee summary for ${p} missing or empty`);
  }
  ok('home page fee summaries');
}

// -------------------------------------------------------------------- report
console.log(`PASS ${pass}`);
for (const n of notes) console.log('NOTE ' + n);
if (process.argv.includes('--review') && Object.keys(hardcodedTokens).length) {
  console.log('REVIEW numbers typed by hand on placeholder lines (inputs and sourced facts):');
  for (const [s, t] of Object.entries(hardcodedTokens).sort()) console.log(`  ${s}: ${[...new Set(t)].join(' ')}`);
}
if (fails.length) {
  console.log(`\nFAIL ${fails.length}`);
  for (const f of fails.slice(0, 80)) console.log('  ' + f);
  if (fails.length > 80) console.log(`  … and ${fails.length - 80} more`);
  process.exit(1);
}
console.log('\nRESULT: all checks passed');
