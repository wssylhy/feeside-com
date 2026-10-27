#!/usr/bin/env node
// keywords — relative demand-signal collection (CHARTER §4.3: RELATIVE
// comparisons only, never absolute volume guessing). DuckDuckGo
// autocomplete feeds; GitHub Actions US runners only.
//
//   node scripts/collect/keywords.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchText, todayUTC, writeJson } from './lib/util.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

const PLATFORM_SEEDS = [
  'ebay fees', 'poshmark fees', 'mercari fees',
  'vinted fees', 'depop fees', 'etsy fees',
];

async function autocomplete(seed) {
  const url = 'https://duckduckgo.com/ac/?q=' + encodeURIComponent(seed) + '&type=list';
  const r = await fetchText(url, { timeoutMs: 15000 });
  if (r.status !== 200) throw new Error('http ' + r.status);
  const data = JSON.parse(r.text);
  const suggestions = Array.isArray(data) && Array.isArray(data[1]) ? data[1] : [];
  return suggestions;
}

async function main() {
  const kwPath = path.join(ROOT, 'config', 'keywords.txt');
  const tracked = fs
    .readFileSync(kwPath, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.replace(/#.*$/, '').trim())
    .filter(Boolean);
  const seeds = [...new Set([...tracked, ...PLATFORM_SEEDS])];

  const out = [];
  for (const seed of seeds) {
    try {
      const suggestions = await autocomplete(seed);
      out.push({ seed, source: 'duckduckgo-autocomplete', status: 'ok', suggestions });
    } catch (e) {
      out.push({
        seed,
        source: 'duckduckgo-autocomplete',
        status: 'error: ' + String((e && e.message) || e).slice(0, 120),
        suggestions: [],
      });
    }
  }

  writeJson(path.join(ROOT, '.data', 'keywords', todayUTC() + '.json'), {
    generated_at: new Date().toISOString(),
    note: 'relative signal only — no absolute volume claims',
    seeds: out,
  });
  console.log('[keywords] seeds=' + seeds.length + ' out=.data/keywords/' + todayUTC() + '.json');
}

main().catch((e) => {
  console.error('[keywords] fatal:', e);
  process.exit(1);
});
