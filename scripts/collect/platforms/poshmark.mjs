// Poshmark — flat commission structure. poshmark.com hard-blocks datacenter
// traffic often; the help-center candidate is secondary and unverified, the
// scan simply moves on when a candidate 403s.
export default {
  id: 'poshmark',
  candidates: [
    'https://poshmark.com/faq',
    'https://poshmark.com/sell',
    'https://help.poshmark.com/hc/en-us',
    // Datacenter IPs get blocked by the live site; Wayback serves archived
    // copies of the SAME official pages. Date-labeled, Actions-collected.
    'https://web.archive.org/web/2026/https://poshmark.com/faq',
  ],
  // Recent faq snapshots are SPA shells (no fee text server-side). Two
  // content-type hopes: Zendesk help articles (server-rendered) archived
  // under help.poshmark.com, and older faq captures. Fee regime stable at
  // 20%/$2.95 since the 2024-10 revert → `from: 2025` keeps it safe.
  waybackTargets: [
    { prefix: 'help.poshmark.com/hc/en-us/', match: /fee|commission/i, limit: 5 },
    { url: 'https://poshmark.com/faq', from: '2025', limit: 3 },
  ],
  fields: [
    {
      key: 'final_value_percent',
      patterns: [
        /(\d{1,2})\s*%\s*commission/i,
        /commission[^.\n]{0,60}?(\d{1,2})\s*%/i,
      ],
    },
    {
      key: 'per_order_fixed',
      patterns: [
        /flat fee[^.\n]{0,40}?\$\s?(\d+\.\d{2})/i,
        /\$\s?(\d+\.\d{2})[^.\n]{0,40}?for (?:sales?|items?) under/i,
      ],
    },
    {
      key: 'payment_percent',
      zeroPatterns: [/no (?:additional )?payment processing fees?/i],
      patterns: [/payment processing fee[^.\n]{0,80}?(\d+(?:\.\d+)?)\s*%/i],
    },
    {
      key: 'payment_fixed',
      zeroPatterns: [/no (?:additional )?payment processing fees?/i],
      patterns: [/payment processing fee[^.\n]{0,80}?\$\s?(\d+\.\d{2})/i],
    },
    {
      key: 'listing_fee',
      zeroPatterns: [/no listing fees?/i, /free to (?:list|post)/i],
      patterns: [],
    },
  ],
};
