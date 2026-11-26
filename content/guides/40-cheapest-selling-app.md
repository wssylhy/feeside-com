---
page_type: compare
primary_keyword: cheapest selling app
secondary_keywords: [which selling app has the lowest fees, cheapest marketplace to sell on, lowest fee selling app]
config_deps: [rates.* 全表]
batch: 9
platforms: [ebay, poshmark, mercari, vinted, depop, etsy]
title: The Cheapest Selling App, Ranked by What You Keep
description: Which selling app has the lowest fees? See what eBay, Poshmark, Mercari, Vinted, Depop and Etsy each leave you on four sales once the shipping the buyer pays is counted, best to worst.
updated: 2026-11-26
---

# The Cheapest Selling App, Ranked by What You Keep

Intro: Every platform claims low fees, and the claim means little without a price attached. The table below shows what each of the six marketplaces leaves you on four sales, with the buyer paying shipping as they normally would. Every figure is calculated from the same verified rates as the calculators. Vinted is first in every row. Poshmark is never above fifth.

## The ranking at four prices

Each row is one item at one price. "Leaves you" is the item price minus the platform's fee, with the shipping money treated as passing through to pay for the label.

| Item price | Shipping | eBay | Poshmark | Mercari | Vinted | Depop | Etsy |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $8 | $4 | {{calc:net:ebay:8:4}} | {{calc:net:poshmark:8:4}} | {{calc:net:mercari:8:4}} | {{calc:net:vinted:8:4}} | {{calc:net:depop:8:4}} | {{calc:net:etsy:8:4}} |
| $15 | $5 | {{calc:net:ebay:15:5}} | {{calc:net:poshmark:15:5}} | {{calc:net:mercari:15:5}} | {{calc:net:vinted:15:5}} | {{calc:net:depop:15:5}} | {{calc:net:etsy:15:5}} |
| $30 | $6 | {{calc:net:ebay:30:6}} | {{calc:net:poshmark:30:6}} | {{calc:net:mercari:30:6}} | {{calc:net:vinted:30:6}} | {{calc:net:depop:30:6}} | {{calc:net:etsy:30:6}} |
| $100 | $10 | {{calc:net:ebay:100:10}} | {{calc:net:poshmark:100:10}} | {{calc:net:mercari:100:10}} | {{calc:net:vinted:100:10}} | {{calc:net:depop:100:10}} | {{calc:net:etsy:100:10}} |

Listing fees are left out. Etsy charges {{rates.etsy.listing_fee}} per listing, and eBay's insertion fee applies only after a seller has used the {{rates.ebay.listing_fee_free_per_month}} free listings each month.

## What the ranking hides

Vinted wins every row because it charges sellers nothing on standard sales. The buyer pays a protection fee instead. Vinted is also a fashion marketplace, so many items cannot be listed there at all.

Depop is second in every row. Its {{rates.depop.payment_percent}}% plus {{rates.depop.payment_fixed}} payment line is lower than any other platform's fee at these prices.

Mercari and Etsy swap places between the $30 and $100 rows. At $36 in total, Mercari's flat {{rates.mercari.final_value_percent}}% leaves slightly more. At $110 in total, Etsy's {{rates.etsy.final_value_percent}}% plus {{rates.etsy.payment_percent}}% plus a fixed {{rates.etsy.payment_fixed}} leaves more.

eBay is fifth in three rows and last on the $20 row, once the shipping is inside its fee. Poshmark is last or second to last everywhere. The gap between first and last widens with the price: on a $100 item Vinted leaves the whole {{calc:net:vinted:100:10}} and Poshmark leaves {{calc:net:poshmark:100:10}}.

## FAQ

**Which selling app has the lowest fees overall?**
Vinted, with no seller-side fee on standard sales. Depop is the lowest among the platforms that charge sellers, at every price in the table.

**Is the cheapest app always the best choice?**
No. The cheapest platform that has a buyer for your item beats the cheapest platform that does not. Fees decide between platforms that both sell your kind of item.

**Where does the Mercari and Etsy order flip?**
Around a $50 sale total, item plus shipping. Below it Mercari's flat {{rates.mercari.final_value_percent}}% costs less. Above it, Etsy's two percentages plus a fixed {{rates.etsy.payment_fixed}} cost less.

**Which selling app has the highest fees?**
Poshmark from $15 up, where it takes {{rates.poshmark.final_value_percent}}% of the item price. Under $15 its flat {{rates.poshmark.min_commission}} takes the largest share of any platform.

Internal links: fees comparison table (#8) · where to sell cheap items (#25) · where to sell clothes online (#32) · Vinted fee calculator (#5) · Depop fee calculator (#6) · Mercari vs Etsy fees (#35)
