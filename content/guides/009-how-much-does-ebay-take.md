---
page_type: qa
primary_keyword: how much does ebay take
secondary_keywords: [ebay cut per sale]
config_deps: [rates.ebay.final_value_percent, rates.ebay.per_order_fixed, rates.ebay.payment_percent, rates.ebay.payment_fixed]
batch: 2
---

# How Much Does eBay Take Per Sale?

Intro: Short answer: for most categories eBay takes `{{rates.ebay.final_value_percent}}% + ${{rates.ebay.per_order_fixed}}` as the final value fee, plus payment processing of `{{rates.ebay.payment_percent}}% + ${{rates.ebay.payment_fixed}}` — and the percentage applies to the sale total including shipping. The long answer, with a worked example, is below. *(渲染自 config；未核验时首句降级为"eBay takes a percentage plus two fixed add-ons — exact current rates render above")*

## The three lines, one by one
1. **Final value fee:** `{{rates.ebay.final_value_percent}}`% of the total amount of the sale. "Total amount" includes the shipping the buyer pays — the single most common source of fee surprises.
2. **Per-order fixed fee:** `{{rates.ebay.per_order_fixed}}` on most categories, charged once per order no matter the size.
3. **Payment processing:** `{{rates.ebay.payment_percent}}`% + `{{rates.ebay.payment_fixed}}`, charged on the same total.

## Worked example (example only)
On a $60 sale with $9 shipping: the fee base is $69. Apply the percentage, add the fixed fee, add processing. The calculator above does it live — but the point of the breakdown is that you can verify every line against your own eBay invoice, because eBay's fee breakdown on each order shows exactly these lines.

## What changes the number
- **Category:** most resale categories share one rate; vehicles, heavy equipment and a few others differ.
- **Store subscription:** store levels discount the final value fee percentage — worth it only above a certain monthly volume.
- **International sales:** additional fees can apply; this calculator covers domestic US sales.

## FAQ
**Does eBay take a cut of shipping?**
Yes — the final value fee percentage applies to the total including buyer-paid shipping.

**Why is my first eBay sale's fee different?**
New-seller promotions can hold or reduce final value fees for a limited time; after the promo ends, standard rates apply. Check your promotion's terms. *(以平台最新公告为准)*

**Where do I see exactly what eBay charged?**
Seller Hub → Payments → per-order fee breakdown shows every line this page describes.

Internal links: eBay fee calculator (#2) · Poshmark vs eBay fees (#1) · Selling app fees comparison (#8)
