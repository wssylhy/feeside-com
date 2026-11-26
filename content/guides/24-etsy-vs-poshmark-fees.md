---
page_type: compare
primary_keyword: etsy vs poshmark fees
secondary_keywords: [sell handmade on etsy or poshmark, poshmark vs etsy, which is cheaper etsy or poshmark]
config_deps: [rates.etsy.listing_fee, rates.etsy.final_value_percent, rates.etsy.payment_percent, rates.etsy.payment_fixed, rates.poshmark.final_value_percent, rates.poshmark.min_commission, rates.poshmark.commission_threshold_price]
batch: 9
title: Etsy vs Poshmark Fees: Which Leaves You More?
description: Etsy takes {{rates.etsy.final_value_percent}}% plus payment processing and a listing fee. Poshmark takes {{rates.poshmark.final_value_percent}}% of the item price, or a flat {{rates.poshmark.min_commission}} under $15. Side by side at four prices with Etsy's shipping fee base included.
updated: 2026-11-26
---

# Etsy vs Poshmark Fees: Which Leaves You More?

Intro: Etsy charges three lines: {{rates.etsy.listing_fee}} to list the item, a {{rates.etsy.final_value_percent}}% transaction fee on the item price plus shipping and gift wrap, and {{rates.etsy.payment_percent}}% + {{rates.etsy.payment_fixed}} for payment processing on the same amount. Poshmark charges one line: {{rates.poshmark.final_value_percent}}% of the item price on sales of ${{rates.poshmark.commission_threshold_price}} or more, and a flat {{rates.poshmark.min_commission}} below that. Etsy's fee is lower at every price in the table below. Poshmark wins only when the shipping is large compared with the price, because Poshmark's commission ignores shipping and both of Etsy's percentages include it.

## The two fee structures

Etsy charges {{rates.etsy.listing_fee}} for each listing, whether or not the item sells, and again each time an unsold listing renews after four months. On a sale it adds a {{rates.etsy.final_value_percent}}% transaction fee on the item price plus shipping and gift wrap, then payment processing of {{rates.etsy.payment_percent}}% + {{rates.etsy.payment_fixed}} on the same amount. A sale that arrives through Etsy's own advertising can also carry an Offsite Ads fee of 12% or 15%.

Poshmark charges {{rates.poshmark.final_value_percent}}% of the item price on sales of ${{rates.poshmark.commission_threshold_price}} or more, and a flat {{rates.poshmark.min_commission}} below that. Listing is free. The buyer pays Poshmark for the shipping label, so shipping never enters the fee.

## The same items on both platforms

On Etsy the buyer pays you for shipping, and Etsy's percentages apply to that shipping too. On Poshmark the buyer pays Poshmark for the label directly, so shipping never enters Poshmark's fee.

| Item price | Shipping | Etsy fee | Etsy leaves you | Poshmark fee | Poshmark leaves you |
| --- | --- | --- | --- | --- | --- |
| $12 | $6 | {{calc:fee:etsy:12:6}} | {{calc:net:etsy:12:6}} | {{calc:fee:poshmark:12:6}} | {{calc:net:poshmark:12:6}} |
| $25 | $6 | {{calc:fee:etsy:25:6}} | {{calc:net:etsy:25:6}} | {{calc:fee:poshmark:25:6}} | {{calc:net:poshmark:25:6}} |
| $45 | $6 | {{calc:fee:etsy:45:6}} | {{calc:net:etsy:45:6}} | {{calc:fee:poshmark:45:6}} | {{calc:net:poshmark:45:6}} |
| $80 | $8 | {{calc:fee:etsy:80:8}} | {{calc:net:etsy:80:8}} | {{calc:fee:poshmark:80:8}} | {{calc:net:poshmark:80:8}} |

"Leaves you" is the item price minus the per-sale fee, with Etsy's {{rates.etsy.listing_fee}} listing fee and the label cost treated separately.

## Cheap items

Under ${{rates.poshmark.commission_threshold_price}} Poshmark's flat {{rates.poshmark.min_commission}} takes the same dollars on every sale. Etsy's percentage is still lower.

| Item price | Etsy fee ($6 shipping) | Poshmark fee |
| --- | --- | --- |
| $8 | {{calc:fee:etsy:8:6}} | {{calc:fee:poshmark:8:6}} |
| $10 | {{calc:fee:etsy:10:6}} | {{calc:fee:poshmark:10:6}} |
| $14.99 | {{calc:fee:etsy:14.99:6}} | {{calc:fee:poshmark:14.99:6}} |

## When Poshmark is cheaper

It takes a shipping cost close to the item price. A $20 item with $20 of shipping costs {{calc:fee:etsy:20:20}} on Etsy, because Etsy charges its percentages on the full $40. The same item costs {{calc:fee:poshmark:20:20}} on Poshmark, which charges {{rates.poshmark.final_value_percent}}% of the $20 alone.

## What the fees leave out

Etsy sells handmade items, vintage items that are 20 years or older, and craft supplies. Poshmark sells fashion: clothing, shoes and accessories, including everyday secondhand brands. A handmade piece belongs on Etsy. A used high-street dress belongs on Poshmark. A jacket that is more than 20 years old can go to either.

## FAQ

**Sell handmade on Etsy or Poshmark?**
Handmade has its buyers on Etsy, and Etsy's fee is lower at every price in the table above. Poshmark's buyers shop for fashion brands.

**Which is cheaper, Etsy or Poshmark?**
Etsy at every price in the table. Poshmark is cheaper only when the shipping is large compared with the price, because Poshmark does not charge on shipping.

**Etsy vs Poshmark for vintage clothing?**
Both accept vintage once it is 20 years or older. Etsy's fee is lower unless the shipping is unusually heavy for the price.

**Does Poshmark charge a listing fee like Etsy?**
No. Poshmark's only charge is the commission, or the flat fee under ${{rates.poshmark.commission_threshold_price}}. Etsy charges {{rates.etsy.listing_fee}} per listing whether or not the item sells.

**Does Poshmark charge commission on shipping?**
No. Etsy does: both its transaction fee and its payment processing fee apply to the item price plus shipping.

Internal links: Etsy fee calculator (#7) · Poshmark fee calculator (#3) · how much Etsy takes (#16) · how much Poshmark takes (#13) · Etsy listing fee (#45) · does Poshmark charge shipping (#43) · Etsy vs Vinted fees (#36) · Poshmark vs eBay fees (#1)
