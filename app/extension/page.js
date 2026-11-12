import { jsonLd, breadcrumbJsonLd, og, SITE } from '../../lib/seo';

export const metadata = {
  title: 'FeeSide Extension — marketplace fee calculator for your browser',
  description:
    'Free browser extension that shows eBay and Etsy fees and your net payout on the listing page. Download and install in under a minute.',
  alternates: { canonical: '/extension' },
  openGraph: og({
    title: 'FeeSide Extension',
    description: 'See what you actually keep after marketplace fees, right on the listing page.',
    path: '/extension',
  }),
};

export default function ExtensionPage() {
  return (
    <div className="legal">
      {jsonLd([breadcrumbJsonLd([['Home', '/'], ['FeeSide Extension', '/extension']])])}
      <h1>FeeSide Extension</h1>
      <p className="meta-line">Version 0.1.1 · Free · Works on eBay and Etsy listing pages</p>

      <h2>What it does</h2>
      <p>
        The FeeSide extension adds a small button to eBay and Etsy listing pages.
        Click it and you get the full fee breakdown, your net payout, and your
        profit after your own item cost — without leaving the page.
      </p>
      <p>
        The eBay rates are verified against eBay&apos;s official fee page. When a
        rate is pending verification, the extension says so instead of guessing.
      </p>

      <h2>Download</h2>
      <p>
        <a href="/feeside-ext-v0.1.1.zip" download>
          Download FeeSide v0.1.1 (.zip)
        </a>
      </p>

      <h2>Install (about one minute)</h2>
      <p>
        The extension is distributed directly from this site while our store
        listings are in review. Installation takes three steps:
      </p>
      <ol>
        <li>
          Unzip the downloaded file to a folder you keep (for example
          <code> C:\FeeSide</code>).
        </li>
        <li>
          In Chrome or Edge, open <code>chrome://extensions</code> (Edge:
          <code> edge://extensions</code>) and turn on
          <strong> Developer mode</strong>.
        </li>
        <li>
          Click <strong>Load unpacked</strong> and pick the folder with the
          unzipped files. Done — open any eBay listing and look for the green
          FeeSide button in the corner.
        </li>
      </ol>

      <h2>Privacy</h2>
      <p>
        No account, no tracking, no analytics. Your item cost is stored only in
        your own browser profile and never sent anywhere. See the{' '}
        <a href="/privacy#extension">extension privacy notice</a>.
      </p>

      <h2>Support</h2>
      <p>
        Questions or bugs: <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>
      </p>
    </div>
  );
}
