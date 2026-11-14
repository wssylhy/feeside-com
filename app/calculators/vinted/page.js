import FeeCalculator from '../../../components/FeeCalculator';
import CalculatorFaq from '../../../components/CalculatorFaq';
import { loadPlatform } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

export const metadata = {
  title: 'Vinted Fee Calculator — How Much Does Vinted Charge?',
  description:
    'How much does Vinted charge sellers? See what you keep when you sell on Vinted — payout math from a config scanned from the official fee page and confirmed by hand.',
  alternates: { canonical: '/calculators/vinted' },
  openGraph: og({
    title: 'Vinted Fee Calculator — How Much Does Vinted Charge?',
    description: 'See what you keep when you sell on Vinted.',
    path: '/calculators/vinted',
  }),
};

export default function Page() {
  const rates = loadPlatform('vinted');
  const faqs = rates.verified
    ? [
        {
          q: 'How much does Vinted charge sellers?',
          a: 'Nothing. Vinted charges sellers no commission and no listing fees — you keep 100% of your listing price. The buyer pays a buyer protection fee at checkout.',
        },
        {
          q: 'Does Vinted take a cut of my sale?',
          a: "No. Vinted's fee model charges the buyer, not the seller — your seller payout equals your listing price.",
        },
      ]
    : [];
  return (
    <>
      {jsonLd([
        webAppJsonLd({
          name: 'Vinted Fee Calculator',
          path: '/calculators/vinted',
          description: 'Calculate your Vinted seller payout for a sale price.',
        }),
        breadcrumbJsonLd([['Home', '/'], ['Vinted fee calculator', '/calculators/vinted']]),
      ])}
      <FeeCalculator label="Vinted" rates={rates} />
      <CalculatorFaq label="Vinted" faqs={faqs} />
    </>
  );
}
