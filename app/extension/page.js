import { jsonLd, breadcrumbJsonLd, og, SITE } from '../../lib/seo';

const PATH = '/extension/';

export const metadata = {
  title: 'FeeSide Extension: marketplace fee calculator for your browser',
  description:
    'Free browser extension that shows eBay and Etsy fees and your net payout on the listing page. Download and install in under a minute.',
  alternates: { canonical: PATH },
  openGraph: og({
    title: 'FeeSide Extension',
    description: 'See what you actually keep after marketplace fees, right on the listing page.',
    path: PATH,
  }),
};

export default function ExtensionPage() {
  return (
    <div className="legal">
      {jsonLd([breadcrumbJsonLd([['Home', '/'], ['FeeSide Extension', PATH]])])}
      <h1>FeeSide Extension</h1>
      <p className="meta-line">Version 0.1.2 · Free · Works on eBay and Etsy listing pages</p>

      <h2>What it does</h2>
      <p>
        The FeeSide extension adds a small button to eBay and Etsy listing pages.
        Click it and you get the full fee breakdown, your net payout, and your
        profit after your own item cost, without leaving the page.
      </p>
      <p>
        The rates are the same verified numbers this site uses, checked against
        each platform&apos;s official fee page. On eBay the insertion fee is left
        out until you tick the box saying you have used up your free listings for
        the month.
      </p>

      <h2>Download</h2>
      <p>
        <a href="/feeside-ext-v0.1.2.zip" download>
          Download FeeSide v0.1.2 (.zip)
        </a>
      </p>

      <h2>Install (about one minute)</h2>
      <p>The extension is distributed directly from this site. Installation takes three steps:</p>
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
          unzipped files. Then open any eBay or Etsy listing and look for the
          green FeeSide button in the corner.
        </li>
      </ol>
      <p>
        Already installed an earlier version? Unzip the new file over your
        folder, then click the reload icon on the extension&apos;s card in
        <code>chrome://extensions</code>.
      </p>

      <h2>Privacy</h2>
      <p>
        No account, no tracking, no analytics. Your item cost is stored only in
        your own browser profile and never sent anywhere. See the{' '}
        <a href="/privacy/#extension">extension privacy notice</a>.
      </p>

      <h2>Support</h2>
      <p>
        Questions or bugs: <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>
      </p>
    </div>
  );
}
