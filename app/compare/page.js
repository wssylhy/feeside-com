import Comparator from '../../components/Comparator';
import { loadRates, PLATFORM_LABELS } from '../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../lib/seo';

export const metadata = {
  title: 'Compare marketplace fees — what you keep on each platform',
  description:
    'One sale price, six marketplaces: see eBay, Poshmark, Mercari, Vinted, Depop and Etsy fees side by side, sorted by what you keep.',
  alternates: { canonical: '/compare' },
  openGraph: og({
    title: 'Compare marketplace fees — what you keep on each platform',
    description: 'One sale price, six marketplaces, sorted by what you keep.',
    path: '/compare',
  }),
};

export default function ComparePage() {
  const data = loadRates();
  const platforms = PLATFORM_LABELS.map(({ key, label }) => ({
    key,
    label,
    r: (data.platforms && data.platforms[key]) || {},
  }));

  return (
    <>
      {jsonLd([
        webAppJsonLd({
          name: 'Marketplace Fee Comparison',
          path: '/compare',
          description: 'Compare seller fees and net payout across six resale marketplaces for one sale price.',
        }),
        breadcrumbJsonLd([['Home', '/'], ['Compare all', '/compare']]),
      ])}
      <h1>Cross-platform payout comparison</h1>
      <Comparator platforms={platforms} />
    </>
  );
}
