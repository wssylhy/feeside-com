---
page_type: qa
primary_keyword: etsy transaction fee
secondary_keywords: [what is etsy transaction fee, etsy 6.5 fee]
config_deps: [rates.etsy.final_value_percent, rates.etsy.payment_percent, rates.etsy.payment_fixed, rates.etsy.listing_fee]
batch: 8
description: Etsy's transaction fee is {{rates.etsy.final_value_percent}}% of the item price plus shipping and gift wrap. See the full fee stack worked out on a $36 order.
updated: 2026-11-26
---

# What Is the Etsy Transaction Fee?

Intro: The Etsy transaction fee is {{rates.etsy.final_value_percent}}% of what the buyer pays for the item, including shipping (and gift wrap if you offer it). It is the largest line in Etsy's stack but not the only one: payment processing adds {{rates.etsy.payment_percent}}% plus ${{rates.etsy.payment_fixed}}, and each listing costs ${{rates.etsy.listing_fee}} up front. *(渲染自 config；费基出自官方 legal/fees 政策原文)*

## What the 6.5% applies to

The transaction fee percentage applies to the order total you control: the item price plus whatever you charge for shipping, plus gift wrap when the buyer selects it. It does not apply to the sales tax line on the checkout. One fee, one base, no tiers — unlike eBay's per-order split or Poshmark's under-$15 switch.

## The full stack on a real order

On a $30 item with $6 shipping:
- Transaction: {{rates.etsy.final_value_percent}}% of $36 = $2.34
- Payment processing: {{rates.etsy.payment_percent}}% + ${{rates.etsy.payment_fixed}} = $1.33
- Listing fee: ${{rates.etsy.listing_fee}} (paid when you listed)

Total fees $3.87, leaving you $32.13 from the $36 order. The listing fee only shows up once per listing cycle, so a same-day sale carries it once; a relisted item carries it again.

## Where sellers get surprised

The surprises are all at the edges: the percentage reaching into shipping, Offsite Ads (a separate 12% or 15% fee when the sale came from Etsy's own advertising), and currency conversion on international sales. The transaction fee itself is the predictable line; the stack around it is what the calculator above exists to show.

## FAQ

**Is the Etsy transaction fee 6.5% on shipping too?**
Yes. The fee applies to item price plus shipping, plus gift wrap when selected. It does not apply to sales tax.

**Is the transaction fee the only Etsy fee?**
No. Payment processing ({{rates.etsy.payment_percent}}% + ${{rates.etsy.payment_fixed}}) and the ${{rates.etsy.listing_fee}} listing fee are separate lines, and Offsite Ads can add more when Etsy's own advertising drives the sale.

**When is the transaction fee charged?**
It is deducted from your sale proceeds as each order settles, alongside the payment processing line.

Internal links: Etsy fee calculator (#7) · how much Etsy takes (#16) · Mercari vs Etsy fees (#35) · fees comparison table (#8)
