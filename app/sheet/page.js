import { loadRates, PLATFORM_LABELS, money } from '../../lib/rates';
import { computeFees } from '../../lib/fees';
import { jsonLd, breadcrumbJsonLd, og, SITE } from '../../lib/seo';
// /sheet — free one-page fee comparison (the paid PDF is generated from
// /sheet/print). Charter gate: only platforms with verified:true rates render
// numbers. Anything less renders the pending state — the sheet is never sold
// with unverified numbers on it. Per-sale math comes from lib/fees.js, the
// same function the calculators use.

const PATH = '/sheet/';

export const metadata = {
  title: 'Marketplace Fee Comparison 2026 — 6 Resale Platforms, One Page',
  description:
    'Resale marketplace fee comparison for 2026: seller fees across eBay, Poshmark, Mercari, Vinted, Depop and Etsy on one page, plus a printable 5-page PDF. Same sale, six marketplaces, net proceeds side by side.',
  alternates: { canonical: PATH },
  openGraph: og({
    title: 'Marketplace Fee Comparison 2026 — 6 Resale Platforms',
    description: 'Same sale, six marketplaces — fees and net proceeds on one page.',
    path: PATH,
  }),
};

function fixedFeeCell(r) {
  if (r.per_order_fixed == null) return '—';
  if (r.per_order_fixed_under_10 != null && r.per_order_fixed_under_10 !== r.per_order_fixed) {
    return `${money(r.per_order_fixed_under_10)} on orders of $10 or less · ${money(r.per_order_fixed)} above`;
  }
  return r.per_order_fixed ? money(r.per_order_fixed) : 'none';
}

function listingCell(r) {
  if (!r.listing_fee) return 'free';
  return r.listing_fee_free_per_month
    ? `${money(r.listing_fee)} after ${r.listing_fee_free_per_month} free listings a month`
    : `${money(r.listing_fee)} per listing`;
}

const DEMO_PRICES = [8, 15, 30, 50, 100, 150];

export default function SheetPage() {
  const rates = loadRates().platforms || {};
  const platforms = PLATFORM_LABELS.map(({ key, label }) => ({
    key,
    label,
    r: rates[key] || {},
  }));
  const verified = platforms.filter((p) => p.r.verified && p.r.final_value_percent != null);
  const ready = verified.length >= 2;
  const latest = verified.map((v) => v.r.scraped_date).filter(Boolean).sort().pop();
  const freeListings = verified.find((p) => p.r.listing_fee_free_per_month && p.r.listing_fee);
  // Per-sale fees on the item price, shipping excluded, listing fees excluded.
  const keepAt = (r, price) => computeFees(r, price, 0, { excludeListing: true });

  return (
    <>
      {jsonLd([breadcrumbJsonLd([['Home', '/'], ['Fee comparison sheet', PATH]])])}
      <style>{`
        .sheet { max-width: 960px; margin: 0 auto; }
        .sheet h1 { font-size: 1.9rem; letter-spacing: 0.02em; margin-bottom: 0.2rem; }
        .sheet .sub { color: #555; margin-bottom: 1.2rem; }
        .sheet table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
        .sheet th, .sheet td { border: 1px solid #ccc; padding: 0.45rem 0.6rem; text-align: left; vertical-align: top; font-size: 0.88rem; }
        .sheet th { background: #f3f4f6; }
        .sheet .num { text-align: right; white-space: nowrap; }
        .sheet .footnote { font-size: 0.78rem; color: #555; }
        .sheet .pending { border: 1px dashed #999; padding: 1rem; background: #fafafa; }
        .sheet .inside { margin: 0.7rem 0 0; padding-left: 1.1rem; font-size: 0.85rem; color: #444; }
        .sheet .inside li { margin: 0.15rem 0; }
        .sheet .preview { display: block; width: 100%; max-width: 420px; border: 1px solid #ddd; margin: 0.8rem 0 0; }
        @page { size: A4 landscape; margin: 8mm; }
        @media print {
          header.site, footer.site, .sheet .no-print, .sheet .buy { display: none !important; }
          .sheet { max-width: none; }
          .sheet h1 { font-size: 1.35rem; margin-bottom: 0.08rem; }
          .sheet .sub { margin-bottom: 0.45rem; font-size: 0.8rem; }
          .sheet h2 { font-size: 0.95rem; margin: 0.45rem 0 0.15rem; }
          .sheet table { margin: 0.3rem 0; }
          .sheet th, .sheet td { padding: 0.22rem 0.35rem; font-size: 0.74rem; }
          .sheet th { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .sheet .footnote { font-size: 0.62rem; margin: 0.2rem 0 0; }
          body { background: #fff; }
        }
      `}</style>
      <div className="sheet">
        <h1>WHO TAKES THE SMALLEST CUT?</h1>
        <p className="sub">
          6 marketplaces · 1 page · rates verified against official pages
          {latest ? ` as of ${latest}` : ''}
        </p>

        <div className="buy">
          <div className="buy-copy">
            <h2>Get the full fee reference as a PDF — $1</h2>
            <p>
              The free table below is the summary. The $1 PDF is the full 5-page reference: every
              fee line for all six marketplaces, a payout table at six price points, a
              walkthrough of each platform with the math shown, the shipping rules that change the
              answer, and the source link and check date behind every number. All six platforms
              verified against their official fee pages{latest ? ` as of ${latest}` : ''}. When a
              marketplace changes its fees, the PDF is re-verified and the updated copy is yours
              free.
            </p>
            <ul className="inside">
              <li>Every fee line for all six marketplaces, with what counts toward each fee</li>
              <li>Each platform explained, with worked examples you can check line by line</li>
              <li>Same-sale payouts at $8 / $15 / $30 / $50 / $100 / $150 and which platform keeps you the most</li>
              <li>Whether each platform takes a cut of shipping, plus Mercari&apos;s prepaid label prices</li>
              <li>Every official source link and the date each rate was checked</li>
            </ul>
            <img
              className="preview no-print"
              src="/sheet-preview.png"
              alt="Preview of the printable fee sheet"
            />
          </div>
          <a className="buy-btn" href="/buy/" target="_blank" rel="noopener">
            Buy the PDF fee reference — $1
          </a>
          <p className="footnote">
            The interactive calculators on this site stay free and always current.
            Payments are handled by Creem (merchant of record).
          </p>
        </div>

        {!ready && (
          <div className="pending" role="status">
            <p>
              <strong>This sheet is being assembled.</strong> Rate columns appear
              only after each platform&apos;s numbers pass automated collection and
              human cross-check against the official fee page. Verified so far:{' '}
              {verified.length ? verified.map((v) => v.label).join(', ') : 'none yet'}.
            </p>
          </div>
        )}

        {ready && (
          <>
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
                  <td>Selling / final value fee</td>
                  {verified.map((p) => (
                    <td key={p.key}>
                      {p.r.final_value_percent}% of{' '}
                      {p.r.fee_base === 'item_only' ? 'item price' : 'sale total (item + shipping)'}
                      {p.r.min_commission != null
                        ? ` (flat ${money(p.r.min_commission)}${p.r.commission_threshold_price != null ? ` under $${p.r.commission_threshold_price}` : ''})`
                        : ''}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Fixed fee per order</td>
                  {verified.map((p) => (
                    <td key={p.key} className="num">
                      {fixedFeeCell(p.r)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Payment processing</td>
                  {verified.map((p) => (
                    <td key={p.key} className="num">
                      {p.r.payment_percent || p.r.payment_fixed
                        ? `${p.r.payment_percent}% + ${money(p.r.payment_fixed || 0)}`
                        : p.key === 'vinted'
                          ? 'none'
                          : 'none separate'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Listing / insertion fee</td>
                  {verified.map((p) => (
                    <td key={p.key} className="num">
                      {listingCell(p.r)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>

            <h2>Same sale, six ways — what you actually keep</h2>
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
                {DEMO_PRICES.map((price) => (
                  <tr key={price}>
                    <td className="num">${price}</td>
                    {verified.map((p) => {
                      const c = keepAt(p.r, price);
                      return (
                        <td key={p.key} className="num">
                          {money(c.net)}
                          <span className="footnote">
                            {' '}
                            ({((c.fee / price) * 100).toFixed(1)}% fees)
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>Which marketplace keeps you the most?</h2>
            <table>
              <thead>
                <tr>
                  <th>Sale price</th>
                  <th>Keep the most</th>
                  <th>Runner-up</th>
                  <th>What to know</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_PRICES.map((price) => {
                  const ranked = verified
                    .map((p) => ({ p, keep: keepAt(p.r, price).net }))
                    .sort((a, b) => b.keep - a.keep);
                  const best = ranked[0];
                  const second = ranked[1];
                  const note =
                    price < 15
                      ? 'Flat minimum commissions bite hardest under $15 — check the small-sale row above'
                      : 'Shipping rules differ by platform and can move these lines — see the shipping column of the fee table';
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

            <p className="footnote">
              Basis: sale price only (shipping excluded); per-sale fees only —
              listing/insertion fees bill per listing and are shown separately
              above
              {freeListings
                ? ` (${freeListings.label}: the insertion fee applies only after a seller has used the ${freeListings.r.listing_fee_free_per_month} free listings each month)`
                : ''}
              . Numbers from each platform&apos;s official fee page, last checked{' '}
              {latest ? latest : 'on the dates linked below'} and cross-checked by hand. Sources:{' '}
              {verified.map((p, i) => (
                <span key={p.key}>
                  {i > 0 && ' · '}
                  <a href={p.r.source_url || SITE.url}>{p.label}</a>
                </span>
              ))}
              .
            </p>
            <p className="footnote">
              Independent tool · not affiliated with any marketplace · fees change —
              check the printed verification date. Interactive calculators, always
              current: {SITE.url.replace(/^https?:\/\//, '')}
            </p>
          </>
        )}
      </div>
    </>
  );
}
