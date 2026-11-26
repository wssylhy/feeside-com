---
page_type: table
primary_keyword: ebay fees by category
secondary_keywords: [ebay final value fee by category, ebay category fees, ebay sneaker fees, ebay fee for sneakers, ebay fee chart]
config_deps: [rates.ebay.final_value_percent, rates.ebay.per_order_fixed, rates.ebay.per_order_fixed_under_10, config/ebay-categories.yaml]
batch: 9
platforms: [ebay]
title: eBay Fees by Category (2026): Final Value Fee Chart
description: eBay takes {{rates.ebay.final_value_percent}}% in most categories. Athletic shoes, handbags, watches, trading cards, guitars, books, movies and music are different. eBay's full category fee table, with worked examples.
updated: 2026-11-26
---

# eBay Fees by Category: The Final Value Fee Chart

Intro: eBay charges {{rates.ebay.final_value_percent}}% of the total amount of the sale in most categories. Several categories carry their own percentages, and they include ones resellers use often: athletic shoes, women's handbags, watches, trading cards, guitars, books, movies and music. The table below is eBay's own, from its Selling fees page.

## The fee table

{{table:ebay-categories}}

{{table:ebay-categories-status}}

How to read it:

- The per-order fee of {{rates.ebay.per_order_fixed}}, or {{rates.ebay.per_order_fixed_under_10}} on orders of $10 or less, is added unless the row says it is not charged.
- Dollar thresholds are worked out per item.
- "On the portion" means the percentage applies only to the part of the sale above the threshold.

## Athletic shoes: the ${{cat:sneakers.threshold}} line

Athletic shoes have the rule resellers ask about most. eBay's starting price is the auction start price or the Buy It Now price, and it does not include shipping, handling, taxes or fees.

- A pair that sells for less than ${{cat:sneakers.threshold}}: {{cat:sneakers.low_rate}}% plus the per-order fee, the same as most categories.
- A pair that sells for ${{cat:sneakers.threshold}} or more: {{cat:sneakers.high_rate}}% and no per-order fee.
- Listing is free if the starting price is ${{cat:sneakers.threshold}} or more.

| Sale total | eBay fee | You keep |
| --- | --- | --- |
| $100 | {{calc:ebaycat:sneakers:100}} | {{calc:ebaykeep:sneakers:100}} |
| $149.99 | {{calc:ebaycat:sneakers:149.99}} | {{calc:ebaykeep:sneakers:149.99}} |
| $150 | {{calc:ebaycat:sneakers:150}} | {{calc:ebaykeep:sneakers:150}} |
| $200 | {{calc:ebaycat:sneakers:200}} | {{calc:ebaykeep:sneakers:200}} |
| $300 | {{calc:ebaycat:sneakers:300}} | {{calc:ebaykeep:sneakers:300}} |

The step is large. A pair that sells for $149.99 costs {{calc:ebaycat:sneakers:149.99}} in fees. At $150 the fee drops to {{calc:ebaycat:sneakers:150}}.

## Watches and trading cards: a lower rate above a threshold

For watches, parts and accessories, eBay charges {{cat:watches.tier1_rate}}% up to ${{cat:watches.tier1_cap}}, then {{cat:watches.tier2_rate}}% on the portion above that up to ${{cat:watches.tier2_cap}}.

| Sale total | eBay fee |
| --- | --- |
| $800 | {{calc:ebaycat:watches:800}} |
| $2,000 | {{calc:ebaycat:watches:2000}} |
| $8,000 | {{calc:ebaycat:watches:8000}} |

eBay's own worked example on its fee page is a trading card that sells for $9,500. With sales tax the total amount of the sale is $10,070, and the final value fee is {{calc:ebaycat:cards:10070}}: {{cat:cards.tier1_rate}}% of $7,500, {{cat:cards.tier2_rate}}% of the $2,570 above that, plus the per-order fee.

## Handbags, jewelry and bullion: a flat switch

For these rows eBay states one rate up to a threshold and a lower rate above it:

- Women's bags and handbags: {{cat:handbags.low_rate}}% up to ${{cat:handbags.threshold}}, then {{cat:handbags.high_rate}}%.
- Jewelry and watches, other than the watches row: {{cat:jewelry.low_rate}}% up to ${{cat:jewelry.threshold}}, then {{cat:jewelry.high_rate}}%.
- Bullion: {{cat:bullion.low_rate}}% up to ${{cat:bullion.threshold}}, then {{cat:bullion.high_rate}}%.

The wording differs from "on the portion", so the table quotes eBay's sentence as written instead of deriving a figure. For a sale in this range, check eBay's page before you list.

## Guitars, books, movies and music

Guitars and basses carry a lower percentage, {{cat:guitars.tier1_rate}}%, and free insertion. A $500 guitar costs {{calc:ebaycat:guitars:500}} in final value fees, against {{calc:fee:ebay:500}} in a standard category.

Books, magazines, movies, TV and music (except vinyl records) carry a higher one, {{cat:media.tier1_rate}}%. A $50 book costs {{calc:ebaycat:media:50}}, against {{calc:fee:ebay:50}} in a standard category.

## Sales above $7,500

In most categories the rate drops to {{cat:most.tier2_rate}}% on the portion of the sale above ${{cat:most.tier1_cap}}. A $10,000 sale in a standard category costs {{calc:ebaycat:most:10000}} in final value fees and leaves {{calc:ebaykeep:most:10000}}.

## FAQ

**What percent does eBay take on sneakers?**
{{cat:sneakers.high_rate}}% on sales of ${{cat:sneakers.threshold}} or more, with no per-order fee. Below that, {{cat:sneakers.low_rate}}% plus the per-order fee.

**What is eBay's fee on handbags?**
{{cat:handbags.low_rate}}% if the total amount of the sale is ${{cat:handbags.threshold}} or less, and {{cat:handbags.high_rate}}% if it is over.

**What is eBay's fee on trading cards?**
{{cat:cards.tier1_rate}}% on the total amount of the sale up to ${{cat:cards.tier1_cap}}, then {{cat:cards.tier2_rate}}% on the portion above.

**What is eBay's fee on watches?**
{{cat:watches.tier1_rate}}% up to ${{cat:watches.tier1_cap}}, {{cat:watches.tier2_rate}}% on the portion above that up to ${{cat:watches.tier2_cap}}, and {{cat:watches.tier3_rate}}% above.

**What is eBay's fee on guitars?**
{{cat:guitars.tier1_rate}}% up to ${{cat:guitars.tier1_cap}}, then {{cat:guitars.tier2_rate}}% above, with free insertion.

**What is eBay's final value fee for most categories?**
{{cat:most.tier1_rate}}% of the total amount of the sale up to ${{cat:most.tier1_cap}} per item, {{cat:most.tier2_rate}}% on the portion above, plus the per-order fee.

Internal links: eBay fee calculator (#2) · how much eBay takes (#9) · eBay listing fees (#42) · Poshmark vs eBay fees (#1) · eBay vs Mercari fees (#29) · fees comparison table (#8)
