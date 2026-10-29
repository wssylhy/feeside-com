---
page_type: compare
primary_keyword: poshmark vs ebay fees
secondary_keywords: [mercari vs ebay fees, which selling app has lowest fees]
config_deps: [rates.poshmark.final_value_percent, rates.poshmark.per_order_fixed, rates.ebay.final_value_percent, rates.ebay.payment_percent, rates.ebay.payment_fixed, rates.mercari.final_value_percent, rates.mercari.payment_percent]
batch: 1
---

# Poshmark vs eBay Fees: What You Actually Keep on the Same Sale

Intro: Selling the same $50 item on Poshmark and eBay can leave two very different amounts in your account. Poshmark charges a flat commission structure — `{{rates.poshmark.final_value_percent}}`% on sales of $15 or more and a small fixed fee below that — while eBay combines a final value fee of `{{rates.ebay.final_value_percent}}`% with payment processing on top. This calculator compares both side by side so you can see the exact difference on your own numbers before you list. *(数字待 config 渲染；intro 的结构化句式保留，数值缺失时上句降级为无数字版本)*

## How the Poshmark fee math works
Poshmark takes `{{rates.poshmark.final_value_percent}}`% of your sale price when the item sells for $15 or more. For sales under $15, Poshmark charges a flat `{{rates.poshmark.per_order_fixed}}` per order instead of a percentage. Shipping is paid by the buyer under Poshmark's standard label, so it normally does not reduce your payout. *(键名待 config 定稿后核对)*

## How the eBay fee math works
eBay charges a final value fee — `{{rates.ebay.final_value_percent}}`% of the total amount of the sale, which includes shipping the buyer pays — plus payment processing of `{{rates.ebay.payment_percent}}`% + `{{rates.ebay.payment_fixed}}` per order. Most categories also include a per-order fixed fee shown as `{{rates.ebay.per_order_fixed}}`. Your listing approach matters: most sellers start with free listings. *(占位符以 config schema 为准，缺失时整段降级为 pending 句式)*

## Worked example (example only — numbers shown for illustration)
On a $100 sale with $10 shipping: Poshmark keeps roughly X and you keep about $XX.XX; eBay keeps roughly Y and you keep about $YY.YY. The gap comes from two places: eBay's fee applies to shipping as well as the item price, and eBay adds payment processing on top of the final value fee. X/Y 由构建时 config 计算，不手填。

## Poshmark vs eBay fees at a glance
- **Commission style:** Poshmark uses one flat percentage above $15; eBay stacks a category final value fee plus payment processing.
- **What counts toward the fee:** eBay's percentage includes buyer-paid shipping; Poshmark's percentage is on the item price under its standard shipping flow.
- **Low-price items:** Below $15, Poshmark's flat fee can take a large share of a small sale — check the fixed-fee line in the calculator.
- **Where the difference shows:** The same item can net differently on each platform; run your actual price through both calculators above.

## FAQ
**Which selling app has the lowest fees?**
It depends on the sale price and category. Poshmark's flat `{{rates.poshmark.final_value_percent}}`% can beat eBay's stacked fees on mid-price fashion; eBay can come out ahead on other price points, especially when you factor in different buyer reach. Compare your exact price with the calculators on this page.

**Does Poshmark take a cut of shipping?**
Under Poshmark's standard shipping flow the buyer pays for the shipping label, so seller payouts are calculated on the item price. Weight upgrades and off-platform label choices can change what you pay — see Poshmark's current shipping policy for details. *(以平台最新公告为准)*

**Does eBay charge fees on shipping?**
Yes — eBay's final value fee applies to the total amount of the sale, which includes the shipping the buyer pays. That is one of the most common reasons an eBay fee looks higher than expected.

**Is Poshmark really 20% on everything?**
No. Sales under $15 take a flat `{{rates.poshmark.per_order_fixed}}` per order instead, which is proportionally larger on cheap items. Sales at $15 and above use the flat percentage. The exact current rate is rendered from our verified config above.

Internal links: eBay fee calculator (#2) · Poshmark fee calculator (#3) · Mercari vs eBay fees (#10) · How much does eBay take (#9)
