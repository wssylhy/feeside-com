import Link from 'next/link';
import { loadRates, PLATFORM_LABELS } from '../lib/rates';
import { guideIndex } from '../lib/guides';
import { feeSummary } from '../lib/fees';
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

// Guides about one platform, question pages first, then head-to-head pages.
const rank = (g) => (g.type === 'qa' ? 0 : g.type === 'compare' ? 1 : 2) * 10 + g.platforms.length;
const byRank = (a, b) => rank(a) - rank(b);

export default function Home() {
  const data = loadRates();
  const platforms = (data && data.platforms) || {};
  const guides = guideIndex();
  const verifiedCount = PLATFORM_LABELS.filter((p) => platforms[p.key] && platforms[p.key].verified).length;
  // Guides about one platform, or a head-to-head with one other: question
  // pages first. Guides covering three or more platforms sit in their own card.
  const about = (key) => guides.filter((g) => g.platforms.includes(key) && g.platforms.length <= 2).sort(byRank);
  const hubs = guides.filter((g) => g.platforms.length === 0 || g.platforms.length >= 3);

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
              <h3>
                <Link href={`/calculators/${key}/`}>{label} fee calculator</Link>
              </h3>
              <p className="card-summary">{r.verified ? feeSummary(r) : 'Fee data pending verification.'}</p>
              <span className={r.verified ? 'badge ok' : 'badge'}>
                {r.verified ? 'verified' : r.final_value_percent != null ? 'awaiting verification' : 'awaiting data'}
              </span>
            </div>
          );
        })}
        <div className="card">
          <h3>
            <Link href="/compare/">Compare all platforms</Link>
          </h3>
          <p className="card-summary">One sale price, six payouts, sorted by what you keep.</p>
          <span className="badge">{verifiedCount}/6 platforms verified</span>
        </div>
        <div className="card">
          <h3>
            <Link href="/sheet/">Printable fee sheet — $1</Link>
          </h3>
          <p className="card-summary">
            Every fee line for all six marketplaces, payout tables at six price points and a
            platform-by-platform walkthrough. Free updates when fees change.
          </p>
          <span className="badge ok">6 marketplaces, 5 pages</span>
        </div>
      </div>

      <h2 className="section-title" id="guides">Fee guides by platform</h2>
      <p>
        Every guide draws its numbers from the same verified fee data as the calculators, so a page
        and a calculator never disagree.
      </p>
      <div className="hub-grid">
        {PLATFORM_LABELS.map(({ key, label }) => (
          <section className="hub" key={key}>
            <h3>{label}</h3>
            <ul>
              {about(key).map((g) => (
                <li key={g.slug}>
                  <Link href={g.path}>{g.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <section className="hub hub-wide">
          <h3>All six platforms</h3>
          <ul>
            {hubs.sort(byRank).map((g) => (
              <li key={g.slug}>
                <Link href={g.path}>{g.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
