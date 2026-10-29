---
page_type: compare
primary_keyword: depop vs mercari fees
secondary_keywords: [depop or mercari for sneakers]
config_deps: [rates.depop.final_value_percent, rates.depop.payment_percent, rates.depop.payment_fixed, rates.mercari.final_value_percent, rates.mercari.payment_percent, rates.mercari.payment_fixed]
batch: 4
---

# Depop vs Mercari Fees: Same Sale, Two Payouts

Intro: Depop and Mercari both stack two fee lines, and their shapes look similar on paper — Depop: `{{rates.depop.final_value_percent}}%` + processing `{{rates.depop.payment_percent}}% + ${{rates.depop.payment_fixed}}`; Mercari: `{{rates.mercari.final_value_percent}}%` + processing `{{rates.mercari.payment_percent}}% + ${{rates.mercari.payment_fixed}}`. The real difference shows in the totals at your price point, and in who buys there. Run both calculators below with the same price. *(交互区由组件渲染)*

## Where the structures actually differ
- **The split between the lines:** each platform divides its percentage between selling fee and processing differently — the combined effective rate is the number to compare, not either line alone.
- **Fee base:** both apply to the buyer's total under standard label flows; check each platform's current label policy for edge cases. *(以平台最新公告为准)*
- **What is NOT in the math:** audience. Depop's streetwear/fashion feed and Mercari's general-goods catalog realize different prices for the same item — fees settle half the decision.

## Worked example (example only)
A $90 sneaker sale, buyer pays shipping: both platforms print a two-line breakdown and a net. Whichever net is higher wins the fee half; the audience half is yours to judge by category fit.

## Which fits your item
- **Sneakers and streetwear:** Depop's culture can carry a premium — check whether it survives the fee stack at your price.
- **General goods, electronics, housewares:** Mercari's breadth usually fits better; its fee stack is the whole comparison.
- **Either way:** the effective-percentage line in each calculator is the honest comparator.

## FAQ
**Depop or Mercari for sneakers?**
Fee-wise they are close; the deciding factor is usually which audience pays your asking price. Run both calculators at your real price, then judge the reach.

**Which has lower fees, Depop or Mercari?**
Compare the combined effective lines rendered from our verified config — the answer shifts by price band.

**Do both charge payment processing separately?**
Yes — both stack a processing line on top of their selling fee, both rendered above.

Internal links: Depop fee calculator (006-depop-fee-calculator) · Mercari fee calculator (004-mercari-fee-calculator) · Vinted vs Depop fees (12-vinted-vs-depop-fees)
