import FeeCalculator from '../../../components/FeeCalculator';
import CalculatorFaq from '../../../components/CalculatorFaq';
import { loadPlatform, money } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

export const metadata = {
  title: 'Depop Fee Calculator — How Much Does Depop Charge?',
  description:
    "How much does Depop charge sellers? Enter a sale price and see Depop's fee structure and your net payout, from a config verified against the official fee page.",
  alternates: { canonical: '/calculators/depop' },
  openGraph: og({
    title: 'Depop Fee Calculator — How Much Does Depop Charge?',
    description: 'See Depop fees and your net payout before you list.',
    path: '/calculators/depop',
  }),
};

export default function Page() {
  const rates = loadPlatform('depop');
  const faqs = rates.verified
    ? [
        {
          q: 'How much does Depop charge?',
          a: `US sellers pay no selling fee on Depop — 0% commission. The only deduction is Depop Payments processing: ${rates.payment_percent}% + ${money(rates.payment_fixed)} of the total sale.`,
        },
        {
          q: 'Does Depop charge listing fees?',
          a: `No. Listing on Depop is free, and there is no seller commission for US sellers — you only pay the payment processing fee when an item sells.`,
        },
      ]
    : [];
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
      <FeeCalculator label="Depop" rates={rates} />
      <CalculatorFaq label="Depop" faqs={faqs} />
    </>
  );
}
