---
page_type: compare
primary_keyword: depop vs mercari fees
secondary_keywords: [depop or mercari for sneakers, mercari vs depop, which has lower fees]
config_deps: [rates.depop.final_value_percent, rates.depop.payment_percent, rates.depop.payment_fixed, rates.mercari.final_value_percent]
batch: 9
title: Depop vs Mercari Fees: Which Leaves You More?
description: Mercari takes {{rates.mercari.final_value_percent}}% of the item price plus shipping. Depop takes {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} for payment processing and no commission from US sellers. Side by side at four prices, plus the one case where Mercari is cheaper.
updated: 2026-11-26
---

# Depop vs Mercari Fees: Which Leaves You More?

Intro: Mercari takes {{rates.mercari.final_value_percent}}% of the item price plus the shipping the buyer pays. Depop takes {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} of the same amount, and no commission from US sellers. Depop's fee is lower on every sale above about $7, and the gap widens with the price. Mercari is cheaper only on very small sales, where Depop's fixed {{rates.depop.payment_fixed}} weighs more than Mercari's percentage.

## The two fee structures

Mercari charges one line: {{rates.mercari.final_value_percent}}% of the item price plus shipping when a Mercari label is used. Listing is free, and payment processing is part of that percentage rather than a separate fee.

Depop charges sellers in the US no selling commission. Its one line is Depop Payments processing: {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}}, charged on the item price plus shipping. Listing is free here too.

## The same items on both platforms

| Item price | Shipping | Depop fee | Depop leaves you | Mercari fee | Mercari leaves you |
| --- | --- | --- | --- | --- | --- |
| $14 | $6 | {{calc:fee:depop:14:6}} | {{calc:net:depop:14:6}} | {{calc:fee:mercari:14:6}} | {{calc:net:mercari:14:6}} |
| $50 | $7 | {{calc:fee:depop:50:7}} | {{calc:net:depop:50:7}} | {{calc:fee:mercari:50:7}} | {{calc:net:mercari:50:7}} |
| $90 | $10 | {{calc:fee:depop:90:10}} | {{calc:net:depop:90:10}} | {{calc:fee:mercari:90:10}} | {{calc:net:mercari:90:10}} |
| $200 | $12 | {{calc:fee:depop:200:12}} | {{calc:net:depop:200:12}} | {{calc:fee:mercari:200:12}} | {{calc:net:mercari:200:12}} |

"Leaves you" is the item price minus the fee, with the shipping money treated as passing through to pay for the label.

## Where Mercari is cheaper

Depop's fixed {{rates.depop.payment_fixed}} is a large share of a tiny sale. Around $7 the two fees cross.

| Sale total | Depop fee | Mercari fee | Lower fee |
| --- | --- | --- | --- |
| $4 | {{calc:fee:depop:4}} | {{calc:fee:mercari:4}} | Mercari |
| $6 | {{calc:fee:depop:6}} | {{calc:fee:mercari:6}} | Mercari |
| $7 | {{calc:fee:depop:7}} | {{calc:fee:mercari:7}} | Depop |
| $10 | {{calc:fee:depop:10}} | {{calc:fee:mercari:10}} | Depop |

## What the fees leave out

Depop is a fashion app with a feed built around streetwear and vintage. Mercari sells a much wider range, including electronics, home goods and collectibles. An item that fits Depop's audience may sell there at a better price. An item outside fashion has no real audience on Depop at all.

## FAQ

**Which has lower fees, Depop or Mercari?**
Depop on any sale above about $7. Mercari on smaller ones, because Depop's fixed {{rates.depop.payment_fixed}} costs more than {{rates.mercari.final_value_percent}}% of a very small amount.

**Depop or Mercari for sneakers?**
By fees, Depop. A $90 pair with $10 of shipping leaves {{calc:net:depop:90:10}} on Depop and {{calc:net:mercari:90:10}} on Mercari. Whether Depop's buyers pay the asking price is the other half of the question.

**Do both charge payment processing separately?**
Only Depop shows it as its own line. On Mercari, payment processing is part of the {{rates.mercari.final_value_percent}}% selling fee on listings created or updated since January 6, 2025.

**Does Depop charge a selling fee?**
Not for sellers in the US, the UK and Australia. The 10% selling fee applies to sellers elsewhere. A US seller pays payment processing only.

**Does Mercari charge listing fees?**
No. Listing on Mercari is free, and the {{rates.mercari.final_value_percent}}% selling fee is charged only when an item sells.

Internal links: Depop fee calculator (#6) · Mercari fee calculator (#4) · how much Depop takes (#28) · how much Mercari takes (#17) · Vinted vs Depop fees (#12) · Mercari vs Etsy fees (#35) · fees comparison table (#8)
