import type { MahjEvent } from '@/lib/api';

export default function EventCard({ event }: { event: MahjEvent }) {
  const formattedDate = event.date
    ? new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <div className="bg-cream-light rounded-xl p-5 border border-sand/50 hover:border-teal/30 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-base font-semibold text-brown-dark truncate">
            {event.title}
          </h3>
          <p className="text-sm text-brown-light mt-1">
            {event.host && <span>{event.host}</span>}
          </p>
        </div>
        {event.cost && (
          <span className="shrink-0 text-xs font-semibold px-2 py-1 bg-teal-bg text-teal-dark rounded-full">
            {event.cost}
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-brown-light">
        {formattedDate && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedDate}
          </span>
        )}
        {event.time && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {event.time}
          </span>
        )}
        {event.city && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.city}
            {event.neighborhood && `, ${event.neighborhood}`}
          </span>
        )}
      </div>

      {event.styles && event.styles.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {event.styles.map((style) => (
            <span
              key={style}
              className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20"
            >
              {style}
            </span>
          ))}
          {event.skillLevel?.map((level) => (
            <span
              key={level}
              className="text-xs px-2 py-0.5 rounded-full bg-olive/10 text-olive border border-olive/20"
            >
              {level}
            </span>
          ))}
        </div>
      )}

      {event.registrationLink && (
        <div className="mt-4">
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-terracotta hover:text-terracotta-light transition-colors"
          >
            Register &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
