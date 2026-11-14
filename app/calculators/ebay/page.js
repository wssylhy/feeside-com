import FeeCalculator from '../../../components/FeeCalculator';
import CalculatorFaq from '../../../components/CalculatorFaq';
import { loadPlatform, money } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

export const metadata = {
  title: 'eBay Fee Calculator — How Much Does eBay Charge? (2026)',
  description:
    "How much does eBay charge per sale? Enter your price and see the final value fee, per-order fee and your net payout before you list — from a config verified against eBay's official fee page.",
  alternates: { canonical: '/calculators/ebay' },
  openGraph: og({
    title: 'eBay Fee Calculator — How Much Does eBay Charge? (2026)',
    description: 'See eBay fees and your net payout before you list.',
    path: '/calculators/ebay',
  }),
};

export default function Page() {
  const rates = loadPlatform('ebay');
  const faqs = rates.verified
    ? [
        {
          q: 'How much does eBay charge to sell?',
          a: `eBay charges a ${rates.final_value_percent}% final value fee on the total amount of the sale (most categories), plus ${money(rates.per_order_fixed)} per order — ${money(rates.per_order_fixed_under_10)} if the order total is $10 or less. Insertion fees are ${money(rates.listing_fee)} per listing.`,
        },
        {
          q: 'What percent does eBay take?',
          a: `${rates.final_value_percent}% in most categories. Some categories carry different final value fees and eBay runs occasional promotions, so check eBay's official fee page for your exact category before you list.`,
        },
      ]
    : [];
  return (
    <>
      {jsonLd([
        webAppJsonLd({
          name: 'eBay Fee Calculator',
          path: '/calculators/ebay',
          description: 'Calculate eBay selling fees and net payout for a sale price.',
        }),
        breadcrumbJsonLd([['Home', '/'], ['eBay fee calculator', '/calculators/ebay']]),
      ])}
      <FeeCalculator label="eBay" rates={rates} />
      <CalculatorFaq label="eBay" faqs={faqs} />
    </>
  );
}
