---
page_type: qa
primary_keyword: ebay listing fees
secondary_keywords: [how much does ebay charge to list, ebay insertion fee]
config_deps: [rates.ebay.listing_fee, rates.ebay.final_value_percent]
batch: 8
---

# eBay Listing Fees: What You Pay Before Anything Sells

Intro: Most of eBay's cost only appears when something sells, but listing has its own small line: the insertion fee, `{{rates.ebay.listing_fee}}` per listing per 30-day cycle on whatever listings are not covered by a free allowance. It is charged whether the item sells or not. *(渲染自 config；月度免费额度以卖家后台为准)*

## What the insertion fee covers

One insertion fee covers one listing for 30 days in a single category. List the same item in a second category and that is a second insertion. Let the 30 days lapse without a sale and relisting starts a new cycle with a new fee. Renewals and adding certain upgrades (subtitle, extra photos on some categories) bill separately.

## The allowance most sellers never notice

eBay gives most sellers a monthly allowance of listings that carry no insertion fee at all, and the size of that allowance depends on your account and category history. The practical way to know yours: Seller Hub → Payments → fees, where every insertion charge is itemized. If your allowance covers your volume, the listing fee never touches you and eBay's cost is purely the selling-side percentage.

## Putting it next to the selling fees

The insertion fee is flat and small: `{{rates.ebay.listing_fee}}` against a selling fee of `{{rates.ebay.final_value_percent}}%` plus a per-order fixed fee on the sale. On a fast sale, the listing fee is rounding error. On a slow item that relists four times before moving, it adds up to four of them, roughly a dollar and a half of sunk cost before the sale happens. That is the real reason stale listings deserve a price check more than they deserve another relist.

## FAQ

**How much does eBay charge to list an item?**
`{{rates.ebay.listing_fee}}` per listing per 30-day cycle for listings beyond your free monthly allowance. Many sellers list inside the allowance and never pay an insertion fee.

**Do I get the insertion fee back if the item sells?**
No, and it is not refunded for unsold listings either. It is a flat publishing cost per cycle.

**Is the insertion fee charged per photo or per item?**
Per listing. Photos are free on standard listings; paid upgrades like subtitles bill separately.

Internal links: eBay fee calculator (#2) · how much eBay takes (#9) · best time to list on eBay (#38) · fees comparison table (#8)
