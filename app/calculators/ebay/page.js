import FeeCalculator from '../../../components/FeeCalculator';
import { loadPlatform } from '../../../lib/rates';
import { jsonLd, webAppJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

export const metadata = {
  title: 'eBay Fee Calculator — final value & per-order fees',
  description:
    "Enter your sale price and see eBay's fees and your net payout before you list. Numbers come from a verified config scanned from eBay's official fee page.",
  alternates: { canonical: '/calculators/ebay' },
  openGraph: og({
    title: 'eBay Fee Calculator — final value & per-order fees',
    description: 'See eBay fees and your net payout before you list.',
    path: '/calculators/ebay',
  }),
};

export default function Page() {
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
      <FeeCalculator label="eBay" rates={loadPlatform('ebay')} />
    </>
  );
}
