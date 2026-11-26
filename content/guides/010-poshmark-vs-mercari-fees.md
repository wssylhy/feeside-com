---
page_type: compare
primary_keyword: poshmark vs mercari fees
secondary_keywords: [which is better poshmark or mercari, mercari vs poshmark, poshmark vs mercari, which has lower fees]
config_deps: [rates.poshmark.final_value_percent, rates.poshmark.min_commission, rates.poshmark.commission_threshold_price, rates.mercari.final_value_percent]
batch: 9
title: Poshmark vs Mercari Fees: Which Is Cheaper for Sellers?
description: Mercari takes {{rates.mercari.final_value_percent}}% of the item price plus shipping. Poshmark takes {{rates.poshmark.final_value_percent}}% of the item price, or a flat {{rates.poshmark.min_commission}} under $15. Side by side at four prices with the buyer paying shipping.
updated: 2026-11-26
---

# Poshmark vs Mercari Fees: Which Is Cheaper for Sellers?

Intro: Mercari takes {{rates.mercari.final_value_percent}}% of the item price plus the shipping the buyer pays. Poshmark takes {{rates.poshmark.final_value_percent}}% of the item price alone, or a flat {{rates.poshmark.min_commission}} on sales under ${{rates.poshmark.commission_threshold_price}}. Mercari's fee is lower at every price in the tables below. Poshmark comes out ahead only when the shipping costs more than the item itself.

## The two fee structures

Mercari charges one line: {{rates.mercari.final_value_percent}}% of what the buyer pays, which is the item price plus shipping when a Mercari label is used. Listing is free, and there is no separate payment processing fee.

Poshmark also charges one line, on a smaller base: {{rates.poshmark.final_value_percent}}% of the item price on sales of ${{rates.poshmark.commission_threshold_price}} or more, and a flat {{rates.poshmark.min_commission}} below that. The buyer pays Poshmark for the shipping label, so shipping is left out of the fee. Listing is free here too.

## The same items on both platforms

In this table the buyer pays shipping on both platforms. "Leaves you" is the item price minus the fee, with the shipping treated as money that arrives and leaves again to pay for the label.

| Item price | Shipping | Mercari fee | Mercari leaves you | Poshmark fee | Poshmark leaves you |
| --- | --- | --- | --- | --- | --- |
| $12 | $6 | {{calc:fee:mercari:12:6}} | {{calc:net:mercari:12:6}} | {{calc:fee:poshmark:12:6}} | {{calc:net:poshmark:12:6}} |
| $25 | $6 | {{calc:fee:mercari:25:6}} | {{calc:net:mercari:25:6}} | {{calc:fee:poshmark:25:6}} | {{calc:net:poshmark:25:6}} |
| $40 | $8 | {{calc:fee:mercari:40:8}} | {{calc:net:mercari:40:8}} | {{calc:fee:poshmark:40:8}} | {{calc:net:poshmark:40:8}} |
| $80 | $10 | {{calc:fee:mercari:80:10}} | {{calc:net:mercari:80:10}} | {{calc:fee:poshmark:80:10}} | {{calc:net:poshmark:80:10}} |

Mercari leaves more in every row, and the gap grows with the price.

## Cheap items

Under ${{rates.poshmark.commission_threshold_price}} Poshmark's flat fee takes the same dollars whatever the price, which makes it expensive on small sales.

| Item price (no shipping) | Mercari fee | Poshmark fee |
| --- | --- | --- |
| $8 | {{calc:fee:mercari:8}} | {{calc:fee:poshmark:8}} |
| $12 | {{calc:fee:mercari:12}} | {{calc:fee:poshmark:12}} |
| $14 | {{calc:fee:mercari:14}} | {{calc:fee:poshmark:14}} |

## When Poshmark is the cheaper one

It takes a shipping cost above the item price. A $20 item with $25 of shipping costs {{calc:fee:mercari:20:25}} on Mercari and {{calc:fee:poshmark:20:25}} on Poshmark, because Mercari charges 10% of that $45 total while Poshmark charges 20% of the $20 alone. Below ${{rates.poshmark.commission_threshold_price}} it takes even more shipping than that before Poshmark's flat fee wins.

## FAQ

**Which is better, Poshmark or Mercari?**
On fees, Mercari, at any ordinary shipping cost. Poshmark is built around fashion, with offers and bundles as part of the normal flow. Mercari lists a wider range of goods.

**Which has lower fees, Poshmark or Mercari?**
Mercari. On items of ${{rates.poshmark.commission_threshold_price}} and up its {{rates.mercari.final_value_percent}}% is half of Poshmark's {{rates.poshmark.final_value_percent}}%. Below that, and with typical shipping costs, its percentage stays well under Poshmark's flat {{rates.poshmark.min_commission}}.

**Do Poshmark or Mercari charge sellers for shipping?**
Neither charges you for the label. The buyer pays. The difference is the fee base: Mercari's {{rates.mercari.final_value_percent}}% includes the shipping money, and Poshmark's commission ignores it.

**Does Mercari charge a payment processing fee?**
Not as a separate line. Payment processing is part of the {{rates.mercari.final_value_percent}}% selling fee on listings created or updated since January 6, 2025.

**Does Poshmark charge a listing fee?**
No. Poshmark's only charge is the commission, or the flat fee under ${{rates.poshmark.commission_threshold_price}}.

Internal links: Poshmark fee calculator (#3) · Mercari fee calculator (#4) · how much Poshmark takes (#13) · how much Mercari takes (#17) · who pays shipping on Mercari (#44) · Poshmark vs eBay fees (#1)
