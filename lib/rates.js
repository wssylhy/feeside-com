import fs from 'fs';
import path from 'path';

// Minimal YAML-subset parser for config/rates.yaml — zero dependencies.
// Handles exactly the shape used by the config: two nested levels of maps
// with scalar leaves (null / boolean / number / string) and # comments.
function parseScalar(raw) {
  const v = raw.trim();
  if (v === '' || v === 'null' || v === '~') return null;
  if (v === 'true') return true;
  if (v === 'false') return false;
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1);
  }
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  return v;
}

export function parseRatesYaml(text) {
  const root = {};
  let top = null;
  let nested = null;
  for (const line of text.split(/\r?\n/)) {
    const stripped = line.replace(/(^|\s)#.*$/, '');
    if (!stripped.trim()) continue;
    const indent = stripped.match(/^\s*/)[0].length;
    const m = stripped.match(/^\s*([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    const val = m[2];
    if (indent === 0) {
      if (val !== '') continue; // top level holds maps only in this schema
      root[key] = {};
      top = root[key];
      nested = null;
    } else if (indent <= 2 && top) {
      if (val === '') {
        top[key] = {};
        nested = top[key];
      } else {
        top[key] = parseScalar(val);
        nested = null;
      }
    } else if (nested) {
      nested[key] = parseScalar(val);
    }
  }
  return root;
}

// Server-side only (fs). Pages prerender at build time, so this reads
// config/rates.yaml once per build — the exported site has no runtime reads.
export function loadRates() {
  const filePath = path.join(process.cwd(), 'config', 'rates.yaml');
  const text = fs.readFileSync(filePath, 'utf8');
  return parseRatesYaml(text);
}

export function loadPlatform(key) {
  const data = loadRates();
  const p = data.platforms && data.platforms[key];
  if (!p) throw new Error(`Unknown platform in config/rates.yaml: ${key}`);
  return p;
}

export const PLATFORM_LABELS = [
  { key: 'ebay', label: 'eBay' },
  { key: 'poshmark', label: 'Poshmark' },
  { key: 'mercari', label: 'Mercari' },
  { key: 'vinted', label: 'Vinted' },
  { key: 'depop', label: 'Depop' },
  { key: 'etsy', label: 'Etsy' },
];
