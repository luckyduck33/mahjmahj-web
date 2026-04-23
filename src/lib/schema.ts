export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MAHJ MAHJ',
    url: 'https://mahjmahj.co',
    description: 'A community platform for mahjong players in the United States covering Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong.',
    sameAs: [],
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MAHJ MAHJ',
    url: 'https://mahjmahj.co',
    description: 'Find mahjong events, learn rules and strategy, and connect with players across the United States.',
  };
}

export function eventSchema(event: {
  title: string;
  city: string;
  date: string;
  endDate?: string;
  venue?: string;
  description?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    ...(event.endDate && { endDate: event.endDate }),
    location: {
      '@type': 'Place',
      name: event.venue || event.city,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.city,
      },
    },
    ...(event.description && { description: event.description }),
    ...(event.url && { url: event.url }),
    organizer: {
      '@type': 'Organization',
      name: 'MAHJ MAHJ',
      url: 'https://mahjmahj.co',
    },
  };
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
