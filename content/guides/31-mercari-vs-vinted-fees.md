---
page_type: compare
primary_keyword: mercari vs vinted fees
secondary_keywords: [vinted vs mercari fees, mercari or vinted for selling]
config_deps: [rates.mercari.final_value_percent, rates.vinted.final_value_percent, rates.vinted.per_order_fixed]
batch: 6
---

# Mercari vs Vinted Fees: 10% Against Nothing

Intro: Mercari takes `{{rates.mercari.final_value_percent}}%` of the item price plus buyer-paid shipping. Vinted takes `{{rates.vinted.final_value_percent}}%` from sellers and charges buyers a protection fee at checkout instead. That is the whole fee story. The rest of the decision is which platform's buyers want what you are selling. *(渲染自 config；派生数为当前 verified 费率下的复算)*

## The fee math
A $30 top with $8 shipping: Mercari's commission is $3.80 and you keep $34.20. On Vinted the commission line is $0 and you keep $38.00. Multiply the gap by your monthly sale count to see what the difference is worth to you.

## Where each platform's fees sit
Mercari: one percentage line, item plus shipping, nothing else for sellers.
Vinted: nothing from sellers; the buyer's checkout carries a protection fee plus the label. Your payout skips it entirely.

## The fee base note people miss
Mercari's {{rates.mercari.final_value_percent}}% includes the buyer-paid shipping in its base, so a high-shipping item costs more than the headline percentage suggests. Vinted has no seller percentage to apply to anything.

## FAQ
**Does Vinted charge sellers anything?**
{{rates.vinted.final_value_percent}}% commission, ${{rates.vinted.per_order_fixed}} fixed fee, and free standard listings. The seller side is zero.

**Who pays fees on Vinted?**
Buyers, at checkout: a protection fee plus the shipping label.

**Is Mercari's 10% charged on shipping too?**
Yes. The fee base is the item price plus buyer-paid shipping, per Mercari's own fee page.

**Which platform should a casual seller pick?**
Clothing that fits Vinted's fashion audience is hard to beat on its zero-commission line. General merchandise has no Vinted lane; Mercari's {{rates.mercari.final_value_percent}}% applies across categories.

Internal links: Mercari fee calculator (#4) · Vinted fee calculator (#5) · how much Mercari takes (#17) · how much Vinted takes (#27) · fees comparison table (#8)
