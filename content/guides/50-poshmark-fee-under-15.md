---
page_type: qa
primary_keyword: poshmark fee under 15
secondary_keywords: [poshmark flat fee, why did poshmark charge me 2.95, poshmark minimum commission, poshmark fee on small sales, poshmark fee below 15]
config_deps: [rates.poshmark.final_value_percent, rates.poshmark.min_commission, rates.poshmark.commission_threshold_price, rates.poshmark.listing_fee]
batch: 9
title: Poshmark's Fee Under $15: The Flat $2.95 Rule
description: Poshmark charges a flat {{rates.poshmark.min_commission}} on any sale under $15 instead of {{rates.poshmark.final_value_percent}}%. On a $5 item that leaves $2.05. See the fee at every price from $3 to $15, and how bundling avoids it.
updated: 2026-11-26
---

# Poshmark's Fee Under $15: The Flat ${{rates.poshmark.min_commission}} Rule

Intro: Poshmark charges a flat {{rates.poshmark.min_commission}} on any sale under ${{rates.poshmark.commission_threshold_price}}. The {{rates.poshmark.final_value_percent}}% commission starts only at ${{rates.poshmark.commission_threshold_price}}. On a $14 item the flat fee is a fifth of the price. On a $5 item it is more than half.

## The fee from $3 to $15

| Item price | Poshmark fee | You keep | Fee as share of price |
| --- | --- | --- | --- |
| $3 | {{calc:fee:poshmark:3}} | {{calc:keep:poshmark:3}} | {{calc:pct:poshmark:3}} |
| $5 | {{calc:fee:poshmark:5}} | {{calc:keep:poshmark:5}} | {{calc:pct:poshmark:5}} |
| $8 | {{calc:fee:poshmark:8}} | {{calc:keep:poshmark:8}} | {{calc:pct:poshmark:8}} |
| $10 | {{calc:fee:poshmark:10}} | {{calc:keep:poshmark:10}} | {{calc:pct:poshmark:10}} |
| $12 | {{calc:fee:poshmark:12}} | {{calc:keep:poshmark:12}} | {{calc:pct:poshmark:12}} |
| $14 | {{calc:fee:poshmark:14}} | {{calc:keep:poshmark:14}} | {{calc:pct:poshmark:14}} |
| $14.99 | {{calc:fee:poshmark:14.99}} | {{calc:keep:poshmark:14.99}} | {{calc:pct:poshmark:14.99}} |
| $15 | {{calc:fee:poshmark:15}} | {{calc:keep:poshmark:15}} | {{calc:pct:poshmark:15}} |

## Why cheap listings lose most

The flat fee does not shrink with the price, so the cheaper the item, the larger the share Poshmark takes. A $3 item leaves {{calc:net:poshmark:3}}. A $12 item leaves {{calc:net:poshmark:12}}.

## Bundling: three small sales or one

Three $5 items sold separately each pay the flat fee, {{calc:xfees:poshmark:5:3}} in all, and leave you {{calc:xnet:poshmark:5:3}}. Sold together as one $15 bundle, they pay the percentage once, {{calc:fee:poshmark:15}}, and leave you {{calc:net:poshmark:15}}.

## Pricing at $15 or above

Where an item can carry a ${{rates.poshmark.commission_threshold_price}} price, the percentage fee costs less than the flat fee takes from a lower price. A $14 item leaves {{calc:net:poshmark:14}}. The same item listed at $15 leaves {{calc:net:poshmark:15}}.

## The step at exactly $15

A $14.99 item pays {{calc:fee:poshmark:14.99}} and leaves {{calc:net:poshmark:14.99}}. A $15 item pays {{calc:fee:poshmark:15}} and leaves {{calc:net:poshmark:15}}. Listing one cent lower earns five cents more, at this boundary and nowhere else.

## FAQ

**Why did Poshmark charge me $2.95?**
Every sale under ${{rates.poshmark.commission_threshold_price}} carries a flat {{rates.poshmark.min_commission}} fee in place of the {{rates.poshmark.final_value_percent}}% commission.

**What percentage is Poshmark's fee on a small sale?**
It depends on the price. The flat {{rates.poshmark.min_commission}} is {{calc:pct:poshmark:10}} of a $10 item and {{calc:pct:poshmark:5}} of a $5 item.

**How do I avoid the Poshmark flat fee?**
Sell small items in a bundle that reaches ${{rates.poshmark.commission_threshold_price}}, or price single items at ${{rates.poshmark.commission_threshold_price}} or more where the item supports it. Below that, the fee is the same {{rates.poshmark.min_commission}} whatever you charge.

**What is Poshmark's minimum commission?**
{{rates.poshmark.min_commission}}. That is the fee on any sale under ${{rates.poshmark.commission_threshold_price}}.

**Is it free to list on Poshmark?**
Yes. The fee is charged only when the item sells.

**Does Poshmark charge the fee on shipping?**
No. The buyer pays Poshmark for the label, and shipping is not part of the fee.

Internal links: Poshmark fee calculator (#3) · Poshmark fees (#49) · how much Poshmark takes (#13) · does Poshmark charge shipping (#43) · Poshmark vs Vinted fees (#34) · where to sell cheap items (#25)
