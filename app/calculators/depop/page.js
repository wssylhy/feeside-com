import FeeCalculator from '../../../components/FeeCalculator';
import { loadPlatform } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

export const metadata = {
  title: 'Depop Fee Calculator — fees & payout',
  description:
    'Enter your sale price and see Depop fees and your net payout before you list, from a config verified against the official fee page.',
  alternates: { canonical: '/calculators/depop' },
  openGraph: og({
    title: 'Depop Fee Calculator — fees & payout',
    description: 'See Depop fees and your net payout before you list.',
    path: '/calculators/depop',
  }),
};

export default function Page() {
  return (
    <>
      {jsonLd([
        webAppJsonLd({
          name: 'Depop Fee Calculator',
          path: '/calculators/depop',
          description: 'Calculate Depop selling fees and net payout for a sale price.',
        }),
        breadcrumbJsonLd([['Home', '/'], ['Depop fee calculator', '/calculators/depop']]),
      ])}
      <FeeCalculator label="Depop" rates={loadPlatform('depop')} />
    </>
  );
}
