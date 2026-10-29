---
page_type: qa
primary_keyword: how much does etsy take per sale
secondary_keywords: [etsy fees per sale]
config_deps: [rates.etsy.listing_fee, rates.etsy.final_value_percent, rates.etsy.payment_percent, rates.etsy.payment_fixed]
batch: 4
---

# How Much Does Etsy Take Per Sale?

Intro: Short answer: Etsy takes three automatic lines on most sales — a `{{rates.etsy.listing_fee}}` listing fee, a `{{rates.etsy.final_value_percent}}`% transaction fee (shipping included), and payment processing of `{{rates.etsy.payment_percent}}% + ${{rates.etsy.payment_fixed}}`. Offsite Ads can add a fourth line when an Etsy-placed ad produces the sale. The line-by-line breakdown follows. *(渲染自 config；未核验时首句降级为"three automatic lines plus an optional ad fee — exact rates render above")*

## The three automatic lines, one by one
1. **Listing fee:** `{{rates.etsy.listing_fee}}` per item, per four-month listing period — charged whether the item sells or not.
2. **Transaction fee:** `{{rates.etsy.final_value_percent}}`% of the item total including shipping — the same "shipping counts" rule that surprises eBay sellers.
3. **Payment processing:** `{{rates.etsy.payment_percent}}% + ${{rates.etsy.payment_fixed}}` on the order total.

## The optional fourth line
Offsite Ads: if the sale came from an ad Etsy placed off-site, an extra percentage applies, banded by your shop's annual revenue. That scenario has its own calculator (linked below) because the attribution rules matter as much as the rate.

## Worked example (example only)
A $32 order with $7 shipping: transaction and processing apply to $39, plus one listing fee. On a $12 order the listing fee is a visibly larger share — small sellers feel the per-listing line most.

## FAQ
**What are Etsy's fees per sale?**
Listing `{{rates.etsy.listing_fee}}` + transaction `{{rates.etsy.final_value_percent}}%` (incl. shipping) + processing `{{rates.etsy.payment_percent}}% + ${{rates.etsy.payment_fixed}}` — rendered from our verified config.

**Does Etsy charge for shipping in fees?**
Yes — the transaction fee applies to the total including buyer-paid shipping.

**Do I pay the listing fee if the item doesn't sell?**
Yes — the listing fee covers the four-month listing period regardless of outcome, and renews with each renewal you choose.

**Etsy vs eBay — who takes less?**
Depends on price; Etsy stacks more lines but both apply percentages to shipping. Run 11-ebay-vs-etsy-fees at your price point.

Internal links: Etsy fee calculator (007-etsy-fee-calculator) · Etsy Offsite Ads calculator (14-etsy-offsite-ads-calculator) · Marketplace fees comparison (008-fees-comparison-table)
