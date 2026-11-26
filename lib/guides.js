import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { loadRates, loadEbayCategories, PLATFORM_LABELS } from './rates';
import { computeFees, ebayCategoryFee, money, toCents } from './fees';

// Build-time guide pipeline: content/guides/*.md (copied from the drafts
// directory into the repo) → cleaned, config-rendered HTML for /guides/<slug>.
// Charter red lines live here: rates ONLY from config (null → "pending
// verification"), zero Chinese internal notes survive, no literal braces.

const GUIDES_DIR = path.join(process.cwd(), 'content', 'guides');

// Published internal-link targets by batch number. Numbers absent from this
// map (14/15/20/21/22/23 — UK/specialist calculators not built yet) have
// their links dropped rather than pointing at 404s.
const REF_TARGETS = {
  1: { path: '/guides/poshmark-vs-ebay-fees/', label: 'Poshmark vs eBay fees' },
  2: { path: '/calculators/ebay/', label: 'eBay calculator' },
  3: { path: '/calculators/poshmark/', label: 'Poshmark calculator' },
  4: { path: '/calculators/mercari/', label: 'Mercari calculator' },
  5: { path: '/calculators/vinted/', label: 'Vinted calculator' },
  6: { path: '/calculators/depop/', label: 'Depop calculator' },
  7: { path: '/calculators/etsy/', label: 'Etsy calculator' },
  8: { path: '/guides/fees-comparison-table/', label: 'fees comparison table' },
  9: { path: '/guides/how-much-does-ebay-take/', label: 'how much eBay takes' },
  10: { path: '/guides/poshmark-vs-mercari-fees/', label: 'Poshmark vs Mercari fees' },
  11: { path: '/guides/ebay-vs-etsy-fees/', label: 'eBay vs Etsy fees' },
  12: { path: '/guides/vinted-vs-depop-fees/', label: 'Vinted vs Depop fees' },
  13: { path: '/guides/how-much-does-poshmark-take/', label: 'how much Poshmark takes' },
  16: { path: '/guides/how-much-does-etsy-take/', label: 'how much Etsy takes' },
  17: { path: '/guides/how-much-does-mercari-take/', label: 'how much Mercari takes' },
  18: { path: '/guides/depop-vs-mercari-fees/', label: 'Depop vs Mercari fees' },
  19: { path: '/guides/ebay-vs-vinted-fees/', label: 'eBay vs Vinted fees' },
  24: { path: '/guides/etsy-vs-poshmark-fees/', label: 'Etsy vs Poshmark fees' },
  25: { path: '/guides/where-to-sell-cheap-items/', label: 'where to sell cheap items' },
  26: { path: '/guides/shipping-cost-comparison-2026/', label: '2026 shipping cost comparison' },
  27: { path: '/guides/how-much-does-vinted-take/', label: 'how much Vinted takes' },
  28: { path: '/guides/how-much-does-depop-take/', label: 'how much Depop takes' },
  29: { path: '/guides/ebay-vs-mercari-fees/', label: 'eBay vs Mercari fees' },
  30: { path: '/guides/poshmark-vs-depop-fees/', label: 'Poshmark vs Depop fees' },
  31: { path: '/guides/mercari-vs-vinted-fees/', label: 'Mercari vs Vinted fees' },
  32: { path: '/guides/where-to-sell-clothes-online/', label: 'where to sell clothes online' },
  33: { path: '/guides/ebay-vs-depop-fees/', label: 'eBay vs Depop fees' },
  34: { path: '/guides/poshmark-vs-vinted-fees/', label: 'Poshmark vs Vinted fees' },
  35: { path: '/guides/mercari-vs-etsy-fees/', label: 'Mercari vs Etsy fees' },
  36: { path: '/guides/etsy-vs-vinted-fees/', label: 'Etsy vs Vinted fees' },
  37: { path: '/guides/etsy-vs-depop-fees/', label: 'Etsy vs Depop fees' },
  38: { path: '/guides/best-time-to-list-on-ebay/', label: 'best time to list on eBay' },
  39: { path: '/guides/depop-boosting-cost/', label: 'Depop Boosting cost' },
  40: { path: '/guides/cheapest-selling-app/', label: 'cheapest selling app' },
  41: { path: '/guides/etsy-transaction-fee/', label: 'Etsy transaction fee' },
  42: { path: '/guides/ebay-listing-fees/', label: 'eBay listing fees' },
  43: { path: '/guides/does-poshmark-charge-shipping/', label: 'does Poshmark charge shipping' },
  44: { path: '/guides/who-pays-shipping-on-mercari/', label: 'who pays shipping on Mercari' },
  45: { path: '/guides/etsy-listing-fee/', label: 'Etsy listing fee' },
  46: { path: '/guides/sell-handmade-etsy-or-ebay/', label: 'sell handmade on Etsy or eBay' },
  47: { path: '/guides/vinted-buyer-fees/', label: 'Vinted buyer fees' },
  48: { path: '/guides/ebay-fees-by-category/', label: 'eBay fees by category' },
  49: { path: '/guides/poshmark-fees/', label: 'Poshmark fees' },
  50: { path: '/guides/poshmark-fee-under-15/', label: 'Poshmark fee under $15' },
};

// Money fields always render with the dollar sign ("$0.45"), and a "$" typed
// in front of the placeholder is absorbed, so both `{{…}}` and `${{…}}` work.
export const MONEY_FIELDS = new Set(['per_order_fixed', 'per_order_fixed_under_10', 'payment_fixed', 'listing_fee', 'min_commission']);

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const meta = {};
  if (!m) return { meta, body: text };
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].replace(/^\[/, '').replace(/\]$/, '').trim();
  }
  return { meta, body: text.slice(m[0].length) };
}

// Internal-note scrubbing: italic-parenthetical notes containing CJK, then any
// remaining CJK-bearing sentences (notes trailed sentences on shared lines).
function scrubChinese(md) {
  const withoutItalic = md.replace(/\*\([\s\S]*?\)\*/g, (m) =>
    /[\u4e00-\u9fff]/.test(m) ? '' : m
  );
  return withoutItalic
    .split('\n')
    .map((line) => {
      if (!/[\u4e00-\u9fff]/.test(line)) return line;
      const kept = line
        .split(/(?<=[.。！？!?])\s+/)
        .filter((s) => !/[\u4e00-\u9fff]/.test(s));
      return kept.join(' ').replace(/\s{2,}/g, ' ').trim();
    })
    .filter((line) => !/^\s*$/.test(line) || true)
    .join('\n')
    .replace(/\n{3,}/g, '\n\n');
}

// {{rates.platform.field}} → config value; null → "pending verification".
// Money fields always render with the dollar sign ("$0.45"), and a "$" typed
// in front of the placeholder is absorbed, so both `{{…}}` and `${{…}}` work.
// For other fields a typed "$" is kept ("${{threshold}}" → "$15").
function renderPlaceholders(md, rates) {
  return md.replace(/(\$?)\{\{(rates\.[a-zA-Z0-9_.]+)\}\}/g, (full, dollar, key) => {
    const [, platform, field] = key.split('.');
    const v = rates && rates[platform] ? rates[platform][field] : undefined;
    if (v === undefined || v === null) return 'pending verification';
    if (MONEY_FIELDS.has(field) && typeof v === 'number') return '$' + v.toFixed(2);
    return dollar + String(v);
  });
}

// ---- Derived-number placeholders (every page must use these instead of
// hand-computed results; hand-transcription produced real arithmetic errors
// in batches 1-4). All of them call the one shared fee function in lib/fees.js,
// the same one the calculators use. Grammar:
//   {{calc:fee:PLATFORM:ITEM[:SHIPPING]}}   seller fees on the sale
//   {{calc:keep:PLATFORM:ITEM[:SHIPPING]}}  money the sale brings in, minus fees
//   {{calc:net:PLATFORM:ITEM[:SHIPPING]}}   money kept for the ITEM: item price
//                                           minus fees (shipping pass-through excluded)
//   {{calc:pct:PLATFORM:ITEM[:SHIPPING]}}   fees as a share of the item price
//   {{calc:ebaycat:CATEGORY:AMOUNT}}        eBay category final value fee + per-order fee
// ITEM is the item price; SHIPPING is the shipping the buyer pays. On Poshmark
// and Vinted shipping is ignored because it is paid straight to the platform.
// Listing fees are excluded (they bill per listing); anything the config cannot
// support renders "pending verification". Fees are rounded to cents once and
// keep/net are derived from the rounded fee, so fee + keep always sums back.
function renderCalcPlaceholders(md, rates) {
  return md.replace(
    /\{\{calc:(fee|keep|pct|net|ebaycat|ebaykeep|listings|gap|boosted|boost|xfees|xnet):([a-z_]+):([0-9.]+)(?::([0-9.]+))?\}\}/g,
    (full, kind, key, itemStr, shipStr) => {
      const item = Number(itemStr);
      const boost = rates[key] && Number(rates[key].boosting_percent);
      if (kind === 'boost') return boost ? money((item * boost) / 100) : 'pending verification';
      if (kind === 'boosted') {
        // Per-sale fee plus the platform's optional boosting percentage
        // (Depop: charged on sales that come from a boosted listing).
        const base = computeFees(rates[key], item, 0, { excludeListing: true });
        if (!base || !boost) return 'pending verification';
        return money(base.fee + (item * boost) / 100);
      }
      if (kind === 'listings') {
        // N listings at the platform's listing fee (what N listings cost).
        const lf = rates[key] && rates[key].listing_fee;
        return lf ? money(item * Number(lf)) : 'pending verification';
      }
      if (kind === 'gap') {
        // {{calc:gap:a_b:ITEM[:SHIP]}} = how much more platform a's fee is
        // than platform b's on the same sale.
        const [a, b] = key.split('_');
        const ship = Number(shipStr) || 0;
        const fa = computeFees(rates[a], item, ship, { excludeListing: true });
        const fb = computeFees(rates[b], item, ship, { excludeListing: true });
        if (!fa || !fb) return 'pending verification';
        return money(fa.fee - fb.fee);
      }
      if (kind === 'xfees' || kind === 'xnet') {
        // {{calc:xfees:PLATFORM:ITEM:N}} = fees on N separate sales of ITEM;
        // xnet = what those N sales leave you.
        const one = computeFees(rates[key], item, 0, { excludeListing: true });
        if (!one) return 'pending verification';
        const n = Number(shipStr) || 1;
        return kind === 'xfees' ? money(toCents(one.fee) * n) : money(toCents(item - toCents(one.fee)) * n);
      }
      if (kind === 'ebaycat' || kind === 'ebaykeep') {
        const out = ebayCategoryFee(loadEbayCategories().categories[key], item, rates.ebay);
        if (!out) return 'see the category table';
        return kind === 'ebaycat' ? money(out.fee) : money(item - out.fee);
      }
      const ship = shipStr != null ? Number(shipStr) : 0;
      const c = computeFees(rates[key], item, ship, { excludeListing: true });
      if (!c || !Number.isFinite(c.fee)) return 'pending verification';
      const fee = toCents(c.fee);
      if (kind === 'fee') return money(fee);
      if (kind === 'keep') return money(c.gross - fee);
      if (kind === 'net') return money(item - fee);
      return ((fee / item) * 100).toFixed(1) + '%';
    }
  );
}

// ---- Config-rendered tables (markdown). No number is typed by hand.
//   {{table:fees}}                      fee lines × platforms
//   {{table:payouts:10,25,50}}          same sale on every platform, shipping not included
//   {{table:best:10,25,50}}             which platform keeps you the most, per price
//   {{table:ebay-categories}}           eBay's per-category final value fee table
function mdTable(header, rows) {
  const cell = (s) => String(s).replace(/\|/g, '·').replace(/\n/g, ' ');
  return [
    `| ${header.map(cell).join(' | ')} |`,
    `| ${header.map(() => '---').join(' | ')} |`,
    ...rows.map((r) => `| ${r.map(cell).join(' | ')} |`),
  ].join('\n');
}

function withRates(rates) {
  return PLATFORM_LABELS.map(({ key, label }) => ({ key, label, r: rates[key] || {} })).filter(
    (p) => p.r.verified && p.r.final_value_percent != null
  );
}

const linkedHead = (p) => `[${p.label}](/calculators/${p.key}/)`;

function feeBasis(r) {
  return r.fee_base === 'item_only' ? 'of the item price' : 'of the sale total (item + shipping)';
}

function fixedFeeCell(r) {
  if (r.per_order_fixed_under_10 != null && r.per_order_fixed_under_10 !== r.per_order_fixed) {
    return `${money(r.per_order_fixed_under_10)} on orders of $10 or less, ${money(r.per_order_fixed)} above`;
  }
  return r.per_order_fixed ? money(r.per_order_fixed) : 'none';
}

function listingFeeCell(r) {
  if (!r.listing_fee) return 'free';
  const base = `${money(r.listing_fee)} per listing`;
  return r.listing_fee_free_per_month ? `${money(r.listing_fee)} after ${r.listing_fee_free_per_month} free listings a month` : base;
}

function feesTable(rates) {
  const ps = withRates(rates);
  return mdTable(
    ['Fee line', ...ps.map(linkedHead)],
    [
      [
        'Selling fee (final value fee)',
        ...ps.map(({ r }) => {
          let s = `${r.final_value_percent}% ${feeBasis(r)}`;
          if (r.min_commission != null) {
            s += `, or a flat ${money(r.min_commission)} under $${r.commission_threshold_price}`;
          }
          return s;
        }),
      ],
      ['Fixed fee per order', ...ps.map(({ r }) => fixedFeeCell(r))],
      [
        'Payment processing',
        ...ps.map(({ key, r }) => {
          if (r.payment_percent || r.payment_fixed) return `${r.payment_percent}% + ${money(r.payment_fixed)}`;
          return key === 'vinted' ? 'none' : 'none charged separately';
        }),
      ],
      ['Listing fee', ...ps.map(({ r }) => listingFeeCell(r))],
    ]
  );
}

function payoutsTable(rates, prices) {
  const ps = withRates(rates);
  return mdTable(
    ['Sale price (shipping not included)', ...ps.map(linkedHead)],
    prices.map((price) => [
      `$${price}`,
      ...ps.map(({ r }) => money(computeFees(r, price, 0, { excludeListing: true }).net)),
    ])
  );
}

function bestTable(rates, prices) {
  const ps = withRates(rates);
  return mdTable(
    ['Sale price', 'Keeps you the most', 'Runner-up', 'Difference'],
    prices.map((price) => {
      const ranked = ps
        .map(({ label, r }) => ({ label, net: computeFees(r, price, 0, { excludeListing: true }).net }))
        .sort((a, b) => b.net - a.net);
      return [
        `$${price}`,
        `${ranked[0].label} (${money(ranked[0].net)})`,
        ranked[1] ? `${ranked[1].label} (${money(ranked[1].net)})` : '—',
        ranked[1] ? money(ranked[0].net - ranked[1].net) : '—',
      ];
    })
  );
}

function ebayCategoriesTable() {
  const cfg = loadEbayCategories();
  const cats = cfg.categories || {};
  return mdTable(
    ['Category', 'Insertion fee', 'Final value fee (per item)'],
    Object.entries(cats).map(([, c]) => [
      c.label,
      cfg.insertion && cfg.insertion[c.insertion] != null ? cfg.insertion[c.insertion] : c.insertion,
      c.display,
    ])
  );
}

function renderTablePlaceholders(md, rates) {
  return md
    .replace('{{table:fees}}', () => feesTable(rates))
    .replace(/\{\{table:payouts:([0-9,]+)\}\}/g, (m, list) => payoutsTable(rates, list.split(',').map(Number)))
    .replace(/\{\{table:best:([0-9,]+)\}\}/g, (m, list) => bestTable(rates, list.split(',').map(Number)))
    .replace('{{table:ebay-categories}}', () => ebayCategoriesTable())
    .replace('{{table:ebay-categories-status}}', () => ebayCategoriesStatus());
}

// How far the eBay category table has been checked. meta.verified in
// config/ebay-categories.yaml flips this from "automated scan only" to
// "cross-checked by hand".
function ebayCategoriesStatus() {
  const m = loadEbayCategories().meta || {};
  if (m.verified === true) {
    return `Collected from eBay's Selling fees page by automated scan on ${m.collected} and cross-checked by hand.`;
  }
  return `Collected from eBay's Selling fees page by automated scan on ${m.collected}. It has not yet been cross-checked by hand, so confirm your category on eBay's page before you list.`;
}

// {{cat:KEY.field}} → one value from config/ebay-categories.yaml (rates
// quoted in prose stay tied to the table).
function renderCatPlaceholders(md) {
  const cfg = loadEbayCategories();
  return md.replace(/\{\{cat:([a-z]+)\.([a-z0-9_]+)\}\}/g, (full, key, field) => {
    const v = cfg.categories && cfg.categories[key] ? cfg.categories[key][field] : undefined;
    if (v === undefined) return 'see the category table';
    // Dollar thresholds read better with a thousands separator ($7,500).
    return /(_cap|threshold)$/.test(field) && Number.isFinite(Number(v)) ? Number(v).toLocaleString('en-US') : String(v);
  });
}

// "Internal links: A (#2) · B (#13)" → a Related-guides list. Unpublished
// targets are dropped (never shown as raw "#20-..." text). The old label was
// drafting jargon; readers now get a plain heading.
function renderInternalLinks(md) {
  return md.replace(/^Internal links:(.*)$/gm, (full, rest) => {
    const items = [];
    for (const raw of rest.split('·')) {
      const t = raw.trim();
      if (!t) continue;
      let m = t.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
      let label;
      let nums;
      if (m) {
        label = m[1].trim();
        nums = (m[2].match(/\d+/g) || []).slice(0, 1);
      } else {
        m = t.match(/^(.*?)\s*（([^）]+)）\s*$/);
        if (!m) continue;
        label = null;
        nums = m[2].match(/\d+/g) || [];
      }
      for (const n of nums) {
        const target = REF_TARGETS[Number(n)];
        if (!target) continue;
        items.push({ label: label && !/[\u4e00-\u9fff]/.test(label) ? label : target.label, path: target.path });
      }
    }
    if (!items.length) return '';
    return '## Related guides\n\n' + items.map((i) => `- [${i.label}](${i.path})`).join('\n');
  });
}

// Remaining bare "#N" refs in body text → linked labels (published) or
// plain "guide N" text (unpublished), so no dead "#N" strings survive.
function renderBareRefs(md) {
  return md.replace(/#(\d{1,2})\b/g, (full, n) => {
    const target = REF_TARGETS[Number(n)];
    return target ? `[${target.label}](${target.path})` : `guide ${n}`;
  });
}

const PLATFORM_WORDS = ['ebay', 'poshmark', 'mercari', 'vinted', 'depop', 'etsy'];
const PLATFORM_RE = new RegExp(`\\b(${PLATFORM_WORDS.join('|')})\\b`, 'gi');

// Platforms a guide is about, read from its keywords and slug.
function platformsOfText(text) {
  return PLATFORM_WORDS.filter((p) =>
    new RegExp(`\\b${p}\\b`, 'i').test(text || '')
  );
}

function slugLabel(slug) {
  const name = { ebay: 'eBay', etsy: 'Etsy', poshmark: 'Poshmark', mercari: 'Mercari', vinted: 'Vinted', depop: 'Depop' };
  const s = slug.replace(/-/g, ' ').replace(/\b\w\b/g, (c) => c.toUpperCase());
  const out = s.charAt(0).toUpperCase() + s.slice(1);
  return out.replace(new RegExp(`\\b(${PLATFORM_WORDS.join('|')})\\b`, 'gi'), (w) => name[w.toLowerCase()]);
}

const stripTags = (html) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

// First paragraph of the rendered body, as a meta description: whole
// sentences only, never cut mid-sentence, first letter capitalized.
function firstParagraph(html) {
  const m = html.match(/<\/h1>\s*<p>([\s\S]*?)<\/p>/i) || html.match(/<p>([\s\S]*?)<\/p>/i);
  if (!m) return '';
  const t = stripTags(m[1])
    .replace(/^(short answer|intro):\s*/i, '')
    .replace(/^([a-z])/, (c) => c.toUpperCase());
  const sentences = t.match(/[^.!?]+[.!?]+(\s|$)/g) || [t];
  let out = '';
  for (const s of sentences) {
    if (out && (out + s).trim().length > 160) break;
    if (!out && s.trim().length > 200) break;
    out += s;
  }
  return (out || t.slice(0, 160)).trim();
}

function guideFile(slug) {
  return fs
    .readdirSync(GUIDES_DIR)
    .find((f) => f.endsWith('.md') && f.replace(/^\d+-/, '').replace(/\.md$/, '') === slug);
}

const cache = new Map();

function buildGuide(slug) {
  const file = guideFile(slug);
  if (!file) return null;
  const raw = fs.readFileSync(path.join(GUIDES_DIR, file), 'utf8');
  const { meta, body } = parseFrontmatter(raw);
  const rates = loadRates().platforms || {};
  let md = body;
  md = md.replace(/^Intro: /gm, '');
  md = scrubChinese(md);
  md = renderInternalLinks(md);
  md = renderBareRefs(md);
  md = renderPlaceholders(md, rates);
  md = renderCalcPlaceholders(md, rates);
  md = renderCatPlaceholders(md);
  md = renderTablePlaceholders(md, rates);
  const html = marked.parse(md, { gfm: true, breaks: true });
  // H1 as readers see it (placeholders already rendered).
  const title = stripTags((html.match(/<h1>([\s\S]*?)<\/h1>/) || [])[1] || '') || meta.primary_keyword;
  // Frontmatter title/description may use the same placeholders as the body,
  // so a meta description never carries a hand-typed rate.
  const renderText = (s) =>
    renderCalcPlaceholders(renderCatPlaceholders(renderPlaceholders(String(s), rates)), rates)
      .replace(/\{\{[a-z]+:[^}]*\}\}/g, '')
      .trim();
  return {
    slug,
    file,
    meta,
    html,
    title,
    seoTitle: meta.title ? renderText(meta.title) : title,
    description: meta.description ? renderText(meta.description) : firstParagraph(html),
    updated: meta.updated || null,
    // frontmatter `platforms: [ebay, poshmark]` overrides keyword detection
    platforms: meta.platforms
      ? meta.platforms.split(',').map((s) => s.trim().toLowerCase()).filter((p) => PLATFORM_WORDS.includes(p))
      : platformsOfText([meta.primary_keyword, meta.secondary_keywords, slug].join(' ')),
    type: meta.page_type || 'qa',
  };
}

function getGuide(slug) {
  if (!cache.has(slug)) cache.set(slug, buildGuide(slug));
  return cache.get(slug);
}

// Guides worth linking from this one: same platform(s), narrowest first.
// linked = paths already in the page's own Related-guides list.
function relatedGuides(slug) {
  const me = getGuide(slug);
  if (!me) return [];
  const linked = new Set([...me.html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]));
  const rank = (g) => (g.type === 'qa' ? 0 : g.type === 'compare' ? 1 : 2) * 10 + g.platforms.length;
  return guideSlugs()
    .map(getGuide)
    .filter(
      (g) =>
        g &&
        g.slug !== slug &&
        g.platforms.length > 0 &&
        g.platforms.some((p) => me.platforms.includes(p)) &&
        !linked.has(`/guides/${g.slug}/`)
    )
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, 6);
}

// Final HTML: body + any automatically discovered related guides appended to
// the page's own Related-guides list (or a new list when it has none).
function fullHtml(slug) {
  const g = getGuide(slug);
  if (!g) return '';
  const extra = relatedGuides(slug);
  if (!extra.length) return g.html;
  const items = extra.map((x) => `<li><a href="/guides/${x.slug}/">${slugLabel(x.slug)}</a></li>`).join('');
  if (g.html.includes('<h2>Related guides</h2>')) {
    return g.html.replace(/(<h2>Related guides<\/h2>\s*<ul>[\s\S]*?)(<\/ul>)/, `$1${items}$2`);
  }
  return `${g.html}<h2>Related guides</h2><ul>${items}</ul>`;
}

export function guideSlugs() {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/^\d+-/, '').replace(/\.md$/, ''))
    .sort();
}

export function loadGuide(slug) {
  const g = getGuide(slug);
  if (!g) return null;
  return { ...g, html: fullHtml(slug) };
}

// Which calculators to embed: read from the primary keyword only, as before,
// so a page that merely mentions a platform in a secondary keyword does not
// grow a stack of calculators.
export function platformsForGuide(slug) {
  const g = getGuide(slug);
  return g ? platformsOfText(g.meta.primary_keyword) : [];
}

// Lightweight index for the home page, sitemap and related-link blocks.
export function guideIndex() {
  return guideSlugs()
    .map(getGuide)
    .filter(Boolean)
    .map(({ slug, seoTitle, title, description, updated, platforms, type }) => ({
      slug,
      label: slugLabel(slug),
      seoTitle,
      title,
      description,
      updated,
      platforms,
      type,
      path: `/guides/${slug}/`,
    }));
}

// Guides about one platform, or a head-to-head with one other, question pages
// first — used by the calculator pages. Guides spanning three or more
// platforms are hubs and are not repeated under every platform.
export function guidesForPlatform(key, limit = 9) {
  return guideIndex()
    .filter((g) => g.platforms.includes(key) && g.platforms.length <= 2)
    .sort((a, b) => {
      const rank = (g) => (g.type === 'qa' ? 0 : g.type === 'compare' ? 1 : 2) * 10 + g.platforms.length;
      return rank(a) - rank(b);
    })
    .slice(0, limit);
}
