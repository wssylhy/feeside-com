import './globals.css';
import { SITE } from '../lib/seo';
export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Marketplace Fee Calculators — see what you keep',
    template: '%s | Feeside',
  },
  description:
    'Enter a sale price and see exactly what each marketplace takes — eBay, Poshmark, Mercari, Vinted, Depop and Etsy. Every fee number is scanned from official fee pages and cross-checked before display.',
  openGraph: {
    type: 'website',
    siteName: 'Feeside',
    url: '/',
  },
};

// Links carry the trailing slash because the site is exported with
// trailingSlash: true; slashless links would 308-redirect first.
const NAV = [
  ['/', 'Home'],
  ['/compare/', 'Compare all'],
  ['/#guides', 'Guides'],
  ['/sheet/', 'Fee sheet'],
  ['/calculators/ebay/', 'eBay'],
  ['/calculators/poshmark/', 'Poshmark'],
  ['/calculators/mercari/', 'Mercari'],
  ['/calculators/vinted/', 'Vinted'],
  ['/calculators/depop/', 'Depop'],
  ['/calculators/etsy/', 'Etsy'],
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site">
          <nav>
            {NAV.map(([href, label]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site">
          <p>
            Fee numbers are collected from each marketplace&apos;s official fee page, checked by
            hand, and dated on every calculator. Independent tool, not affiliated with any marketplace.
          </p>
          <p>
            <a href="/privacy/">Privacy Policy</a>
            {' · '}
            <a href="/terms/">Terms of Service</a>
            {' · '}
            <a href="/extension/">Browser extension</a>
            {' · '}
            Support: <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
