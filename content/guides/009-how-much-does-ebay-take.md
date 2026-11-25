---
page_type: qa
primary_keyword: how much does ebay take
secondary_keywords: [ebay cut per sale, what percent does ebay take from sales, how much does ebay charge]
config_deps: [rates.ebay.final_value_percent, rates.ebay.per_order_fixed, rates.ebay.per_order_fixed_under_10, rates.ebay.payment_percent, rates.ebay.payment_fixed]
batch: 2
---

# How Much Does eBay Take Per Sale?

Intro: Short answer: for most categories eBay takes `{{rates.ebay.final_value_percent}}% + ${{rates.ebay.per_order_fixed}}` as the final value fee, plus payment processing of `{{rates.ebay.payment_percent}}% + ${{rates.ebay.payment_fixed}}` — and the percentage applies to the sale total including shipping. The long answer, with a worked example, is below. *(渲染自 config；未核验时首句降级为"eBay takes a percentage plus two fixed add-ons — exact current rates render above")*

## The three lines, one by one
1. **Final value fee:** `{{rates.ebay.final_value_percent}}`% of the total amount of the sale. "Total amount" includes the shipping the buyer pays — the single most common source of fee surprises.
2. **Per-order fixed fee:** `${{rates.ebay.per_order_fixed}}` on most categories — `${{rates.ebay.per_order_fixed_under_10}}` if the order total is $10.00 or less, `${{rates.ebay.per_order_fixed}}` above that. Charged once per order.
3. **Payment processing:** `{{rates.ebay.payment_percent}}`% + `{{rates.ebay.payment_fixed}}`, charged on the same total.

## Six sale totals on current rates

Fees computed on the sale total (item plus shipping), per-order fee tiered at $10. Listing fees ({{rates.ebay.listing_fee}} per 30-day cycle) are not in the table — they bill per listing, not per sale.

| Sale total | eBay fees | You keep | Effective % |
| --- | --- | --- | --- |
| $8 | {{calc:fee:ebay:8}} | {{calc:keep:ebay:8}} | {{calc:pct:ebay:8}} |
| $15 | {{calc:fee:ebay:15}} | {{calc:keep:ebay:15}} | {{calc:pct:ebay:15}} |
| $25 | {{calc:fee:ebay:25}} | {{calc:keep:ebay:25}} | {{calc:pct:ebay:25}} |
| $50 | {{calc:fee:ebay:50}} | {{calc:keep:ebay:50}} | {{calc:pct:ebay:50}} |
| $100 | {{calc:fee:ebay:100}} | {{calc:keep:ebay:100}} | {{calc:pct:ebay:100}} |
| $200 | {{calc:fee:ebay:200}} | {{calc:keep:ebay:200}} | {{calc:pct:ebay:200}} |

## Worked example (example only)
On a $60 sale with $9 shipping: the fee base is $69. Apply the percentage, add the fixed fee, add processing. The calculator above does it live — but the point of the breakdown is that you can verify every line against your own eBay invoice, because eBay's fee breakdown on each order shows exactly these lines.

## What changes the number
- **Category:** most resale categories share one rate; vehicles, heavy equipment and a few others differ.
- **Store subscription:** store levels discount the final value fee percentage — worth it only above a certain monthly volume.
- **International sales:** additional fees can apply; this calculator covers domestic US sales.

## FAQ
**What percent does eBay take from sales?**
`{{rates.ebay.final_value_percent}}%` of the total sale amount on most categories, plus a per-order fixed fee (${{rates.ebay.per_order_fixed_under_10}} on orders of $10 or less, ${{rates.ebay.per_order_fixed}} above). Payment processing is bundled into the same percentage rather than billed separately.

**Does eBay take a cut of shipping?**
Yes — the final value fee percentage applies to the total including buyer-paid shipping.

**Why is my first eBay sale's fee different?**
New-seller promotions can hold or reduce final value fees for a limited time; after the promo ends, standard rates apply. Check your promotion's terms. *(以平台最新公告为准)*

**How much does eBay take from a $1,000 sale?**
On most categories the same formula applies — the calculator and the table above scale linearly, plus the flat per-order fee. Vehicles, heavy equipment and a few other categories have their own rate tables, so confirm the category before listing.

**Where do I see exactly what eBay charged?**
Seller Hub → Payments → per-order fee breakdown shows every line this page describes.

Internal links: eBay fee calculator (#2) · Poshmark vs eBay fees (#1) · Selling app fees comparison (#8)
