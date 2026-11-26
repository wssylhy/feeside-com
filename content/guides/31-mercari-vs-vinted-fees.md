---
page_type: compare
primary_keyword: mercari vs vinted fees
secondary_keywords: [vinted vs mercari fees, mercari or vinted for selling, which is cheaper mercari or vinted]
config_deps: [rates.mercari.final_value_percent, rates.vinted.final_value_percent, rates.vinted.per_order_fixed, rates.vinted.listing_fee]
batch: 9
title: Mercari vs Vinted Fees: Which Leaves You More?
description: Mercari takes {{rates.mercari.final_value_percent}}% of the item price plus shipping. Vinted takes nothing from sellers on standard sales. Side by side at four prices, with the buyer paying shipping on both.
updated: 2026-11-26
---

# Mercari vs Vinted Fees: Which Leaves You More?

Intro: Mercari takes {{rates.mercari.final_value_percent}}% of the item price plus the shipping the buyer pays. Vinted takes nothing from sellers on standard sales, and charges the buyer a protection fee at checkout instead. On the same item, Vinted leaves you the whole price. Mercari leaves you the price minus {{rates.mercari.final_value_percent}}% of everything the buyer paid.

## The two fee structures

Mercari charges one line: {{rates.mercari.final_value_percent}}% of the item price plus shipping when a Mercari label is used. Listing is free, and there is no separate payment processing fee.

Vinted charges sellers no commission, no per-order fee and no listing fee on standard sales. The buyer pays Vinted a protection fee and the shipping cost at checkout.

## The same items on both platforms

| Item price | Shipping | Mercari fee | Mercari leaves you | Vinted leaves you |
| --- | --- | --- | --- | --- |
| $12 | $5 | {{calc:fee:mercari:12:5}} | {{calc:net:mercari:12:5}} | {{calc:net:vinted:12:5}} |
| $15 | $6 | {{calc:fee:mercari:15:6}} | {{calc:net:mercari:15:6}} | {{calc:net:vinted:15:6}} |
| $30 | $8 | {{calc:fee:mercari:30:8}} | {{calc:net:mercari:30:8}} | {{calc:net:vinted:30:8}} |
| $60 | $10 | {{calc:fee:mercari:60:10}} | {{calc:net:mercari:60:10}} | {{calc:net:vinted:60:10}} |

"Leaves you" is the item price minus the fee. On Mercari the shipping money arrives with the sale and goes out again to pay for the label. On Vinted the buyer pays Vinted for shipping directly.

## Why shipping matters on Mercari and not on Vinted

Mercari's percentage applies to the shipping money, so a dearer label means a higher fee. Vinted's fee is zero whatever the shipping. Choosing a cheaper label on Mercari lowers the fee by {{rates.mercari.final_value_percent}}% of what you save. On Vinted the label is between the buyer and Vinted.

## What the fees leave out

Vinted is a fashion marketplace. Mercari lists almost everything, from clothing to electronics and home goods. For a clothing item that Vinted's buyers are browsing for, the zero fee is hard to beat. For anything Vinted does not list, Mercari is the platform that sells it.

## FAQ

**Does Vinted charge sellers anything?**
No. Sellers pay no commission, no per-order fee and no listing fee on standard sales.

**Who pays fees on Vinted?**
The buyer. Vinted adds a protection fee and the shipping cost at checkout.

**Is Mercari's 10% charged on shipping too?**
Yes. The fee base is the item price plus the shipping the buyer pays, as Mercari's own fee page states.

**What does Mercari charge to sell?**
{{rates.mercari.final_value_percent}}% of the item price plus shipping. Listing is free, and there is no separate processing fee.

**Which platform should a casual seller pick?**
By fees, Vinted for any clothing it lists. For everything else, Mercari.

Internal links: Mercari fee calculator (#4) · Vinted fee calculator (#5) · how much Mercari takes (#17) · how much Vinted takes (#27) · who pays shipping on Mercari (#44) · fees comparison table (#8)
