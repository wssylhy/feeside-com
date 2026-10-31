// Synthetic fee-page fixtures for offline testing of the collectors.
// These are HAND-WRITTEN test inputs shaped like the official pages' wording
// — they are not scraped copies, and their numbers exist only here (as test
// expectations). Config values come exclusively from Actions scans + human
// [核] review, never from this file.
//
// expected: the exact values scanFields must extract (null = must stay null).

export const FIXTURES = {
  ebay: {
    html: `<html><body>
      <h2>Final value fees</h2>
      <p>Most sellers pay a final value fee of 13.6% on the portion of the sale up to the threshold.</p>
      <p>This fee is calculated as a percentage of the total amount of the sale, plus a per order fee. For orders $10.00 or less the per order fee is $0.30, for orders over $10.00 the per order fee is $0.40.</p>
      <p>Payment processing is included in the final value fee, so there is no separate charge.</p>
      <h2>Listing fees</h2>
      <p>After 250 free listings, an insertion fee of $0.35 applies per listing.</p>
    </body></html>`,
    expected: {
      final_value_percent: 13.6,
      per_order_fixed: 0.4,
      per_order_fixed_under_10: 0.3,
      payment_percent: 0,
      payment_fixed: 0,
      listing_fee: 0.35,
    },
  },
  poshmark: {
    html: `<html><body>
      <h2>Poshmark fees</h2>
      <p>Poshmark takes a 20% commission for sales of $15 or more.</p>
      <p>For sales under $15, Poshmark charges a flat fee of $2.95.</p>
      <p>There are no listing fees to sell on Poshmark.</p>
    </body></html>`,
    expected: {
      final_value_percent: 20,
      per_order_fixed: 2.95,
      payment_percent: null,
      payment_fixed: null,
      listing_fee: 0,
    },
  },
  mercari: {
    html: `<html><body>
      <h2>Selling fees</h2>
      <p>Mercari charges a flat 10% selling fee on the item price plus shipping.</p>
      <p>Sellers do not pay a payment processing fee on Mercari.</p>
      <p>It is free to list on Mercari.</p>
    </body></html>`,
    expected: {
      final_value_percent: 10,
      payment_percent: 0,
      payment_fixed: 0,
      listing_fee: 0,
    },
  },
  vinted: {
    html: `<html><body>
      <h2>Selling on Vinted</h2>
      <p>There are no selling fees for sellers on Vinted.</p>
      <p>Sellers pay no payment processing fees on Vinted.</p>
      <p>Listing an item is free on Vinted.</p>
    </body></html>`,
    expected: {
      final_value_percent: 0,
      payment_percent: 0,
      payment_fixed: 0,
      listing_fee: 0,
    },
  },
  depop: {
    html: `<html><body>
      <h2>Fees</h2>
      <p>Depop has removed selling fees for all sellers in the US.</p>
      <p>A payment processing fee of 3.3% plus $0.45 applies to every sale.</p>
      <p>Listing on Depop is always free.</p>
    </body></html>`,
    expected: {
      final_value_percent: 0,
      payment_percent: 3.3,
      payment_fixed: 0.45,
      listing_fee: 0,
    },
  },
  etsy: {
    html: `<html><body>
      <h2>Etsy fees</h2>
      <p>The transaction fee is 6.5% of the item price.</p>
      <p>The payment processing fee is 3% plus $0.25 per order.</p>
      <p>There is a $0.20 listing fee for each item you publish.</p>
    </body></html>`,
    expected: {
      final_value_percent: 6.5,
      payment_percent: 3,
      payment_fixed: 0.25,
      listing_fee: 0.2,
    },
  },
};
