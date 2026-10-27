import Link from 'next/link';
import { loadRates, PLATFORM_LABELS } from '../lib/rates';
import { jsonLd, webSiteJsonLd, og } from '../lib/seo';

export const metadata = {
  description:
    'Enter a sale price and see exactly what each marketplace takes — eBay, Poshmark, Mercari, Vinted, Depop and Etsy. Every fee number comes from a verified config scanned from official fee pages.',
  alternates: { canonical: '/' },
  openGraph: og({
    title: 'Marketplace fee calculators for US resellers',
    description: 'See what each marketplace takes and what lands in your payout.',
    path: '/',
  }),
};

export default function Home() {
  const data = loadRates();
  const platforms = (data && data.platforms) || {};
  const verifiedCount = PLATFORM_LABELS.filter((p) => platforms[p.key] && platforms[p.key].verified).length;

  return (
    <>
      {jsonLd(webSiteJsonLd())}
      <h1>Marketplace fee calculators for US resellers</h1>
      <p>
        Enter a sale price, see exactly what each marketplace takes and what lands in your payout.
        Every fee number comes from a verified config scanned from official fee pages — nothing is guessed.
      </p>

      <div className="grid">
        {PLATFORM_LABELS.map(({ key, label }) => {
          const r = platforms[key] || {};
          return (
            <div className="card" key={key}>
              <h3>{label} fee calculator</h3>
              <p>
                <Link href={`/calculators/${key}`}>Open calculator →</Link>
              </p>
              <span className={r.verified ? 'badge ok' : 'badge'}>
                {r.verified ? 'verified' : r.final_value_percent != null ? 'awaiting verification' : 'awaiting data'}
              </span>
            </div>
          );
        })}
        <div className="card">
          <h3>Compare all platforms</h3>
          <p>
            <Link href="/compare">Open comparison →</Link>
          </p>
          <span className="badge">{verifiedCount}/6 platforms verified</span>
        </div>
      </div>
    </>
  );
}
