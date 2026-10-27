import FeeCalculator from '../../../components/FeeCalculator';
import { loadPlatform } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

export const metadata = {
  title: 'Mercari Fee Calculator — selling fee & payout',
  description:
    'Enter your sale price and see the Mercari selling fee and your net payout before you list, from a config verified against the official fee page.',
  alternates: { canonical: '/calculators/mercari' },
  openGraph: og({
    title: 'Mercari Fee Calculator — selling fee & payout',
    description: 'See the Mercari selling fee and your net payout before you list.',
    path: '/calculators/mercari',
  }),
};

export default function Page() {
  return (
    <>
      {jsonLd([
        webAppJsonLd({
          name: 'Mercari Fee Calculator',
          path: '/calculators/mercari',
          description: 'Calculate Mercari selling fees and net payout for a sale price.',
        }),
        breadcrumbJsonLd([['Home', '/'], ['Mercari fee calculator', '/calculators/mercari']]),
      ])}
      <FeeCalculator label="Mercari" rates={loadPlatform('mercari')} />
    </>
  );
}
