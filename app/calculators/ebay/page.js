import FeeCalculator from '../../../components/FeeCalculator';
import CalculatorFaq from '../../../components/CalculatorFaq';
import CalculatorRelated from '../../../components/CalculatorRelated';
import { loadPlatform, money } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

const PATH = '/calculators/ebay/';
const TITLE = 'eBay Fee Calculator — How Much Does eBay Charge? (2026)';

export const metadata = {
  title: TITLE,
  description:
    "How much does eBay charge per sale? Enter your price and see the final value fee, per-order fee and your net payout before you list — from a config verified against eBay's official fee page.",
  alternates: { canonical: PATH },
  openGraph: og({
    title: TITLE,
    description: 'See eBay fees and your net payout before you list.',
    path: PATH,
  }),
};

export default function Page() {
  const rates = loadPlatform('ebay');
  const free = Number(rates.listing_fee_free_per_month) || 0;
  const faqs = rates.verified
    ? [
        {
          q: 'How much does eBay charge to sell?',
          a: `eBay charges a ${rates.final_value_percent}% final value fee on the total amount of the sale (most categories), plus ${money(rates.per_order_fixed)} per order — ${money(rates.per_order_fixed_under_10)} if the order total is $10 or less.` +
            (free
              ? ` Insertion fees are ${money(rates.listing_fee)} per listing once you have used your ${free} free listings for the month.`
              : ` Insertion fees are ${money(rates.listing_fee)} per listing.`),
        },
        {
          q: 'What percent does eBay take?',
          a: `${rates.final_value_percent}% in most categories. Some categories carry different final value fees and eBay runs occasional promotions, so check eBay's official fee page for your exact category before you list.`,
        },
        {
          q: 'Does eBay charge fees on shipping?',
          a: 'Yes. The final value fee applies to the total amount of the sale, which includes the shipping the buyer pays. Free shipping in your listing means no fee on shipping.',
        },
        ...(free
          ? [
              {
                q: 'How many free listings do you get on eBay?',
                a: `Every month you get up to ${free} zero-insertion-fee listings. After that, each listing costs ${money(rates.listing_fee)}.`,
              },
            ]
          : []),
      ]
    : [];
  return (
    <>
      {jsonLd([
        webAppJsonLd({
          name: 'eBay Fee Calculator',
          path: PATH,
          description: 'Calculate eBay selling fees and net payout for a sale price.',
        }),
        breadcrumbJsonLd([['Home', '/'], ['eBay fee calculator', PATH]]),
      ])}
      <FeeCalculator label="eBay" rates={rates} />
      <CalculatorFaq label="eBay" faqs={faqs} />
      <CalculatorRelated platformKey="ebay" label="eBay" />
    </>
  );
}
