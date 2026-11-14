import FeeCalculator from '../../../components/FeeCalculator';
import CalculatorFaq from '../../../components/CalculatorFaq';
import { loadPlatform, money } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

export const metadata = {
  title: 'Poshmark Fee Calculator — How Much Does Poshmark Charge?',
  description:
    'How much does Poshmark charge per sale? See the commission structure, what you keep, and the payout math — based on the official fee policy, nothing guessed.',
  alternates: { canonical: '/calculators/poshmark' },
  openGraph: og({
    title: 'Poshmark Fee Calculator — How Much Does Poshmark Charge?',
    description: 'See what Poshmark takes and what you keep on each sale.',
    path: '/calculators/poshmark',
  }),
};

export default function Page() {
  const rates = loadPlatform('poshmark');
  const faqs = rates.verified
    ? [
        {
          q: 'How much does Poshmark charge sellers?',
          a: `Poshmark takes a ${rates.final_value_percent}% commission on sales of $15 or more. Sales under $15 carry a flat ${money(rates.min_commission)} commission instead. There is no separate payment processing fee for sellers.`,
        },
        {
          q: 'What percent does Poshmark take?',
          a: `${rates.final_value_percent}% of the sale price — you keep 80%. On sales under $15 the flat ${money(rates.min_commission)} commission applies instead.`,
        },
      ]
    : [];
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
      <FeeCalculator label="Poshmark" rates={rates} />
      <CalculatorFaq label="Poshmark" faqs={faqs} />
    </>
  );
}
