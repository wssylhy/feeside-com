---
page_type: compare
primary_keyword: ebay vs mercari fees
secondary_keywords: [mercari fees vs ebay, mercari or ebay for selling, ebay or mercari, which is cheaper ebay or mercari]
config_deps: [rates.ebay.final_value_percent, rates.ebay.per_order_fixed, rates.ebay.per_order_fixed_under_10, rates.ebay.listing_fee_free_per_month, rates.ebay.listing_fee, rates.mercari.final_value_percent]
batch: 9
title: eBay vs Mercari Fees: Which Is Cheaper for Sellers?
description: Mercari takes {{rates.mercari.final_value_percent}}% of the item price plus shipping and nothing else. eBay takes {{rates.ebay.final_value_percent}}% of the same total plus a per-order fee. Side by side at six sale totals.
updated: 2026-11-26
---

# eBay vs Mercari Fees: Which Is Cheaper for Sellers?

Intro: Mercari takes {{rates.mercari.final_value_percent}}% of the item price plus the shipping the buyer pays, and nothing else. eBay takes {{rates.ebay.final_value_percent}}% of the same total, plus {{rates.ebay.per_order_fixed}} per order ({{rates.ebay.per_order_fixed_under_10}} when the order is $10 or less), plus an insertion fee once a seller has used the {{rates.ebay.listing_fee_free_per_month}} free listings each month. Mercari's fee is lower at every sale size. The gap is smallest on tiny orders, where eBay's per-order fee drops to {{rates.ebay.per_order_fixed_under_10}}.

## The two fee structures

Mercari charges one line: {{rates.mercari.final_value_percent}}% of the item price plus shipping when a Mercari label is used. Listing is free, and there is no separate payment processing fee.

eBay charges {{rates.ebay.final_value_percent}}% of the total amount of the sale, which includes the shipping the buyer pays, plus a per-order fee of {{rates.ebay.per_order_fixed}} ({{rates.ebay.per_order_fixed_under_10}} on orders of $10 or less). Your first {{rates.ebay.listing_fee_free_per_month}} listings each month are free to post. After that each listing costs {{rates.ebay.listing_fee}}.

## Side by side at six sale totals

| Sale total (item plus shipping) | eBay fee | Mercari fee | eBay costs more by |
| --- | --- | --- | --- |
| $9 | {{calc:fee:ebay:9}} | {{calc:fee:mercari:9}} | {{calc:gap:ebay_mercari:9}} |
| $12 | {{calc:fee:ebay:12}} | {{calc:fee:mercari:12}} | {{calc:gap:ebay_mercari:12}} |
| $20 | {{calc:fee:ebay:20}} | {{calc:fee:mercari:20}} | {{calc:gap:ebay_mercari:20}} |
| $31 | {{calc:fee:ebay:31}} | {{calc:fee:mercari:31}} | {{calc:gap:ebay_mercari:31}} |
| $69 | {{calc:fee:ebay:69}} | {{calc:fee:mercari:69}} | {{calc:gap:ebay_mercari:69}} |
| $150 | {{calc:fee:ebay:150}} | {{calc:fee:mercari:150}} | {{calc:gap:ebay_mercari:150}} |

Mercari's fee is lower in every row, and the gap grows with the sale total.

## Cheap orders

eBay lowers its per-order fee to {{rates.ebay.per_order_fixed_under_10}} on orders of $10 or less, which brings the two fees closest. At a $9 sale total the difference is {{calc:gap:ebay_mercari:9}}. At one cent over $10 the per-order fee steps back up to {{rates.ebay.per_order_fixed}}.

## What the difference in fee buys

Mercari's single percentage makes the payout easy to predict. eBay runs auctions as well as fixed-price listings, takes offers, and lists almost every category. For a seller who posts more than {{rates.ebay.listing_fee_free_per_month}} listings a month, eBay's insertion fee of {{rates.ebay.listing_fee}} per listing adds to the gap before anything sells.

## FAQ

**Who charges more, eBay or Mercari?**
eBay, at every sale size. Its {{rates.ebay.final_value_percent}}% is above Mercari's {{rates.mercari.final_value_percent}}% before the per-order fee is added.

**Does Mercari charge payment processing fees?**
Not as a separate line. The {{rates.mercari.final_value_percent}}% selling fee covers processing on listings created or updated since January 6, 2025.

**Is eBay's fixed fee lower on cheap items?**
Yes. Orders of $10 or less carry the {{rates.ebay.per_order_fixed_under_10}} per-order fee instead of {{rates.ebay.per_order_fixed}}.

**Which has lower listing fees?**
Mercari, where listing is always free. On eBay the first {{rates.ebay.listing_fee_free_per_month}} listings a month are free and each one after that costs {{rates.ebay.listing_fee}}.

**eBay or Mercari for selling?**
By fees, Mercari. eBay earns its higher fee on items that need its wider reach or an auction format to find a buyer.

Internal links: eBay fee calculator (#2) · Mercari fee calculator (#4) · how much eBay takes (#9) · how much Mercari takes (#17) · fees comparison table (#8) · where to sell cheap items (#25)
