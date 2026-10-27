#!/usr/bin/env node
// serp-sample — weekly SERP sampling for tracked keywords (CHARTER §3.2).
// GitHub Actions US runners only. Bing web SERP is parsed tolerantly;
// every fetch can dump raw HTML via --debug for repair after layout drift.
//
//   node scripts/collect/serp-sample.mjs [--debug]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  fetchText,
  textify,
  decodeBingHref,
  domainOf,
  todayUTC,
  writeJson,
  writeFileEnsured,
} from './lib/util.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = path.join(ROOT, '.data', 'serp', todayUTC());
const DEBUG = process.argv.includes('--debug');

const OFFICIAL = ['ebay.com', 'poshmark.com', 'mercari.com', 'vinted.com', 'depop.com', 'etsy.com'];
const FORUM = ['reddit.com', 'community.ebay.com'];
const BIGSITE = [
  'amazon.com', 'shopify.com', 'nerdwallet.com', 'investopedia.com',
  'forbes.com', 'businessinsider.com', 'cnbc.com', 'bankrate.com',
  'thebalance.com', 'usatoday.com', 'nytimes.com', 'cnet.com',
];

function classify(domain) {
  if (!domain) return 'unknown';
  if (OFFICIAL.some((d) => domain === d || domain.endsWith('.' + d))) return 'official';
  if (FORUM.some((d) => domain === d || domain.endsWith('.' + d))) return 'forum';
  if (/calc|fee|payout|seller|resell/.test(domain)) return 'tool';
  if (BIGSITE.some((d) => domain === d || domain.endsWith('.' + d))) return 'bigsite';
  return 'unknown';
}

function parseBingResults(html) {
  const results = [];
  const re = /<li class="b_algo"[\s\S]{0,6000}?<h2[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) && results.length < 10) {
    const url = decodeBingHref(m[1]);
    results.push({
      position: results.length + 1,
      url,
      domain: domainOf(url),
      title: textify(m[2]),
      type_guess: classify(domainOf(url)),
    });
  }
  return results;
}

async function main() {
  const kwPath = path.join(ROOT, 'config', 'keywords.txt');
  const keywords = fs
    .readFileSync(kwPath, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.replace(/#.*$/, '').trim())
    .filter(Boolean);

  const out = [];
  for (const kw of keywords) {
    const url =
      'https://www.bing.com/search?q=' + encodeURIComponent(kw) + '&setlang=en-US&mkt=en-US&count=10';
    try {
      const r = await fetchText(url);
      if (r.status !== 200) {
        out.push({ keyword: kw, status: 'http-' + r.status, results: [] });
        continue;
      }
      if (DEBUG) writeFileEnsured(path.join(OUT, 'debug', kw.replace(/\W+/g, '-') + '.html'), r.text);
      const results = parseBingResults(r.text);
      out.push({ keyword: kw, status: results.length ? 'ok' : 'parse-empty', results });
    } catch (e) {
      out.push({ keyword: kw, status: 'error: ' + String((e && e.message) || e).slice(0, 120), results: [] });
    }
  }

  writeJson(path.join(ROOT, '.data', 'serp', todayUTC() + '.json'), {
    generated_at: new Date().toISOString(),
    engine: 'bing-web',
    keywords: out,
  });
  console.log('[serp-sample] keywords=' + keywords.length + ' out=' + OUT);
}

main().catch((e) => {
  console.error('[serp-sample] fatal:', e);
  process.exit(1);
});
