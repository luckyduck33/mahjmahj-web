'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface CityFinderCity {
  slug: string;
  name: string;
  /** Upcoming-event count, when cheaply available from build-time data. */
  count?: number;
}

interface Props {
  /** Full city list (manifest + any event-only cities) for type-ahead search. */
  cities: CityFinderCity[];
  /** Slugs to render as quick-pick chips below the search input, in order. */
  featuredSlugs: string[];
}

const MAX_RESULTS = 8;

// Case + diacritic-insensitive normalize for matching ("Sao Paulo" ~ "São Paulo").
function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

export default function CityFinder({ cities, featuredSlugs }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const featured = featuredSlugs
    .map((slug) => cities.find((c) => c.slug === slug))
    .filter((c): c is CityFinderCity => !!c);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    return cities.filter((c) => normalize(c.name).includes(q)).slice(0, MAX_RESULTS);
  }, [cities, query]);

  function go(slug: string) {
    setOpen(false);
    router.push(`/events/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) {
      if (e.key === 'ArrowDown' && results.length > 0) {
        setOpen(true);
        setActiveIndex(0);
        e.preventDefault();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && results[activeIndex]) {
        e.preventDefault();
        go(results[activeIndex].slug);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
    }
  }

  const listboxId = 'city-finder-listbox';

  return (
    <div className="city-finder">
      <div className="city-finder-search">
        <label className="signup-sr" htmlFor="city-finder-input">
          Search for a city
        </label>
        <input
          id="city-finder-input"
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 && results[activeIndex] ? `city-finder-option-${results[activeIndex].slug}` : undefined
          }
          autoComplete="off"
          placeholder="Search for a city — e.g. Los Angeles, London, Toronto"
          className="city-finder-input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          // Options prevent default on mousedown, so focus never leaves the
          // input when one is picked — blur can close the list immediately,
          // with no click-vs-unmount race (the old 120ms timeout hack).
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
        />
        {/* Screen-reader feedback while typing: focus stays on the input
            (APG combobox pattern), so announce result changes politely. */}
        <span className="signup-sr" aria-live="polite">
          {query.trim()
            ? results.length > 0
              ? `${results.length} ${results.length === 1 ? 'city' : 'cities'} found`
              : `No cities match ${query}`
            : ''}
        </span>
        {open && query.trim() && (
          <ul id={listboxId} role="listbox" className="city-finder-dropdown">
            {results.length > 0 ? (
              results.map((c, i) => (
                <li key={c.slug} role="presentation">
                  {/* tabIndex -1: keyboard focus never enters the list — the
                      input keeps focus and drives selection via
                      aria-activedescendant, per the APG combobox pattern. */}
                  <Link
                    id={`city-finder-option-${c.slug}`}
                    href={`/events/${c.slug}`}
                    role="option"
                    tabIndex={-1}
                    aria-selected={i === activeIndex}
                    className={`city-finder-option${i === activeIndex ? ' city-finder-option--active' : ''}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      go(c.slug);
                    }}
                    onClick={(e) => e.preventDefault()}
                  >
                    <span>{c.name}</span>
                    {typeof c.count === 'number' && c.count > 0 && (
                      <span className="city-finder-count">
                        {c.count} upcoming
                      </span>
                    )}
                  </Link>
                </li>
              ))
            ) : (
              <li className="city-finder-empty" role="presentation">
                No cities match &ldquo;{query}&rdquo; yet.
              </li>
            )}
          </ul>
        )}
      </div>

      {featured.length > 0 && (
        <div className="city-finder-chips">
          {featured.map((c) => (
            <Link key={c.slug} href={`/events/${c.slug}`} className="city-pill">
              {c.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
