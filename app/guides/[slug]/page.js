import FeeCalculator from '../../../components/FeeCalculator';
import { guideSlugs, loadGuide, platformsForGuide } from '../../../lib/guides';
import { loadPlatform } from '../../../lib/rates';
import { jsonLd, articleJsonLd, breadcrumbJsonLd, og } from '../../../lib/seo';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return guideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = loadGuide(slug);
  if (!guide) return {};
  const title = guide.title;
  const description = `${title} — run your exact price through the calculators and see the net payout, with rates rendered from a config scanned from official fee pages.`;
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

  return (
    <>
      {jsonLd([
        articleJsonLd({
          title: guide.title,
          description: guide.meta.primary_keyword,
          path: `/guides/${slug}/`,
        }),
        breadcrumbJsonLd([
          ['Home', '/'],
          ['Guides', '/#guides'],
          [guide.title, `/guides/${slug}/`],
        ]),
      ])}
      <article className="guide">
        <h1>{guide.title}</h1>
        {platforms.length > 0 && (
          <div className="guide-calculators">
            {platforms.map((key) => (
              <FeeCalculator key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} rates={loadPlatform(key)} />
            ))}
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: guide.html }} />
      </article>
    </>
  );
}
