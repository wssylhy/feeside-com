---
page_type: qa
primary_keyword: how much does depop take
secondary_keywords: [depop fees for sellers, depop selling fees, depop extra fees, how much does depop take from a sale, depop fee]
config_deps: [rates.depop.final_value_percent, rates.depop.payment_percent, rates.depop.payment_fixed, rates.poshmark.final_value_percent, rates.poshmark.min_commission, rates.poshmark.commission_threshold_price]
batch: 9
title: How Much Does Depop Take Per Sale? US Seller Fees (2026)
description: US sellers pay no commission on Depop. The only fee is payment processing: {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} on the item price plus shipping. See the fee at five sale totals.
updated: 2026-11-26
---

# How Much Does Depop Take Per Sale?

Intro: In the US, Depop's selling commission is {{rates.depop.final_value_percent}}%. The line that shows up on the payout is payment processing: {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}}, calculated on the item price plus shipping. Those two lines, the fee base, and the one optional extra are the whole picture.

## The two lines on a US payout

- Selling commission: {{rates.depop.final_value_percent}}%. Depop's 10% selling fee applies only outside the US, the UK and Australia, so for US sellers this line is zero.
- Payment processing: {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} through Depop Payments, applied to the item price plus shipping.

Listing is free.

## Five sale totals on current rates

Fees on the sale total, item plus shipping, with no listing fee to add.

| Sale total | Depop fee | You keep | Effective % |
| --- | --- | --- | --- |
| $10 | {{calc:fee:depop:10}} | {{calc:keep:depop:10}} | {{calc:pct:depop:10}} |
| $25 | {{calc:fee:depop:25}} | {{calc:keep:depop:25}} | {{calc:pct:depop:25}} |
| $50 | {{calc:fee:depop:50}} | {{calc:keep:depop:50}} | {{calc:pct:depop:50}} |
| $100 | {{calc:fee:depop:100}} | {{calc:keep:depop:100}} | {{calc:pct:depop:100}} |
| $200 | {{calc:fee:depop:200}} | {{calc:keep:depop:200}} | {{calc:pct:depop:200}} |

## What counts in the fee base

Processing is charged on the sale price plus shipping, not the item alone. A $40 jacket with $8 shipping puts $48 in the percentage base, then adds {{rates.depop.payment_fixed}}. That is {{calc:fee:depop:40:8}} in processing on a $48 sale, leaving {{calc:keep:depop:40:8}} before you pay for the label. The exact split for your price is what the calculator on this page is for.

## The optional extra to know about

Depop sells optional listing boosts, which carry an extra advertising fee on sales they bring. The calculator leaves that line out: boosting is a marketing choice, and skipping it changes nothing about the fee math above.

## UK and Australia

This page and the calculator reflect US rates. Depop's official fee schedule sets different processing fees for the UK and Australia, so if you sell there, take your numbers from Depop's own fee page.

## FAQ

**How much does Depop take from sellers?**
{{rates.depop.final_value_percent}}% commission in the US, plus payment processing of {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} on the item plus shipping.

**Why is my Depop payout less than the sale price?**
Payment processing. A percentage plus a fixed amount, on the item and shipping together, is the difference.

**Does Depop charge listing fees?**
No. Listing is free, and there is no per-sale charge beyond the processing line.

**Does Depop charge fees on shipping?**
Yes. The payment processing fee applies to the item price plus the shipping the buyer pays.

**Is Depop cheaper than Poshmark?**
Yes. Depop's fee is lower than Poshmark's at every price in the tables on the side-by-side page, even though Poshmark's {{rates.poshmark.final_value_percent}}% commission ignores shipping.

Internal links: Depop fee calculator (#6) · how much Poshmark takes (#13) · Poshmark vs Depop fees (#30) · Depop vs Mercari fees (#18) · Vinted vs Depop fees (#12) · Depop Boosting cost (#39)
