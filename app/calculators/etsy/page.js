import FeeCalculator from '../../../components/FeeCalculator';
import CalculatorFaq from '../../../components/CalculatorFaq';
import CalculatorRelated from '../../../components/CalculatorRelated';
import { loadPlatform, money } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

const PATH = '/calculators/etsy/';
const TITLE = 'Etsy Fee Calculator — How Much Does Etsy Charge? (2026)';

export const metadata = {
  title: TITLE,
  description:
    'How much does Etsy charge per sale? See the transaction fee, payment processing fee and listing fee, then what lands in your payout. Config-verified numbers only.',
  alternates: { canonical: PATH },
  openGraph: og({
    title: TITLE,
    description: 'See Etsy fees and your net payout before you list.',
    path: PATH,
  }),
};

export default function Page() {
  const rates = loadPlatform('etsy');
  const faqs = rates.verified
    ? [
        {
          q: 'How much does Etsy charge sellers?',
          a: `Etsy charges a ${rates.final_value_percent}% transaction fee on the sale (item price plus shipping and gift wrap), ${rates.payment_percent}% + ${money(rates.payment_fixed)} payment processing, and ${money(rates.listing_fee)} to list an item. There is no fixed fee per order.`,
        },
        {
          q: 'Does Etsy charge a listing fee?',
          a: `Yes — ${money(rates.listing_fee)} per listing. Each listing stays active for four months or until the item sells.`,
        },
      ]
    : [];
  return (
    <>
      {jsonLd([
        webAppJsonLd({
          name: 'Etsy Fee Calculator',
          path: PATH,
          description: 'Calculate Etsy selling fees and net payout for a sale price.',
        }),
        breadcrumbJsonLd([['Home', '/'], ['Etsy fee calculator', PATH]]),
      ])}
      <FeeCalculator label="Etsy" rates={rates} />
      <CalculatorFaq label="Etsy" faqs={faqs} />
      <CalculatorRelated platformKey="etsy" label="Etsy" />
    </>
  );
}
