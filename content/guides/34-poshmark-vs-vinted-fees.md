---
page_type: compare
primary_keyword: poshmark vs vinted fees
secondary_keywords: [vinted fees vs poshmark, poshmark or vinted for selling, which pays more poshmark or vinted]
config_deps: [rates.poshmark.final_value_percent, rates.poshmark.min_commission, rates.poshmark.commission_threshold_price, rates.ebay.per_order_fixed, rates.ebay.per_order_fixed_under_10, rates.vinted.final_value_percent]
batch: 9
title: Poshmark vs Vinted Fees: Which Leaves You More?
description: Poshmark takes {{rates.poshmark.final_value_percent}}% of the item price, or a flat {{rates.poshmark.min_commission}} under $15. Vinted takes nothing from sellers on standard sales. Side by side at five item prices, with the $15 step explained.
updated: 2026-11-26
---

# Poshmark vs Vinted Fees: Which Leaves You More?

Intro: Poshmark takes a commission on every sale: a flat {{rates.poshmark.min_commission}} on items under ${{rates.poshmark.commission_threshold_price}}, then {{rates.poshmark.final_value_percent}}% of the item price at ${{rates.poshmark.commission_threshold_price}} and above. Vinted takes nothing from sellers on standard sales. The buyer pays a protection fee instead. On fees alone, Vinted leaves you more at every price.

## Where each fee applies

Poshmark's percentage is on the item price only. The buyer pays Poshmark directly for the label, so shipping never enters the fee.

Vinted's seller side is zero whatever the price or the shipping. The buyer pays Vinted a protection fee at checkout, which is how Vinted takes nothing from the seller.

## Side by side at five item prices

| Item price | Poshmark fee | Poshmark leaves you | Vinted leaves you |
| --- | --- | --- | --- |
| $10 | {{calc:fee:poshmark:10}} | {{calc:net:poshmark:10}} | {{calc:net:vinted:10}} |
| $14 | {{calc:fee:poshmark:14}} | {{calc:net:poshmark:14}} | {{calc:net:vinted:14}} |
| $15 | {{calc:fee:poshmark:15}} | {{calc:net:poshmark:15}} | {{calc:net:vinted:15}} |
| $60 | {{calc:fee:poshmark:60}} | {{calc:net:poshmark:60}} | {{calc:net:vinted:60}} |
| $100 | {{calc:fee:poshmark:100}} | {{calc:net:poshmark:100}} | {{calc:net:vinted:100}} |

## The step at the $15 line

Poshmark's flat fee and its percentage meet almost exactly at ${{rates.poshmark.commission_threshold_price}}. A $14.99 item pays {{calc:fee:poshmark:14.99}} and leaves {{calc:net:poshmark:14.99}}. A $15 item pays {{calc:fee:poshmark:15}} and leaves {{calc:net:poshmark:15}}. Listing one cent lower earns five cents more, at this boundary and nowhere else on Poshmark.

eBay has a step of the same kind at $10. An order of $10 or less carries a per-order fee of {{rates.ebay.per_order_fixed_under_10}}, and an order one cent over $10 carries {{rates.ebay.per_order_fixed}}.

## What Vinted's zero leaves out

Fees are only half of the choice. Poshmark is built around offers, bundles and a social feed. Vinted is simpler, with buyers searching and browsing by price. If a sale closes on either platform, Vinted pays more: on a $60 jacket the difference is {{calc:gap:poshmark_vinted:60}}. The platform that has the buyer who wants your item still wins. The fee decides when both would sell.

## FAQ

**Does Vinted really take nothing from sellers?**
Yes, on standard sales. Sellers pay no commission and no listing fee. The buyer's protection fee, 5% plus a fixed amount, is added to the buyer's total at checkout.

**Is Poshmark's 20% charged on shipping too?**
No. The commission is on the item price only, and the buyer pays Poshmark for shipping directly.

**Is there a price where Poshmark beats Vinted on fees?**
No. Vinted's fee is zero at every price, and Poshmark's starts at a {{rates.poshmark.min_commission}} flat fee.

**Which pays more, Poshmark or Vinted?**
By fees, Vinted at every price. On a $60 item Poshmark leaves {{calc:net:poshmark:60}} and Vinted leaves {{calc:net:vinted:60}}.

**What is Poshmark's fee on a small sale?**
A flat {{rates.poshmark.min_commission}} on items under ${{rates.poshmark.commission_threshold_price}}, in place of the percentage.

Internal links: Poshmark fee calculator (#3) · Vinted fee calculator (#5) · how much Poshmark takes (#13) · how much Vinted takes (#27) · Poshmark fee under $15 (#50) · fees comparison table (#8)
