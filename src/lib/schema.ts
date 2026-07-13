export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MAHJ MAHJ',
    url: 'https://mahjmahj.co',
    description: 'MAHJ MAHJ is a community platform for Hong Kong, Taiwanese, and American mahjong — city event listings, recurring club games, learning resources, and the Score My Hand scoring app.',
    // Canonical public profile only (Nidhi-confirmed 2026-07-03). @mahjmahj88 is
    // the API/login account and must never appear in public schema.
    sameAs: ['https://www.instagram.com/mahjmahj_la/'],
  };
}

// Alias used in some pages
export const orgSchema = organizationSchema;

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MAHJ MAHJ',
    url: 'https://mahjmahj.co',
    description: 'Find mahjong events, learn rules and strategy, and connect with players across the United States.',
  };
}

// Alias
export const websiteSchema = webSiteSchema;

// Normalize an event date to an ISO 8601 string Google's Event rich-result
// validator accepts. The API returns either a bare date ("2026-05-15") or
// an ISO timestamp. Bare dates pass validation but combining with a known
// time field improves snippet display.
function normalizeEventStartDate(date: string, time?: string): string {
  if (!date) return date;
  if (/T\d{2}:\d{2}/.test(date)) return date;
  if (time) {
    const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (match) {
      let h = parseInt(match[1], 10);
      const m = match[2];
      const ampm = match[3]?.toUpperCase();
      if (ampm === 'PM' && h < 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;
      return `${date}T${String(h).padStart(2, '0')}:${m}:00`;
    }
  }
  return date;
}

export function eventSchema(event: {
  title: string;
  city: string;
  date: string;
  endDate?: string;
  time?: string;
  venue?: string;
  streetAddress?: string;
  description?: string;
  url?: string;
  state?: string;
  organizer?: string;
  registrationLink?: string;
  cost?: string;
  image?: string;
}) {
  const eventUrl = event.url || event.registrationLink;
  const startDate = normalizeEventStartDate(event.date, event.time);
  // Google requires `image` for Event rich results to render. Fall back to
  // the brand OG image so the validator passes and the SERP gets a branded
  // thumbnail instead of no rich snippet.
  const image = event.image || 'https://mahjmahj.co/og-default.jpg';
  let isPast = false;
  try {
    const d = new Date(startDate);
    if (!isNaN(d.getTime()) && d.getTime() < Date.now() - 24 * 60 * 60 * 1000) {
      isPast = true;
    }
  } catch {}
  // Only attach an organizer/performer when we actually know who runs the event
  // (the API's `host`, mapped upstream). Never default to "MAHJ MAHJ": these are
  // mostly third-party scraped events and asserting we organize them is a trust
  // bug. Google treats organizer/performer as recommended, not required, so
  // omitting them costs only a soft warning — far better than a false claim.
  const organizer = event.organizer
    ? { '@type': 'Organization', name: event.organizer }
    : undefined;
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate,
    ...(event.endDate && { endDate: event.endDate }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      // Prefer the real venue name ("Falafel Palace"); fall back to city only
      // when the venue is genuinely unknown.
      name: event.venue || event.city,
      address: {
        '@type': 'PostalAddress',
        ...(event.streetAddress && { streetAddress: event.streetAddress }),
        addressLocality: event.city,
        ...(event.state && { addressRegion: event.state }),
        addressCountry: 'US',
      },
    },
    image: [image],
    ...(event.description && { description: event.description }),
    ...(eventUrl && { url: eventUrl }),
    ...(organizer && { organizer, performer: organizer }),
  };
  if (event.cost) {
    const price = event.cost.replace(/[^0-9.]/g, '') || '0';
    schema.offers = {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
      availability: isPast
        ? 'https://schema.org/SoldOut'
        : 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
      ...(event.registrationLink && { url: event.registrationLink }),
    };
  }
  return schema;
}

export function itemListSchema(items: Array<{ name: string; url: string; position: number }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(article: {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    url: article.url,
    author: {
      '@type': 'Organization',
      name: 'MAHJ MAHJ',
      url: 'https://mahjmahj.co',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MAHJ MAHJ',
      url: 'https://mahjmahj.co',
    },
    ...(article.datePublished && { datePublished: article.datePublished }),
    ...(article.dateModified && { dateModified: article.dateModified }),
  };
}

export function datasetSchema(dataset: {
  name: string;
  description: string;
  url: string;
  dateModified?: string;
  temporalCoverage?: string;
  downloadUrl?: string;
  keywords?: string[];
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: dataset.name,
    description: dataset.description,
    url: dataset.url,
    creator: {
      '@type': 'Organization',
      name: 'MAHJ MAHJ',
      url: 'https://mahjmahj.co',
    },
    isAccessibleForFree: true,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    ...(dataset.dateModified && { dateModified: dataset.dateModified }),
    ...(dataset.temporalCoverage && { temporalCoverage: dataset.temporalCoverage }),
    ...(dataset.keywords && { keywords: dataset.keywords }),
  };
  if (dataset.downloadUrl) {
    schema.distribution = {
      '@type': 'DataDownload',
      encodingFormat: 'text/csv',
      contentUrl: dataset.downloadUrl,
    };
  }
  return schema;
}

export function howToSchema(howTo: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    step: howTo.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function breadcrumbSchema(
  trail: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
