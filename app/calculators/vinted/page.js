import FeeCalculator from '../../../components/FeeCalculator';
import CalculatorFaq from '../../../components/CalculatorFaq';
import CalculatorRelated from '../../../components/CalculatorRelated';
import { loadPlatform } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

const PATH = '/calculators/vinted/';
const TITLE = 'Vinted Fee Calculator — How Much Does Vinted Charge?';

export const metadata = {
  title: TITLE,
  description:
    'How much does Vinted charge sellers? See what you keep when you sell on Vinted — payout math from a config scanned from the official fee page and confirmed by hand.',
  alternates: { canonical: PATH },
  openGraph: og({
    title: TITLE,
    description: 'See what you keep when you sell on Vinted.',
    path: PATH,
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
          path: PATH,
          description: 'Calculate your Vinted seller payout for a sale price.',
        }),
        breadcrumbJsonLd([['Home', '/'], ['Vinted fee calculator', PATH]]),
      ])}
      <FeeCalculator label="Vinted" rates={rates} />
      <CalculatorFaq label="Vinted" faqs={faqs} />
      <CalculatorRelated platformKey="vinted" label="Vinted" />
    </>
  );
}
