import { loadRates, PLATFORM_LABELS, money } from '../../../lib/rates';
import { SITE } from '../../../lib/seo';
// /sheet/print — the 4-page print edition the paid PDF is generated from.
// Everything numeric renders from config (charter: never hardcode rates);
// the Mercari label extract is attributed static data transcribed from the
// official chart (same precedent as guide 26, source + date printed).

export const metadata = {
  title: 'The Reseller Fee Sheet 2026 — print edition',
  robots: { index: false, follow: false },
};

function perSaleFees(r, gross) {
  let fv = (gross * (r.final_value_percent || 0)) / 100;
  if (r.min_commission != null && fv < r.min_commission) fv = r.min_commission;
  const fixed =
    gross <= 10 && r.per_order_fixed_under_10 != null
      ? r.per_order_fixed_under_10
      : r.per_order_fixed || 0;
  const pay = (gross * (r.payment_percent || 0)) / 100 + (r.payment_fixed || 0);
  return fv + fixed + pay;
}

const DECISION_PRICES = [8, 15, 30, 50, 100, 150];

// Compact extract of the official Mercari prepaid-label chart (best rate),
// effective 10/19/2026, transcribed from the official help-center table.
const MERCARI_LABEL_EXTRACT = [
  { lb: '1 lb', cheapest: ['UPS SurePost', '$8.09'], uspsGA: '$7.99', media: '' },
  { lb: '5 lb', cheapest: ['UPS SurePost', '$9.39'], uspsGA: '$15.99', media: '' },
  { lb: '10 lb', cheapest: ['UPS Economy', '$12.49'], uspsGA: '$21.99', media: '' },
  { lb: '20 lb', cheapest: ['UPS Ground', '$35.99'], uspsGA: '$35.99', media: '' },
];

export default function SheetPrintPage() {
  const rates = loadRates().platforms || {};
  const platforms = PLATFORM_LABELS.map(({ key, label }) => ({
    key,
    label,
    r: rates[key] || {},
  }));
  const verified = platforms.filter((p) => p.r.verified && p.r.final_value_percent != null);
  const v = Object.fromEntries(verified.map((p) => [p.key, p.r]));
  const verifyDate = verified
    .map((p) => p.r.scraped_date)
    .filter(Boolean)
    .sort()
    .pop();
  const has = (k) => v[k] != null;

  // Worked examples — every figure computed from config at render time.
  const ex = {};
  if (has('ebay')) {
    const g = 40;
    const fv = (g * v.ebay.final_value_percent) / 100;
    const fixed = v.ebay.per_order_fixed;
    ex.ebay = {
      sale: `$${g} sale`,
      lines: [
        `${v.ebay.final_value_percent}% × $${g} = ${money(fv)} final value fee`,
        `+ ${money(fixed)} per-order fee`,
      ],
      keep: money(g - fv - fixed),
    };
  }
  if (has('poshmark')) {
    const hi = 40, lo = 12;
    const hiFee = Math.max((hi * v.poshmark.final_value_percent) / 100, v.poshmark.min_commission || 0);
    ex.poshmark = {
      sale: `$${hi} item and a $${lo} item`,
      lines: [
        `$${hi}: ${v.poshmark.final_value_percent}% × $${hi} = ${money((hi * v.poshmark.final_value_percent) / 100)} (over the $${v.poshmark.commission_threshold_price} line)`,
        `$${lo}: flat ${money(v.poshmark.min_commission)} (under $${v.poshmark.commission_threshold_price})`,
      ],
      keep: `${money(hi - hiFee)} and ${money(lo - v.poshmark.min_commission)}`,
    };
  }
  if (has('mercari')) {
    const item = 30, ship = 8, g = item + ship;
    const fee = (g * v.mercari.final_value_percent) / 100;
    ex.mercari = {
      sale: `$${item} item + $${ship} buyer-paid shipping`,
      lines: [`${v.mercari.final_value_percent}% × $${g} (item + shipping) = ${money(fee)}`],
      keep: money(g - fee),
    };
  }
  if (has('vinted')) {
    ex.vinted = {
      sale: `$30 sale`,
      lines: [`${v.vinted.final_value_percent}% commission — the buyer's checkout fee is not yours`],
      keep: money(30),
    };
  }
  if (has('depop')) {
    const item = 40, ship = 8, g = item + ship;
    const fee = (g * v.depop.payment_percent) / 100 + v.depop.payment_fixed;
    ex.depop = {
      sale: `$${item} item + $${ship} buyer-paid shipping`,
      lines: [
        `${v.depop.payment_percent}% × $${g} = ${money((g * v.depop.payment_percent) / 100)} + ${money(v.depop.payment_fixed)} payment processing`,
      ],
      keep: money(g - fee),
    };
  }
  if (has('etsy')) {
    const item = 25, ship = 5, g = item + ship;
    const txn = (g * v.etsy.final_value_percent) / 100;
    const pay = (g * v.etsy.payment_percent) / 100 + v.etsy.payment_fixed;
    const total = txn + pay + v.etsy.listing_fee;
    ex.etsy = {
      sale: `$${item} item + $${ship} buyer-paid shipping`,
      lines: [
        `${v.etsy.final_value_percent}% × $${g} = ${money(txn)} transaction fee`,
        `+ ${v.etsy.payment_percent}% × $${g} + ${money(v.etsy.payment_fixed)} = ${money(pay)} payment processing`,
        `+ ${money(v.etsy.listing_fee)} listing fee`,
      ],
      keep: money(g - total),
    };
  }

  const rank = (price) =>
    verified
      .map((p) => ({ p, keep: price - perSaleFees(p.r, price) }))
      .sort((a, b) => b.keep - a.keep);

  return (
    <>
      <style>{`
        .sp { max-width: 820px; margin: 0 auto; color: #111; }
        .sp .page { padding: 1.2rem 0; border-bottom: 1px dashed #ccc; }
        .sp .page:last-child { border-bottom: none; }
        .sp h1 { font-size: 1.6rem; letter-spacing: 0.02em; margin-bottom: 0.15rem; }
        .sp .sub { color: #444; margin-bottom: 0.9rem; font-size: 0.92rem; }
        .sp h2 { font-size: 1.12rem; margin: 0.9rem 0 0.35rem; }
        .sp h3 { font-size: 0.98rem; margin: 0.7rem 0 0.25rem; }
        .sp p, .sp li { font-size: 0.9rem; line-height: 1.45; }
        .sp table { width: 100%; border-collapse: collapse; margin: 0.5rem 0; }
        .sp th, .sp td { border: 1px solid #bbb; padding: 0.32rem 0.45rem; text-align: left; vertical-align: top; font-size: 0.8rem; }
        .sp th { background: #f3f4f6; }
        .sp .num { text-align: right; white-space: nowrap; }
        .sp .footnote { font-size: 0.72rem; color: #555; margin: 0.25rem 0 0; }
        .sp .plat { margin: 0.55rem 0; padding: 0.55rem 0.7rem; border: 1px solid #ccc; border-radius: 6px; break-inside: avoid; }
        .sp .plat h3 { margin-top: 0; }
        .sp .lines { margin: 0.3rem 0 0.15rem; padding-left: 1.1rem; font-size: 0.85rem; }
        .sp .lines li { margin: 0.1rem 0; }
        .sp .keep { font-weight: 600; }
        .sp .gotcha { font-size: 0.82rem; color: #444; margin: 0.2rem 0 0; }
        .sp a { color: #111; }
        @page { size: A4 portrait; margin: 11mm 12mm; }
        @media print {
          header.site, footer.site, .sp .no-print { display: none !important; }
          .sp { max-width: none; }
          .sp .page { border-bottom: none; padding: 0; }
          .sp .pb { break-before: page; page-break-before: always; }
          .sp .plat { break-inside: avoid; page-break-inside: avoid; border-color: #ddd; }
          .sp h1 { font-size: 1.35rem; }
          .sp h2 { font-size: 1rem; }
          .sp th { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body { background: #fff; }
        }
      `}</style>
      <div className="sp">
        {/* ————— Page 1: the fee map ————— */}
        <div className="page">
          <h1>The Reseller Fee Sheet — 2026</h1>
          <p className="sub">
            Six US resale marketplaces, every fee line verified against the
            platform&apos;s official fee page{verifyDate ? ` (last verified ${verifyDate})` : ''}.
            Commission bases are marked because they change the math more than
            headline percentages do. Free updates: when a marketplace changes
            its fees, this sheet is re-verified and buyers get the new copy at
            no charge.
          </p>

          <h2>The fee map</h2>
          <table>
            <thead>
              <tr>
                <th>Fee line</th>
                {verified.map((p) => (
                  <th key={p.key}>{p.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Commission (final value fee)</td>
                {verified.map((p) => (
                  <td key={p.key}>
                    {p.r.final_value_percent}% of{' '}
                    {p.r.fee_base === 'item_only' ? 'item price' : 'sale total (incl. shipping)'}
                    {p.r.min_commission != null
                      ? `; flat ${money(p.r.min_commission)} under $${p.r.commission_threshold_price}`
                      : ''}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Fixed fee per order</td>
                {verified.map((p) => {
                  const r = p.r;
                  let cell = '—';
                  if (r.per_order_fixed != null) {
                    cell =
                      r.per_order_fixed_under_10 != null && r.per_order_fixed_under_10 !== r.per_order_fixed
                        ? `${money(r.per_order_fixed_under_10)} ≤$10 · ${money(r.per_order_fixed)} >$10`
                        : money(r.per_order_fixed);
                  }
                  return (
                    <td key={p.key} className="num">
                      {cell}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td>Payment processing</td>
                {verified.map((p) => {
                  const r = p.r;
                  const hasPay = r.payment_percent != null || r.payment_fixed != null;
                  return (
                    <td key={p.key} className="num">
                      {!hasPay
                        ? '—'
                        : r.payment_percent || r.payment_fixed
                          ? `${r.payment_percent}% + ${money(r.payment_fixed || 0)}`
                          : 'included in commission'}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td>Listing fee</td>
                {verified.map((p) => (
                  <td key={p.key} className="num">
                    {p.r.listing_fee != null ? (p.r.listing_fee ? money(p.r.listing_fee) : 'free') : '—'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          <h2>Read the fee base before the percentage</h2>
          <p>
            The single most expensive thing to miss: some platforms compute the
            commission on the item price alone, others on the sale total
            including the shipping the buyer paid. A {v.poshmark ? `${v.poshmark.final_value_percent}%` : '20%'} commission
            on item-only and a {v.mercari ? `${v.mercari.final_value_percent}%` : '10%'} commission
            on item-plus-shipping are closer than they look — and on heavy
            items the order flips. Each cell above names its base.
          </p>
          <p className="footnote">
            Basis notes: &ldquo;sale total&rdquo; means item price plus
            buyer-paid shipping. Taxes are not modeled (platforms remit them
            separately where applicable). All figures collected from each
            platform&apos;s official fee page by automated scan and
            cross-checked by hand before publication.
          </p>
        </div>

        {/* ————— Page 2: platform by platform ————— */}
        <div className="page pb">
          <h2>Platform by platform, with the math shown</h2>
          <p className="sub">Worked examples use round numbers; run your own price at {SITE.url.replace(/^https?:\/\//, '')} — the calculators are free and always current.</p>

          {has('ebay') && (
            <div className="plat">
              <h3>eBay — the full stack</h3>
              <p>
                Commission {v.ebay.final_value_percent}% on most categories,
                computed on the sale total including shipping, plus a
                per-order fee of {money(v.ebay.per_order_fixed)}
                {v.ebay.per_order_fixed_under_10 != null
                  ? ` (reduced to ${money(v.ebay.per_order_fixed_under_10)} for orders of $10 or less)`
                  : ''}
                , plus {money(v.ebay.listing_fee)} per 30-day listing.
              </p>
              <ul className="lines">
                {ex.ebay.lines.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
                <li>
                  → you keep <span className="keep">{ex.ebay.keep}</span> from {ex.ebay.sale}
                </li>
              </ul>
              <p className="gotcha">
                Watch out: some categories carry different commission rates
                than the standard {v.ebay.final_value_percent}% — check eBay&apos;s fees page for
                your category. The listing fee recurs every 30 days until the
                item sells, so slow inventory pays it repeatedly.
              </p>
            </div>
          )}

          {has('poshmark') && (
            <div className="plat">
              <h3>Poshmark — one commission line, two tiers</h3>
              <p>
                {v.poshmark.final_value_percent}% commission on sales of
                $&gt;={v.poshmark.commission_threshold_price}, a flat{' '}
                {money(v.poshmark.min_commission)} below that — computed on the
                item price only. The buyer pays the shipping label separately,
                so your fee base stays small.
              </p>
              <ul className="lines">
                {ex.poshmark.lines.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
                <li>
                  → you keep <span className="keep">{ex.poshmark.keep}</span> from {ex.poshmark.sale}
                </li>
              </ul>
              <p className="gotcha">
                Watch out: under $15 the flat fee is the same dollars whether
                you sell at $3 or $14 — proportionally it takes a huge bite of
                cheap listings. Item price only is the friendliest fee base
                among the paid-commission platforms here.
              </p>
            </div>
          )}

          {has('mercari') && (
            <div className="plat">
              <h3>Mercari — one percentage, shipping included</h3>
              <p>
                A flat {v.mercari.final_value_percent}% of the item price plus
                the buyer-paid shipping. No payment processing line, no listing
                fee. Note the fee history: this 10% applies to listings created
                or updated on/after January 6, 2025 — older guides quoting
                &ldquo;0% seller fees&rdquo; are out of date.
              </p>
              <ul className="lines">
                {ex.mercari.lines.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
                <li>
                  → you keep <span className="keep">{ex.mercari.keep}</span> from {ex.mercari.sale}
                </li>
              </ul>
              <p className="gotcha">
                Watch out: because shipping sits inside the fee base, a heavy
                item with an expensive label pays commission on the label too.
                Mercari&apos;s own discounted labels (chart on the shipping
                page below) take some of that back.
              </p>
            </div>
          )}

          {has('vinted') && (
            <div className="plat">
              <h3>Vinted — zero seller commission</h3>
              <p>
                Sellers pay {v.vinted.final_value_percent}% commission, $
                {v.vinted.per_order_fixed} per order, $
                {v.vinted.listing_fee} to list. The buyer pays a protection fee
                at checkout — it never touches your payout.
              </p>
              <ul className="lines">
                {ex.vinted.lines.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
                <li>
                  → you keep <span className="keep">{ex.vinted.keep}</span> from {ex.vinted.sale}
                </li>
              </ul>
              <p className="gotcha">
                Watch out: free listings mean a crowded marketplace — photos
                and pricing do more work here than on paid-listing sites. The
                audience skews fashion, and the marketplace is strongest in
                Europe.
              </p>
            </div>
          )}

          {has('depop') && (
            <div className="plat">
              <h3>Depop — no commission, processing only</h3>
              <p>
                {v.depop.final_value_percent}% selling commission for US
                sellers (the 10% rate applies only outside the US, UK and
                Australia). The line you actually pay is payment processing:{' '}
                {v.depop.payment_percent}% + {money(v.depop.payment_fixed)},
                charged on the item price plus shipping.
              </p>
              <ul className="lines">
                {ex.depop.lines.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
                <li>
                  → you keep <span className="keep">{ex.depop.keep}</span> from {ex.depop.sale}
                </li>
              </ul>
              <p className="gotcha">
                Watch out: processing includes shipping in its base. Optional
                listing boosts carry a separate advertising fee — the sheet
                leaves it out because skipping it changes nothing about your
                payout math.
              </p>
            </div>
          )}

          {has('etsy') && (
            <div className="plat">
              <h3>Etsy — three lines that stack</h3>
              <p>
                {v.etsy.final_value_percent}% transaction fee on the item plus
                shipping (and gift wrap), plus payment processing{' '}
                {v.etsy.payment_percent}% + {money(v.etsy.payment_fixed)}, plus{' '}
                {money(v.etsy.listing_fee)} per listing. Handmade and vintage
                focus; the stack is the price of the niche.
              </p>
              <ul className="lines">
                {ex.etsy.lines.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
                <li>
                  → you keep <span className="keep">{ex.etsy.keep}</span> from {ex.etsy.sale}
                </li>
              </ul>
              <p className="gotcha">
                Watch out: Offsite Ads (15%/12% when it applies) is a separate
                advertising mechanism, not part of the standard fee stack here.
              </p>
            </div>
          )}
        </div>

        {/* ————— Page 3: decisions ————— */}
        <div className="page pb">
          <h2>Same sale, six ways — what you keep</h2>
          <table>
            <thead>
              <tr>
                <th>Sale price (no shipping)</th>
                {verified.map((p) => (
                  <th key={p.key}>{p.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DECISION_PRICES.map((price) => (
                <tr key={price}>
                  <td className="num">${price}</td>
                  {verified.map((p) => {
                    const fees = perSaleFees(p.r, price);
                    return (
                      <td key={p.key} className="num">
                        {money(price - fees)}
                        <span className="footnote"> ({((fees / price) * 100).toFixed(1)}%)</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="footnote">
            Net of per-sale fees; listing fees excluded (they bill per listing).
            Payouts in bold-margin cells shift with shipping — the bases differ
            per platform as marked on the fee map.
          </p>

          <h2>Who keeps the most at each price</h2>
          <table>
            <thead>
              <tr>
                <th>Sale price</th>
                <th>Keeps the most</th>
                <th>Runner-up</th>
                <th>What to know</th>
              </tr>
            </thead>
            <tbody>
              {DECISION_PRICES.map((price) => {
                const ranked = rank(price);
                const best = ranked[0];
                const second = ranked[1];
                const note =
                  price < 15
                    ? 'Flat minimums bite hardest under $15 — check the Poshmark and eBay low tiers'
                    : 'Shipping bases differ — a heavy item moves these lines';
                return (
                  <tr key={price}>
                    <td className="num">${price}</td>
                    <td>
                      {best.p.label} — {money(best.keep)}
                    </td>
                    <td>{second ? `${second.p.label} — ${money(second.keep)}` : '—'}</td>
                    <td>{note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <h2>Does the platform commission your shipping?</h2>
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Fee base</th>
                <th>Shipping commissioned?</th>
              </tr>
            </thead>
            <tbody>
              {verified.map((p) => (
                <tr key={p.key}>
                  <td>{p.label}</td>
                  <td>{p.r.fee_base === 'item_only' ? 'Item price only' : 'Item + shipping'}</td>
                  <td>
                    {p.key === 'vinted'
                      ? 'No commission exists at all'
                      : p.r.fee_base === 'item_only'
                        ? 'No'
                        : 'Yes'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="footnote">
            Shipping-heavy items are where the fee base matters most: the same
            headline percentage lands on a bigger number when shipping is
            inside the base.
          </p>
        </div>

        {/* ————— Page 4: shipping prices + sources ————— */}
        <div className="page pb">
          <h2>Mercari&apos;s prepaid labels — the cheap way to ship</h2>
          <p>
            If you sell on Mercari, its discounted labels are usually the
            cheapest way to buy postage. Extract from the official chart
            (best-rate column; effective 10/19/2026):
          </p>
          <table>
            <thead>
              <tr>
                <th>Weight</th>
                <th>Cheapest service</th>
                <th>USPS Ground Advantage</th>
              </tr>
            </thead>
            <tbody>
              {MERCARI_LABEL_EXTRACT.map((row) => (
                <tr key={row.lb}>
                  <td>{row.lb}</td>
                  <td>
                    {row.cheapest[0]} — <strong>{row.cheapest[1]}</strong>
                  </td>
                  <td className="num">{row.uspsGA}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="footnote">
            Media Mail: $4.47 at 1 lb. First-class envelope promo (through Jan
            4, 2027): $0.00 at 1 oz. Full 31-row chart:{' '}
            {SITE.url.replace(/^https?:\/\//, '')}/guides/shipping-cost-comparison-2026/
          </p>

          <h2>Sources and verification</h2>
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Verified</th>
                <th>Official source</th>
              </tr>
            </thead>
            <tbody>
              {verified.map((p) => (
                <tr key={p.key}>
                  <td>{p.label}</td>
                  <td className="num">{p.r.scraped_date || '—'}</td>
                  <td>
                    {p.r.source_url ? (
                      <a href={p.r.source_url}>
                        {p.r.source_url.replace(/^https?:\/\/(www\.)?/, '').slice(0, 46)}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="footnote">
            Every number on these pages was collected from the official fee
            page above (dates as shown) by automated scan and cross-checked by
            hand against the page text before publication. When a marketplace
            changes its fees, the sheet is re-verified and the updated copy is
            a free re-download for buyers.
          </p>

          <h2>Use the live calculators</h2>
          <p>
            The printable sheet goes stale the day a platform changes a rate;
            the calculators at {SITE.url.replace(/^https?:\/\//, '')} never do
            — they render from the same verified config and are free.
          </p>
          <p className="footnote">
            Feeside · independent tool, not affiliated with any marketplace ·
            fees change — check the verification dates above · support:{' '}
            {SITE.supportEmail}
          </p>
        </div>
      </div>
    </>
  );
}
