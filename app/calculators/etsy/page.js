import FeeCalculator from '../../../components/FeeCalculator';
import CalculatorFaq from '../../../components/CalculatorFaq';
import { loadPlatform, money } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

export const metadata = {
  title: 'Etsy Fee Calculator — How Much Does Etsy Charge? (2026)',
  description:
    'How much does Etsy charge per sale? See the transaction fee, payment processing fee and listing fee, then what lands in your payout. Config-verified numbers only.',
  alternates: { canonical: '/calculators/etsy' },
  openGraph: og({
    title: 'Etsy Fee Calculator — How Much Does Etsy Charge? (2026)',
    description: 'See Etsy fees and your net payout before you list.',
    path: '/calculators/etsy',
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
          path: '/calculators/etsy',
          description: 'Calculate Etsy selling fees and net payout for a sale price.',
        }),
        breadcrumbJsonLd([['Home', '/'], ['Etsy fee calculator', '/calculators/etsy']]),
      ])}
      <FeeCalculator label="Etsy" rates={rates} />
      <CalculatorFaq label="Etsy" faqs={faqs} />
    </>
  );
}
