import { PLATFORM_LABELS } from '../lib/rates';
import { guideSlugs } from '../lib/guides';
import { SITE } from '../lib/seo';

export const dynamic = 'force-static';

export default function sitemap() {
  return [
    { url: SITE.url + '/', changeFrequency: 'weekly', priority: 1 },
    { url: SITE.url + '/compare', changeFrequency: 'weekly', priority: 0.9 },
    { url: SITE.url + '/sheet', changeFrequency: 'weekly', priority: 0.7 },
    { url: SITE.url + '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { url: SITE.url + '/terms', changeFrequency: 'yearly', priority: 0.3 },
    ...PLATFORM_LABELS.map(({ key }) => ({
      url: `${SITE.url}/calculators/${key}/`,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
    ...guideSlugs().map((slug) => ({
      url: `${SITE.url}/guides/${slug}/`,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
  ];
}
