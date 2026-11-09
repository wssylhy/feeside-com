// Wayback Machine resolution for the collectors (runs on Actions US runners).
// Live official pages hard-block datacenter traffic, but the Wayback archive
// serves full HTML of the SAME official pages. `id_` raw mode returns the
// original capture without the Wayback toolbar.
//
// archive.org throttles hard once one IP bursts: requests start failing at
// the connection level for a long window. Every wayback call is therefore
// paced, capped by a per-run budget, and retried once on network failure.
// Evidence: 2026-11-09 run — poshmark burned the budget on 4 shell snapshots,
// everything after failed with "fetch failed".
import { fetchText } from './util.mjs';

const CDX = 'https://web.archive.org/cdx/search/cdx';
const PACE_MS = 4000;
let budget = 24;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function wf(url, { timeoutMs = 60000 } = {}) {
  if (budget <= 0) return { status: 0, url, text: '', error: 'wayback budget exhausted' };
  await sleep(PACE_MS);
  budget -= 1;
  try {
    return await fetchText(url, { timeoutMs });
  } catch (e) {
    await sleep(15000);
    if (budget <= 0) return { status: 0, url, text: '', error: 'wayback budget exhausted' };
    budget -= 1;
    try {
      return await fetchText(url, { timeoutMs });
    } catch (e2) {
      return { status: 0, url, text: '', error: String((e2 && e2.message) || e2).slice(0, 120) };
    }
  }
}

// Parse a CDX JSON response into [{ts, original, status}] rows (pure — unit
// tested). Returns [] on any parse failure.
export function parseCdx(text) {
  try {
    const rows = JSON.parse(text);
    if (!Array.isArray(rows) || rows.length < 2) return [];
    const head = rows[0];
    const ti = head.indexOf('timestamp');
    const oi = head.indexOf('original');
    const si = head.indexOf('statuscode');
    if (ti === -1 || oi === -1 || si === -1) return [];
    return rows
      .slice(1)
      .map((r) => ({ ts: String(r[ti]), original: String(r[oi]), status: String(r[si]) }))
      .filter((r) => r.status === '200' && /^\d+$/.test(r.ts));
  } catch {
    return [];
  }
}

// Newest-first snapshot URLs (raw id_ mode) for one exact original URL.
// `from` bounds the era — platform fee regimes changed over time, so each
// wayback target pins its own safe starting year.
export async function snapshotCandidates(originalUrl, { from = '2025', limit = 3 } = {}) {
  const api =
    `${CDX}?url=${encodeURIComponent(originalUrl)}` +
    `&output=json&fl=timestamp,original,statuscode&collapse=timestamp:6&from=${from}&limit=60`;
  const r = await wf(api, { timeoutMs: 30000 });
  if (r.status !== 200) return [];
  return parseCdx(r.text)
    .sort((a, b) => (a.ts < b.ts ? 1 : -1))
    .slice(0, limit)
    .map((e) => `https://web.archive.org/web/${e.ts}id_/${e.original}`);
}

// Prefix discovery: archived URLs under a prefix whose path matches a regex
// (e.g. Zendesk help articles containing "fee"). Filtering happens inside
// CDX (filter=original) so big prefixes stay cheap. NOTE: CDX regexes are
// case-sensitive — pass [Ff]ee-style patterns.
export async function discoverUrls(prefixUrl, matchRe, { from = '2023', limit = 5 } = {}) {
  const api =
    `${CDX}?url=${encodeURIComponent(prefixUrl)}&matchType=prefix` +
    `&output=json&fl=timestamp,original,statuscode&collapse=urlkey` +
    `&filter=original:${encodeURIComponent(matchRe.source)}&from=${from}&limit=1000`;
  const r = await wf(api, { timeoutMs: 30000 });
  if (r.status !== 200) return [];
  const seen = new Set();
  const out = [];
  for (const e of parseCdx(r.text)) {
    if (matchRe.test(e.original) && !seen.has(e.original)) {
      seen.add(e.original);
      out.push(e.original);
      if (out.length >= limit) break;
    }
  }
  return out;
}

// Resolve a platform's waybackTargets into concrete snapshot URLs.
// Target shapes: { url, from, limit } or { prefix, match, from, limit }.
export async function resolveTargets(targets = []) {
  const urls = [];
  for (const t of targets) {
    try {
      if (t.prefix) {
        urls.push(...(await discoverUrls(t.prefix, t.match, { from: t.from, limit: t.limit })));
      } else if (t.url) {
        urls.push(...(await snapshotCandidates(t.url, { from: t.from, limit: t.limit })));
      }
    } catch {
      // a failed target must not poison the rest of the scan
    }
  }
  return urls;
}
