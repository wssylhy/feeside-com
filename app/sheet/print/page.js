import { loadRates, loadEbayCategories, PLATFORM_LABELS, money } from '../../../lib/rates';
import { computeFees, sellerReceivesShipping } from '../../../lib/fees';
import { SITE } from '../../../lib/seo';
// /sheet/print — the print edition the paid PDF is generated from.
// Every fee figure is computed from config at build time through lib/fees.js
// (charter: never hardcode rates). The Mercari label extract is attributed
// static data transcribed from the official chart (same precedent as guide
// 26: source and effective date printed next to it).

export const metadata = {
  title: 'The Reseller Fee Sheet 2026 — print edition',
  robots: { index: false, follow: false },
};

const DECISION_PRICES = [8, 15, 30, 50, 100, 150];

// Extract of the official Mercari prepaid-label chart (best rate column),
// effective 10/19/2026, transcribed from the "Fees on Mercari" help-center
// article (article 169; config source_url below). The full 31-row chart lives
// in content/guides/26-shipping-cost-comparison-2026.md.
const MERCARI_LABELS = {
  source: 'https://www.mercari.com/help/',
  effective: 'October 19, 2026',
  rows: [
    { lb: '1 lb', best: 'USPS Ground Advantage — $7.99', next: 'UPS SurePost and UPS Economy — $8.09' },
    { lb: '2 lb', best: 'UPS SurePost and UPS Economy — $8.49', next: 'USPS Ground Advantage — $13.09' },
    { lb: '5 lb', best: 'UPS SurePost and UPS Economy — $9.39', next: 'USPS Ground Advantage — $15.99' },
    { lb: '10 lb', best: 'UPS Economy — $12.49', next: 'UPS Ground — $18.49' },
    { lb: '20 lb', best: 'UPS Ground, UPS Economy, FedEx Home Delivery, USPS Ground Advantage — $35.99', next: 'USPS Priority Mail — $67.99' },
  ],
};

// Show the platform's real page for archived sources (Etsy was collected from
// a web.archive.org snapshot of etsy.com/legal/fees).
const sourceDisplay = (url) => url.replace(/^https:\/\/web\.archive\.org\/web\/[\da-z_]+\//, '').replace(/^https?:\/\/(www\.)?/, '');

export default function SheetPrintPage() {
  const rates = loadRates().platforms || {};
  const verified = PLATFORM_LABELS.map(({ key, label }) => ({ key, label, r: rates[key] || {} })).filter(
    (p) => p.r.verified && p.r.final_value_percent != null
  );
  const v = Object.fromEntries(verified.map((p) => [p.key, p.r]));
  const has = (k) => v[k] != null;
  const verifyDate = verified.map((p) => p.r.scraped_date).filter(Boolean).sort().pop();
  const host = SITE.url.replace(/^https?:\/\//, '');

  // Per-sale fees on the item price, shipping excluded, listing fees excluded.
  const saleAt = (price) =>
    verified.map((p) => ({ p, c: computeFees(p.r, price, 0, { excludeListing: true }) })).sort((a, b) => b.c.net - a.c.net);

  // Worked examples: every figure comes from computeFees on the config.
  const ex = {};
  if (has('ebay')) {
    const c = computeFees(v.ebay, 40, 0, { excludeListing: true });
    ex.ebay = { keep: money(c.net), fv: money(c.fv), fixed: money(c.fixed) };
  }
  if (has('poshmark')) {
    const hi = computeFees(v.poshmark, 40, 0, { excludeListing: true });
    const lo = computeFees(v.poshmark, 12, 0, { excludeListing: true });
    ex.poshmark = { hiFee: money(hi.fee), hiKeep: money(hi.net), loFee: money(lo.fee), loKeep: money(lo.net) };
  }
  if (has('mercari')) {
    const c = computeFees(v.mercari, 30, 8, { excludeListing: true });
    ex.mercari = { fee: money(c.fee), net: money(c.net) };
  }
  if (has('vinted')) {
    ex.vinted = { net: money(computeFees(v.vinted, 30, 0, { excludeListing: true }).net) };
  }
  if (has('depop')) {
    const c = computeFees(v.depop, 40, 8, { excludeListing: true });
    ex.depop = { pctPart: money((48 * v.depop.payment_percent) / 100), fee: money(c.fee), net: money(c.net) };
  }
  if (has('etsy')) {
    const c = computeFees(v.etsy, 25, 5);
    ex.etsy = { txn: money((30 * v.etsy.final_value_percent) / 100), pay: money(c.pay), fee: money(c.fee), net: money(c.net) };
  }
  // The one case where Poshmark's higher headline rate is the cheaper fee.
  const flip = has('poshmark') && has('mercari')
    ? computeFees(v.poshmark, 20, 20, { excludeListing: true }).fee
    : null;

  const cats = loadEbayCategories();
  const catRows = cats.meta && cats.meta.verified === true ? Object.values(cats.categories || {}) : [];

  const listingCell = (r) => {
    if (!r.listing_fee) return 'free';
    return r.listing_fee_free_per_month
      ? `${money(r.listing_fee)} after ${r.listing_fee_free_per_month} free listings a month`
      : `${money(r.listing_fee)} per listing`;
  };

  return (
    <>
      <style>{`
        .sp { max-width: 820px; margin: 0 auto; color: #111; }
        .sp .page { padding: 1.2rem 0; border-bottom: 1px dashed #ccc; }
        .sp h1 { font-size: 1.6rem; letter-spacing: 0.02em; margin-bottom: 0.15rem; }
        .sp .sub { color: #444; margin-bottom: 0.9rem; font-size: 0.92rem; }
        .sp h2 { font-size: 1.12rem; margin: 0.9rem 0 0.35rem; }
        .sp h3 { font-size: 0.98rem; margin: 0 0 0.25rem; }
        .sp p, .sp li { font-size: 0.9rem; line-height: 1.45; }
        .sp table { width: 100%; border-collapse: collapse; margin: 0.5rem 0; }
        .sp th, .sp td { border: 1px solid #bbb; padding: 0.32rem 0.45rem; text-align: left; vertical-align: top; font-size: 0.8rem; }
        .sp th { background: #f3f4f6; }
        .sp .num { text-align: right; white-space: nowrap; }
        .sp .footnote { font-size: 0.72rem; color: #555; margin: 0.25rem 0 0; }
        .sp .plat { margin: 0.6rem 0; padding: 0.6rem 0.75rem; border: 1px solid #ccc; border-radius: 6px; break-inside: avoid; page-break-inside: avoid; }
        .sp .lines { margin: 0.3rem 0 0.15rem; padding-left: 1.1rem; font-size: 0.85rem; }
        .sp .lines li { margin: 0.1rem 0; }
        .sp .keep { font-weight: 600; }
        .sp .gotcha { font-size: 0.82rem; color: #444; margin: 0.2rem 0 0; }
        .sp a { color: #111; }
        @page { size: Letter; margin: 0.5in 0.55in; }
        @media print {
          header.site, footer.site { display: none !important; }
          .sp { max-width: none; }
          .sp .page { border-bottom: none; padding: 0; }
          .sp .pb { break-before: page; page-break-before: always; }
          .sp h1 { font-size: 1.35rem; }
          .sp h2 { font-size: 1rem; }
          .sp th { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body { background: #fff; }
        }
      `}</style>
      <div className="sp">
        {/* Page 1: the fee map */}
        <div className="page">
          <h1>The Reseller Fee Sheet — 2026</h1>
          <p className="sub">
            Six US resale marketplaces, every fee line checked against the platform&apos;s official
            fee page{verifyDate ? ` (most recent check: ${verifyDate})` : ''}. What counts toward each
            fee is marked, because the fee base changes the math more than the headline percentage
            does. When a marketplace changes its fees this sheet is re-checked and buyers get the
            new copy free.
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
                <td>Selling fee (final value fee)</td>
                {verified.map((p) => (
                  <td key={p.key}>
                    {p.r.final_value_percent}% of{' '}
                    {p.r.fee_base === 'item_only' ? 'item price' : 'sale total (item + shipping)'}
                    {p.r.min_commission != null
                      ? `, or a flat ${money(p.r.min_commission)} under $${p.r.commission_threshold_price}`
                      : ''}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Fixed fee per order</td>
                {verified.map((p) => (
                  <td key={p.key} className="num">
                    {!p.r.per_order_fixed
                      ? 'none'
                      : p.r.per_order_fixed_under_10 != null && p.r.per_order_fixed_under_10 !== p.r.per_order_fixed
                        ? `${money(p.r.per_order_fixed_under_10)} at $10 or less, ${money(p.r.per_order_fixed)} above`
                        : money(p.r.per_order_fixed)}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Payment processing</td>
                {verified.map((p) => (
                  <td key={p.key} className="num">
                    {p.r.payment_percent || p.r.payment_fixed
                      ? `${p.r.payment_percent}% + ${money(p.r.payment_fixed)}`
                      : p.key === 'vinted'
                        ? 'none'
                        : 'none charged separately'}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Listing fee</td>
                {verified.map((p) => (
                  <td key={p.key} className="num">{listingCell(p.r)}</td>
                ))}
              </tr>
            </tbody>
          </table>

          <h2>Read the fee base before the percentage</h2>
          {has('poshmark') && has('mercari') && flip != null && (
            <p>
              Poshmark&apos;s {v.poshmark.final_value_percent}% is charged on the item price only. Mercari&apos;s{' '}
              {v.mercari.final_value_percent}% is charged on the item plus the shipping the buyer pays.
              Even so, Mercari takes less unless the shipping costs more than the item: on a $20 item
              with $20 of shipping both platforms take {money(flip)}, and anything heavier than that
              flips the order.
            </p>
          )}
          {has('ebay') && (
            <p>
              eBay&apos;s percentage applies to the shipping the buyer pays, and also to the sales tax
              eBay collects on the order. Tax varies by state, so it is left out of the examples here
              and the real eBay fee runs a little higher than shown.
            </p>
          )}
          <p className="footnote">
            &ldquo;Sale total&rdquo; means item price plus buyer-paid shipping. Sales tax is left out
            everywhere except where noted. Every figure comes from the platform&apos;s official fee
            page and was checked by hand before publication; sources and dates are on the last page.
          </p>
        </div>

        {/* Pages 2-3: platform by platform */}
        <div className="page pb">
          <h2>Platform by platform, with the math shown</h2>
          <p className="sub">
            The examples use round numbers. For your own price, the calculators at {host} are free and
            always current.
          </p>

          {has('ebay') && (
            <div className="plat">
              <h3>eBay: a percentage, a per-order fee, and usually no listing fee</h3>
              <p>
                A {v.ebay.final_value_percent}% final value fee on most categories, charged on the
                sale total including shipping, plus a per-order fee of {money(v.ebay.per_order_fixed)}
                {v.ebay.per_order_fixed_under_10 != null
                  ? ` (${money(v.ebay.per_order_fixed_under_10)} when the order totals $10 or less)`
                  : ''}
                .
              </p>
              <ul className="lines">
                <li>$40 sale: {v.ebay.final_value_percent}% × $40 = {ex.ebay.fv}, plus {ex.ebay.fixed} per-order fee</li>
                <li>
                  → you keep <span className="keep">{ex.ebay.keep}</span>
                </li>
              </ul>
              <p className="gotcha">
                Listing fees: eBay gives every seller {v.ebay.listing_fee_free_per_month} free listings
                a month. After that each listing costs {money(v.ebay.listing_fee)}, and each relist costs
                it again. {catRows.length > 0 ? 'Some categories have their own rates; see the category table on the next page.' : `Some categories carry a different percentage than ${v.ebay.final_value_percent}%, so check eBay's fee page for your category before you list.`}
              </p>
            </div>
          )}

          {has('poshmark') && (
            <div className="plat">
              <h3>Poshmark: one commission line, two tiers</h3>
              <p>
                {v.poshmark.final_value_percent}% commission on sales of ${v.poshmark.commission_threshold_price} and
                up, a flat {money(v.poshmark.min_commission)} below that, both computed on the item
                price only. The buyer pays Poshmark for the shipping label, so shipping never enters
                your payout.
              </p>
              <ul className="lines">
                <li>$40 item: {v.poshmark.final_value_percent}% × $40 = {ex.poshmark.hiFee}</li>
                <li>$12 item: flat {ex.poshmark.loFee}</li>
                <li>
                  → you keep <span className="keep">{ex.poshmark.hiKeep}</span> and{' '}
                  <span className="keep">{ex.poshmark.loKeep}</span>
                </li>
              </ul>
              <p className="gotcha">
                Watch out: the flat fee is the same dollars on a $3 sale as on a $14 sale, so it takes
                a far bigger share of a cheap listing. Bundling small items into one sale over $
                {v.poshmark.commission_threshold_price} replaces several flat fees with one percentage.
              </p>
            </div>
          )}

          {has('mercari') && (
            <div className="plat">
              <h3>Mercari: one percentage, shipping included</h3>
              <p>
                A flat {v.mercari.final_value_percent}% of the item price plus the shipping the buyer
                pays. Listing is free and there is no separate payment processing fee.
              </p>
              <ul className="lines">
                <li>$30 item + $8 shipping: {v.mercari.final_value_percent}% × $38 = {ex.mercari.fee}</li>
                <li>
                  → {ex.mercari.net} reaches your balance before you pay for the label
                </li>
              </ul>
              <p className="gotcha">
                Watch out: shipping sits inside the fee base, so a heavy item with an expensive label
                pays commission on the label too. Mercari&apos;s own discounted labels, on the last
                page, keep that down.
              </p>
            </div>
          )}

          {has('vinted') && (
            <div className="plat">
              <h3>Vinted: zero seller commission</h3>
              <p>
                Sellers pay {v.vinted.final_value_percent}% commission, no per-order fee and no listing
                fee. The buyer pays Vinted a protection fee and the shipping cost at checkout.
              </p>
              <ul className="lines">
                <li>$30 item: platform fees {money(0)}</li>
                <li>
                  → you keep <span className="keep">{ex.vinted.net}</span>
                </li>
              </ul>
              <p className="gotcha">
                Watch out: the buyer&apos;s protection fee is on top of your price, so a buyer sees a
                higher total than your listing price. Vinted is a fashion marketplace.
              </p>
            </div>
          )}

          {has('depop') && (
            <div className="plat">
              <h3>Depop: no commission, payment processing only</h3>
              <p>
                {v.depop.final_value_percent}% selling commission for sellers in the US, UK and
                Australia (the 10% rate applies to sellers elsewhere). The line you pay is Depop
                Payments processing: {v.depop.payment_percent}% + {money(v.depop.payment_fixed)}, charged
                on the item price plus shipping.
              </p>
              <ul className="lines">
                <li>
                  $40 item + $8 shipping: {v.depop.payment_percent}% × $48 = {ex.depop.pctPart}, plus{' '}
                  {money(v.depop.payment_fixed)}
                </li>
                <li>
                  → fees {ex.depop.fee}, leaving {ex.depop.net} before you pay for the label
                </li>
              </ul>
              <p className="gotcha">
                Watch out: shipping is inside the processing fee base. Boosting a listing adds an
                optional advertising fee on top, which the examples here leave out.
              </p>
            </div>
          )}

          {has('etsy') && (
            <div className="plat">
              <h3>Etsy: three lines that stack</h3>
              <p>
                A {v.etsy.final_value_percent}% transaction fee on the item plus shipping (and gift
                wrap), payment processing of {v.etsy.payment_percent}% + {money(v.etsy.payment_fixed)},
                and {money(v.etsy.listing_fee)} to list each item.
              </p>
              <ul className="lines">
                <li>$25 item + $5 shipping: {v.etsy.final_value_percent}% × $30 = {ex.etsy.txn}</li>
                <li>
                  payment processing {v.etsy.payment_percent}% + {money(v.etsy.payment_fixed)} = {ex.etsy.pay}
                </li>
                <li>
                  listing fee {money(v.etsy.listing_fee)}
                </li>
                <li>
                  → fees {ex.etsy.fee}, leaving {ex.etsy.net} before you pay for the label
                </li>
              </ul>
              <p className="gotcha">
                Watch out: the listing fee is charged when you list, whether or not the item sells,
                and again each time the listing renews.
              </p>
            </div>
          )}
        </div>

        {/* Page 4: decisions */}
        <div className="page pb">
          <h2>Same sale, six ways: what you keep</h2>
          <table>
            <thead>
              <tr>
                <th>Item price (shipping not included)</th>
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
                    const c = computeFees(p.r, price, 0, { excludeListing: true });
                    return (
                      <td key={p.key} className="num">
                        {money(c.net)}
                        <span className="footnote"> ({((c.fee / price) * 100).toFixed(1)}%)</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="footnote">
            Item price only, per-sale fees only, listing fees left out (they are charged per listing).
            The percentage in brackets is the share of the price taken by fees.
          </p>

          <h2>Who keeps the most at each price</h2>
          <table>
            <thead>
              <tr>
                <th>Item price</th>
                <th>Keeps the most</th>
                <th>Runner-up</th>
                <th>Gap</th>
              </tr>
            </thead>
            <tbody>
              {DECISION_PRICES.map((price) => {
                const ranked = saleAt(price);
                return (
                  <tr key={price}>
                    <td className="num">${price}</td>
                    <td>
                      {ranked[0].p.label} ({money(ranked[0].c.net)})
                    </td>
                    <td>
                      {ranked[1].p.label} ({money(ranked[1].c.net)})
                    </td>
                    <td className="num">{money(ranked[0].c.net - ranked[1].c.net)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <h2>Does the platform charge its fee on shipping?</h2>
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Fee base</th>
                <th>Shipping inside the fee base?</th>
              </tr>
            </thead>
            <tbody>
              {verified.map((p) => (
                <tr key={p.key}>
                  <td>{p.label}</td>
                  <td>{sellerReceivesShipping(p.r) ? 'Item + shipping' : 'Item price only'}</td>
                  <td>
                    {p.r.fee_base === 'item_only' || p.key === 'vinted'
                      ? 'No'
                      : p.key === 'depop'
                        ? 'Yes (payment processing only)'
                        : 'Yes'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="footnote">
            On Vinted and Poshmark the buyer pays the platform for shipping directly, so it never
            reaches your payout and is never charged a fee. On the other four the shipping money
            passes through your payout and the platform&apos;s percentage applies to it.
          </p>
        </div>

        {/* Page 5: category table (only once hand-verified), labels, sources */}
        <div className="page pb">
          {catRows.length > 0 && (
            <>
              <h2>eBay final value fees by category</h2>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Insertion fee</th>
                    <th>Final value fee (per item)</th>
                  </tr>
                </thead>
                <tbody>
                  {catRows.map((c) => (
                    <tr key={c.label}>
                      <td>{c.label}</td>
                      <td>{cats.insertion && cats.insertion[c.insertion] != null ? cats.insertion[c.insertion] : c.insertion}</td>
                      <td>{c.display}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="footnote">
                The per-order fee applies in addition unless the row says otherwise. eBay&apos;s fee
                page, checked {cats.meta.collected}.
              </p>
            </>
          )}

          <h2>Mercari&apos;s prepaid labels</h2>
          <p>
            If you sell on Mercari, its prepaid labels are usually the cheapest postage. A few rows of
            the official chart, {MERCARI_LABELS.effective} prices:
          </p>
          <table>
            <thead>
              <tr>
                <th>Weight</th>
                <th>Cheapest service, best rate</th>
                <th>Next option</th>
              </tr>
            </thead>
            <tbody>
              {MERCARI_LABELS.rows.map((row) => (
                <tr key={row.lb}>
                  <td>{row.lb}</td>
                  <td>
                    <strong>{row.best}</strong>
                  </td>
                  <td>{row.next}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="footnote">
            Media Mail: $4.47 at 1 lb. The full chart, all 31 weights and six services, is at {host}
            /guides/shipping-cost-comparison-2026/ (source: Mercari help center, {sourceDisplay(MERCARI_LABELS.source)}).
          </p>

          <h2>Sources and check dates</h2>
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Last checked</th>
                <th>Official page</th>
              </tr>
            </thead>
            <tbody>
              {verified.map((p) => (
                <tr key={p.key}>
                  <td>{p.label}</td>
                  <td className="num">{p.r.scraped_date || '—'}</td>
                  <td>
                    {p.r.source_url ? (
                      <a href={p.r.source_url}>{sourceDisplay(p.r.source_url).slice(0, 58)}</a>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="footnote">
            Every figure in this sheet comes from one of the pages above and was checked by hand
            before publication. When a marketplace changes its fees the sheet is re-checked and the
            updated copy is a free re-download.
          </p>

          <p className="footnote">
            The calculators at {host} use the same fee data and are always current. Feeside is an
            independent tool and is not affiliated with any marketplace. Support: {SITE.supportEmail}
          </p>
        </div>
      </div>
    </>
  );
}
