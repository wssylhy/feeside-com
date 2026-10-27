import FeeCalculator from '../../../components/FeeCalculator';
import { loadPlatform } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

export const metadata = {
  title: 'Poshmark Fee Calculator — commission & payout',
  description:
    'See what Poshmark takes from your sale and what lands in your payout, based on the official commission structure. Nothing guessed — config-verified numbers only.',
  alternates: { canonical: '/calculators/poshmark' },
  openGraph: og({
    title: 'Poshmark Fee Calculator — commission & payout',
    description: 'See what Poshmark takes and what you keep on each sale.',
    path: '/calculators/poshmark',
  }),
};

export default function Page() {
  return (
    <>
      {jsonLd([
        webAppJsonLd({
          name: 'Poshmark Fee Calculator',
          path: '/calculators/poshmark',
          description: 'Calculate Poshmark commission and net payout for a sale price.',
        }),
        breadcrumbJsonLd([['Home', '/'], ['Poshmark fee calculator', '/calculators/poshmark']]),
      ])}
      <FeeCalculator label="Poshmark" rates={loadPlatform('poshmark')} />
    </>
  );
}
