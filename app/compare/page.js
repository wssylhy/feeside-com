import Link from 'next/link';
import Comparator from '../../components/Comparator';
import { loadRates, PLATFORM_LABELS } from '../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../lib/seo';

const PATH = '/compare/';

export const metadata = {
  title: 'Compare marketplace fees — what you keep on each platform',
  description:
    'One sale price, six marketplaces: see eBay, Poshmark, Mercari, Vinted, Depop and Etsy fees side by side, sorted by what you keep.',
  alternates: { canonical: PATH },
  openGraph: og({
    title: 'Compare marketplace fees — what you keep on each platform',
    description: 'One sale price, six marketplaces, sorted by what you keep.',
    path: PATH,
  }),
};

export default function ComparePage() {
  const data = loadRates();
  const platforms = PLATFORM_LABELS.map(({ key, label }) => ({
    key,
    label,
    r: (data.platforms && data.platforms[key]) || {},
  }));
  const verified = platforms.filter((p) => p.r.verified).length;

  return (
    <>
      {jsonLd([
        webAppJsonLd({
          name: 'Marketplace Fee Comparison',
          path: PATH,
          description: 'Compare seller fees and net payout across six resale marketplaces for one sale price.',
        }),
        breadcrumbJsonLd([['Home', '/'], ['Compare all', PATH]]),
      ])}
      <h1>Cross-platform payout comparison</h1>
      <p>
        Type one price and every platform recalculates with its own fee structure, including the
        rules that trip up simple estimates: Poshmark&apos;s flat fee under $15 and eBay&apos;s
        lower per-order fee at $10 or less. {verified} of 6 platforms verified against their
        official fee pages.
      </p>
      <Comparator platforms={platforms} />
      <section className="calc-related">
        <h2>Go deeper</h2>
        <ul>
          <li><Link href="/guides/fees-comparison-table/">Fees comparison table: every fee line on one page</Link></li>
          <li><Link href="/guides/cheapest-selling-app/">Which selling app has the lowest fees</Link></li>
          <li><Link href="/guides/where-to-sell-cheap-items/">Where to sell cheap items online</Link></li>
          <li><Link href="/guides/where-to-sell-clothes-online/">Where to sell clothes online</Link></li>
          <li><Link href="/sheet/">The printable fee sheet (PDF)</Link></li>
        </ul>
      </section>
    </>
  );
}
