---
page_type: qa
primary_keyword: how much does depop take
secondary_keywords: [depop fees for sellers, depop selling fees, depop extra fees]
config_deps: [rates.depop.final_value_percent, rates.depop.payment_percent, rates.depop.payment_fixed, rates.poshmark.final_value_percent, rates.poshmark.min_commission, rates.poshmark.commission_threshold_price]
batch: 6
---

# How Much Does Depop Take Per Sale?

Intro: In the US, Depop's selling commission is `{{rates.depop.final_value_percent}}%`. The line that actually shows up on your payout is payment processing: `{{rates.depop.payment_percent}}% + ${{rates.depop.payment_fixed}}`, calculated on the item price plus shipping. Those two lines, the fee base, and the one optional extra are the whole picture. *(渲染自 config；未核验字段自动降级)*

## The two lines on a US payout
- **Selling commission:** {{rates.depop.final_value_percent}}%. Depop's 10% selling fee applies only outside the US, UK, and Australia, so for US sellers this line is zero.
- **Payment processing:** {{rates.depop.payment_percent}}% + ${{rates.depop.payment_fixed}} through Depop Payments, applied to the item price plus shipping costs.

## What counts in the fee base
Processing is charged on the sale price plus shipping, not the item alone. A $40 jacket with $8 shipping puts $48 in the percentage base, then adds ${{rates.depop.payment_fixed}}: about $2.03 in processing on a $48 sale, leaving $45.97 before your own costs. The exact split for your price is what the calculator below is for.

## The optional extra to know about
Depop sells optional listing boosts, which carry an extra advertising fee. Our calculator deliberately leaves that line out: it is a marketing choice, not a selling cost, and skipping it changes nothing about your payout math.

## UK and Australia
This page and the calculator reflect US rates. Depop's official fee schedule prices the UK and Australia differently, so if you sell there, take your numbers from Depop's own fee page.

## FAQ
**How much does Depop take from sellers?**
{{rates.depop.final_value_percent}}% commission in the US, plus payment processing of {{rates.depop.payment_percent}}% + ${{rates.depop.payment_fixed}} on the item plus shipping.

**Why is my Depop payout less than the sale price?**
Payment processing. A percentage plus a fixed amount, on the item and shipping together, is the difference.

**Does Depop charge listing fees?**
No. Listing is free, and there is no per-sale charge beyond the processing line above.

**Is Depop cheaper than Poshmark?**
On fees, usually yes. Poshmark's {{rates.poshmark.final_value_percent}}% commission (flat ${{rates.poshmark.min_commission}} under ${{rates.poshmark.commission_threshold_price}}) is hard for Depop's processing line to lose to at typical prices. The side-by-side page runs both at your price.

Internal links: Depop fee calculator (#6) · how much Poshmark takes (#13) · Poshmark vs Depop fees (#30) · Depop vs Mercari fees (#18) · Vinted vs Depop fees (#12)
