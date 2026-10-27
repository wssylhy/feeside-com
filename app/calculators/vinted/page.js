import FeeCalculator from '../../../components/FeeCalculator';
import { loadPlatform } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

export const metadata = {
  title: 'Vinted Fee Calculator — seller payout explained',
  description:
    'See what you keep when you sell on Vinted. Payout math comes from a config scanned from the official fee page and confirmed by hand.',
  alternates: { canonical: '/calculators/vinted' },
  openGraph: og({
    title: 'Vinted Fee Calculator — seller payout explained',
    description: 'See what you keep when you sell on Vinted.',
    path: '/calculators/vinted',
  }),
};

export default function Page() {
  return (
    <>
      {jsonLd([
        webAppJsonLd({
          name: 'Vinted Fee Calculator',
          path: '/calculators/vinted',
          description: 'Calculate your Vinted seller payout for a sale price.',
        }),
        breadcrumbJsonLd([['Home', '/'], ['Vinted fee calculator', '/calculators/vinted']]),
      ])}
      <FeeCalculator label="Vinted" rates={loadPlatform('vinted')} />
    </>
  );
}
