---
page_type: compare
primary_keyword: poshmark vs depop fees
secondary_keywords: [depop vs poshmark fees, poshmark or depop for selling]
config_deps: [rates.poshmark.final_value_percent, rates.poshmark.min_commission, rates.poshmark.commission_threshold_price, rates.depop.payment_percent, rates.depop.payment_fixed]
batch: 6
---

# Poshmark vs Depop Fees: Two Ways to Charge a Fashion Seller

Intro: Poshmark takes `{{rates.poshmark.final_value_percent}}%` commission on sales of ${{rates.poshmark.commission_threshold_price}} and up, and a flat ${{rates.poshmark.min_commission}} below that, computed on the item price only. Depop takes no commission in the US; its line is payment processing, {{rates.depop.payment_percent}}% + ${{rates.depop.payment_fixed}} on the item plus shipping. Written out, the fee race is not close at most prices. What Poshmark's fee buys is the part the numbers cannot settle. *(渲染自 config；派生数为当前 verified 费率下的复算)*

## The structures
Poshmark: one commission line on the item price, flat below ${{rates.poshmark.commission_threshold_price}}, percentage at ${{rates.poshmark.commission_threshold_price}} and above. The buyer pays the label separately.
Depop: no commission; payment processing on the item price plus shipping.

## Side by side at three prices
Fee totals and payouts on current verified rates:
- $12 item, $5 shipping: Poshmark ${{rates.poshmark.min_commission}}, keep $9.05. Depop ≈ $1.01, keep $15.99.
- $25 item, $8 shipping: Poshmark $5.00, keep $20.00. Depop ≈ $1.54, keep $31.46.
- $60 item, $10 shipping: Poshmark $12.00, keep $48.00. Depop ≈ $2.76, keep $67.24.

Note the fee bases while reading those totals: Poshmark's percentage applies to a smaller number (item only) yet still loses on size, because {{rates.poshmark.final_value_percent}}% is a lot of percentage.

## Why the gap is not the whole decision
Fee totals this lopsided usually mean the platforms sell sellers different things. Poshmark's commission funds its social selling format and a buyer base that shows up for it; Depop's lean fee sheet comes with leaner selling machinery. Sellers who move steady volume tend to weigh days-to-sale and the buyer's willingness to pay your price more heavily than a few points of percentage.

## FAQ
**Which is cheaper, Poshmark or Depop?**
Depop at the prices we checked: its processing line stays under $3 on sales up to about $70 total, while Poshmark's {{rates.poshmark.final_value_percent}}% climbs with price.

**Does Poshmark charge commission on shipping?**
No. The base is the item price only; the buyer pays the label. Depop's processing base includes shipping, which is why its percentage applies to a bigger number and still totals less.

**Why does Poshmark charge a flat fee under $15?**
The ${{rates.poshmark.min_commission}} flat replaces the percentage on small sales. On an $8 item that flat is over a third of the price, which is exactly where fee structure matters most.

**Where should a $20 dress go?**
Run both calculators at your listing price with realistic shipping. At a representative $20 dress plus $7 shipping, Poshmark's commission is $4.00 (keep $16.00) against Depop's ≈ $1.34 (keep $25.66); what the calculators cannot tell you is which platform's buyers are looking for that dress.

Internal links: Poshmark fee calculator (#3) · Depop fee calculator (#6) · how much Poshmark takes (#13) · how much Depop takes (#28) · fees comparison table (#8)
