---
page_type: qa
primary_keyword: how much does vinted take
secondary_keywords: [vinted fees for sellers, does vinted charge fees, vinted fees explained]
config_deps: [rates.vinted.final_value_percent, rates.vinted.per_order_fixed, rates.vinted.listing_fee]
batch: 6
---

# How Much Does Vinted Take From Sellers?

Intro: Short answer: nothing. Vinted's seller commission is `{{rates.vinted.final_value_percent}}%`, there is no fixed per-order fee (`{{rates.vinted.per_order_fixed}}`), and standard listings cost `{{rates.vinted.listing_fee}}` to post. The fee people associate with Vinted is charged to the buyer at checkout. The seller side, the buyer side, and the trade-off are below. *(渲染自 config；未核验字段自动降级)*

## The seller side, line by line
- Commission: {{rates.vinted.final_value_percent}}% of the sale price
- Fixed per-order fee: ${{rates.vinted.per_order_fixed}}
- Listing fee: ${{rates.vinted.listing_fee}} on standard listings

The price you list is, in practice, the money that reaches your payout. If you ship on the buyer's label there is nothing else to subtract on Vinted's side.

## Where Vinted's fees actually live
At checkout the buyer pays a protection fee on top of the item price, plus the shipping label. That line funds buyer protection and payment handling, and it is the reason your payout can stay whole. From the seller's side of the screen it never touches your numbers.

## The trade-off, stated plainly
Zero seller fees mean zero friction to listing, and that shows in the crowd. A fashion-focused marketplace with free listings is a busy place, so photos and pricing do more of the selling work than on platforms where every listing costs money to hold up. An item that sells in a week on a paid-listing site can beat one that sits a month on a free one.

## Worked example (example only)
A $30 top, buyer pays shipping: Vinted's fee lines total $0, payout $30. The same $30 sale carries {{rates.mercari.final_value_percent}}% commission on Mercari and crosses into Poshmark's percentage tier at $15. Run your own price through the calculator below.

## FAQ
**Does Vinted charge sellers anything?**
No commission, no fixed fee, and no listing fee on standard sales. All three lines are zero in our verified config.

**Why do people say Vinted has fees?**
Because buyers pay one. The checkout protection fee goes toward protection and payment handling, and it never comes out of your payout.

**Is selling on Vinted really free?**
The core sale flow is. Optional extras like label upgrades cost money; standard listings and sales do not.

**What sells well on Vinted?**
Clothing, shoes, and accessories, especially in the low and mid-price range where a percentage fee would hurt most. See the sub-$20 comparison for the fee math on cheap items.

Internal links: Vinted fee calculator (#5) · Vinted vs Depop fees (#12) · eBay vs Vinted fees (#19) · where to sell cheap items (#25) · how much Depop takes (#28)
