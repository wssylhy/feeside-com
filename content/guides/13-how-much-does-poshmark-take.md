---
page_type: qa
primary_keyword: how much does poshmark take
secondary_keywords: [poshmark commission, poshmark seller fees, poshmark selling fees]
config_deps: [rates.poshmark.final_value_percent, rates.poshmark.min_commission, rates.poshmark.commission_threshold_price]
batch: 3
title: How Much Does Poshmark Take Per Sale? (2026 Fee Breakdown)
description: Poshmark takes {{rates.poshmark.final_value_percent}}% of the item price on sales of ${{rates.poshmark.commission_threshold_price}} or more, and a flat {{rates.poshmark.min_commission}} under that. No processing fee, no listing fee. See the fee at six item prices.
updated: 2026-11-26
---

# How Much Does Poshmark Take Per Sale?

Intro: Short answer: Poshmark takes `{{rates.poshmark.final_value_percent}}%` on sales of ${{rates.poshmark.commission_threshold_price}} and up, and a flat `{{rates.poshmark.min_commission}}` commission on sales under ${{rates.poshmark.commission_threshold_price}} — no payment processing line, no per-listing fees. The breakdown and the places where that simple rule surprises people are below. *(渲染自 config；未核验时首句降级为"Poshmark takes one flat commission line above $15 and a small flat fee below — exact rates render above")*

## The one rule, and the one line
Poshmark's commission is a single flat percentage above the $15 line: `{{rates.poshmark.final_value_percent}}%` of the item price. Below ${{rates.poshmark.commission_threshold_price}} the percentage disappears and a flat `{{rates.poshmark.min_commission}}` commission applies instead. That is the entire seller-fee sheet — which is why Poshmark payout math is the most predictable of the major marketplaces.

## Where the surprises live
- **The sub-$15 zone:** the flat fee is the same dollars on an $8 sale as on a $14 sale — proportionally, it takes a much bigger bite of the cheaper one. Check the effective-percentage line in the calculator.
- **Bundles:** the commission applies to the combined order total — good news, because one line on a bundle beats three lines on three separate orders.
- **Shipping:** under the standard flow the buyer pays the label, so shipping is not inside your fee base. Weight upgrades are your cost, not a commission change.

## Six item prices on current rates

Poshmark's fee base is the item price only — buyer-paid shipping never enters the math. The effective-percentage column shows why the flat fee bites hardest on cheap items.

| Item price | Commission | You keep | Effective % |
| --- | --- | --- | --- |
| $8 | {{calc:fee:poshmark:8}} | {{calc:keep:poshmark:8}} | {{calc:pct:poshmark:8}} |
| $15 | {{calc:fee:poshmark:15}} | {{calc:keep:poshmark:15}} | {{calc:pct:poshmark:15}} |
| $25 | {{calc:fee:poshmark:25}} | {{calc:keep:poshmark:25}} | {{calc:pct:poshmark:25}} |
| $50 | {{calc:fee:poshmark:50}} | {{calc:keep:poshmark:50}} | {{calc:pct:poshmark:50}} |
| $100 | {{calc:fee:poshmark:100}} | {{calc:keep:poshmark:100}} | {{calc:pct:poshmark:100}} |
| $200 | {{calc:fee:poshmark:200}} | {{calc:keep:poshmark:200}} | {{calc:pct:poshmark:200}} |

## Worked example (example only)
A $25 dress: one line — the flat percentage — leaves you the rest. Three $9 items sold separately: each pays the flat fee; sold as one $27 bundle, one percentage line instead. The calculator shows both routes.

## FAQ
**What are Poshmark seller fees?**
One line: `{{rates.poshmark.final_value_percent}}%` of the item price on sales of ${{rates.poshmark.commission_threshold_price}} or more, and a flat `{{rates.poshmark.min_commission}}` commission below that. There is no separate payment processing fee, and listing is free.

**What is Poshmark's commission?**
`{{rates.poshmark.final_value_percent}}%` on sales of ${{rates.poshmark.commission_threshold_price}} or more, rendered from our verified config above.

**What percentage does Poshmark take?**
The same {{rates.poshmark.final_value_percent}}% — but the table above shows the effective percentage, which runs well above 20% on items under the ${{rates.poshmark.commission_threshold_price}} line because the flat {{rates.poshmark.min_commission}} takes a bigger share of a small price.

**What is the flat fee on small sales?**
`{{rates.poshmark.min_commission}}` per sale under ${{rates.poshmark.commission_threshold_price}} — it replaces the percentage rather than stacking with it.

**Does Poshmark take a cut of shipping?**
Not from your payout under the standard buyer-paid label flow.

**Is Poshmark the cheapest platform for sellers?**
Above $15, its single-line structure often beats stacked platforms; under $15, the flat fee can take a double-digit share. Compare at your price in the comparison table.

Internal links: Poshmark fee calculator (003-poshmark-fee-calculator) · Poshmark vs eBay fees (001-poshmark-vs-ebay-fees) · Poshmark vs Mercari fees (010-poshmark-vs-mercari-fees)
