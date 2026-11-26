---
page_type: qa
primary_keyword: who pays shipping on mercari
secondary_keywords: [mercari shipping fees for sellers, does the seller pay shipping on mercari]
config_deps: [rates.mercari.final_value_percent]
batch: 9
description: The buyer pays shipping on Mercari, but Mercari's {{rates.mercari.final_value_percent}}% selling fee is charged on the item price plus that shipping. See what a cheaper label saves.
updated: 2026-11-26
---

# Who Pays Shipping on Mercari?

Intro: The buyer pays shipping, but Mercari's selling fee is calculated on the item price plus that shipping — so shipping matters to you twice: the buyer funds it, and {{rates.mercari.final_value_percent}}% of it lands inside your fee base when a Mercari label is used. That double role is the whole story. *(渲染自 config；费基出自官方 Fees 页 2025-01-06 版)*

## The flow, step by step

1. You list free. 2. The buyer pays the item price plus the shipping label at checkout. 3. Mercari's selling fee ({{rates.mercari.final_value_percent}}%) applies to the item plus the label, and the rest arrives in your balance. There is no separate processing line (it has been folded into the selling fee since January 2025) and no listing fee.

## Why shipping is inside your fee base

Because the label money passes through Mercari's checkout, the percentage reaches into it. A $25 item with an $8 label carries the fee on $33, not $25. Selling with your own shipping arrangement changes that base and also changes your risk: the Mercari label flow is what the rate structure above assumes. *(标签外自寄的费基变化以平台最新公告为准)*

## Worked example (fees on current verified rates)

$25 item with an $8 Mercari label: fee = {{rates.mercari.final_value_percent}}% of $33 = $3.30, you keep $29.70. The same $25 with a $4 label: fee $2.90, you keep $32.10. Cheaper labels are a real lever on Mercari in a way they are not on Poshmark, where shipping never enters the fee math at all.

## FAQ

**Does the seller ever pay shipping on Mercari?**
Not on the standard flow. The buyer funds the label at checkout. Seller-side shipping costs appear only if you ship on your own arrangement and get it wrong.

**Is Mercari's fee charged on shipping?**
Yes — the {{rates.mercari.final_value_percent}}% selling fee applies to item price plus the buyer-paid label under the standard flow. That is Mercari's documented base since the January 2025 fee change.

**How do I keep the fee lower?**
Cheaper labels shrink the fee base. Light items, right-sized packaging, and comparing label options at listing time are the levers.

Internal links: Mercari fee calculator (#4) · how much Mercari takes (#17) · does Poshmark charge shipping (#43) · fees comparison table (#8)
