export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MAHJ MAHJ',
    url: 'https://mahjmahj.co',
    description:
      'A community platform for mahjong players in the United States covering Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong.',
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MAHJ MAHJ',
    url: 'https://mahjmahj.co',
    description:
      'Find local mahjong events, learn rules and strategy for Hong Kong, Taiwanese, and American Mahjong.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://mahjmahj.co/events?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function eventSchema(event: {
  title: string;
  date: string;
  time?: string;
  city: string;
  address?: string;
  description?: string;
  host?: string;
  registrationLink?: string;
  cost?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    location: {
      '@type': 'Place',
      name: event.city,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.city,
        ...(event.address && { streetAddress: event.address }),
      },
    },
    ...(event.description && { description: event.description }),
    ...(event.host && {
      organizer: { '@type': 'Organization', name: event.host },
    }),
    ...(event.registrationLink && { url: event.registrationLink }),
    ...(event.cost && {
      offers: {
        '@type': 'Offer',
        price: event.cost.replace(/[^0-9.]/g, '') || '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    }),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
  };
}

export function faqSchema(
  faqs: { question: string; answer: string }[]
) {
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

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}
