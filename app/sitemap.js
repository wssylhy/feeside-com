import { PLATFORM_LABELS } from '../lib/rates';
import { SITE } from '../lib/seo';

export const dynamic = 'force-static';

export default function sitemap() {
  return [
    { url: SITE.url + '/', changeFrequency: 'weekly', priority: 1 },
    { url: SITE.url + '/compare', changeFrequency: 'weekly', priority: 0.9 },
    ...PLATFORM_LABELS.map(({ key }) => ({
      url: `${SITE.url}/calculators/${key}`,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
  ];
}
