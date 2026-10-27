// Mercari US — single selling fee; payment processing moved to the buyer
// side in 2024, so a "sellers don't pay" wording is expected and recorded
// as a zero-match rather than left null (the human [核] gate still reviews).
export default {
  id: 'mercari',
  candidates: [
    'https://www.mercari.com/us/help_center/',
    'https://www.mercari.com/us/',
  ],
  fields: [
    {
      key: 'final_value_percent',
      patterns: [
        /(\d{1,2}(?:\.\d+)?)\s*%\s*(?:selling|service) fee/i,
        /(?:selling|service) fee[^.\n]{0,60}?(\d{1,2}(?:\.\d+)?)\s*%/i,
      ],
    },
    {
      key: 'payment_percent',
      zeroPatterns: [
        /sellers?[^.\n]{0,60}?(?:do not|don['’]t)[^.\n]{0,80}?fee/i,
        /no (?:seller )?(?:payment|processing) fee/i,
      ],
      patterns: [/(\d+(?:\.\d+)?)\s*%\s*(?:payment|processing) fee/i],
    },
    {
      key: 'payment_fixed',
      zeroPatterns: [
        /sellers?[^.\n]{0,60}?(?:do not|don['’]t)[^.\n]{0,80}?fee/i,
        /no (?:seller )?(?:payment|processing) fee/i,
      ],
      patterns: [/(?:payment|processing) fee[^.\n]{0,60}?\$\s?(\d+\.\d{2})/i],
    },
    {
      key: 'listing_fee',
      zeroPatterns: [/free to (?:list|create)/i, /no listing fees?/i],
      patterns: [],
    },
  ],
};
