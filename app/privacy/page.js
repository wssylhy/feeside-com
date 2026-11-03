import { jsonLd, breadcrumbJsonLd, og, SITE } from '../../lib/seo';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'Feeside collects almost nothing: calculators run in your browser, there are no accounts or ad trackers, and payments are processed by Creem as merchant of record.',
  alternates: { canonical: '/privacy' },
  openGraph: og({
    title: 'Privacy Policy',
    description: 'What Feeside collects (almost nothing) and who processes payments.',
    path: '/privacy',
  }),
};

export default function PrivacyPage() {
  return (
    <div className="legal">
      {jsonLd([breadcrumbJsonLd([['Home', '/'], ['Privacy Policy', '/privacy']])])}
      <h1>Privacy Policy</h1>
      <p className="meta-line">Last updated: 2026-11-03</p>

      <h2>Short version</h2>
      <p>
        The calculators on this site run entirely in your browser. We don&apos;t
        ask you to sign up, we don&apos;t run advertising or analytics trackers,
        and we don&apos;t sell data — because we don&apos;t collect any to sell.
      </p>

      <h2>What we collect</h2>
      <p>
        <strong>Nothing while you use the tools.</strong> The numbers you type
        into a calculator (sale price, shipping) are processed on your device
        and are never sent to us. We don&apos;t see them, store them, or log
        them.
      </p>

      <h2 id="extension">FeeSide browser extension</h2>
      <p>
        The FeeSide extension for Chrome does not collect, transmit, or sell
        any personal data. The item cost you enter is stored locally in your
        own browser profile (chrome.storage.sync) and is never sent to any
        server. The extension reads only the listed price from a listing page
        to prefill the calculator, and it does not transmit page content
        anywhere. There is no analytics, no advertising, and no account
        system.
      </p>
      <p>
        Fee rates displayed by the extension ship inside the extension after
        automated collection and human verification against official eBay and
        Etsy fee pages. No browsing history or behavior is recorded.
      </p>

      <h2>Purchases</h2>
      <p>
        Paid products (such as the fee comparison sheet) are sold through{' '}
        <a href="https://www.creem.io" rel="noopener">Creem</a>, which acts as
        merchant of record. When you buy, the payment details and personal data
        you enter at checkout are processed by Creem under{' '}
        <a href="https://www.creem.io/privacy" rel="noopener">Creem&apos;s privacy
        notice</a>. We receive your order email so we can deliver the product
        and answer support questions — nothing more.
      </p>

      <h2>Hosting</h2>
      <p>
        This site is served as static files. Standard server logs (such as IP
        address and requested page) may be processed by our hosting provider
        for security and availability. We don&apos;t have access to analytics
        dashboards and don&apos;t profile visitors.
      </p>

      <h2>Cookies</h2>
      <p>We don&apos;t set cookies and don&apos;t use advertising pixels.</p>

      <h2>Contact</h2>
      <p>
        Questions about this policy: <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>
      </p>
    </div>
  );
}
