// Mirror of lib/rates.js (the site's YAML-subset parser).
// Duplicated on purpose: lib/rates.js is ESM-source inside a CJS-default
// package (no "type": "module"), so Node scripts can't import it directly.
// Keep the two in sync — the test suite loads both shapes via fixtures.

export function parseScalar(raw) {
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
      if (val !== '') continue;
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
