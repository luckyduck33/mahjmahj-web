# mahjmahj-web (mahjmahj.co)

Public-facing MAHJ MAHJ website. Next.js / Vercel. Pulls events + news from `https://api.mahjmahj.co` (separate `mahjmahj-api` repo). The Capacitor iOS app wraps `app.mahjmahj.co`, which is a different repo (`mahj-mahj`).

## Hard rules

- Always say **"Hong Kong Mahjong"** — never "Chinese Mahjong" — in any copy, schema, or page metadata.
- The city manifest at `src/data/cities.ts` is the source of truth for which `/events/[city]` pages exist. Scraped events populate them but don't define them.
- Do not touch `app.mahjmahj.co` from this repo — that's the Capacitor app, separate codebase, separate brand surface area.

## Architecture quick map

- `src/app/events/page.tsx` — events hub, lists every manifest city as a tile/pill regardless of event count.
- `src/app/events/[city]/page.tsx` — per-city page; renders manifest intro + FAQ even when no events; emits Event + FAQPage + Breadcrumb JSON-LD.
- `src/app/sitemap.ts` — emits every manifest city plus any historical event-only cities.
- `src/data/cities.ts` — city manifest. Each entry: slug, name, state, country, tier (1/2/3), intro, faqs[].
- `src/lib/api.ts` — `getEvents`, `getNews`, `getCitySlug`, `getCityFromSlug`. Uses `https://api.mahjmahj.co` as the base.
- `src/lib/schema.ts` — JSON-LD builders (event, faq, breadcrumb, etc.).

## Code Task Queue (auto-synced from Notion)

At session start, read `~/Desktop/CLAUDE/Operations/code-queue.md` for pending Notion tasks assigned to Code. Refreshed by cron 6x/day. If stale (>4h), run `node ~/Desktop/CLAUDE/Operations/sync-code-queue.js`. If tasks exist, present to Nidhi and ask which to work on.
