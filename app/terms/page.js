import { jsonLd, breadcrumbJsonLd, og, SITE } from '../../lib/seo';

export const metadata = {
  title: 'Terms of Service',
  description:
    'Terms for using Feeside calculators and buying the fee comparison sheet: no warranty, marketplace fees change, Creem is merchant of record for purchases.',
  alternates: { canonical: '/terms' },
  openGraph: og({
    title: 'Terms of Service',
    description: 'Terms for using Feeside calculators and buying the fee sheet.',
    path: '/terms',
  }),
};

export default function TermsPage() {
  return (
    <div className="legal">
      {jsonLd([breadcrumbJsonLd([['Home', '/'], ['Terms of Service', '/terms']])])}
      <h1>Terms of Service</h1>
      <p className="meta-line">Last updated: 2026-11-01</p>

      <h2>What this site is</h2>
      <p>
        Feeside is a free, independent calculator for marketplace seller fees
        (eBay, Poshmark, Mercari, Vinted, Depop, Etsy). It is not affiliated
        with, endorsed by, or sponsored by any of these marketplaces. Their
        names and trademarks belong to their owners.
      </p>

      <h2>Fee numbers</h2>
      <p>
        Fee rates shown on this site are collected from each marketplace&apos;s
        official fee page by an automated pipeline and cross-checked before
        display; each calculator shows its verification status and the date the
        data was captured. Marketplaces change their fees at any time and may
        run promotions or category exceptions this tool does not model. Fees
        shown are estimates for typical domestic US sales — always confirm
        against the marketplace&apos;s official page before making financial
        decisions.
      </p>

      <h2>No warranty</h2>
      <p>
        The site and its calculators are provided &quot;as is&quot; without
        warranties of any kind. We do not guarantee that results are complete,
        current, or fit for your particular situation. To the maximum extent
        permitted by law, we are not liable for losses arising from use of this
        site or reliance on its output.
      </p>

      <h2>Purchases</h2>
      <p>
        Paid products (such as the printable fee comparison sheet) are digital
        goods sold through{' '}
        <a href="https://www.creem.io" rel="noopener">Creem</a>, which is the
        merchant of record: Creem processes the payment, taxes and invoices
        under its{' '}
        <a href="https://www.creem.io/buyer-terms" rel="noopener">buyer terms</a>.
        If a product does not work as described, contact us within 14 days of
        purchase and we will make it right or refund you.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Don&apos;t attempt to break the site, scrape it at disruptive volume,
        or resell its content as your own. Personal, commercial use of the
        calculators and printed sheet is fine.
      </p>

      <h2>Changes</h2>
      <p>
        These terms may change as the product evolves; the date above shows the
        current version.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>
      </p>
    </div>
  );
}
