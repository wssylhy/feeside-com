---
page_type: compare
primary_keyword: ebay vs etsy fees
secondary_keywords: [where to sell vintage ebay or etsy, etsy vs ebay fees, which is cheaper ebay or etsy]
config_deps: [rates.ebay.final_value_percent, rates.ebay.per_order_fixed, rates.ebay.per_order_fixed_under_10, rates.ebay.listing_fee_free_per_month, rates.ebay.listing_fee, rates.etsy.listing_fee, rates.etsy.final_value_percent, rates.etsy.payment_percent, rates.etsy.payment_fixed]
batch: 9
title: eBay vs Etsy Fees: Which Is Cheaper for Sellers?
description: eBay takes {{rates.ebay.final_value_percent}}% of the sale total plus a per-order fee. Etsy takes {{rates.etsy.final_value_percent}}% plus payment processing and a listing fee. Side by side at four sale totals, with the category rules that decide where an item can be listed.
updated: 2026-11-26
---

# eBay vs Etsy Fees: Which Is Cheaper for Sellers?

Intro: eBay takes {{rates.ebay.final_value_percent}}% of the total amount of the sale, shipping included, plus {{rates.ebay.per_order_fixed}} per order ({{rates.ebay.per_order_fixed_under_10}} when the order is $10 or less). Etsy takes {{rates.etsy.final_value_percent}}% of the item price plus shipping and gift wrap, then {{rates.etsy.payment_percent}}% + {{rates.etsy.payment_fixed}} for payment processing, then {{rates.etsy.listing_fee}} to list the item. Etsy's fees come to less at every sale size in the table below, and still less after its listing fee is counted.

## The two fee structures

eBay charges one percentage and one flat fee. The percentage applies to the total amount of the sale, which includes the shipping the buyer pays. Payment processing is included. Your first {{rates.ebay.listing_fee_free_per_month}} listings each month are free to post, and after that each listing costs {{rates.ebay.listing_fee}}. Sneakers, handbags, watches and a few other categories carry their own percentages.

Etsy charges three lines. Listing an item costs {{rates.etsy.listing_fee}}, whether or not it sells. The transaction fee is {{rates.etsy.final_value_percent}}% of the item price plus shipping and gift wrap. Payment processing adds {{rates.etsy.payment_percent}}% + {{rates.etsy.payment_fixed}} on the same amount. A sale that arrives through Etsy's own advertising can also carry an Offsite Ads fee of 12% or 15%.

## Fees at four sale totals

| Sale total (shipping included) | eBay fee | eBay leaves you | Etsy fee | Etsy leaves you |
| --- | --- | --- | --- | --- |
| $9 | {{calc:fee:ebay:9}} | {{calc:keep:ebay:9}} | {{calc:fee:etsy:9}} | {{calc:keep:etsy:9}} |
| $20 | {{calc:fee:ebay:20}} | {{calc:keep:ebay:20}} | {{calc:fee:etsy:20}} | {{calc:keep:etsy:20}} |
| $48 | {{calc:fee:ebay:48}} | {{calc:keep:ebay:48}} | {{calc:fee:etsy:48}} | {{calc:keep:etsy:48}} |
| $150 | {{calc:fee:ebay:150}} | {{calc:keep:ebay:150}} | {{calc:fee:etsy:150}} | {{calc:keep:etsy:150}} |

Per-sale fees only. eBay's insertion fee does not apply inside its free allowance, and Etsy's {{rates.etsy.listing_fee}} listing fee is left out of this table.

## What Etsy's listing fee changes

Etsy's {{rates.etsy.listing_fee}} is paid on every listing, sold or unsold, and again each time an unsold listing renews after four months. It does not overturn the comparison. On any sale above about $4, Etsy's fee plus its listing fee is still lower than eBay's fee. Where it shows up is a shop with many slow listings: the fee keeps recurring while nothing sells.

## Which items can go where

Etsy accepts handmade items, vintage items that are 20 years or older, and craft supplies. eBay lists almost every category. That rule settles most of this comparison before fees do. A used phone or a current-season, factory-made garment can be listed on eBay and not on Etsy.

## FAQ

**Which platform charges more fees overall?**
eBay, at every sale size in the table. Its {{rates.ebay.final_value_percent}}% alone is higher than Etsy's {{rates.etsy.final_value_percent}}% and {{rates.etsy.payment_percent}}% combined.

**Do eBay and Etsy charge fees on shipping?**
Yes. eBay's percentage applies to the total amount of the sale, which includes the shipping the buyer pays. Etsy's {{rates.etsy.final_value_percent}}% transaction fee and its payment processing fee both apply to the item price plus shipping. If you offer free shipping on eBay, no fee is charged on shipping.

**Where should I sell vintage, eBay or Etsy?**
Both accept vintage once it is 20 years or older. Etsy's fees are lower. eBay's buyer base is broader and its search is set up for one-off items, so an item that few people are searching for may do better there.

**Is it free to list on eBay?**
Your first {{rates.ebay.listing_fee_free_per_month}} listings each month carry no insertion fee. After that each listing costs {{rates.ebay.listing_fee}}.

Internal links: eBay fee calculator (#2) · Etsy fee calculator (#7) · how much eBay takes (#9) · how much Etsy takes (#16) · eBay listing fees (#42) · Etsy listing fee (#45) · fees comparison table (#8) · sell handmade on Etsy or eBay (#46)
