---
page_type: qa
primary_keyword: depop boosting cost
secondary_keywords: [how much does depop boosting cost, does boosting cost money on depop, depop promote listing fee, depop boosting fee]
config_deps: [rates.depop.payment_percent, rates.depop.payment_fixed, rates.depop.boosting_percent]
batch: 9
title: What Does Depop Boosting Cost? {{rates.depop.boosting_percent}}% on Top of the Normal Fee
description: Boosting a Depop listing adds a {{rates.depop.boosting_percent}}% fee on sales it brings, on top of the usual {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} payment processing. See the full cost on a $40 sale.
updated: 2026-11-26
---

# What Does Depop Boosting Cost?

Intro: Boosting is Depop's optional paid placement. You pay an extra {{rates.depop.boosting_percent}}% fee on sales that come from a boosted listing. It sits on top of the regular Depop Payments line of {{rates.depop.payment_percent}}% plus {{rates.depop.payment_fixed}}, and you choose it per item.

## The full cost when a boosted item sells

A boosted $40 sale carries two lines instead of one:

- Depop Payments: {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} = {{calc:fee:depop:40}}
- Boosting: {{rates.depop.boosting_percent}}% of the sale = {{calc:boost:depop:40}}

Together that is {{calc:boosted:depop:40}} of a $40 sale, against {{calc:fee:depop:40}} unboosted. The boost more than triples what Depop takes on that item.

## When the 12% pays for itself

Boosting only pays for itself if it leads to a sale that would not have happened otherwise. That is most likely on an item that is priced right and has clear photos. On an overpriced item a boost shows the price to more people and still makes no sale, so check the price against recently sold items first.

## The free moves first

Before paying {{rates.depop.boosting_percent}}%, do what costs nothing: retake the first photo, write the brand and size where search can find them, and compare your price with sold listings. Boost what still has no traction after that.

## FAQ

**Is Depop Boosting a subscription?**
No. You choose which listings to boost and can stop boosting at any time. The {{rates.depop.boosting_percent}}% applies to sales of boosted items.

**Does Boosting change the selling fee?**
No. Depop still charges US sellers no selling commission. Boosting is an additional promotional fee, separate from the payment processing line.

**Do I pay for a boost if the item does not sell?**
No. The fee is charged on the sale, not on the listing.

**How much does Depop take on a boosted sale?**
Payment processing of {{rates.depop.payment_percent}}% + {{rates.depop.payment_fixed}} plus {{rates.depop.boosting_percent}}% of the sale. On a $40 sale that is {{calc:boosted:depop:40}} in total.

Internal links: Depop fee calculator (#6) · how much Depop takes (#28) · eBay vs Depop fees (#33) · Etsy vs Depop fees (#37)
