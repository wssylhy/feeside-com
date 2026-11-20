---
page_type: compare
primary_keyword: ebay vs depop fees
secondary_keywords: [depop fees vs ebay, depop or ebay for selling]
config_deps: [rates.ebay.final_value_percent, rates.ebay.per_order_fixed, rates.ebay.per_order_fixed_under_10, rates.ebay.listing_fee, rates.depop.payment_percent, rates.depop.payment_fixed]
batch: 7
---

# eBay vs Depop Fees: The 13.6% Stack Against a Payment Line

Intro: eBay takes `{{rates.ebay.final_value_percent}}%` of the sale total (item plus shipping), adds a per-order fee that splits into ${{rates.ebay.per_order_fixed_under_10}} under $10 and ${{rates.ebay.per_order_fixed}} above, and charges ${{rates.ebay.listing_fee}} per 30-day listing. Depop charges US sellers nothing to list or sell; its only line is the payment processor at {{rates.depop.payment_percent}}% plus ${{rates.depop.payment_fixed}} per order. On current verified rates, Depop's line is smaller at every price we checked. *(渲染自 config；派生数按 verified 费率复算)*

## The two structures

eBay's percentage sits on the whole sale, so shipping raises the fee. Its per-order fee is fixed, and the listing fee recurs every 30 days until the item sells.
Depop has one charge: Depop Payments (Stripe) takes {{rates.depop.payment_percent}}% plus ${{rates.depop.payment_fixed}} on the item plus shipping. Listing is free and there is no selling commission for US, UK, or Australian sellers.

## Side by side at three price points

Totals on current verified rates, item plus shipping:
- $9.50 total: eBay $1.59; Depop $0.76.
- $40 total ($32 item, $8 shipping): eBay $5.84; Depop $1.77.
- $150 total: eBay $20.80; Depop $5.40.

The cheap-item tier narrows the gap but never closes it: at $9.50 eBay drops to the ${{rates.ebay.per_order_fixed_under_10}} order fee and still takes roughly double what Depop takes.

## What the gap buys on each side

Depop's cut is small, and its audience is a specific one: streetwear, thrift, and vintage fashion, mostly younger buyers browsing a feed. eBay costs more and returns the widest buyer base in resale, auction and offer formats, and category search that works for tools, electronics, and collectibles as well as clothes.
There is also a promo lever on each side. eBay charges promoted-listing rates when you want visibility. Depop offers Boosting at an optional 12% for feed placement, which would erase most of the fee advantage if you turned it on; the comparison above assumes you did not.

## FAQ

**Who charges less, eBay or Depop?**
Depop at every price we checked. Its only seller-side line is the payment processor; eBay stacks a percentage, a per-order fee, and a listing fee.

**Does Depop really have zero selling fee?**
For US, UK, and Australian sellers, yes. The 10% commission only applies to sellers elsewhere. US sellers pay the payment line and nothing else.

**Is eBay's small-order tier enough to catch up?**
No. At $9.50 the eBay fee is $1.59 against Depop's $0.76, with the tier already applied.

**Where should vintage clothes go?**
Both take them. Depop if the buyer is browsing for style; eBay if the item needs search terms to find its person. The fee difference favors Depop by roughly $4 on a $40 sale.

Internal links: eBay fee calculator (#2) · Depop fee calculator (#6) · how much eBay takes (#9) · how much Depop takes (#28) · fees comparison table (#8)
