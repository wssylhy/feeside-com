// Shared SEO constants + JSON-LD builders (W1 acceptance line: every page
// carries JSON-LD + meta). Numbers never appear here — copy describes the
// tool, rates render from config only.

export const SITE = {
  // Canonical host stays feeside.com; the GitHub Pages preview build overrides
  // it via env so sitemap/canonical/JSON-LD all point at the real deploy URL.
  url: process.env.SITE_URL_OVERRIDE || 'https://feeside.com',
  name: 'Feeside',
  supportEmail: '947604609@qq.com',
  // Creem checkout for the printable fee sheet ($3, one-time). Creem is MoR.
  checkoutUrl: 'https://www.creem.io/payment/prod_23DRK0OS2hZxIkQhlQHg0j',
};

export function jsonLd(graph) {
  const payload = JSON.stringify(graph).replace(/</g, '\\u003c');
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: payload }} />
  );
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: 'Marketplace fee calculators for US resellers — see what you keep after fees.',
  };
}

export function webAppJsonLd({ name, path, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url: SITE.url + path,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    description,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([label, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: label,
      item: SITE.url + path,
    })),
  };
}

// Article JSON-LD for /guides/* content pages.
export function articleJsonLd({ title, description, path, date }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    ...(description ? { description } : {}),
    url: SITE.url + path,
    ...(date ? { datePublished: date, dateModified: date } : {}),
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name },
  };
}

// FAQPage JSON-LD for calculator FAQ sections (questions mirror the search
// queries US resellers actually type; answers interpolate config values).
export function faqJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

// Standard per-page openGraph block; title is appended by the layout template.
export function og({ title, description, path }) {
  return {
    title,
    description,
    url: path,
    type: 'website',
    siteName: SITE.name,
  };
}
