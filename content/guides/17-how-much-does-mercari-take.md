---
page_type: qa
primary_keyword: how much does mercari take
secondary_keywords: [mercari fees per sale, mercari selling fees]
config_deps: [rates.mercari.final_value_percent, rates.mercari.payment_percent, rates.mercari.payment_fixed]
batch: 4
---

# How Much Does Mercari Take Per Sale?

Intro: Short answer: one line — a selling fee of `{{rates.mercari.final_value_percent}}%` of what the buyer pays, including shipping when a Mercari label is used. Since January 2025 Mercari folds payment processing into that selling fee, which is why the processing lines above render zero on current rates. The details and where payouts surprise people are below. *(渲染自 config；未核验时首句降级为"a selling fee on the buyer's total — exact rates render above")*

## The one line, explained

**Selling fee:** `{{rates.mercari.final_value_percent}}%` of the total the buyer pays. There is no separate payment processing line and no listing fee; both fields render zero on current rates because processing is folded into the selling fee since the January 2025 fee change.

The reason payouts sometimes feel smaller than expected is the fee base: under the Mercari label flow, shipping rides inside the base, so a lower item price with heavy shipping still pays commission on both.

## Six sale totals on current rates

Fee base: item price plus the buyer-paid label (standard Mercari flow). No processing line, no listing fee — both render zero on current rates.

| Sale total | Mercari fee | You keep | Effective % |
| --- | --- | --- | --- |
| $8 | {{calc:fee:mercari:8}} | {{calc:keep:mercari:8}} | {{calc:pct:mercari:8}} |
| $15 | {{calc:fee:mercari:15}} | {{calc:keep:mercari:15}} | {{calc:pct:mercari:15}} |
| $25 | {{calc:fee:mercari:25}} | {{calc:keep:mercari:25}} | {{calc:pct:mercari:25}} |
| $50 | {{calc:fee:mercari:50}} | {{calc:keep:mercari:50}} | {{calc:pct:mercari:50}} |
| $100 | {{calc:fee:mercari:100}} | {{calc:keep:mercari:100}} | {{calc:pct:mercari:100}} |
| $200 | {{calc:fee:mercari:200}} | {{calc:keep:mercari:200}} | {{calc:pct:mercari:200}} |

## Worked example (example only)
A $55 order with $9 shipping on a Mercari label: the fee applies to $64. The calculator prints the line and the net that arrives in your balance — the two numbers to check against the order breakdown in the app.

## What moves the number
- **Label choice:** a Mercari label puts shipping inside the fee base; shipping on your own changes that base — and your risk. *(以平台最新公告为准)*
- **Price band:** the fixed processing component weighs most on small sales.
- **Promotions:** Mercari occasionally runs fee promos; when active, they change the effective line, not the structure.

## FAQ
**What percentage does Mercari take?**
A flat {{rates.mercari.final_value_percent}}% selling fee on the buyer's total — rendered from our verified config above.

**What are Mercari selling fees?**
One line: {{rates.mercari.final_value_percent}}% on the item price plus buyer-paid shipping. No separate payment processing fee (folded into the selling fee since January 2025) and no listing fee.

**Why is my payout lower than price minus the selling fee?**
Shipping inside the fee base is the usual cause: the percentage applies to the item plus the Mercari label, not the item alone.

**Does Mercari charge a listing fee?**
No listing fee — listing is free.

Internal links: Mercari fee calculator (004-mercari-fee-calculator) · Poshmark vs Mercari fees (010-poshmark-vs-mercari-fees) · Depop vs Mercari fees (18-depop-vs-mercari-fees)
