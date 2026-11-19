---
page_type: compare
primary_keyword: ebay vs mercari fees
secondary_keywords: [mercari fees vs ebay, mercari or ebay for selling]
config_deps: [rates.ebay.final_value_percent, rates.ebay.per_order_fixed, rates.ebay.per_order_fixed_under_10, rates.ebay.listing_fee, rates.mercari.final_value_percent]
batch: 6
---

# eBay vs Mercari Fees: The Flat 10% Against the Stack

Intro: eBay charges `{{rates.ebay.final_value_percent}}%` final value fee on most categories, with shipping inside the base, plus a per-order fixed fee that splits into ${{rates.ebay.per_order_fixed_under_10}} under $10 and ${{rates.ebay.per_order_fixed}} above, plus ${{rates.ebay.listing_fee}} per 30-day listing. Mercari charges one line: {{rates.mercari.final_value_percent}}% of the item price plus buyer-paid shipping, with free listings and no separate processing fee. At every price point we checked, Mercari's line totals less. *(渲染自 config；派生数为当前 verified 费率下的复算)*

## The two structures
eBay: percentage on the total (item plus shipping), a fixed per-order add-on, and the listing fee you paid to post. Three lines, three reasons the total climbs with price and time.
Mercari: a flat {{rates.mercari.final_value_percent}}% and nothing else on standard listings.

## Side by side at three price points
Fee totals on current verified rates, item plus shipping:
- $12 total ($8 item, $4 shipping): eBay ≈ $1.93; Mercari $1.20.
- $31 total ($25 item, $6 shipping): eBay ≈ $4.62; Mercari $3.10.
- $150 total (no shipping): eBay ≈ $20.80; Mercari $15.00.

The listing fee is the quiet difference on slow items: eBay's ${{rates.ebay.listing_fee}} recurs every 30 days per listing until it sells. Amortized over a fast sale it is noise; over a four-month sit it stacks.

## What the fee gap buys on each side
Mercari's fee is smaller. eBay's machinery is bigger: auction and offer formats, a much larger general buyer base, deep category search. A $1.50 difference on a $31 sale is real money when you ship fifty of them; a buyer who only shops one platform is real money once. Fee math decides the platform for volume sellers, audience decides it for everyone else.

## FAQ
**Who charges more, eBay or Mercari?**
On current verified rates, Mercari's flat {{rates.mercari.final_value_percent}}% totals less than eBay's {{rates.ebay.final_value_percent}}% plus fixed fees at every sale price we checked.

**Does Mercari charge payment processing fees?**
There is no separate processing line; the {{rates.mercari.final_value_percent}}% covers the sale.

**Why is eBay's percentage higher if it bundles payments?**
Because eBay's final value fee includes payment handling, the two structures are not comparable line for line. Compare totals at your price, which is what the calculators do.

**Is eBay's fixed fee lower on cheap items?**
Yes. Orders of $10 or less carry the ${{rates.ebay.per_order_fixed_under_10}} tier; larger orders pay ${{rates.ebay.per_order_fixed}}.

Internal links: eBay fee calculator (#2) · Mercari fee calculator (#4) · how much eBay takes (#9) · how much Mercari takes (#17) · fees comparison table (#8)
