import type { NewsItem } from '@/lib/api';

export default function NewsCard({ item }: { item: NewsItem }) {
  const formattedDate = item.date
    ? new Date(item.date + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div className="bg-cream-light rounded-xl p-5 border border-sand/50 hover:border-teal/30 transition-colors">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {item.category && (
            <span className="text-xs font-semibold uppercase tracking-wider text-teal">
              {item.category}
            </span>
          )}
          <h3 className="font-heading text-base font-semibold text-brown-dark mt-1">
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terracotta transition-colors"
              >
                {item.title}
              </a>
            ) : (
              item.title
            )}
          </h3>
          {item.summary && (
            <p className="text-sm text-brown-light mt-2 line-clamp-2">
              {item.summary}
            </p>
          )}
          <div className="mt-3 flex items-center gap-3 text-xs text-brown-muted">
            {item.source && <span>{item.source}</span>}
            {item.source && formattedDate && <span>&middot;</span>}
            {formattedDate && <span>{formattedDate}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
