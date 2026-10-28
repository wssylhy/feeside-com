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

const NAV = [
  ['/', 'Home'],
  ['/compare', 'Compare all'],
  ['/calculators/ebay', 'eBay'],
  ['/calculators/poshmark', 'Poshmark'],
  ['/calculators/mercari', 'Mercari'],
  ['/calculators/vinted', 'Vinted'],
  ['/calculators/depop', 'Depop'],
  ['/calculators/etsy', 'Etsy'],
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
          Fee numbers are machine-scanned from official fee pages and cross-checked
          by an independent extraction pass before display; each calculator labels
          its review status. Independent tool — not affiliated with any marketplace.
        </footer>
      </body>
    </html>
  );
}
