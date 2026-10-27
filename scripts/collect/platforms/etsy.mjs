// Etsy — itemized fee stack: transaction fee, payment processing,
// listing fee. Offsite Ads is a separate regime and deliberately out of
// scope for the base calculator (specialist pages come later).
export default {
  id: 'etsy',
  candidates: ['https://www.etsy.com/legal/fees/', 'https://help.etsy.com/hc/en-us'],
  fields: [
    {
      key: 'final_value_percent',
      patterns: [
        /transaction fee[^.\n]{0,60}?(\d+(?:\.\d+)?)\s*%/i,
        /(\d+(?:\.\d+)?)\s*%\s*(?:of the )?item price/i,
      ],
    },
    {
      key: 'payment_percent',
      patterns: [/payment processing[^.\n]{0,100}?(\d+(?:\.\d+)?)\s*%/i],
    },
    {
      key: 'payment_fixed',
      patterns: [/payment processing[^$]{0,100}?\$\s?(\d+\.\d{2})/i],
    },
    {
      key: 'listing_fee',
      patterns: [
        /\$\s?(\d+\.\d{2})[^.\n]{0,40}?(?:listing fee|to publish)/i,
        /listing fee[^.\n]{0,40}?\$\s?(\d+\.\d{2})/i,
      ],
    },
  ],
};
