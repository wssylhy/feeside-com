import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { loadRates } from './rates';

// Build-time guide pipeline: content/guides/*.md (copied from the drafts
// directory into the repo) → cleaned, config-rendered HTML for /guides/<slug>.
// Charter red lines live here: rates ONLY from config (null → "pending
// verification"), zero Chinese internal notes survive, no literal braces.

const GUIDES_DIR = path.join(process.cwd(), 'content', 'guides');

// Published internal-link targets by batch number. Numbers absent from this
// map (14/15/20/21/22/23 — UK/specialist calculators not built yet) have
// their links stripped to plain text rather than pointing at 404s.
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
};

export const MONEY_FIELDS = new Set(['per_order_fixed', 'per_order_fixed_under_10', 'payment_fixed', 'listing_fee']);

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
// Money fields get 2-decimal formatting ($0.4 → $0.40).
function renderPlaceholders(md, rates) {
  return md.replace(/\{\{(rates\.[a-zA-Z0-9_.]+)\}\}/g, (full, key) => {
    const [, platform, field] = key.split('.');
    const v = rates && rates[platform] ? rates[platform][field] : undefined;
    if (v === undefined || v === null) return 'pending verification';
    if (MONEY_FIELDS.has(field) && typeof v === 'number') return v.toFixed(2);
    return String(v);
  });
}

// ---- Derived-number placeholders (batch-5+ pages must use these instead of
// hand-computed results; hand-transcription produced 3 real arithmetic errors
// across batches 2-4). Grammar:
//   {{calc:fee:PLATFORM:AMOUNT}}          → total seller fees on a sale of AMOUNT
//   {{calc:keep:PLATFORM:AMOUNT}}         → what the seller keeps (amount − fees)
//   {{calc:pct:PLATFORM:AMOUNT}}          → effective fee percentage, 1 decimal
// AMOUNT is a plain number = sale total (item + shipping where the platform's
// fee_base says so). Poshmark is the special case: its fee is computed on the
// ITEM price only, so {{calc:*:poshmark:ITEM}} takes the item price directly.
// Fees round to cents once at the end; keep = amount − exact fee, also rounded
// once. Any missing config value renders "pending verification".
function computeFees(platform, amount, rates) {
  const r = rates && rates[platform];
  if (!r) return null;
  const need = (k) => r[k] === undefined || r[k] === null;
  const pct = (k) => (Number(r[k]) || 0) / 100;
  if (platform === 'ebay') {
    if (need('final_value_percent') || need('per_order_fixed')) return null;
    const t = Number(amount);
    const fixed = t <= 10 && r.per_order_fixed_under_10 != null ? Number(r.per_order_fixed_under_10) : Number(r.per_order_fixed);
    return t * pct('final_value_percent') + fixed;
  }
  if (platform === 'poshmark') {
    if (need('final_value_percent') || need('min_commission')) return null;
    const item = Number(amount);
    return item < Number(r.commission_threshold_price || 15)
      ? Number(r.min_commission)
      : item * pct('final_value_percent');
  }
  if (platform === 'mercari') {
    if (need('final_value_percent')) return null;
    return Number(amount) * pct('final_value_percent');
  }
  if (platform === 'vinted') return 0;
  if (platform === 'depop') {
    if (need('payment_percent') || need('payment_fixed')) return null;
    return Number(amount) * pct('payment_percent') + Number(r.payment_fixed);
  }
  if (platform === 'etsy') {
    if (need('final_value_percent') || need('payment_percent') || need('payment_fixed')) return null;
    const t = Number(amount);
    return t * pct('final_value_percent') + t * pct('payment_percent') + Number(r.payment_fixed);
  }
  return null;
}

function renderCalcPlaceholders(md, rates) {
  return md.replace(/\{\{calc:(fee|keep|pct):([a-z]+):([0-9.]+)\}\}/g, (full, kind, platform, amountStr) => {
    const amount = Number(amountStr);
    const fee = computeFees(platform, amount, rates);
    if (fee === null || !Number.isFinite(fee)) return 'pending verification';
    const money2 = (x) => '$' + x.toFixed(2);
    if (kind === 'fee') return money2(fee);
    if (kind === 'keep') return money2(amount - fee);
    if (kind === 'pct') return ((fee / amount) * 100).toFixed(1) + '%';
    return 'pending verification';
  });
}

// "Internal links: A (#2) · B (003-poshmark-fee-calculator)" → markdown links;
// unpublished targets keep their text and drop the dead reference.
function renderInternalLinks(md) {
  return md.replace(/^Internal links:(.*)$/gm, (full, rest) => {
    const items = rest.split('·').map((item) => {
      const t = item.trim();
      const m = t.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
      if (!m) return t;
      const [, text, ref] = m;
      const n = (ref.match(/\d+/) || [])[0];
      const target = n && REF_TARGETS[Number(n)];
      return target ? `[${text}](${target.path})` : text;
    });
    return 'Internal links: ' + items.join(' · ');
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

function platformsOf(keyword) {
  const out = [];
  for (const p of ['ebay', 'poshmark', 'mercari', 'vinted', 'depop', 'etsy']) {
    if (new RegExp(`\\b${p}\\b`, 'i').test(keyword || '')) out.push(p);
  }
  return out;
}

function prepare(raw) {
  const { meta, body } = parseFrontmatter(raw);
  let md = body;
  md = md.replace(/^Intro: /gm, '');
  md = scrubChinese(md);
  md = renderInternalLinks(md);
  md = renderBareRefs(md);
  const rates = loadRates();
  md = renderPlaceholders(md, rates.platforms || {});
  md = renderCalcPlaceholders(md, rates.platforms || {});
  return { meta, html: marked.parse(md, { gfm: true, breaks: true }) };
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
  const file = fs
    .readdirSync(GUIDES_DIR)
    .find((f) => f.endsWith('.md') && f.replace(/^\d+-/, '').replace(/\.md$/, '') === slug);
  if (!file) return null;
  const raw = fs.readFileSync(path.join(GUIDES_DIR, file), 'utf8');
  const { meta, html } = prepare(raw);
  const title = (raw.match(/^# (.+)$/m) || [])[1] || meta.primary_keyword;
  return { slug, meta, html, title };
}

export function platformsForGuide(slug) {
  const g = loadGuide(slug);
  return g ? platformsOf(g.meta.primary_keyword) : [];
}
