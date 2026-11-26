import Link from 'next/link';
import FeeCalculator from '../../../components/FeeCalculator';
import { guideSlugs, loadGuide, platformsForGuide } from '../../../lib/guides';
import { loadPlatform } from '../../../lib/rates';
import { jsonLd, articleJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

export const dynamic = 'force-static';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const LABELS = { ebay: 'eBay', poshmark: 'Poshmark', mercari: 'Mercari', vinted: 'Vinted', depop: 'Depop', etsy: 'Etsy' };
const longDate = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}` : null;
};

export function generateStaticParams() {
  return guideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = loadGuide(slug);
  if (!guide) return {};
  const title = guide.seoTitle;
  const description =
    guide.description ||
    `${title}: seller fees for eBay, Poshmark, Mercari, Vinted, Depop and Etsy, from rates verified against each platform's official fee page.`;
  return {
    title,
    description,
    alternates: { canonical: `/guides/${slug}/` },
    openGraph: og({ title, description, path: `/guides/${slug}/` }),
  };
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const guide = loadGuide(slug);
  if (!guide) return null;
  const platforms = platformsForGuide(slug);

  // Answer first: the opening paragraph stays above the calculators.
  const firstP = guide.html.match(/^([\s\S]*?<\/p>)/);
  const intro = firstP ? firstP[0] : '';
  const rest = firstP ? guide.html.slice(intro.length) : guide.html;
  const updated = longDate(guide.updated);

  return (
    <>
      {jsonLd([
        articleJsonLd({
          title: guide.title,
          description: guide.description,
          path: `/guides/${slug}/`,
          dateModified: guide.updated || undefined,
        }),
        breadcrumbJsonLd([
          ['Home', '/'],
          ['Guides', '/#guides'],
          [guide.title, `/guides/${slug}/`],
        ]),
      ])}
      <article className="guide">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <a href="/#guides">Guides</a>
        </nav>
        <div dangerouslySetInnerHTML={{ __html: intro }} />
        {updated && <p className="updated">Updated {updated}. Rates checked against each platform&apos;s official fee page.</p>}
        {platforms.length > 0 && (
          <div className="guide-calculators">
            {platforms.map((key) => (
              <FeeCalculator key={key} label={LABELS[key] || key} rates={loadPlatform(key)} />
            ))}
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: rest }} />
      </article>
    </>
  );
}
