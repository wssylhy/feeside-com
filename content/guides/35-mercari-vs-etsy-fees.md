---
page_type: compare
primary_keyword: mercari vs etsy fees
secondary_keywords: [etsy fees vs mercari, mercari or etsy for selling]
config_deps: [rates.mercari.final_value_percent, rates.etsy.final_value_percent, rates.etsy.payment_percent, rates.etsy.payment_fixed, rates.etsy.listing_fee]
batch: 7
title: Mercari vs Etsy Fees: Which Is Cheaper for Sellers?
description: Mercari takes a flat {{rates.mercari.final_value_percent}}% of the sale total. Etsy takes {{rates.etsy.final_value_percent}}% plus payment processing and a listing fee. The two cross at a $50 sale total. See which is cheaper at your price.
updated: 2026-11-26
---

# Mercari vs Etsy Fees: The Flat 10% Against the 9.5% Stack

Intro: Mercari charges {{rates.mercari.final_value_percent}}% of the sale total (item plus buyer-paid shipping) and nothing else on standard listings. Etsy charges {{rates.etsy.final_value_percent}}% transaction on the same base, plus {{rates.etsy.payment_percent}}% and ${{rates.etsy.payment_fixed}} for payment processing, plus ${{rates.etsy.listing_fee}} to list each item for four months. The stacks cross at a $50 sale total: below it Mercari takes less, above it Etsy does. *(渲染自 config；派生数按 verified 费率复算)*

## The crossover, in numbers

Etsy's percentage lines sum to 9.5%, a full point under Mercari's 10%. The ${{rates.etsy.payment_fixed}} processing fixed fee is what Etsy has to amortize before it wins:
- $20 total: Mercari $2.00, you keep $18.00; Etsy $2.15, you keep $17.85.
- $44 total ($36 item, $8 shipping): Mercari $4.40, you keep $39.60; Etsy $4.43, you keep $39.57. A wash.
- $120 total: Mercari $12.00, you keep $108.00; Etsy $11.65, you keep $108.35.

At ${{rates.etsy.payment_fixed}} against half a percent, the break-even is a $50 sale total. Cheaper items favor Mercari; pricier ones flip to Etsy.

## The listing fee is the slow-item tax

Etsy's ${{rates.etsy.listing_fee}} buys four months or until sale, and renews at the same amount if nothing moved. One listing on a quick sale is noise. A shop with sixty slow listings renews for $12 every cycle before a single new sale happens. Mercari listings are free indefinitely, so sitting inventory costs nothing.

## What each platform is actually for

These two sell different things. Mercari takes anything secondhand; Etsy requires handmade, vintage (20 years or older), or craft supplies, and its buyers arrive looking for exactly those. If your item qualifies for Etsy and sits above $50, the fee math and the audience both point there. If it is a generic used item, Etsy cannot have it and the comparison ends at Mercari's 10%.

## FAQ

**Which platform takes less, Mercari or Etsy?**
Below a $50 sale total, Mercari. Above it, Etsy's 9.5% plus fixed processing undercuts the flat 10%, before counting Etsy's listing fee.

**Does Etsy charge the listing fee even when the item sells?**
The ${{rates.etsy.listing_fee}} covers one listing for four months or until it sells, whichever comes first. Renewals and manual relists cost another ${{rates.etsy.listing_fee}}.

**Does Mercari charge a separate payment fee?**
No separate line since January 2025. The {{rates.mercari.final_value_percent}}% covers processing on standard listings.

**Is shipping included in both percentage bases?**
Yes. Both apply the percentage to item price plus the shipping the buyer pays.

Internal links: Mercari fee calculator (#4) · Etsy fee calculator (#7) · how much Mercari takes (#17) · how much Etsy takes (#16) · fees comparison table (#8)
