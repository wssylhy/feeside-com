// Poshmark — flat commission structure. poshmark.com hard-blocks datacenter
// traffic often; the help-center candidate is secondary and unverified, the
// scan simply moves on when a candidate 403s.
export default {
  id: 'poshmark',
  candidates: [
    'https://poshmark.com/faq',
    'https://poshmark.com/sell',
    'https://help.poshmark.com/hc/en-us',
  ],
  // 2026-11-09 evidence: 4 archived faq snapshots (2025-2026, raw id_ mode)
  // are ALL SPA shells with zero fee text — the faq page has been
  // client-rendered since before our `from` window. Content-type hope is the
  // Zendesk help center (server-rendered) under help.poshmark.com; CDX
  // prefix discovery finds archived fee/commission articles. Fee regime
  // stable at 20%/$2.95 since the 2024-10 revert → `from: 2025` is safe.
  waybackTargets: [
    { prefix: 'help.poshmark.com/hc/en-us/', match: /[Ff]ee|[Cc]ommission/, from: '2025', limit: 5 },
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
