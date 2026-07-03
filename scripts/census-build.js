#!/usr/bin/env node
/**
 * Census build — "State of American Mahjong 2026" citable asset.
 *
 * Recomputes every published number from the COMMITTED snapshot in
 * src/data/census-source/ and writes:
 *   - src/data/census-2026-07.json           (view model the page imports)
 *   - public/data/state-of-american-mahjong-2026.csv  (downloadable aggregates)
 *
 * Source-of-Truth Gate: nothing here is hand-typed. Re-run with
 * `npm run census:build` whenever the snapshot is refreshed. Framing is a
 * *listings census* ("tracked as of <date>"), never an estimate of all US
 * mahjong activity — no extrapolation.
 *
 * Canonical input is the POST-DEDUPE snapshot (total 747). The sibling
 * `-final.json` (837) is a pre-dedupe capture and must NOT be used — it still
 * contains the 90 duplicate listings archived on 2026-07-02. See
 * visibleos-sprint/docs/specs/mm-state-of-american-mahjong-census.md.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src/data/census-source');
const baseline = JSON.parse(
  fs.readFileSync(path.join(SRC, 'baseline-2026-07-02-postdedupe.json'), 'utf8'),
);
const organizers = JSON.parse(
  fs.readFileSync(path.join(SRC, 'organizer-counts.json'), 'utf8'),
);

// City name → /events/[slug] (mirrors getCitySlug in src/lib/api.ts).
const toSlug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const total = baseline.total;
const byCity = baseline.byCity;
const byStatus = baseline.byStatus;
const bySource = baseline.bySource;

const cityRows = Object.entries(byCity)
  .map(([name, listings]) => ({ name, listings, slug: toSlug(name) }))
  .sort((a, b) => b.listings - a.listings || a.name.localeCompare(b.name));

// Integrity check: the per-city counts must sum to the reported total.
const cityCitySum = cityRows.reduce((s, r) => s + r.listings, 0);
if (cityCitySum !== total) {
  throw new Error(`byCity sum (${cityCitySum}) !== total (${total}) — snapshot inconsistent`);
}

// Source diversity. Eventbrite-family = any source key mentioning eventbrite.
const sourceEntries = Object.entries(bySource);
const isEventbrite = (k) => /eventbrite/i.test(k);
const eventbriteListings = sourceEntries
  .filter(([k]) => isEventbrite(k))
  .reduce((s, [, n]) => s + n, 0);
const nonEventbriteListings = total - eventbriteListings;
const distinctSources = sourceEntries.length;
const nonEventbriteSources = sourceEntries.filter(([k]) => !isEventbrite(k)).length;

const model = {
  meta: {
    title: 'The State of American Mahjong 2026',
    kind: 'listings census',
    snapshotDate: baseline.takenAt.slice(0, 10), // 2026-07-02
    lastVerified: baseline.takenAt.slice(0, 10),
    generatedFrom: 'src/data/census-source/baseline-2026-07-02-postdedupe.json + organizer-counts.json',
    note: 'Counts what MAHJ MAHJ tracked as of the snapshot date — not an estimate of all US mahjong activity. Biased toward events with a public online listing (Eventbrite/Meetup/club sites). No extrapolation.',
  },
  headline: {
    totalListings: total,
    cities: cityRows.length,
    organizers: organizers.counts.total,
  },
  byStatus: {
    upcoming: byStatus.Upcoming || 0,
    ongoing: byStatus.Ongoing || 0,
    past: byStatus.Past || 0,
  },
  sourceDiversity: {
    distinctSources,
    eventbriteListings,
    eventbriteSharePct: Math.round((eventbriteListings / total) * 1000) / 10,
    nonEventbriteListings,
    nonEventbriteSources,
  },
  organizerEcosystem: {
    total: organizers.counts.total,
    listedOnMahj: organizers.counts.tier1, // tier1 = already has events in the MAHJ DB
    activeWithContact: organizers.counts.tier2,
    activeContactUnknown: organizers.counts.tier3,
    recoveredFromEventPages: organizers.counts.fromEnrichmentOnly,
  },
  cities: cityRows,
  topCities: cityRows.slice(0, 12),
};

fs.writeFileSync(
  path.join(ROOT, 'src/data/census-2026-07.json'),
  JSON.stringify(model, null, 2) + '\n',
);

// CSV — pure aggregates, one row per city (rank, city, listings).
const csvDir = path.join(ROOT, 'public/data');
fs.mkdirSync(csvDir, { recursive: true });
const csvLines = ['rank,city,listings'];
cityRows.forEach((r, i) => {
  const city = /[",]/.test(r.name) ? `"${r.name.replace(/"/g, '""')}"` : r.name;
  csvLines.push(`${i + 1},${city},${r.listings}`);
});
fs.writeFileSync(
  path.join(csvDir, 'state-of-american-mahjong-2026.csv'),
  csvLines.join('\n') + '\n',
);

console.log(
  `census-build ✓  ${total} listings · ${cityRows.length} cities · ` +
    `${distinctSources} sources (${model.sourceDiversity.eventbriteSharePct}% Eventbrite) · ` +
    `${organizers.counts.total} organizers`,
);
