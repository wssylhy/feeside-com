#!/usr/bin/env node
// rates-scan — P1 fee change detection (CHARTER §3.1/§3.2).
// Runs on GitHub Actions US runners only. Locally, use --offline to run the
// exact same extraction path against test fixtures — never the live sites.
//
//   node scripts/collect/rates-scan.mjs [--debug] [--apply] [--offline]
//
//   --debug    dump raw HTML + extracted text per candidate (calibration)
//   --apply    write null→value transitions into config/rates.yaml
//              (verified stays false — human [核] flips it) + CHANGELOG
//   --offline  use scripts/collect/test/fixtures.mjs instead of network

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ebay from './platforms/ebay.mjs';
import poshmark from './platforms/poshmark.mjs';
import mercari from './platforms/mercari.mjs';
import vinted from './platforms/vinted.mjs';
import depop from './platforms/depop.mjs';
import etsy from './platforms/etsy.mjs';
import {
  fetchText,
  textify,
  scanFields,
  todayUTC,
  writeJson,
  writeFileEnsured,
} from './lib/util.mjs';
import { parseRatesYaml } from './lib/rates-yaml.mjs';
import { resolveTargets } from './lib/wayback.mjs';

// eBay first: cheap sanity check with a live-fetchable page. Etsy second:
// closest to a breakthrough (11-05 run got 2 fields via Wayback) and the
// wayback budget is freshest right after the cheap platform.
const PLATFORMS = [ebay, etsy, poshmark, mercari, vinted, depop];

const argv = process.argv.slice(2);
const APPLY = argv.includes('--apply');
const DEBUG = argv.includes('--debug') || APPLY;
const OFFLINE = argv.includes('--offline');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = path.join(ROOT, '.data', 'freshness', todayUTC());

async function getFixtures() {
  if (!OFFLINE) return null;
  const mod = await import('./test/fixtures.mjs');
  return mod.FIXTURES;
}

function sanitize(url) {
  return url.replace(/[^a-zA-Z0-9]+/g, '-').slice(0, 60) || 'page';
}

async function scanPlatform(def, config, fixtures) {
  const attempts = [];
  let best = null;

  // Fetch list = live candidates + Wayback-resolved snapshots. Live pages
  // hard-block datacenter IPs for 5 of 6 platforms; archived copies of the
  // SAME official pages are the fallback (DD4 evidence chain keeps source_url).
  const urls = [...(def.candidates || [])];
  if (!OFFLINE && Array.isArray(def.waybackTargets) && def.waybackTargets.length) {
    const resolved = await resolveTargets(def.waybackTargets);
    urls.push(...resolved);
    attempts.push({ waybackResolved: resolved.length });
  }

  for (const url of urls) {
    let html = '';
    let finalUrl = url;
    let status = 0;
    try {
      if (OFFLINE) {
        const fx = fixtures && fixtures[def.id];
        if (!fx) throw new Error('no fixture for ' + def.id);
        html = fx.html;
        status = 200;
      } else {
        const r = await fetchText(url);
        status = r.status;
        finalUrl = r.url;
        html = r.text;
        if (status !== 200) {
          attempts.push({ url, status });
          continue;
        }
      }
    } catch (e) {
      attempts.push({ url, error: String((e && e.message) || e).slice(0, 200) });
      continue;
    }

    const text = textify(html);
    const fields = scanFields(def, text, finalUrl);
    const score = Object.keys(fields).length;
    attempts.push({ url: finalUrl, status, matched: score });

    if (DEBUG) {
      writeFileEnsured(path.join(OUT, 'debug', def.id, sanitize(url) + '.html'), html);
      writeFileEnsured(path.join(OUT, 'debug', def.id, sanitize(url) + '.txt'), text);
    }

    if (!best || score > best.score) best = { url: finalUrl, status, fields, score };
    if (best.score === def.fields.length) break;
  }

  const cfg = (config.platforms || {})[def.id] || {};
  const result = {
    platform: def.id,
    status: !best || best.score === 0 ? 'blocked' : best.score === def.fields.length ? 'ok' : 'partial',
    source_url: best ? best.url : null,
    http_status: best ? best.status : null,
    attempts,
    fields: {},
  };
  for (const [key, hit] of Object.entries(best ? best.fields : {})) {
    result.fields[key] = {
      old_value: cfg[key] == null ? null : cfg[key],
      new_value: hit.value,
      note: hit.note || null,
      evidence: hit.evidence,
      source_url: hit.source,
      scraped_at: new Date().toISOString(),
    };
  }
  return result;
}

// Line-preserving config update: swaps only targeted `null` leaves so all
// comments and structure survive. Never touches `verified` — that flag is
// human-only. Provenance (source_url/scraped_date) is auto-filled for any
// platform that got values this run — the numbers must always carry their
// official source and collection date.
function applyToConfig(file, changes, provenance, date) {
  const changeMap = new Map(changes.map((c) => [c.platform + '.' + c.field, c]));
  const provMap = new Map(Object.entries(provenance || {}));
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  let section = null;
  let platform = null;
  let applied = 0;

  const out = lines.map((line) => {
    const stripped = line.replace(/(^|\s)#.*$/, '');
    const m = stripped.match(/^(\s*)([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) return line;
    const [, indent, key, rest] = m;
    const n = indent.length;

    if (n === 0) {
      section = key;
      platform = null;
      return line;
    }
    if (section === 'meta' && n <= 2) {
      if (key === 'updated_at' && rest.trim() === 'null') return indent + key + ': "' + todayUTC() + '"';
      if (key === 'updated_by' && rest.trim() === 'null') return indent + key + ': "rates-scan (GitHub Actions)"';
      return line;
    }
    if (section === 'platforms') {
      if (n <= 2 && rest.trim() === '') {
        platform = key;
        return line;
      }
      if (platform && n > 2) {
        const c = changeMap.get(platform + '.' + key);
        if (c && rest.trim() === 'null') {
          applied += 1;
          return line.replace('null', String(c.new_value));
        }
        const prov = provMap.get(platform);
        if (prov && rest.trim() === 'null') {
          if (key === 'source_url') {
            applied += 1;
            return line.replace('null', '"' + prov + '"');
          }
          if (key === 'scraped_date') {
            applied += 1;
            return line.replace('null', '"' + date + '"');
          }
        }
      }
    }
    return line;
  });

  fs.writeFileSync(file, out.join('\n'));
  return applied;
}

function appendChangelog(file, date, changes) {
  const entry = [
    '## ' + date + ' — rates-scan (automated)',
    '',
    'Scanned changes (verified stays false until human [核] review):',
    '',
    ...changes.map(
      (c) =>
        '- ' +
        c.platform +
        '.' +
        c.field +
        ': ' +
        (c.old_value == null ? '(unset)' : c.old_value) +
        ' → ' +
        c.new_value
    ),
    '',
  ].join('\n');
  fs.appendFileSync(file, entry);
}

async function main() {
  const fixtures = await getFixtures();
  const config = parseRatesYaml(
    fs.readFileSync(path.join(ROOT, 'config', 'rates.yaml'), 'utf8')
  );

  const results = [];
  for (const def of PLATFORMS) {
    results.push(await scanPlatform(def, config, fixtures));
  }

  const changes = [];
  for (const r of results) {
    for (const [field, f] of Object.entries(r.fields)) {
      if (f.old_value !== f.new_value) {
        changes.push({
          platform: r.platform,
          field,
          old_value: f.old_value,
          new_value: f.new_value,
          source_url: f.source_url,
          scraped_at: f.scraped_at,
        });
      }
    }
  }

  const counts = { ok: 0, partial: 0, blocked: 0 };
  for (const r of results) counts[r.status] += 1;

  writeJson(path.join(OUT, 'report.json'), {
    generated_at: new Date().toISOString(),
    mode: { apply: APPLY, offline: OFFLINE, debug: DEBUG },
    counts,
    changes,
    platforms: results,
  });

  const lines = [
    '# rates-scan ' + todayUTC(),
    '',
    'Status: ' + counts.ok + ' ok / ' + counts.partial + ' partial / ' + counts.blocked + ' blocked. Changes: ' + changes.length + '.',
    '',
    '| platform | status | source | field | old → new | evidence |',
    '|---|---|---|---|---|---|',
  ];
  for (const r of results) {
    const fieldKeys = Object.keys(r.fields);
    if (!fieldKeys.length) {
      lines.push('| ' + r.platform + ' | ' + r.status + ' | ' + (r.source_url || '—') + ' | — | — | — |');
      continue;
    }
    for (const [key, f] of Object.entries(r.fields)) {
      lines.push(
        '| ' +
          r.platform +
          ' | ' +
          r.status +
          ' | ' +
          (f.source_url || r.source_url || '—') +
          ' | ' +
          key +
          (f.note ? ' (' + f.note + ')' : '') +
          ' | ' +
          (f.old_value == null ? '(unset)' : f.old_value) +
          ' → ' +
          f.new_value +
          ' | ' +
          String(f.evidence).slice(0, 90) +
          ' |'
      );
    }
  }
  writeFileEnsured(path.join(OUT, 'summary.md'), lines.join('\n') + '\n');

  if (APPLY && changes.length) {
    // provenance: any platform that received values this run gets its scan
    // source URL + today's date filled alongside the numbers
    const provenance = {};
    for (const r of results) {
      if (Object.keys(r.fields).length && r.source_url) provenance[r.platform] = r.source_url;
    }
    const applied = applyToConfig(path.join(ROOT, 'config', 'rates.yaml'), changes, provenance, todayUTC());
    appendChangelog(
      path.join(ROOT, 'config', 'CHANGELOG.md'),
      todayUTC(),
      changes
    );
    console.log('[apply] updated ' + applied + ' config leaves (verified still false — human [核] required)');
  }

  console.log(
    '[rates-scan] ok=' + counts.ok + ' partial=' + counts.partial + ' blocked=' + counts.blocked + ' changes=' + changes.length + ' out=' + OUT
  );
}

main().catch((e) => {
  console.error('[rates-scan] fatal:', e);
  process.exit(1);
});
