// eBay — official fee sources, most authoritative first.
// Patterns match US-English wording on the textified page. When eBay
// rewords a sentence the scan reports the platform `blocked`/`partial` and
// the --debug HTML dump makes recalibration a one-PR fix.
export default {
  id: 'ebay',
  candidates: [
    'https://www.ebay.com/help/selling/fees-credits-invoices/selling-fees?id=4822',
    'https://www.ebay.com/help/selling/fees-credits-invoices/fees',
    'https://pages.ebay.com/selling/fees',
  ],
  fields: [
    {
      key: 'final_value_percent',
      patterns: [
        /final value fee[s]?[^.%]{0,200}?(\d{1,2}(?:\.\d+)?)\s*%/i,
        /(\d{1,2}(?:\.\d+)?)\s*%\s*on the portion of the sale/i,
      ],
    },
    {
      key: 'per_order_fixed',
      patterns: [
        /\$\s?(\d+\.\d{2})\s*(?:per order|for each order|for every order)/i,
        /per order[^.\n]{0,40}?\$\s?(\d+\.\d{2})/i,
      ],
    },
    {
      // eBay bundles payment processing into the final value fee; the page
      // wording usually says so explicitly → zero-match, not a guessed 0.
      key: 'payment_percent',
      zeroPatterns: [/included in the final value fee/i],
      patterns: [/payment processing fee[^.\n]{0,80}?(\d+(?:\.\d+)?)\s*%/i],
    },
    {
      key: 'payment_fixed',
      zeroPatterns: [/included in the final value fee/i],
      patterns: [/payment processing fee[^.\n]{0,80}?\$\s?(\d+\.\d{2})/i],
    },
    {
      key: 'listing_fee',
      patterns: [
        /insertion fee[^.\n]{0,60}?\$\s?(\d+\.\d{2})/i,
        /\$\s?(\d+\.\d{2})\s*(?:insertion fee|per listing)/i,
      ],
    },
  ],
};
