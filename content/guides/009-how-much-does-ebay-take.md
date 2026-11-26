---
page_type: qa
primary_keyword: how much does ebay take
secondary_keywords: [ebay cut per sale, what percent does ebay take from sales, how much does ebay charge, how much does ebay take from a sale, ebay sale fees, how much will ebay take]
config_deps: [rates.ebay.final_value_percent, rates.ebay.per_order_fixed, rates.ebay.per_order_fixed_under_10, rates.ebay.listing_fee_free_per_month, rates.ebay.listing_fee]
batch: 9
title: How Much Does eBay Take Per Sale? (2026 Fee Breakdown)
description: eBay takes {{rates.ebay.final_value_percent}}% of the total amount of the sale plus {{rates.ebay.per_order_fixed}} per order, or {{rates.ebay.per_order_fixed_under_10}} on orders of $10 or less. See the fee at six sale totals and what changes it.
updated: 2026-11-26
---

# How Much Does eBay Take Per Sale?

Intro: Short answer: for most categories eBay takes {{rates.ebay.final_value_percent}}% of the total amount of the sale plus {{rates.ebay.per_order_fixed}} per order, or {{rates.ebay.per_order_fixed_under_10}} when the order is $10 or less. The percentage applies to the item price, the shipping the buyer pays and the sales tax eBay collects. Insertion fees apply only after your {{rates.ebay.listing_fee_free_per_month}} free listings each month.

## The fee, piece by piece

1. Final value fee: {{rates.ebay.final_value_percent}}% of the total amount of the sale. "Total amount" includes the shipping the buyer pays and the sales tax collected, which is the most common source of fee surprises.
2. Per-order fee: {{rates.ebay.per_order_fixed}} on each order, or {{rates.ebay.per_order_fixed_under_10}} when the order total is $10 or less. It is charged once per order, however many items are in it.
3. Payment processing: none charged separately. eBay's final value fee already includes it.
4. Insertion fee: {{rates.ebay.listing_fee}} per listing once you have used your {{rates.ebay.listing_fee_free_per_month}} free listings for the month.

## Six sale totals on current rates

Fees on the sale total (item plus shipping), with the per-order fee dropping to {{rates.ebay.per_order_fixed_under_10}} at $10 or less. Insertion fees are not in the table because they are charged per listing, not per sale.

| Sale total | eBay fees | You keep | Effective % |
| --- | --- | --- | --- |
| $8 | {{calc:fee:ebay:8}} | {{calc:keep:ebay:8}} | {{calc:pct:ebay:8}} |
| $15 | {{calc:fee:ebay:15}} | {{calc:keep:ebay:15}} | {{calc:pct:ebay:15}} |
| $25 | {{calc:fee:ebay:25}} | {{calc:keep:ebay:25}} | {{calc:pct:ebay:25}} |
| $50 | {{calc:fee:ebay:50}} | {{calc:keep:ebay:50}} | {{calc:pct:ebay:50}} |
| $100 | {{calc:fee:ebay:100}} | {{calc:keep:ebay:100}} | {{calc:pct:ebay:100}} |
| $200 | {{calc:fee:ebay:200}} | {{calc:keep:ebay:200}} | {{calc:pct:ebay:200}} |

## A worked example

A $60 item with $9 of shipping makes a $69 sale total. eBay takes {{calc:fee:ebay:60:9}} on that sale: {{rates.ebay.final_value_percent}}% of $69, plus the per-order fee. That leaves {{calc:net:ebay:60:9}} for the item, before the cost of the label. eBay's own fee examples show the same calculation, a percentage of the sale total plus the per-order fee.

## What changes the number

- Category: most categories share one rate. Sneakers, handbags, watches, trading cards, books, movies and music, and guitars carry different percentages. The full table is in the guide to eBay fees by category.
- Sale above $7,500: in most categories the portion over $7,500 is charged at 2.35% instead of {{rates.ebay.final_value_percent}}%.
- International sales: eBay charges a 1.65% international fee on some sales to buyers outside the US. This page covers domestic sales.
- Seller performance: a seller rated Below Standard pays an extra 6% on final value fees.
- Store subscription: eBay's fee page states that fees are different for Store subscribers.

## FAQ

**What percent does eBay take from sales?**
{{rates.ebay.final_value_percent}}% of the total amount of the sale in most categories, plus {{rates.ebay.per_order_fixed}} per order ({{rates.ebay.per_order_fixed_under_10}} on orders of $10 or less). The total includes shipping and sales tax.

**How much does eBay charge to sell?**
On a $50 sale, {{calc:fee:ebay:50}}. On a $100 sale, {{calc:fee:ebay:100}}. The table above covers six sale totals, and the calculator works out any other.

**Does eBay take a cut of shipping?**
Yes. The final value fee percentage applies to the total amount of the sale, which includes the shipping the buyer pays. With free shipping in your listing, no fee is charged on shipping.

**How much does eBay take from a $1,000 sale?**
In most categories the same rate applies up to $7,500 per item. A $1,000 sale costs {{calc:fee:ebay:1000}} and leaves {{calc:net:ebay:1000}}.

**Why is my eBay fee higher than the percentage suggests?**
The percentage is applied to shipping and sales tax as well as the item price, and the per-order fee is added on top. Sellers rated Below Standard pay an additional 6%.

**How many free listings do you get on eBay?**
Up to {{rates.ebay.listing_fee_free_per_month}} zero-insertion-fee listings a month. After that each listing costs {{rates.ebay.listing_fee}}.

Internal links: eBay fee calculator (#2) · eBay fees by category (#48) · eBay listing fees (#42) · Poshmark vs eBay fees (#1) · eBay vs Mercari fees (#29) · fees comparison table (#8)
