---
page_type: qa
primary_keyword: how much does poshmark take
secondary_keywords: [poshmark commission]
config_deps: [rates.poshmark.final_value_percent, rates.poshmark.per_order_fixed]
batch: 3
---

# How Much Does Poshmark Take Per Sale?

Intro: Short answer: Poshmark takes `{{rates.poshmark.final_value_percent}}%` on sales of $15 and up, and a flat `{{rates.poshmark.per_order_fixed}}` per order on sales under $15 — no payment processing line, no per-listing fees. The breakdown and the places where that simple rule surprises people are below. *(渲染自 config；未核验时首句降级为"Poshmark takes one flat commission line above $15 and a small flat fee below — exact rates render above")*

## The one rule, and the one line
Poshmark's commission is a single flat percentage above the $15 line: `{{rates.poshmark.final_value_percent}}%` of the sale price. Below $15 the percentage disappears and a flat `{{rates.poshmark.per_order_fixed}}` per order applies instead. That is the entire seller-fee sheet — which is why Poshmark payout math is the most predictable of the major marketplaces.

## Where the surprises live
- **The sub-$15 zone:** the flat fee is the same dollars on an $8 sale as on a $14 sale — proportionally, it takes a much bigger bite of the cheaper one. Check the effective-percentage line in the calculator.
- **Bundles:** the commission applies to the combined order total — good news, because one line on a bundle beats three lines on three separate orders.
- **Shipping:** under the standard flow the buyer pays the label, so shipping is not inside your fee base. Weight upgrades are your cost, not a commission change.

## Worked example (example only)
A $25 dress: one line — the flat percentage — leaves you the rest. Three $9 items sold separately: each pays the flat fee; sold as one $27 bundle, one percentage line instead. The calculator shows both routes.

## FAQ
**What is Poshmark's commission?**
`{{rates.poshmark.final_value_percent}}%` on sales of $15 or more, rendered from our verified config above.

**What is the flat fee on small sales?**
`{{rates.poshmark.per_order_fixed}}` per order under $15 — it replaces the percentage rather than stacking with it.

**Does Poshmark take a cut of shipping?**
Not from your payout under the standard buyer-paid label flow.

**Is Poshmark the cheapest platform for sellers?**
Above $15, its single-line structure often beats stacked platforms; under $15, the flat fee can take a double-digit share. Compare at your price in the comparison table.

Internal links: Poshmark fee calculator (003-poshmark-fee-calculator) · Poshmark vs eBay fees (001-poshmark-vs-ebay-fees) · Poshmark vs Mercari fees (010-poshmark-vs-mercari-fees)
