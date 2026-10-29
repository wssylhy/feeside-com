---
page_type: compare
primary_keyword: poshmark vs mercari fees
secondary_keywords: [which is better poshmark or mercari]
config_deps: [rates.poshmark.final_value_percent, rates.poshmark.per_order_fixed, rates.mercari.final_value_percent, rates.mercari.payment_percent, rates.mercari.payment_fixed]
batch: 2
---

# Poshmark vs Mercari Fees: Same Sale, Two Payouts

Intro: Poshmark and Mercari look similar — fashion-heavy, app-first, social selling — but their fee sheets differ in shape: Poshmark takes one flat commission line (`{{rates.poshmark.final_value_percent}}`% at $15+), while Mercari stacks a selling fee (`{{rates.mercari.final_value_percent}}`%) plus payment processing (`{{rates.mercari.payment_percent}}% + ${{rates.mercari.payment_fixed}}`). Run the same price through both below and the difference is exact, not anecdotal. *(交互区由组件渲染)*

## Where the structures differ
- **Line count:** Poshmark = one line above $15 (and a flat fee below); Mercari = two stacked lines. Simplicity itself has value when you are pricing fifty listings.
- **Fee base:** Poshmark's commission applies to the item price under its standard shipping flow; Mercari's fees apply to the buyer's total when a Mercari label is used — shipping is inside the base.
- **The sub-$15 zone:** Poshmark's flat fee bites hardest here; Mercari's stacked percentages take their share everywhere. Cheap-item sellers: check both at your real price.

## Worked example (example only)
A $22 top, buyer pays shipping on both platforms: Poshmark's payout is price minus one line; Mercari's payout is price minus two lines. The calculator prints both net numbers side by side — plus the effective percentage each platform really took.

## Which should you list on?
Fees are one input; the other is audience. Poshmark's social/bundling culture suits closets of similar style; Mercari's broader catalog suits mixed goods. The fee edge flips by price band — this page's calculators settle the fee half for your exact price.

## FAQ
**Which is better, Poshmark or Mercari?**
For low prices, run the numbers — Poshmark's flat fee vs Mercari's stack lands differently by price band. For reach and audience, they differ in culture more than in category.

**Does Poshmark or Mercari charge sellers for shipping?**
Neither charges sellers for the buyer-paid standard label. The difference is whether shipping sits inside the fee base (Mercari with its label: yes; Poshmark standard flow: no).

Internal links: Poshmark fee calculator (#3) · Mercari fee calculator (#4) · Poshmark vs eBay fees (#1)
