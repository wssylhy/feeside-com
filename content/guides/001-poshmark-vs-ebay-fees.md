---
page_type: compare
primary_keyword: poshmark vs ebay fees
secondary_keywords: [is poshmark better than ebay, which is better ebay or poshmark, sell on ebay or poshmark, ebay vs poshmark for sellers]
config_deps: [rates.poshmark.final_value_percent, rates.poshmark.min_commission, rates.poshmark.commission_threshold_price, rates.ebay.final_value_percent, rates.ebay.per_order_fixed, rates.ebay.per_order_fixed_under_10, rates.ebay.listing_fee_free_per_month, rates.ebay.listing_fee]
batch: 9
title: Poshmark vs eBay Fees: Which Keeps You More?
description: Poshmark takes {{rates.poshmark.final_value_percent}}% of the item price, or a flat {{rates.poshmark.min_commission}} under $15. eBay takes {{rates.ebay.final_value_percent}}% of the sale total plus a per-order fee. Side by side at six prices, with and without shipping.
updated: 2026-11-26
---

# Poshmark vs eBay Fees: Which Keeps You More on the Same Sale?

Intro: Poshmark takes {{rates.poshmark.final_value_percent}}% of the item price, or a flat {{rates.poshmark.min_commission}} on sales under ${{rates.poshmark.commission_threshold_price}}. eBay takes {{rates.ebay.final_value_percent}}% of the sale total, shipping included, plus {{rates.ebay.per_order_fixed}} per order ({{rates.ebay.per_order_fixed_under_10}} when the order is $10 or less). With shipping left out, eBay's fee is the lower one at every price in the table below. Poshmark comes out ahead only when the shipping is large compared with the price, because Poshmark's commission ignores shipping and eBay's includes it.

## The two fee structures

Poshmark charges one line: {{rates.poshmark.final_value_percent}}% of the item price on sales of ${{rates.poshmark.commission_threshold_price}} or more, and a flat {{rates.poshmark.min_commission}} below that. Listing is free and there is no separate payment fee. The buyer pays Poshmark for the shipping label, so shipping never enters your payout.

eBay charges {{rates.ebay.final_value_percent}}% of the total amount of the sale, which includes the shipping the buyer pays, plus a per-order fee of {{rates.ebay.per_order_fixed}} ({{rates.ebay.per_order_fixed_under_10}} on orders of $10 or less). Your first {{rates.ebay.listing_fee_free_per_month}} listings each month carry no insertion fee; after that each listing costs {{rates.ebay.listing_fee}}.

## Fees with no shipping charged

| Item price | eBay fee | Poshmark fee | Lower fee |
| --- | --- | --- | --- |
| $10 | {{calc:fee:ebay:10}} | {{calc:fee:poshmark:10}} | eBay |
| $15 | {{calc:fee:ebay:15}} | {{calc:fee:poshmark:15}} | eBay |
| $25 | {{calc:fee:ebay:25}} | {{calc:fee:poshmark:25}} | eBay |
| $50 | {{calc:fee:ebay:50}} | {{calc:fee:poshmark:50}} | eBay |
| $100 | {{calc:fee:ebay:100}} | {{calc:fee:poshmark:100}} | eBay |
| $200 | {{calc:fee:ebay:200}} | {{calc:fee:poshmark:200}} | eBay |

eBay's fee is lower in every row. From ${{rates.poshmark.commission_threshold_price}} up, the gap grows with the price, because eBay's percentage is smaller on the whole sale and Poshmark's flat fee no longer applies.

## When the buyer pays shipping

This is where the comparison turns. eBay's percentage applies to the shipping money, so its fee rises with the label. Poshmark's fee stays where it was. The next table assumes the label costs what the buyer pays for shipping, so the last two columns show what is left for the item itself.

| Item price | Shipping | eBay fee | eBay leaves you | Poshmark fee | Poshmark leaves you |
| --- | --- | --- | --- | --- | --- |
| $15 | $8 | {{calc:fee:ebay:15:8}} | {{calc:net:ebay:15:8}} | {{calc:fee:poshmark:15:8}} | {{calc:net:poshmark:15:8}} |
| $20 | $8 | {{calc:fee:ebay:20:8}} | {{calc:net:ebay:20:8}} | {{calc:fee:poshmark:20:8}} | {{calc:net:poshmark:20:8}} |
| $25 | $8 | {{calc:fee:ebay:25:8}} | {{calc:net:ebay:25:8}} | {{calc:fee:poshmark:25:8}} | {{calc:net:poshmark:25:8}} |
| $30 | $8 | {{calc:fee:ebay:30:8}} | {{calc:net:ebay:30:8}} | {{calc:fee:poshmark:30:8}} | {{calc:net:poshmark:30:8}} |
| $50 | $8 | {{calc:fee:ebay:50:8}} | {{calc:net:ebay:50:8}} | {{calc:fee:poshmark:50:8}} | {{calc:net:poshmark:50:8}} |
| $100 | $8 | {{calc:fee:ebay:100:8}} | {{calc:net:ebay:100:8}} | {{calc:fee:poshmark:100:8}} | {{calc:net:poshmark:100:8}} |

With $8 of shipping the two platforms stay within about half a dollar of each other between $15 and $30. Poshmark leaves more at $15 and $20, and eBay leaves more from $25 up. Above that the gap opens in eBay's favor.

Raise the shipping to $15 and Poshmark is cheaper across the same range:

| Item price | Shipping | eBay fee | eBay leaves you | Poshmark fee | Poshmark leaves you |
| --- | --- | --- | --- | --- | --- |
| $15 | $15 | {{calc:fee:ebay:15:15}} | {{calc:net:ebay:15:15}} | {{calc:fee:poshmark:15:15}} | {{calc:net:poshmark:15:15}} |
| $20 | $15 | {{calc:fee:ebay:20:15}} | {{calc:net:ebay:20:15}} | {{calc:fee:poshmark:20:15}} | {{calc:net:poshmark:20:15}} |
| $30 | $15 | {{calc:fee:ebay:30:15}} | {{calc:net:ebay:30:15}} | {{calc:fee:poshmark:30:15}} | {{calc:net:poshmark:30:15}} |

A heavy item with a cheap price, such as a pair of boots, is the case where Poshmark's ignoring of shipping pays off. A light item with a high price, such as a scarf, is the case where eBay's lower percentage wins.

## Cheap items

Under ${{rates.poshmark.commission_threshold_price}} Poshmark's flat fee takes a large share of the price. eBay's fee is lower here as well, helped by its smaller per-order fee on orders of $10 or less.

| Item price | eBay fee | Poshmark fee |
| --- | --- | --- |
| $8 | {{calc:fee:ebay:8}} | {{calc:fee:poshmark:8}} |
| $12 | {{calc:fee:ebay:12}} | {{calc:fee:poshmark:12}} |
| $14.99 | {{calc:fee:ebay:14.99}} | {{calc:fee:poshmark:14.99}} |

## What the fees leave out

Fees settle only part of the choice. Poshmark is built around clothing and fashion, with offers and bundles as part of the normal flow. eBay lists almost every category and runs auctions as well as fixed-price listings. An item that sells quickly on one platform can sit on the other, and a sale that never happens earns nothing on either. Type your own price and shipping into the calculators on this page before you decide.

## FAQ

**Is Poshmark better than eBay?**
On fees, eBay is cheaper whenever the shipping is small next to the price. Poshmark is cheaper when the shipping is large next to the price. Beyond that, Poshmark is a fashion marketplace and eBay lists almost every category.

**Which is better for sellers, eBay or Poshmark?**
For a light, higher-priced item, eBay's {{rates.ebay.final_value_percent}}% leaves more than Poshmark's {{rates.poshmark.final_value_percent}}%. For a heavy, low-priced item, Poshmark's ignoring of shipping can leave more. The second table shows where the line falls.

**Should I sell on eBay or Poshmark?**
Start with the fee tables using your real shipping cost, then check which platform's buyers shop for what you have. Fees decide the math half. The buyer decides whether there is a sale to calculate.

**Does Poshmark take a cut of shipping?**
No. Poshmark's commission is calculated on the item price only, and the buyer pays Poshmark for the label.

**Does eBay charge fees on shipping?**
Yes. eBay's final value fee applies to the total amount of the sale, which includes the shipping the buyer pays.

**Is Poshmark really 20% on everything?**
No. Sales under ${{rates.poshmark.commission_threshold_price}} carry a flat {{rates.poshmark.min_commission}} fee instead of the percentage.

Internal links: Poshmark fee calculator (#3) · eBay fee calculator (#2) · how much Poshmark takes (#13) · how much eBay takes (#9) · Poshmark vs Mercari fees (#10) · eBay vs Mercari fees (#29) · fees comparison table (#8)
