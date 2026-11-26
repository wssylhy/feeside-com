---
page_type: compare
primary_keyword: ebay vs depop fees
secondary_keywords: [depop fees vs ebay, depop or ebay for selling, which is cheaper ebay or depop]
config_deps: [rates.ebay.final_value_percent, rates.ebay.per_order_fixed, rates.ebay.per_order_fixed_under_10, rates.ebay.listing_fee_free_per_month, rates.ebay.listing_fee, rates.depop.final_value_percent, rates.depop.payment_percent, rates.depop.payment_fixed, rates.depop.boosting_percent]
batch: 9
title: eBay vs Depop Fees: Which Leaves You More?
description: eBay takes {{rates.ebay.final_value_percent}}% of the sale total plus a per-order fee. Depop takes no commission from US sellers and charges {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} for payment processing. Side by side at five sale totals.
updated: 2026-11-26
---

# eBay vs Depop Fees: Which Leaves You More?

Intro: eBay takes {{rates.ebay.final_value_percent}}% of the sale total, item plus shipping, plus {{rates.ebay.per_order_fixed}} per order ({{rates.ebay.per_order_fixed_under_10}} when the order is $10 or less), plus an insertion fee once a seller has used the {{rates.ebay.listing_fee_free_per_month}} free listings a month. Depop charges US sellers nothing to list and no commission. Its only line is payment processing at {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} on the item plus shipping. Depop's fee is smaller at every sale size.

## The two fee structures

eBay's percentage applies to the whole sale total, so shipping raises the fee. Its per-order fee is fixed. Your first {{rates.ebay.listing_fee_free_per_month}} listings a month are free to post, and each listing after that costs {{rates.ebay.listing_fee}}.

Depop has one charge. Depop Payments takes {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} on the item plus shipping. Listing is free, and there is no selling commission for sellers in the US, the UK or Australia.

## Side by side at five sale totals

| Sale total (item plus shipping) | eBay fee | Depop fee | eBay costs more by |
| --- | --- | --- | --- |
| $9.50 | {{calc:fee:ebay:9.5}} | {{calc:fee:depop:9.5}} | {{calc:gap:ebay_depop:9.5}} |
| $20 | {{calc:fee:ebay:20}} | {{calc:fee:depop:20}} | {{calc:gap:ebay_depop:20}} |
| $40 | {{calc:fee:ebay:40}} | {{calc:fee:depop:40}} | {{calc:gap:ebay_depop:40}} |
| $100 | {{calc:fee:ebay:100}} | {{calc:fee:depop:100}} | {{calc:gap:ebay_depop:100}} |
| $150 | {{calc:fee:ebay:150}} | {{calc:fee:depop:150}} | {{calc:gap:ebay_depop:150}} |

## Cheap orders

eBay lowers its per-order fee to {{rates.ebay.per_order_fixed_under_10}} on orders of $10 or less. That narrows the gap without closing it. At $9.50 eBay still takes about twice what Depop takes.

## What the gap buys on each side

Depop's fee is small, and its audience is a specific one: streetwear, thrift and vintage fashion, browsed as a feed. eBay costs more and lists almost every category, with auctions, offers and a search that works for tools, electronics and collectibles as well as clothes.

Both platforms sell advertising on top of the standard fees. Depop's Boosting adds {{rates.depop.boosting_percent}}% on the sales it brings. A boosted Depop sale costs more in fees than the same sale on eBay: on a $40 sale, {{calc:boosted:depop:40}} against {{calc:fee:ebay:40}}. The table above assumes no boosting.

## FAQ

**Who charges less, eBay or Depop?**
Depop, at every sale size. eBay charges a percentage and a per-order fee, and adds an insertion fee beyond its free listings. Depop charges payment processing only.

**Does Depop really have no selling fee?**
For sellers in the US, the UK and Australia, yes. The 10% commission applies only to sellers elsewhere. US sellers pay the payment line and nothing else.

**Is eBay's small-order tier enough to catch up?**
No. At $9.50 the eBay fee is {{calc:fee:ebay:9.5}} against Depop's {{calc:fee:depop:9.5}}, with the lower per-order fee already applied.

**Where should vintage clothes go?**
Both accept them. By fees, Depop: {{calc:gap:ebay_depop:40}} less on a $40 sale. eBay is the platform to use when the piece is something buyers search for by name.

**Does Depop charge fees on shipping?**
Yes. Depop's payment fee applies to the item price plus shipping, the same as eBay's percentage.

Internal links: eBay fee calculator (#2) · Depop fee calculator (#6) · how much eBay takes (#9) · how much Depop takes (#28) · Depop Boosting cost (#39) · fees comparison table (#8)
