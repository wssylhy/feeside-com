import FeeCalculator from '../../../components/FeeCalculator';
import CalculatorFaq from '../../../components/CalculatorFaq';
import CalculatorRelated from '../../../components/CalculatorRelated';
import { loadPlatform } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

const PATH = '/calculators/mercari/';
const TITLE = 'Mercari Fee Calculator — How Much Does Mercari Charge? (2026)';

export const metadata = {
  title: TITLE,
  description:
    'How much does Mercari charge to sell? Enter your price and see the selling fee and your net payout before you list, from a config verified against the official fee page.',
  alternates: { canonical: PATH },
  openGraph: og({
    title: TITLE,
    description: 'See the Mercari selling fee and your net payout before you list.',
    path: PATH,
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
          path: PATH,
          description: 'Calculate Mercari selling fees and net payout for a sale price.',
        }),
        breadcrumbJsonLd([['Home', '/'], ['Mercari fee calculator', PATH]]),
      ])}
      <FeeCalculator label="Mercari" rates={rates} />
      <CalculatorFaq label="Mercari" faqs={faqs} />
      <CalculatorRelated platformKey="mercari" label="Mercari" />
    </>
  );
}
