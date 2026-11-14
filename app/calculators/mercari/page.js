import FeeCalculator from '../../../components/FeeCalculator';
import CalculatorFaq from '../../../components/CalculatorFaq';
import { loadPlatform } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

export const metadata = {
  title: 'Mercari Fee Calculator — How Much Does Mercari Charge? (2026)',
  description:
    'How much does Mercari charge to sell? Enter your price and see the selling fee and your net payout before you list, from a config verified against the official fee page.',
  alternates: { canonical: '/calculators/mercari' },
  openGraph: og({
    title: 'Mercari Fee Calculator — How Much Does Mercari Charge? (2026)',
    description: 'See the Mercari selling fee and your net payout before you list.',
    path: '/calculators/mercari',
  }),
};

export default function Page() {
  const rates = loadPlatform('mercari');
  const faqs = rates.verified
    ? [
        {
          q: 'How much does Mercari charge to sell?',
          a: `Mercari charges a ${rates.final_value_percent}% selling fee on the completed sale — the item price plus any shipping the buyer pays. There is no separate seller payment processing fee and no listing fee.`,
        },
        {
          q: 'Does Mercari charge listing fees?',
          a: `No — creating listings on Mercari is free. You only pay the ${rates.final_value_percent}% selling fee when an item sells.`,
        },
      ]
    : [];
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
      <FeeCalculator label="Mercari" rates={rates} />
      <CalculatorFaq label="Mercari" faqs={faqs} />
    </>
  );
}
