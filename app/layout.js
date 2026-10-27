import './globals.css';

export const metadata = {
  metadataBase: new URL('https://feeside.com'),
  title: {
    default: 'Marketplace Fee Calculators — see what you keep',
    template: '%s | Feeside',
  },
  description:
    'Enter a sale price and see exactly what each marketplace takes — eBay, Poshmark, Mercari, Vinted, Depop and Etsy. Every fee number comes from a verified config scanned from official fee pages.',
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
          Fee numbers come from a verified config, collected by automated scans of official fee pages. Unverified numbers are never shown.
        </footer>
      </body>
    </html>
  );
}
