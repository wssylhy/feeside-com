---
page_type: qa
primary_keyword: does poshmark charge shipping
secondary_keywords: [does poshmark charge sellers for shipping, poshmark shipping fees for sellers]
config_deps: [rates.poshmark.final_value_percent, rates.poshmark.min_commission, rates.poshmark.commission_threshold_price]
batch: 9
description: The buyer pays shipping on Poshmark, and Poshmark's commission is charged on the item price only. Sellers pay nothing toward the label under the standard flow.
updated: 2026-11-26
---

# Does Poshmark Charge Shipping?

Intro: Short answer: the buyer pays shipping, and Poshmark's commission never touches the shipping money. The seller's fee is only ever the commission on the item price — {{rates.poshmark.final_value_percent}}% at ${{rates.poshmark.commission_threshold_price}} and above, a flat ${{rates.poshmark.min_commission}} below that. Both sides of the shipping question are below. *(渲染自 config；费基出自官方 terms#fee-policy 实锤)*

## What the seller pays (and does not pay)

Your fee is the commission on the item price only. When the buyer checks out, Poshmark charges them the shipping label directly, that money goes to Poshmark's carrier partner, and it never enters your payout. A heavier package can require a weight upgrade, and upgrade costs are the seller's responsibility, but the standard label itself is not a seller expense and not a commission base.

## What the buyer pays

Buyers see a shipping fee in their checkout total, set by Poshmark (rate dependent on current carrier pricing). From your side of the screen this changes nothing: list at your price, and your payout is the item price minus the commission, whatever shipping plan the buyer picks.

## Worked examples (fees on current verified rates)

- $8 item: flat ${{rates.poshmark.min_commission}} commission, you keep $5.05 of the $8.
- $25 item: {{rates.poshmark.final_value_percent}}% = $5.00 commission, you keep $20.00 of the $25.
- Shipping: $0 to you in both cases.

## FAQ

**Does Poshmark charge sellers for shipping labels?**
No. The buyer pays the label fee directly to Poshmark at checkout; it never comes out of your payout.

**Is Poshmark's commission calculated on shipping?**
No. The commission base is the item price only — shipping is excluded by policy, which is unusual among the major marketplaces and worth remembering when you compare.

**What if the package is heavier than the label allows?**
Weight upgrades are billed to the seller. Weigh items before listing and price accordingly.

Internal links: Poshmark fee calculator (#3) · how much Poshmark takes (#13) · Poshmark vs Vinted fees (#34) · fees comparison table (#8)
