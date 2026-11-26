---
page_type: compare
primary_keyword: etsy vs depop fees
secondary_keywords: [depop fees vs etsy, etsy or depop for selling, which is cheaper etsy or depop]
config_deps: [rates.etsy.final_value_percent, rates.etsy.payment_percent, rates.etsy.payment_fixed, rates.etsy.listing_fee, rates.depop.final_value_percent, rates.depop.payment_percent, rates.depop.payment_fixed]
batch: 9
title: Etsy vs Depop Fees: Which Leaves You More?
description: Etsy takes {{rates.etsy.final_value_percent}}% plus {{rates.etsy.payment_percent}}% and a listing fee. Depop takes no commission from US sellers and charges {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} for payment processing. Side by side at three sale totals.
updated: 2026-11-26
---

# Etsy vs Depop Fees: Which Leaves You More?

Intro: Etsy takes a {{rates.etsy.final_value_percent}}% transaction fee on the item price plus shipping, then {{rates.etsy.payment_percent}}% + {{rates.etsy.payment_fixed}} for payment processing, and charges {{rates.etsy.listing_fee}} to list each item. Depop charges US sellers no commission. Its only line is Depop Payments at {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}}. Both percentages apply to the item plus shipping, so the comparison is direct, and Depop's fee is lower at every sale size.

## The two fee structures

Etsy charges three lines: {{rates.etsy.listing_fee}} per listing, a {{rates.etsy.final_value_percent}}% transaction fee, and payment processing of {{rates.etsy.payment_percent}}% + {{rates.etsy.payment_fixed}}. The two percentages together come to well over what Depop charges on the same sale.

Depop charges one line: payment processing of {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} on the item plus shipping. Listing is free.

## Side by side at three sale totals

| Sale total (item plus shipping) | Etsy fee | Etsy leaves you | Depop fee | Depop leaves you |
| --- | --- | --- | --- | --- |
| $26 | {{calc:fee:etsy:26}} | {{calc:keep:etsy:26}} | {{calc:fee:depop:26}} | {{calc:keep:depop:26}} |
| $60 | {{calc:fee:etsy:60}} | {{calc:keep:etsy:60}} | {{calc:fee:depop:60}} | {{calc:keep:depop:60}} |
| $150 | {{calc:fee:etsy:150}} | {{calc:keep:etsy:150}} | {{calc:fee:depop:150}} | {{calc:keep:depop:150}} |

Etsy's {{rates.etsy.listing_fee}} listing fee comes on top of each Etsy figure.

The gap comes from the percentages. Etsy charges {{rates.etsy.final_value_percent}}% and then {{rates.etsy.payment_percent}}% on top. Depop charges {{rates.depop.payment_percent}}% once. The fixed fees are level: Etsy's {{rates.etsy.payment_fixed}} processing plus its {{rates.etsy.listing_fee}} listing fee equals Depop's {{rates.depop.payment_fixed}}.

## Where the same item can go on both

Vintage is the overlap. Anything 20 years or older counts as vintage on Etsy and sells as vintage on Depop, so a 1990s band shirt or a leather jacket from 2003 can be listed on either. There the fee says Depop: on a $60 sale Depop's fee is {{calc:gap:etsy_depop:60}} lower.

Modern streetwear and thrift fashion has no route onto Etsy. Handmade goods and craft supplies have their buyers on Etsy. The category rules settle most items before fees come into it.

## Etsy's listing fee on slow stock

Etsy's {{rates.etsy.listing_fee}} is charged again each time an unsold listing renews after four months. A quick sale makes it a small cost. A coat that sits through three renewals carries {{calc:listings:etsy:4}} of listing fees before it sells. Listing on Depop is free.

## FAQ

**Who charges less, Etsy or Depop?**
Depop, at every sale size. Its {{rates.depop.payment_percent}}% plus {{rates.depop.payment_fixed}} payment line stays below Etsy's two percentages and fixed fees at any price.

**Can I sell the same vintage item on both?**
Yes, if it is 20 years or older. Depop's fee is {{calc:gap:etsy_depop:60}} lower on a $60 sale. Which platform's buyer pays more for the item depends on the item.

**Does Depop take a percentage of shipping?**
Yes. The payment fee applies to the item price plus shipping, the same as Etsy's transaction fee and processing fee.

**Does Depop have any selling commission at all?**
Not for sellers in the US, the UK and Australia. The 10% commission applies only to sellers in other regions.

Internal links: Etsy fee calculator (#7) · Depop fee calculator (#6) · how much Etsy takes (#16) · how much Depop takes (#28) · Etsy listing fee (#45) · fees comparison table (#8)
