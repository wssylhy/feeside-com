---
page_type: compare
primary_keyword: ebay vs etsy fees
secondary_keywords: [where to sell vintage ebay or etsy]
config_deps: [rates.ebay.final_value_percent, rates.ebay.per_order_fixed, rates.ebay.payment_percent, rates.ebay.payment_fixed, rates.etsy.listing_fee, rates.etsy.final_value_percent, rates.etsy.payment_percent, rates.etsy.payment_fixed]
batch: 3
---

# eBay vs Etsy Fees: Which Costs Less on the Same Sale?

Intro: eBay and Etsy both take a percentage of your sale plus add-on lines — but the number of lines, and what the percentage applies to, differs enough to change your payout. eBay stacks a final value fee of `{{rates.ebay.final_value_percent}}`% (including shipping) with a per-order fixed fee and payment processing; Etsy adds a `{{rates.etsy.listing_fee}}` listing fee on top of its `{{rates.etsy.final_value_percent}}`% transaction fee and payment processing. Run the same price through both calculators below for the exact difference. *(交互区由组件渲染)*

## How the eBay side works
One percentage line — `{{rates.ebay.final_value_percent}}`% of the total amount of the sale, shipping included — plus a per-order fixed fee of `{{rates.ebay.per_order_fixed}}` and payment processing of `{{rates.ebay.payment_percent}}% + ${{rates.ebay.payment_fixed}}`. No listing fee for casual sellers using free listings.

## How the Etsy side works
Three automatic lines: `{{rates.etsy.listing_fee}}` per listing (renews every four months), `{{rates.etsy.final_value_percent}}`% transaction fee on the item total including shipping, and payment processing of `{{rates.etsy.payment_percent}}% + ${{rates.etsy.payment_fixed}}`. Offsite Ads can add a further percentage when an Etsy-placed ad converts — that scenario has its own calculator.

## Worked example (example only)
A $40 vintage item with $8 shipping on both platforms: eBay's fee base is $48 with two add-on lines; Etsy's base is $48 with three lines (listing fee counted once). The calculators print each line and the net payout — the comparison is exact, not approximate.

## Which one fits your shop
- **Vintage and collectibles with broad appeal:** eBay's larger general marketplace reach often offsets its fee stack.
- **Curated, handmade, or craft-adjacent vintage:** Etsy's buyer intent supports higher price realization — fees are only half the equation.
- **Very low-priced items:** Etsy's listing fee takes a visible share at $10; compare at your real price point.

## FAQ
**Where to sell vintage — eBay or Etsy?**
Both work; the fee difference at your price point is checkable on this page, and the audience difference matters as much: eBay for breadth, Etsy for curated intent.

**Which platform charges more fees overall?**
Etsy usually stacks more lines (listing + transaction + processing) than eBay (final value + fixed + processing), but the totals depend on your price — run both calculators.

**Does either platform charge fees on shipping?**
Yes — both apply their percentage to the sale total including buyer-paid shipping.

Internal links: eBay fee calculator (002-ebay-fee-calculator) · Etsy fee calculator (007-etsy-fee-calculator) · How much does eBay take (009-how-much-does-ebay-take) · Marketplace fees comparison (008-fees-comparison-table)
