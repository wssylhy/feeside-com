import FeeCalculator from '../../../components/FeeCalculator';
import { loadPlatform } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

export const metadata = {
  title: 'Etsy Fee Calculator — transaction, payment & listing fees',
  description:
    'Enter your sale price and see the Etsy transaction fee, payment processing fee and listing fee, then what lands in your payout. Config-verified numbers only.',
  alternates: { canonical: '/calculators/etsy' },
  openGraph: og({
    title: 'Etsy Fee Calculator — transaction, payment & listing fees',
    description: 'See Etsy fees and your net payout before you list.',
    path: '/calculators/etsy',
  }),
};

export default function Page() {
  return (
    <>
      {jsonLd([
        webAppJsonLd({
          name: 'Etsy Fee Calculator',
          path: '/calculators/etsy',
          description: 'Calculate Etsy selling fees and net payout for a sale price.',
        }),
        breadcrumbJsonLd([['Home', '/'], ['Etsy fee calculator', '/calculators/etsy']]),
      ])}
      <FeeCalculator label="Etsy" rates={loadPlatform('etsy')} />
    </>
  );
}
