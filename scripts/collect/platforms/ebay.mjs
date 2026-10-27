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
      // Calibrated against the real page (Actions run 40604906872, 2026-10-27):
      // "final value fee ... %" free-form matching grabbed the Below-Standard
      // PENALTY ("additional 6% on the final value fees"), not the standard FVF.
      // The Most-categories row is the first "N% on total amount of the sale"
      // phrase on the page; tier 2 (2.35%) says "portion of the sale".
      key: 'final_value_percent',
      patterns: [
        /(\d{1,2}(?:\.\d+)?)\s*%\s*on total amount of the sale/i,
        /final value fee[s]?[^.%]{0,200}?(\d{1,2}(?:\.\d+)?)\s*%/i,
      ],
    },
    {
      // Headline tier is $0.40 ("orders over $10.00"); the $0.30 tier only
      // applies to orders ≤ $10, which are atypical for resellers.
      key: 'per_order_fixed',
      patterns: [
        /orders? over \$10(?:\.00)?[^.]{0,40}?per order fee is \$\s?(\d+\.\d{2})/i,
        /\$\s?(\d+\.\d{2})\s*(?:per order|for each order|for every order)/i,
        /per order[^.\n]{0,40}?\$\s?(\d+\.\d{2})/i,
      ],
    },
    {
      // eBay bundles payment processing into the final value fee ("you don't
      // have to worry about third-party payment processing fees") → zero-match
      // with note, not a guessed 0 and not a null.
      key: 'payment_percent',
      zeroPatterns: [/included in the final value fee/i, /third[- ]party payment processing/i],
      patterns: [/payment processing fee[^.\n]{0,80}?(\d+(?:\.\d+)?)\s*%/i],
    },
    {
      key: 'payment_fixed',
      zeroPatterns: [/included in the final value fee/i, /third[- ]party payment processing/i],
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
