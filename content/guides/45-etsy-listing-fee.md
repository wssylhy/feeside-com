---
page_type: qa
primary_keyword: etsy listing fee
secondary_keywords: [how much does etsy charge to list, etsy 0.20 listing fee]
config_deps: [rates.etsy.listing_fee, rates.etsy.final_value_percent, rates.etsy.payment_percent, rates.etsy.payment_fixed]
batch: 9
---

# What Is the Etsy Listing Fee?

Intro: {{rates.etsy.listing_fee}} per listing. That buys four months on the marketplace or until the item sells, whichever comes first — and it is owed whether the item sells or not. It is the smallest line in Etsy's stack and the only one you pay before revenue exists. *(渲染自 config；周期规则出自官方 legal/fees 政策)*

## When the 20 cents repeats

- Listing expires unsold after four months → relisting costs another ${{rates.etsy.listing_fee}}.
- Renewing manually → another ${{rates.etsy.listing_fee}}.
- Selling → the listing ends with the sale; if you relist the same item, that is a fresh fee.

One listing, one quick sale: 20 cents total. A shop with sixty slow listings that renew twice a year spends $24 before any new sale. The fee is tiny per item and real at shop scale.

## The 20 cents next to the sale fees

When the item sells, the listing fee joins the stack: {{rates.etsy.final_value_percent}}% transaction plus {{rates.etsy.payment_percent}}% and ${{rates.etsy.payment_fixed}} processing on the order. On a $36 order that stack is $3.87 total, listing fee included — the listing fee is 5% of it. On a same-day sale the listing fee is noise; the place it compounds is inventory that sits and renews.

## Is it worth it?

Twenty cents is the cheapest storefront rent you will find, and Etsy's buyers arrive searching for the categories Etsy allows (handmade, vintage 20 years or older, craft supplies). If your item qualifies and you price inside the sold-listing band, the fee is trivial. If the item qualifies for Etsy but would sit for months, the fee plus the waiting is the cost; compare with a zero-listing-fee marketplace before committing the inventory.

## FAQ

**How much does Etsy charge to list an item?**
${{rates.etsy.listing_fee}} per listing, per four-month cycle or until it sells.

**Do I pay the listing fee again after a sale?**
Only if you relist the same item. A sold listing ends its own cycle.

**Is the listing fee refundable?**
No. It is a flat publishing cost, sale or no sale.

Internal links: Etsy fee calculator (#7) · Etsy transaction fee (#41) · how much Etsy takes (#16) · fees comparison table (#8)
