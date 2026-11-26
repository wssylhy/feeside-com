---
page_type: compare
primary_keyword: poshmark vs depop fees
secondary_keywords: [depop vs poshmark fees, poshmark or depop for selling, which is cheaper poshmark or depop]
config_deps: [rates.poshmark.final_value_percent, rates.poshmark.min_commission, rates.poshmark.commission_threshold_price, rates.depop.final_value_percent, rates.depop.payment_percent, rates.depop.payment_fixed]
batch: 9
title: Poshmark vs Depop Fees: Which Leaves You More?
description: Poshmark takes {{rates.poshmark.final_value_percent}}% of the item price, or a flat {{rates.poshmark.min_commission}} under $15. Depop takes no commission from US sellers and charges {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} for payment processing. Side by side at four prices.
updated: 2026-11-26
---

# Poshmark vs Depop Fees: Which Leaves You More?

Intro: Poshmark takes {{rates.poshmark.final_value_percent}}% of the item price on sales of ${{rates.poshmark.commission_threshold_price}} and up, and a flat {{rates.poshmark.min_commission}} below that. Depop takes no commission from US sellers. Its one charge is payment processing: {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} on the item price plus shipping. Depop's fee is lower at every price in the tables below, on any ordinary shipping cost.

## The two fee structures

Poshmark charges one commission line, computed on the item price only. The buyer pays Poshmark for the shipping label, so shipping never enters the fee. Listing is free.

Depop charges sellers in the US no selling commission. Its one line is Depop Payments processing: {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}}, charged on the item price plus shipping. Listing is free here too.

## The same items on both platforms

| Item price | Shipping | Poshmark fee | Poshmark leaves you | Depop fee | Depop leaves you |
| --- | --- | --- | --- | --- | --- |
| $12 | $5 | {{calc:fee:poshmark:12:5}} | {{calc:net:poshmark:12:5}} | {{calc:fee:depop:12:5}} | {{calc:net:depop:12:5}} |
| $20 | $7 | {{calc:fee:poshmark:20:7}} | {{calc:net:poshmark:20:7}} | {{calc:fee:depop:20:7}} | {{calc:net:depop:20:7}} |
| $25 | $8 | {{calc:fee:poshmark:25:8}} | {{calc:net:poshmark:25:8}} | {{calc:fee:depop:25:8}} | {{calc:net:depop:25:8}} |
| $60 | $10 | {{calc:fee:poshmark:60:10}} | {{calc:net:poshmark:60:10}} | {{calc:fee:depop:60:10}} | {{calc:net:depop:60:10}} |

"Leaves you" is the item price minus the fee. On Depop the shipping money arrives with the sale and goes out again to pay for the label.

Poshmark's smaller fee base does not make up for its larger percentage. Its {{rates.poshmark.final_value_percent}}% of the item price is more than Depop's {{rates.depop.payment_percent}}% of the item and shipping together at every price in the table.

## Cheap items

Under ${{rates.poshmark.commission_threshold_price}} Poshmark charges its flat {{rates.poshmark.min_commission}} whatever the price. Depop's fee shrinks with the price.

| Item price (no shipping) | Poshmark fee | Poshmark leaves you | Depop fee | Depop leaves you |
| --- | --- | --- | --- | --- |
| $5 | {{calc:fee:poshmark:5}} | {{calc:net:poshmark:5}} | {{calc:fee:depop:5}} | {{calc:net:depop:5}} |
| $12 | {{calc:fee:poshmark:12}} | {{calc:net:poshmark:12}} | {{calc:fee:depop:12}} | {{calc:net:depop:12}} |
| $14.99 | {{calc:fee:poshmark:14.99}} | {{calc:net:poshmark:14.99}} | {{calc:fee:depop:14.99}} | {{calc:net:depop:14.99}} |

## Is there a case where Poshmark is cheaper?

Only with a shipping cost far above the item price, because Poshmark's commission ignores shipping and Depop's does not. On a $20 item the shipping would have to be about $88 before the two fees were level. That is not a realistic parcel, so in practice the answer is no.

## What the fees leave out

Both are fashion marketplaces. Depop is built like a social feed and leans toward streetwear and vintage. Poshmark is built around offers, bundles and a social feed of its own, and its buyer pays Poshmark a set price for the label. If one of them has the buyer who wants your item, that is worth more than the fee gap.

## FAQ

**Which is cheaper, Poshmark or Depop?**
Depop, at every price on this page. Poshmark's commission leaves shipping out, and it is still the higher fee.

**Does Poshmark charge commission on shipping?**
No. Poshmark's commission is on the item price only, and the buyer pays Poshmark for the label. Depop's processing fee does apply to shipping.

**What does Poshmark charge under $15?**
A flat {{rates.poshmark.min_commission}} in place of the {{rates.poshmark.final_value_percent}}%. On a $5 item that leaves {{calc:net:poshmark:5}}.

**Where should a $20 dress go?**
By fees, Depop. A $20 dress with $7 of shipping leaves {{calc:net:depop:20:7}} there against {{calc:net:poshmark:20:7}} on Poshmark. Whether Depop's buyers are looking for that dress is the other half of the question.

**Does Depop have any selling commission?**
Not for sellers in the US, the UK and Australia. The 10% selling fee applies to sellers elsewhere.

Internal links: Poshmark fee calculator (#3) · Depop fee calculator (#6) · how much Poshmark takes (#13) · how much Depop takes (#28) · Poshmark fee under $15 (#50) · fees comparison table (#8)
