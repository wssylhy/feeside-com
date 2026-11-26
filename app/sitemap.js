import { loadRates, PLATFORM_LABELS } from '../lib/rates';
import { guideIndex } from '../lib/guides';
import { SITE } from '../lib/seo';

export const dynamic = 'force-static';

// Static routes carry their trailing slash (the export uses trailingSlash: true).
// lastModified comes from the data itself: a guide's `updated` frontmatter,
// a calculator's most recent rate check.
export default function sitemap() {
  const rates = (loadRates().platforms) || {};
  return [
    { url: SITE.url + '/', changeFrequency: 'weekly', priority: 1 },
    { url: SITE.url + '/compare/', changeFrequency: 'weekly', priority: 0.9 },
    { url: SITE.url + '/sheet/', changeFrequency: 'weekly', priority: 0.7 },
    { url: SITE.url + '/privacy/', changeFrequency: 'yearly', priority: 0.3 },
    { url: SITE.url + '/terms/', changeFrequency: 'yearly', priority: 0.3 },
    { url: SITE.url + '/extension/', changeFrequency: 'yearly', priority: 0.5 },
    ...PLATFORM_LABELS.map(({ key }) => {
      const checked = rates[key] && rates[key].scraped_date;
      return {
        url: `${SITE.url}/calculators/${key}/`,
        changeFrequency: 'weekly',
        priority: 0.8,
        ...(checked ? { lastModified: checked } : {}),
      };
    }),
    ...guideIndex().map(({ path, updated }) => ({
      url: SITE.url + path,
      changeFrequency: 'weekly',
      priority: 0.7,
      ...(updated ? { lastModified: updated } : {}),
    })),
  ];
}
