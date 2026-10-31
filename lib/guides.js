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
