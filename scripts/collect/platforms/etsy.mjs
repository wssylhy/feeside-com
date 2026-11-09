// Etsy — itemized fee stack: transaction fee, payment processing,
// listing fee. Offsite Ads is a separate regime and deliberately out of
// scope for the base calculator (specialist pages come later).
export default {
  id: 'etsy',
  candidates: [
    'https://www.etsy.com/legal/fees/',
    'https://help.etsy.com/hc/en-us',
  ],
  // 2026-10-24 snapshot of legal/fees carries transaction 6.5% + listing
  // $0.20 inline, but payment processing numbers moved to the Etsy Payments
  // Policy page (linked from legal/fees) — chase both, newest snapshots
  // first. Fee regime stable since 2022, so `from: 2025` is safe.
  waybackTargets: [
    { url: 'https://www.etsy.com/legal/fees/', from: '2025', limit: 2 },
    { url: 'https://www.etsy.com/legal/etsy-payments', from: '2025', limit: 2 },
    // US fee summary article (id evidenced in legal/fees page hrefs) —
    // Zendesk, server-rendered
    { url: 'https://help.etsy.com/hc/articles/115014483627', from: '2025', limit: 2, prefixMatch: true },
  ],
  fields: [
    {
      key: 'final_value_percent',
      patterns: [
        /transaction fee[^.\n]{0,60}?(\d+(?:\.\d+)?)\s*%/i,
        /(\d+(?:\.\d+)?)\s*%\s*(?:of the )?item price/i,
      ],
    },
    {
      // Processing rates live in the Etsy Payments Policy country table
      // ("United States 3% + 0.25 USD" — 2026-11-02 snapshot verified).
      key: 'payment_percent',
      patterns: [
        /United States\s+(\d+(?:\.\d+)?)\s*%\s*\+\s*\d[\d,]*(?:\.\d+)?\s*USD/i,
        /payment processing[^.\n]{0,100}?(\d+(?:\.\d+)?)\s*%/i,
      ],
    },
    {
      key: 'payment_fixed',
      patterns: [
        /United States\s+\d+(?:\.\d+)?\s*%\s*\+\s*(\d[\d,]*(?:\.\d+)?)\s*USD/i,
        /payment processing[^$]{0,100}?\$\s?(\d+\.\d{2})/i,
      ],
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
