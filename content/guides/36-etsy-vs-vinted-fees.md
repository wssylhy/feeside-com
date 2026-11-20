---
page_type: compare
primary_keyword: etsy vs vinted fees
secondary_keywords: [vinted fees vs etsy, sell on etsy or vinted]
config_deps: [rates.etsy.final_value_percent, rates.etsy.payment_percent, rates.etsy.payment_fixed, rates.etsy.listing_fee, rates.vinted.final_value_percent]
batch: 7
---

# Etsy vs Vinted Fees: The Craft Stack Against Zero

Intro: Etsy takes {{rates.etsy.final_value_percent}}% transaction on item plus shipping, adds {{rates.etsy.payment_percent}}% and ${{rates.etsy.payment_fixed}} for payment processing, and charges ${{rates.etsy.listing_fee}} per listing. Vinted charges sellers nothing on any sale; the buyer pays a protection fee at checkout. On fees alone the comparison is not close, and the interesting question is why these two platforms are rarely substitutes at all. *(渲染自 config；派生数按 verified 费率复算)*

## Side by side at three item prices

Fees on current verified rates, item plus shipping for Etsy, listing price for Vinted:
- $18 item: Etsy $1.96, you keep $16.04; Vinted keeps you $18.00.
- $46 item: Etsy $4.62, you keep $41.38; Vinted keeps you $46.00.
- $100 item: Etsy $9.75, you keep $90.25; Vinted keeps you $100.00.

Etsy's ${{rates.etsy.listing_fee}} listing fee sits on top of every number above, one per listing per four months.

## Vinted's zero is paid for by the buyer

The seller keeps the full listing price because the platform's revenue comes from the buyer: a protection fee (5% plus a fixed amount, tax included) appears in the buyer's checkout. You price the item, the buyer covers the platform. On a $46 dress you keep all $46, while the same dress on Etsy returns $41.38 after its stack.

## Eligibility decides before fees do

The two audiences barely overlap. Etsy requires handmade goods, vintage items 20 years or older, or craft supplies, and its buyers search deliberately for those categories. Vinted is secondhand fashion, modern brands included, browsed feed-style by price. A hand-knitted cardigan can only be an Etsy listing; a Zara dress from last year can only be a Vinted listing. True vintage sits in both, and there the fee gap is the tiebreaker: $54.05 versus $46.00 kept on a $100 vintage coat is not a small difference.

## FAQ

**Does Vinted charge sellers anything at all?**
Nothing on the sale. No commission, no listing fee, no processing line. The buyer-side protection fee is the platform's revenue.

**What does Etsy cost on an $18 sale?**
$1.96 in transaction and processing fees on current rates, plus ${{rates.etsy.listing_fee}} for the listing itself.

**Can the same item go on both platforms?**
Only true vintage, 20 years or older. Modern manufactured clothing fits Vinted and is against Etsy's marketplace rules; handmade goods fit Etsy and have no audience on Vinted.

Internal links: Etsy fee calculator (#7) · Vinted fee calculator (#5) · how much Etsy takes (#16) · how much Vinted takes (#27) · fees comparison table (#8)
