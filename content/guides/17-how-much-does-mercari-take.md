---
page_type: qa
primary_keyword: how much does mercari take
secondary_keywords: [mercari fees per sale]
config_deps: [rates.mercari.final_value_percent, rates.mercari.payment_percent, rates.mercari.payment_fixed]
batch: 4
---

# How Much Does Mercari Take Per Sale?

Intro: Short answer: Mercari takes two stacked lines — a selling fee of `{{rates.mercari.final_value_percent}}%` and payment processing of `{{rates.mercari.payment_percent}}% + ${{rates.mercari.payment_fixed}}` — and both apply to the buyer's total, including shipping when a Mercari label is used. The combined effective rate is what your payout actually feels. *(渲染自 config；未核验时首句降级为"two stacked percentage lines plus a small fixed processing fee — exact rates render above")*

## The two lines, one by one
1. **Selling fee:** `{{rates.mercari.final_value_percent}}%` of the total the buyer pays.
2. **Payment processing:** `{{rates.mercari.payment_percent}}% + ${{rates.mercari.payment_fixed}}` per order.

The reason payouts feel smaller than expected: the two percentages stack, and the fee base includes shipping under the Mercari label flow. Neither line is huge alone; together they are the real "Mercari cut."

## Worked example (example only)
A $55 order with $9 shipping on a Mercari label: both lines apply to $64. The calculator prints each line, the combined effective percentage, and the net that arrives in your balance — the three numbers to check against the order breakdown in the app.

## What moves the number
- **Label choice:** a Mercari label puts shipping inside the fee base; shipping on your own changes that base — and your risk. *(以平台最新公告为准)*
- **Price band:** the fixed processing component weighs most on small sales.
- **Promotions:** Mercari occasionally runs fee promos; when active, they change the effective line, not the structure.

## FAQ
**What percentage does Mercari take?**
Selling fee `{{rates.mercari.final_value_percent}}%` plus processing `{{rates.mercari.payment_percent}}% + ${{rates.mercari.payment_fixed}}` — rendered from our verified config above.

**Why is my payout lower than price minus the selling fee?**
The second line — payment processing — plus shipping inside the fee base are the usual causes.

**Does Mercari charge a listing fee?**
No listing fee — Mercari's lines are the two above; listing is free.

Internal links: Mercari fee calculator (004-mercari-fee-calculator) · Poshmark vs Mercari fees (010-poshmark-vs-mercari-fees) · Depop vs Mercari fees (18-depop-vs-mercari-fees)
