// Zero-dependency helpers for the collectors.
// Per CHARTER §3.2 these fetchers run ONLY on GitHub Actions US runners
// (or in local tests against offline fixtures) — never against the live
// US sites from the local machine.

import fs from 'fs';
import path from 'path';

export const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
};

export async function fetchText(url, { timeoutMs = 60000 } = {}) {
  // web.archive.org rate-limits shared runner IPs (429) — back off and retry
  // once per URL rather than losing the candidate for the whole scan.
  let res;
  for (let attempt = 0; ; attempt++) {
    res = await fetch(url, {
      headers: BROWSER_HEADERS,
      redirect: 'follow',
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (res.status !== 429 || attempt >= 2) break;
    await new Promise((r) => setTimeout(r, 20000 * (attempt + 1)));
  }
  const text = await res.text();
  return { status: res.status, url: res.url, text };
}

// HTML → single-line visible text. Fee extractors run on this, so markup
// redesigns don't break them as long as the words stay the same.
export function textify(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#0?39;|&apos;|&rsquo;|&#8217;/gi, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/gi, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

export function snippet(text, match, pad = 70) {
  const i = match.index || 0;
  return text.slice(Math.max(0, i - pad), i + match[0].length + pad).trim();
}

// Shared production scan path: live runs and offline fixtures both go
// through this so tests always exercise what Actions will run.
// Field kinds: default = first capture group is a number;
// flag-zero = no capture, a match means "this fee is zero / bundled".
export function scanFields(platformDef, text, sourceUrl) {
  const fields = {};
  for (const f of platformDef.fields) {
    let hit = null;
    for (const re of f.patterns || []) {
      const m = text.match(re);
      if (m) {
        hit = {
          value: f.kind === 'flag-zero' ? 0 : Number(m[1]),
          evidence: snippet(text, m),
          source: sourceUrl,
        };
        break;
      }
    }
    if (!hit && f.zeroPatterns) {
      for (const re of f.zeroPatterns) {
        const m = text.match(re);
        if (m) {
          hit = { value: 0, evidence: snippet(text, m), note: 'zero-match', source: sourceUrl };
          break;
        }
      }
    }
    if (hit) fields[f.key] = hit;
  }
  return fields;
}

export function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

export function writeFileEnsured(fp, content) {
  fs.mkdirSync(path.dirname(fp), { recursive: true });
  fs.writeFileSync(fp, content);
}

export function writeJson(fp, obj) {
  writeFileEnsured(fp, JSON.stringify(obj, null, 2) + '\n');
}

// Bing wraps organic result hrefs in a /ck/a redirect; the real destination
// rides in `u=a1<base64url>`. Non-redirect hrefs pass through untouched.
export function decodeBingHref(href) {
  try {
    const u = new URL(href, 'https://www.bing.com');
    if (u.pathname.startsWith('/ck/')) {
      const payload = u.searchParams.get('u') || '';
      const b64 = payload.startsWith('a1') ? payload.slice(2) : payload;
      if (b64) {
        const decoded = Buffer.from(
          b64.replace(/-/g, '+').replace(/_/g, '/'),
          'base64'
        ).toString('utf8');
        if (/^https?:\/\//.test(decoded)) return decoded;
      }
    }
    return href;
  } catch {
    return href;
  }
}

export function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}
