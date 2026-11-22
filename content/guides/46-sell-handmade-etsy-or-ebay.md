---
page_type: compare
primary_keyword: sell handmade on etsy or ebay
secondary_keywords: [etsy vs ebay for handmade, where to sell handmade items]
config_deps: [rates.etsy.final_value_percent, rates.etsy.payment_percent, rates.etsy.payment_fixed, rates.etsy.listing_fee, rates.ebay.final_value_percent]
batch: 9
---

# Selling Handmade: Etsy or eBay?

Intro: For handmade goods, both platforms are legal venues and both take a real cut — Etsy stacks {{rates.etsy.final_value_percent}}% transaction with {{rates.etsy.payment_percent}}% and ${{rates.etsy.payment_fixed}} processing plus a ${{rates.etsy.listing_fee}} listing fee, while eBay takes {{rates.ebay.final_value_percent}}% of the sale total plus its per-order fee. The fee gap favors Etsy at most price points; the audience gap decides most sales anyway. *(渲染自 config；派生数按 verified 费率复算)*

## The fee math on a $50 handmade piece

No shipping in the example, item sells at $50:
- **Etsy:** transaction $3.25 + processing $1.75 = $5.00, you keep $45.00. The ${{rates.etsy.listing_fee}} listing fee sits on top, once per four-month cycle.
- **eBay:** {{rates.ebay.final_value_percent}}% = $6.80 + ${{rates.ebay.per_order_fixed}} fixed = $7.20, you keep $42.80.

Etsy keeps about $2.20 more on this sale, and more as the price climbs, because 9.5% beats 13.6% once the fixed fees wash out. On cheap handmade items ($15-20), the two platforms close in on each other and the per-order fee starts to matter more for eBay.

## Why the audience gap is bigger than the fee gap

Etsy buyers arrive with intent: they search "handmade ceramic mug" and find listings that qualify because Etsy enforces its handmade, vintage, and craft-supply categories. eBay buyers search by item and condition across everything resalable, and your handmade piece competes in a general-purpose results page with used goods at used prices. Handmade pricing survives Etsy's audience and drowns on eBay's.

The practical pattern most handmade sellers land on: list on Etsy as the home, and use eBay selectively for pieces that read as generic at a glance (a plain tote, a wooden spoon set) where a search-first buyer is realistic.

## FAQ

**Which takes less from a handmade sale, Etsy or eBay?**
Etsy at most price points: about $5.00 on a $50 piece against eBay's $7.20, before Etsy's ${{rates.etsy.listing_fee}} listing fee.

**Can handmade goods legally go on eBay?**
Yes — eBay has no handmade restriction. The constraint is on Etsy's side, which requires handmade, vintage (20+ years), or craft supplies.

**Is Etsy's listing fee a reason to skip it?**
${{rates.etsy.listing_fee}} per four-month cycle is small next to the per-sale fee difference. It adds up only with a large catalog of slow items.

Internal links: Etsy fee calculator (#7) · eBay fee calculator (#2) · Etsy vs eBay fees (#11) · Etsy transaction fee (#41) · Etsy listing fee (#45)
