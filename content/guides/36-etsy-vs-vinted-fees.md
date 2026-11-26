---
page_type: compare
primary_keyword: etsy vs vinted fees
secondary_keywords: [vinted fees vs etsy, sell on etsy or vinted, which is cheaper etsy or vinted]
config_deps: [rates.etsy.final_value_percent, rates.etsy.payment_percent, rates.etsy.payment_fixed, rates.etsy.listing_fee, rates.vinted.final_value_percent]
batch: 9
title: Etsy vs Vinted Fees: Which Leaves You More?
description: Etsy takes {{rates.etsy.final_value_percent}}% plus payment processing and a listing fee. Vinted takes nothing from sellers on standard sales. Side by side at three item prices, and which items can go on both.
updated: 2026-11-26
---

# Etsy vs Vinted Fees: Which Leaves You More?

Intro: Etsy takes a {{rates.etsy.final_value_percent}}% transaction fee on the item price plus shipping, adds {{rates.etsy.payment_percent}}% + {{rates.etsy.payment_fixed}} for payment processing, and charges {{rates.etsy.listing_fee}} to list each item. Vinted charges sellers nothing on standard sales. The buyer pays a protection fee at checkout instead. On fees alone Vinted leaves more at every price. What the two platforms will list is what makes them rarely substitutes for each other.

## The two fee structures

Etsy charges three lines: {{rates.etsy.listing_fee}} per listing, a {{rates.etsy.final_value_percent}}% transaction fee on the item price plus shipping and gift wrap, and payment processing of {{rates.etsy.payment_percent}}% + {{rates.etsy.payment_fixed}} on the same amount.

Vinted charges sellers no commission, no per-order fee and no listing fee on standard sales. The buyer pays Vinted a protection fee and the shipping cost at checkout.

## Side by side at three item prices

| Item price | Etsy fee | Etsy leaves you | Vinted leaves you |
| --- | --- | --- | --- |
| $18 | {{calc:fee:etsy:18}} | {{calc:net:etsy:18}} | {{calc:net:vinted:18}} |
| $46 | {{calc:fee:etsy:46}} | {{calc:net:etsy:46}} | {{calc:net:vinted:46}} |
| $100 | {{calc:fee:etsy:100}} | {{calc:net:etsy:100}} | {{calc:net:vinted:100}} |

Shipping is left out. Etsy's {{rates.etsy.listing_fee}} listing fee is left out as well: it is charged once per listing, sold or unsold.

## Vinted's zero is paid for by the buyer

The seller keeps the full listing price because the platform's revenue comes from the buyer. A protection fee, 5% plus a fixed amount with tax included, appears in the buyer's checkout. On a $46 dress you keep all $46, while the same dress on Etsy returns {{calc:net:etsy:46}} after its fees.

## Which items can go where

The two audiences barely overlap. Etsy's categories are handmade goods, vintage items 20 years or older, and craft supplies. Vinted is secondhand fashion, modern brands included, browsed feed-style by price. A hand-knitted cardigan belongs on Etsy. A dress from a high-street brand belongs on Vinted. Vintage sits in both, and there the fee decides: on a $100 vintage coat Etsy leaves {{calc:net:etsy:100}} and Vinted leaves {{calc:net:vinted:100}}.

## FAQ

**Does Vinted charge sellers anything at all?**
Nothing on a standard sale. No commission, no listing fee, no processing fee. The buyer's protection fee is the platform's revenue.

**What does Etsy cost on an $18 sale?**
{{calc:fee:etsy:18}} in transaction and processing fees, plus {{rates.etsy.listing_fee}} for the listing itself.

**Can the same item go on both platforms?**
Vintage, 20 years or older, fits both. Handmade fits Etsy's categories. Modern secondhand clothing fits Vinted.

**Which is cheaper, Etsy or Vinted?**
Vinted, at every price, because it takes nothing from the seller. Etsy's fee on an item is {{calc:fee:etsy:50}} at $50 and {{calc:fee:etsy:100}} at $100, before its listing fee.

Internal links: Etsy fee calculator (#7) · Vinted fee calculator (#5) · how much Etsy takes (#16) · how much Vinted takes (#27) · Etsy listing fee (#45) · fees comparison table (#8)
