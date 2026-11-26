---
page_type: compare
primary_keyword: vinted vs depop fees
secondary_keywords: [is vinted or depop better, depop vs vinted, which has lower fees]
config_deps: [rates.vinted.final_value_percent, rates.vinted.listing_fee, rates.depop.final_value_percent, rates.depop.payment_percent, rates.depop.payment_fixed]
batch: 9
title: Vinted vs Depop Fees: What Each One Leaves You
description: Vinted charges sellers nothing on standard sales. Depop takes no commission from US sellers but charges {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} for payment processing. Side by side at three prices, plus where Depop's fee bites hardest.
updated: 2026-11-26
---

# Vinted vs Depop Fees: What Each One Leaves You

Intro: Vinted charges sellers no commission, no per-order fee and no listing fee on standard sales. Depop charges sellers in the US no commission either, but takes {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} for payment processing on the item price plus shipping. Vinted leaves you the full price every time. Depop's fee is small, and it takes its largest share of the price on cheap items.

## The two fee structures

Vinted takes nothing from the seller on a standard sale. The buyer pays Vinted a protection fee and the shipping cost at checkout. Optional boosts are the only seller-side cost.

Depop's selling fee is {{rates.depop.final_value_percent}}% for sellers in the US, the UK and Australia. The 10% selling fee applies to sellers elsewhere. The line a US seller does pay is Depop Payments processing: {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}}, charged on the item price plus shipping. Listing is free.

## The same items on both platforms

| Item price | Shipping | Vinted leaves you | Depop fee | Depop leaves you |
| --- | --- | --- | --- | --- |
| $12 | $5 | {{calc:net:vinted:12:5}} | {{calc:fee:depop:12:5}} | {{calc:net:depop:12:5}} |
| $35 | $6 | {{calc:net:vinted:35:6}} | {{calc:fee:depop:35:6}} | {{calc:net:depop:35:6}} |
| $80 | $8 | {{calc:net:vinted:80:8}} | {{calc:fee:depop:80:8}} | {{calc:net:depop:80:8}} |

"Leaves you" is the item price minus the fee. On Depop the shipping money arrives with the sale and goes out again to pay for the label. On Vinted the buyer pays Vinted for shipping directly, so it never passes through your payout.

## Cheap items

Depop's fixed {{rates.depop.payment_fixed}} does not shrink with the price, so it takes a large share of a small sale.

| Item price (no shipping) | Depop fee | Share of price | Depop leaves you |
| --- | --- | --- | --- |
| $3 | {{calc:fee:depop:3}} | {{calc:pct:depop:3}} | {{calc:net:depop:3}} |
| $5 | {{calc:fee:depop:5}} | {{calc:pct:depop:5}} | {{calc:net:depop:5}} |
| $12 | {{calc:fee:depop:12}} | {{calc:pct:depop:12}} | {{calc:net:depop:12}} |
| $40 | {{calc:fee:depop:40}} | {{calc:pct:depop:40}} | {{calc:net:depop:40}} |

## What the fees leave out

Both are fashion marketplaces with a style-driven audience. Depop leans toward streetwear and vintage and works like a social feed. Vinted covers everyday secondhand clothing across a wide price range. Fees decide the math half of the choice. Which app's buyers want your item decides the other half.

## FAQ

**Which has lower fees, Vinted or Depop?**
Vinted. It charges sellers nothing on standard sales. Depop takes {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} on every US sale.

**Is Vinted or Depop better for cheap items?**
On fees, Vinted at any price. Depop's fixed {{rates.depop.payment_fixed}} takes its largest share of the price on the cheapest items, as the table above shows.

**Does Depop charge a selling fee?**
Not for sellers in the US, the UK and Australia. The 10% selling fee applies to sellers elsewhere. A US seller pays payment processing only.

**Is Vinted really free for sellers?**
Yes, on standard sales. Sellers pay no commission and no listing fee. The buyer pays Vinted's protection fee.

**Does Depop charge fees on shipping?**
Yes. Depop's payment processing fee applies to the item price plus the shipping the buyer pays.

Internal links: Vinted fee calculator (#5) · Depop fee calculator (#6) · how much Vinted takes (#27) · how much Depop takes (#28) · Vinted buyer fees (#47) · Depop vs Mercari fees (#18) · fees comparison table (#8)
