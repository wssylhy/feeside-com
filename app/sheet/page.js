import { loadRates, PLATFORM_LABELS } from '../../lib/rates';
import { jsonLd, breadcrumbJsonLd, og, SITE } from '../../lib/seo';

// /sheet — printable one-page fee comparison (G6: the paid Gumroad PDF is
// generated from this page; the site version is free and always current).
// Charter gate: only platforms with verified:true rates render numbers.
// Anything less renders the pending state — the sheet is never sold with
// unverified numbers on it.

export const metadata = {
  title: 'Marketplace Fee Comparison Sheet — 6 platforms, 1 page',
  description:
    'Printable one-page comparison of seller fees across eBay, Poshmark, Mercari, Vinted, Depop and Etsy. Same sale, six marketplaces, net proceeds side by side.',
  alternates: { canonical: '/sheet' },
  openGraph: og({
    title: 'Marketplace Fee Comparison Sheet',
    description: 'Same sale, six marketplaces — fees and net proceeds on one printable page.',
    path: '/sheet',
  }),
};

function money(n) {
  return '$' + n.toFixed(2);
}

// Per-sale fee basis (insertion/listing fees excluded — they bill per
// listing, not per sale; noted in the fine print).
function perSaleFees(r, gross) {
  const fv = (gross * (r.final_value_percent || 0)) / 100;
  const fixed = r.per_order_fixed || 0;
  const pay = (gross * (r.payment_percent || 0)) / 100 + (r.payment_fixed || 0);
  return fv + fixed + pay;
}

const DEMO_PRICES = [10, 50, 150];

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
        @page { size: A4 landscape; margin: 12mm; }
        @media print {
          .sheet header nav, .sheet .no-print { display: none; }
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
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Fixed fee per order</td>
                  {verified.map((p) => (
                    <td key={p.key} className="num">
                      {p.r.per_order_fixed != null ? money(p.r.per_order_fixed) : '—'}
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
