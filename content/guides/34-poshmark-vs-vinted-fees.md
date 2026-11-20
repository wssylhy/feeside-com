---
page_type: compare
primary_keyword: poshmark vs vinted fees
secondary_keywords: [vinted fees vs poshmark, poshmark or vinted for selling]
config_deps: [rates.poshmark.final_value_percent, rates.poshmark.min_commission, rates.poshmark.commission_threshold_price, rates.vinted.final_value_percent]
batch: 7
---

# Poshmark vs Vinted Fees: The 20% Commission Against Zero

Intro: Poshmark takes a commission on every sale: `{{rates.poshmark.min_commission}}` flat on items under ${{rates.poshmark.commission_threshold_price}}, then {{rates.poshmark.final_value_percent}}% of the item price at ${{rates.poshmark.commission_threshold_price}} and above. Vinted takes nothing from sellers; its 5% buyer fee is charged to the person buying. On fees alone, Vinted keeps more for the seller at every price point we checked. *(渲染自 config；派生数按 verified 费率复算)*

## Where each fee applies

Poshmark's percentage is on the item price only. Shipping never enters the math because the buyer pays Poshmark directly for the label, and that money never passes through your proceeds.
Vinted's seller side is zero regardless of price or shipping choice. The buyer pays a protection fee at checkout, which is why Vinted can afford to take nothing from you.

## Side by side at four item prices

Fees on current verified rates, item price only:
- $10 item: Poshmark $2.95, you keep $7.05; Vinted keeps you $10.00.
- $14 item: Poshmark $2.95, you keep $11.05; Vinted keeps you $14.00.
- $15 item: Poshmark $3.00, you keep $12.00; Vinted keeps you $15.00.
- $60 item: Poshmark $12.00, you keep $48.00; Vinted keeps you $60.00.

## The pricing quirk at the $15 line

The flat fee and the percentage land almost exactly at $15, so a $15 item pays $3.00 while a $14.99 item pays ${{rates.poshmark.min_commission}}. Listing at $14.99 nets you $12.04; listing at $15 nets $12.00. A one-cent price cut is worth five cents of fee at exactly this boundary, and it is the only place in the six-marketplace set where pricing one cent lower leaves you with more.

## What Vinted's zero costs you

Fees are only half the trade. Poshmark has a decade-deep US fashion audience, offer and bundle mechanics that move inventory, and live selling. Vinted's US marketplace is newer, and inventory moves mostly through search and browse. If a sale closes on either, Vinted pays dramatically better: on that $60 jacket the difference is $12. The platform with the buyer who actually wants your item still wins the transaction; the fee gap decides it when both would sell.

## FAQ

**Does Vinted really take nothing from sellers?**
Seller side is $0, listing included. The 5% plus fixed buyer fee shows up in the buyer's checkout total, not your payout.

**Is Poshmark's 20% charged on shipping too?**
No. The commission is on the item price only; the buyer pays shipping to Poshmark directly.

**Is there a price where Poshmark beats Vinted on fees?**
None that we found. The commission starts at a ${{rates.poshmark.min_commission}} floor and grows with price, so the gap widens as the item gets more expensive.

Internal links: Poshmark fee calculator (#3) · Vinted fee calculator (#5) · how much Poshmark takes (#13) · how much Vinted takes (#27) · fees comparison table (#8)
