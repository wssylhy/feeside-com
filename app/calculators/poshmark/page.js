import FeeCalculator from '../../../components/FeeCalculator';
import CalculatorFaq from '../../../components/CalculatorFaq';
import CalculatorRelated from '../../../components/CalculatorRelated';
import { loadPlatform, money } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

const PATH = '/calculators/poshmark/';
const TITLE = 'Poshmark Fee Calculator — How Much Does Poshmark Charge?';

export const metadata = {
  title: TITLE,
  description:
    'How much does Poshmark charge per sale? See the commission structure, what you keep, and the payout math — based on the official fee policy, nothing guessed.',
  alternates: { canonical: PATH },
  openGraph: og({
    title: TITLE,
    description: 'See what Poshmark takes and what you keep on each sale.',
    path: PATH,
  }),
};

export default function Page() {
  const rates = loadPlatform('poshmark');
  const faqs = rates.verified
    ? [
        {
          q: 'How much does Poshmark charge sellers?',
          a: `Poshmark takes a ${rates.final_value_percent}% commission on the item price for sales of $15 or more. Sales under $15 carry a flat ${money(rates.min_commission)} commission instead. There is no separate payment processing fee, and buyer-paid shipping goes directly to Poshmark — it is never commissioned.`,
        },
        {
          q: 'What percent does Poshmark take?',
          a: `${rates.final_value_percent}% of the item price — you keep ${100 - Number(rates.final_value_percent)}%. On sales under $15 the flat ${money(rates.min_commission)} commission applies instead.`,
        },
      ]
    : [];
  return (
    <>
      {jsonLd([
        webAppJsonLd({
          name: 'Poshmark Fee Calculator',
          path: PATH,
          description: 'Calculate Poshmark commission and net payout for a sale price.',
        }),
        breadcrumbJsonLd([['Home', '/'], ['Poshmark fee calculator', PATH]]),
      ])}
      <FeeCalculator label="Poshmark" rates={rates} />
      <CalculatorFaq label="Poshmark" faqs={faqs} />
      <CalculatorRelated platformKey="poshmark" label="Poshmark" />
    </>
  );
}
