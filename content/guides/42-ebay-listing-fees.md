---
page_type: qa
primary_keyword: ebay listing fees
secondary_keywords: [how much does ebay charge to list, ebay insertion fee, how many free listings on ebay, is it free to list on ebay]
config_deps: [rates.ebay.listing_fee, rates.ebay.listing_fee_free_per_month, rates.ebay.final_value_percent, rates.ebay.per_order_fixed, rates.ebay.per_order_fixed_under_10]
batch: 9
title: eBay Listing Fees: {{rates.ebay.listing_fee_free_per_month}} Free Listings a Month, Then {{rates.ebay.listing_fee}}
description: How many free listings eBay gives you each month, what a listing costs after that, when relisting costs money again, and how the insertion fee compares with eBay's selling fees.
updated: 2026-11-26
---

# eBay Listing Fees: {{rates.ebay.listing_fee_free_per_month}} Free Listings a Month, Then {{rates.ebay.listing_fee}}

Intro: Listing on eBay is free for most casual sellers. Every seller gets up to {{rates.ebay.listing_fee_free_per_month}} zero-insertion-fee listings a month. After that each listing costs {{rates.ebay.listing_fee}}, charged when the listing is created and not refunded if the item does not sell. The rules below are taken from eBay's Selling fees page, collected November 24, 2026.

## The allowance

eBay's wording is that every month you get up to {{rates.ebay.listing_fee_free_per_month}} zero insertion fee listings, or more if you have an eBay Store. Listings inside that allowance cost nothing to post. A seller who lists fewer than {{rates.ebay.listing_fee_free_per_month}} items in a month pays no insertion fees at all.

## What happens after the allowance

Once the free listings are used up, eBay's insertion fee rules apply:

- {{rates.ebay.listing_fee}} per listing, per category. List an item in two categories and the insertion fee for the second category is always charged.
- Charged for the original listing and each time you choose to relist the item.
- Not refunded if the item does not sell.
- Charged once per listing when a listing holds several items or variations.

## Good 'Til Cancelled listings

Good 'Til Cancelled listings are fixed-price listings that renew automatically once per calendar month. eBay charges the insertion fee, if one applies, when the item is first listed and again each time it renews. Each renewal counts toward the monthly free listings, so a Good 'Til Cancelled listing inside the allowance renews for free.

## What extra listings cost

| Listings beyond the free allowance in a month | Insertion fees |
| --- | --- |
| 5 | {{calc:listings:ebay:5}} |
| 50 | {{calc:listings:ebay:50}} |
| 100 | {{calc:listings:ebay:100}} |

## Next to the selling fees

The insertion fee is small beside what eBay takes when the item sells. The final value fee is {{rates.ebay.final_value_percent}}% of the total amount of the sale plus {{rates.ebay.per_order_fixed}} per order ({{rates.ebay.per_order_fixed_under_10}} on orders of $10 or less). On a $60 sale that comes to {{calc:fee:ebay:60}}. An item relisted three times beyond the allowance costs {{calc:listings:ebay:4}} in insertion fees before it sells, four times {{rates.ebay.listing_fee}}.

## FAQ

**How many free listings do you get on eBay?**
Up to {{rates.ebay.listing_fee_free_per_month}} zero-insertion-fee listings a month, or more if you have an eBay Store.

**How much does eBay charge to list an item?**
Nothing until you have used the {{rates.ebay.listing_fee_free_per_month}} free listings in a month. After that, {{rates.ebay.listing_fee}} per listing.

**Do you pay if your item doesn't sell on eBay?**
Not inside the free allowance. Beyond it, the {{rates.ebay.listing_fee}} insertion fee is charged when you list and is not refunded if the item does not sell.

**Do you pay again to relist on eBay?**
Beyond the free allowance, yes. eBay charges the insertion fee for the original listing and each time you choose to relist. Inside the allowance, relists are free.

**Is it free to list in two categories on eBay?**
No. An insertion fee is always charged for the second category.

**How many photos can you add to an eBay listing for free?**
Up to 24, with zoom and enlarge. Scheduling a listing to start later is free as well.

Internal links: eBay fee calculator (#2) · how much eBay takes (#9) · eBay fees by category (#48) · best time to list on eBay (#38) · fees comparison table (#8)
