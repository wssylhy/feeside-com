---
page_type: qa
primary_keyword: poshmark fees
secondary_keywords: [poshmark fees for sellers, poshmark seller fees, poshmark selling fees, poshmark fees chart, what does poshmark charge, poshmark commission]
config_deps: [rates.poshmark.final_value_percent, rates.poshmark.min_commission, rates.poshmark.commission_threshold_price, rates.poshmark.listing_fee, rates.poshmark.payment_percent]
batch: 9
title: Poshmark Fees (2026): The Complete Seller Fee Chart
description: Poshmark takes {{rates.poshmark.final_value_percent}}% of the item price on sales of $15 or more, and a flat {{rates.poshmark.min_commission}} under $15. Sellers pay no listing fee, no payment processing fee and nothing on shipping. See the fee at six prices.
updated: 2026-11-26
---

# Poshmark Fees: The Complete Seller Fee Chart

Intro: Poshmark charges sellers one fee. On sales of ${{rates.poshmark.commission_threshold_price}} or more it is {{rates.poshmark.final_value_percent}}% of the item price. Under ${{rates.poshmark.commission_threshold_price}} it is a flat {{rates.poshmark.min_commission}}. There is no listing fee and no separate payment processing fee, and shipping is left out, because the buyer pays Poshmark for the label.

## Poshmark fees at a glance

| Fee | What sellers pay |
| --- | --- |
| Selling fee on sales of ${{rates.poshmark.commission_threshold_price}} or more | {{rates.poshmark.final_value_percent}}% of the item price |
| Selling fee on sales under ${{rates.poshmark.commission_threshold_price}} | a flat {{rates.poshmark.min_commission}} |
| Payment processing | none charged separately |
| Listing fee | free |
| Shipping | paid by the buyer to Poshmark, outside the fee |

## The fee at six item prices

| Item price | Poshmark fee | You keep | Fee as share of price |
| --- | --- | --- | --- |
| $5 | {{calc:fee:poshmark:5}} | {{calc:keep:poshmark:5}} | {{calc:pct:poshmark:5}} |
| $10 | {{calc:fee:poshmark:10}} | {{calc:keep:poshmark:10}} | {{calc:pct:poshmark:10}} |
| $15 | {{calc:fee:poshmark:15}} | {{calc:keep:poshmark:15}} | {{calc:pct:poshmark:15}} |
| $25 | {{calc:fee:poshmark:25}} | {{calc:keep:poshmark:25}} | {{calc:pct:poshmark:25}} |
| $50 | {{calc:fee:poshmark:50}} | {{calc:keep:poshmark:50}} | {{calc:pct:poshmark:50}} |
| $100 | {{calc:fee:poshmark:100}} | {{calc:keep:poshmark:100}} | {{calc:pct:poshmark:100}} |

## What counts toward the fee

Only the item price. The buyer pays Poshmark for the shipping label, and that money never enters the fee. When a buyer's offer is accepted, the fee is worked out on the price actually paid. On a bundle, it is worked out on the bundle's combined price.

## Three things that surprise sellers

1. Under ${{rates.poshmark.commission_threshold_price}} the fee is a flat {{rates.poshmark.min_commission}} whatever the price. A $5 item leaves {{calc:net:poshmark:5}}.
2. There is a step at ${{rates.poshmark.commission_threshold_price}}. A $14.99 item leaves {{calc:net:poshmark:14.99}}, and a $15 item leaves {{calc:net:poshmark:15}}.
3. Shipping never enters the fee, so a heavy item costs no more in fees than a light one.

## FAQ

**What are Poshmark's fees for sellers?**
One fee: {{rates.poshmark.final_value_percent}}% of the item price on sales of ${{rates.poshmark.commission_threshold_price}} or more, or a flat {{rates.poshmark.min_commission}} under that.

**What percent does Poshmark take?**
{{rates.poshmark.final_value_percent}}% on sales of ${{rates.poshmark.commission_threshold_price}} or more. Under that the flat {{rates.poshmark.min_commission}} works out at a higher share: {{calc:pct:poshmark:10}} on a $10 item.

**How much does Poshmark charge to sell?**
On a $25 item, {{calc:fee:poshmark:25}}. On a $50 item, {{calc:fee:poshmark:50}}.

**What is Poshmark's commission?**
The same fee, under the name Poshmark's fee policy uses. It is {{rates.poshmark.final_value_percent}}% of the item price, or a flat {{rates.poshmark.min_commission}} under ${{rates.poshmark.commission_threshold_price}}.

**Does Poshmark charge for shipping?**
No. The buyer pays Poshmark for the label, and shipping is not part of the fee.

**Does Poshmark charge a listing fee?**
No. Listing is free, and the fee is charged only when the item sells.

**Is there a Poshmark fee calculator?**
Yes. The one on this page works out the fee and what you keep for any price you type.

Internal links: Poshmark fee calculator (#3) · how much Poshmark takes (#13) · Poshmark fee under $15 (#50) · does Poshmark charge shipping (#43) · Poshmark vs eBay fees (#1) · Poshmark vs Mercari fees (#10) · Poshmark vs Vinted fees (#34)
