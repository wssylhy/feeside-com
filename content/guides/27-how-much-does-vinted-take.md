---
page_type: qa
primary_keyword: how much does vinted take
secondary_keywords: [vinted fees for sellers, does vinted charge fees, vinted fees explained, vinted selling fees, vinted commission]
config_deps: [rates.vinted.final_value_percent, rates.vinted.per_order_fixed, rates.vinted.listing_fee, rates.mercari.final_value_percent, rates.ebay.final_value_percent, rates.poshmark.final_value_percent, rates.poshmark.min_commission]
batch: 9
title: How Much Does Vinted Take From a Sale? Sellers Pay Nothing
description: Vinted takes nothing from sellers on standard sales: no commission, no per-order fee, no listing fee. The buyer pays a protection fee at checkout. See what the same sale would cost on Mercari, eBay and Poshmark.
updated: 2026-11-26
---

# How Much Does Vinted Take From Sellers?

Intro: Short answer: nothing. Vinted's seller commission is {{rates.vinted.final_value_percent}}%, there is no fixed per-order fee, and a standard listing is free to post. The fee people associate with Vinted is charged to the buyer at checkout. The seller side, the buyer side, and the trade-off are below.

## The seller side, line by line

- Commission: {{rates.vinted.final_value_percent}}% of the sale price
- Fixed per-order fee: {{rates.vinted.per_order_fixed}}
- Listing fee: {{rates.vinted.listing_fee}} on standard listings

The price you list is the money that reaches your payout. There is nothing else to subtract on Vinted's side.

## The same sale on platforms that charge

Vinted's fee is zero at every price. The table shows what the same item price costs on three platforms that do charge sellers. Shipping is left out.

| Item price | Vinted fee | Mercari fee | eBay fee | Poshmark fee |
| --- | --- | --- | --- | --- |
| $10 | {{calc:fee:vinted:10}} | {{calc:fee:mercari:10}} | {{calc:fee:ebay:10}} | {{calc:fee:poshmark:10}} |
| $25 | {{calc:fee:vinted:25}} | {{calc:fee:mercari:25}} | {{calc:fee:ebay:25}} | {{calc:fee:poshmark:25}} |
| $50 | {{calc:fee:vinted:50}} | {{calc:fee:mercari:50}} | {{calc:fee:ebay:50}} | {{calc:fee:poshmark:50}} |
| $100 | {{calc:fee:vinted:100}} | {{calc:fee:mercari:100}} | {{calc:fee:ebay:100}} | {{calc:fee:poshmark:100}} |
| $200 | {{calc:fee:vinted:200}} | {{calc:fee:mercari:200}} | {{calc:fee:ebay:200}} | {{calc:fee:poshmark:200}} |

## Where Vinted's fees actually live

At checkout the buyer pays a protection fee on top of the item price, plus the shipping. That line pays for buyer protection and payment handling, and it is the reason the seller's payout stays whole. From the seller's side it never touches your numbers.

## The trade-off, stated plainly

Free listing brings a crowded marketplace. Photos and pricing do more of the selling work on Vinted than on a platform where each listing costs money, and an item that sits unsold earns nothing at any fee. Vinted is a fashion marketplace, so it only works for clothing, shoes and accessories.

## Worked example

A $30 top with the buyer paying shipping: Vinted's fee is {{calc:fee:vinted:30}} and the payout is {{calc:net:vinted:30}}. On Mercari the same $30 item costs {{rates.mercari.final_value_percent}}% once shipping is counted, and on Poshmark it is over the $15 line where the {{rates.poshmark.final_value_percent}}% percentage applies.

## FAQ

**Does Vinted charge sellers anything?**
No. Sellers pay no commission, no per-order fee and no listing fee on standard sales.

**What are Vinted's selling fees?**
There are none for the seller. Vinted charges the buyer a protection fee at checkout instead.

**Why do people say Vinted has fees?**
Because buyers pay one. The protection fee is added to the buyer's total at checkout and never comes out of the seller's payout.

**Is selling on Vinted really free?**
The standard sale flow is. Optional extras, such as boosting a listing, cost money. Listing and selling do not.

**What sells well on Vinted?**
Clothing, shoes and accessories, especially in the low and mid-price range where a percentage fee would hurt most. The sub-$20 comparison shows the fee math on cheap items.

Internal links: Vinted fee calculator (#5) · Vinted vs Depop fees (#12) · eBay vs Vinted fees (#19) · Mercari vs Vinted fees (#31) · where to sell cheap items (#25) · how much Depop takes (#28) · Vinted buyer fees (#47)
