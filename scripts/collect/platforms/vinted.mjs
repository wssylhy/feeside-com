// Vinted — historically zero seller fees (monetization is buyer-side
// Buyer Protection). The scan must distinguish seller fees from buyer fees:
// buyer-side numbers are deliberately NOT matched into any field here.
export default {
  id: 'vinted',
  candidates: [
    'https://www.vinted.com/help',
    'https://www.vinted.com/how-it-works',
    'https://www.vinted.com/terms',
  ],
  fields: [
    {
      key: 'final_value_percent',
      zeroPatterns: [
        /no selling fees?/i,
        /sell(?:ing)? (?:is )?free/i,
        /0%\s*(?:selling )?fee/i,
      ],
      patterns: [/(\d{1,2})\s*%\s*(?:selling|service) fee/i],
    },
    {
      key: 'payment_percent',
      zeroPatterns: [
        /sellers?[^.\n]{0,40}?pay no (?:payment )?(?:processing )?fees?/i,
      ],
      patterns: [],
    },
    {
      key: 'payment_fixed',
      zeroPatterns: [
        /sellers?[^.\n]{0,40}?pay no (?:payment )?(?:processing )?fees?/i,
      ],
      patterns: [],
    },
    {
      key: 'listing_fee',
      zeroPatterns: [/free to (?:list|sell)/i, /no listing fees?/i, /listing[^.\n]{0,30}?free/i],
      patterns: [],
    },
  ],
};
