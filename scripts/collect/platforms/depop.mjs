// Depop — US selling fee was removed; a payment processing fee remains.
// If the fee ever comes back, the percent pattern picks it up instead of
// the zero-match.
export default {
  id: 'depop',
  candidates: [
    'https://www.depop.com/fees/',
    'https://help.depop.com/hc/en-us',
    // Wayback fallback: datacenter-blocked pages via archived official copy
    'https://web.archive.org/web/2026/https://www.depop.com/fees/',
  ],
  fields: [
    {
      key: 'final_value_percent',
      zeroPatterns: [
        /removed[^.\n]{0,80}?selling fees?/i,
        /no selling fees?/i,
      ],
      patterns: [/(\d{1,2}(?:\.\d+)?)\s*%\s*(?:selling|marketplace|service) fee/i],
    },
    {
      key: 'payment_percent',
      patterns: [
        /payment processing fee[^.\n]{0,40}?(\d+(?:\.\d+)?)\s*%/i,
        /(\d+(?:\.\d+)?)\s*%\s*(?:payment|processing) fee/i,
      ],
    },
    {
      key: 'payment_fixed',
      patterns: [
        /payment processing fee[^$]{0,60}?\$\s?(\d+\.\d{2})/i,
        /\$\s?(\d+\.\d{2})[^.\n]{0,20}?(?:payment|processing) fee/i,
      ],
    },
    {
      key: 'listing_fee',
      zeroPatterns: [/listing[^.\n]{0,30}?free/i, /free to (?:list|sell)/i, /no listing fees?/i],
      patterns: [],
    },
  ],
};
