import { loadRates, PLATFORM_LABELS, money } from '../../lib/rates';
import { jsonLd, breadcrumbJsonLd, og, SITE } from '../../lib/seo';
// /sheet — printable one-page fee comparison (the paid PDF is generated from
// this page; the site version is free and always current). Charter gate: only
// platforms with verified:true rates render numbers. Anything less renders the
// pending state — the sheet is never sold with unverified numbers on it.

export const metadata = {
  title: 'Marketplace Fee Comparison 2026 — 6 Resale Platforms, One Page',
  description:
    'Resale marketplace fee comparison for 2026: seller fees across eBay, Poshmark, Mercari, Vinted, Depop and Etsy on one printable page. Same sale, six marketplaces, net proceeds side by side.',
  alternates: { canonical: '/sheet' },
  openGraph: og({
    title: 'Marketplace Fee Comparison 2026 — 6 Resale Platforms',
    description: 'Same sale, six marketplaces — fees and net proceeds on one printable page.',
    path: '/sheet',
  }),
};

// Per-sale fee basis (insertion/listing fees excluded — they bill per
// listing, not per sale; noted in the fine print). min_commission clamps the
// commission side only (Poshmark: flat $2.95 on small sales).
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

function fixedFeeCell(r) {
  if (r.per_order_fixed == null) return '—';
  if (r.per_order_fixed_under_10 != null && r.per_order_fixed_under_10 !== r.per_order_fixed) {
    return `${money(r.per_order_fixed_under_10)} ≤$10 · ${money(r.per_order_fixed)} >$10`;
  }
  return money(r.per_order_fixed);
}

const DEMO_PRICES = [8, 15, 50, 150];

export default function SheetPage() {
  const rates = loadRates().platforms || {};
  const platforms = PLATFORM_LABELS.map(({ key, label }) => ({
    key,
    label,
    r: rates[key] || {},
  }));
  const verified = platforms.filter((p) => p.r.verified && p.r.final_value_percent != null);
  const ready = verified.length >= 2;

  return (
    <>
      {jsonLd([
        breadcrumbJsonLd([['Home', '/'], ['Fee comparison sheet', '/sheet']]),
      ])}
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
        @page { size: A4 landscape; margin: 10mm; }
        @media print {
          header.site, footer.site, .sheet .no-print, .sheet .buy { display: none !important; }
          .sheet { max-width: none; }
          .sheet h1 { font-size: 1.55rem; margin-bottom: 0.1rem; }
          .sheet .sub { margin-bottom: 0.7rem; }
          .sheet table { margin: 0.55rem 0; }
          .sheet th, .sheet td { padding: 0.35rem 0.5rem; }
          .sheet th { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .sheet .footnote { font-size: 0.72rem; margin: 0.3rem 0 0; }
          body { background: #fff; }
        }
      `}</style>
      <div className="sheet">
        <h1>WHO TAKES THE SMALLEST CUT?</h1>
        <p className="sub">
          6 marketplaces · 1 page · rates verified against official pages
          {verified.length > 0
            ? ` as of ${verified.map((v) => v.r.scraped_date).filter(Boolean).sort().pop()}`
            : ''}
        </p>

        <div className="buy">
          <div className="buy-copy">
            <h2>Get the printable fee sheet — $3</h2>
            <p>
              All six marketplaces on one page — and all six verified against
              each platform&apos;s official fee page
              {verified.length > 0
                ? ` as of ${verified.map((v) => v.r.scraped_date).filter(Boolean).sort().pop()}`
                : ''}
              . No tab-hopping, no stale numbers: it&apos;s the same data our
              free calculators use, laid out for print or your phone. When a
              marketplace changes its fees, the sheet is re-verified and the
              updated copy is yours free.
            </p>
            <ul className="inside">
              <li>Every fee line for all six marketplaces, from official pages</li>
              <li>Same-sale payout comparison at $8 / $15 / $50 / $150</li>
              <li>Pick-a-platform cheat table for common price points</li>
              <li>Source links and the verification date printed on the sheet</li>
            </ul>
            <img
              className="preview no-print"
              src="/sheet-preview.png"
              alt="Preview of the printable fee sheet"
            />
          </div>
          <a className="buy-btn" href="/buy/" target="_blank" rel="noopener">
            Buy the printable sheet — $3
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
                      {p.r.final_value_percent}% of sale total
                      {p.r.min_commission != null
                        ? ` (min ${money(p.r.min_commission)})`
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
                  {verified.map((p) =>
                    p.r.payment_percent != null || p.r.payment_fixed != null ? (
                      <td key={p.key}>
                        {p.r.payment_percent || p.r.payment_fixed
                          ? `${p.r.payment_percent}% + ${money(p.r.payment_fixed || 0)}`
                          : 'included in selling fee'}
                      </td>
                    ) : (
                      <td key={p.key}>—</td>
                    )
                  )}
                </tr>
                <tr>
                  <td>Listing / insertion fee</td>
                  {verified.map((p) => (
                    <td key={p.key} className="num">
                      {p.r.listing_fee != null ? money(p.r.listing_fee) : 'free'}
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
                    <td>${price}</td>
                    {verified.map((p) => {
                      const fees = perSaleFees(p.r, price);
                      return (
                        <td key={p.key} className="num">
                          {money(price - fees)}
                          <span className="footnote">
                            {' '}
                            ({((fees / price) * 100).toFixed(1)}% fees)
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
                    .map((p) => ({ p, keep: price - perSaleFees(p.r, price) }))
                    .sort((a, b) => b.keep - a.keep);
                  const best = ranked[0];
                  const second = ranked[1];
                  const note =
                    price < 15
                      ? 'Flat minimum commissions bite hardest under $15 — check the small-sale column above'
                      : 'Shipping costs often decide the deal — compare those before you list';
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
              above. Numbers from each platform&apos;s official fee page, collected
              {verified.length > 0 ? ' ' + verified.map((v) => v.r.scraped_date).filter(Boolean).sort().pop() : ''}{' '}
              by automated scan and cross-checked by hand. Sources:{' '}
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
