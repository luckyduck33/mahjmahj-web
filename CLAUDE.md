# Lucky Media Corp — Shared Operating Rules

## Before Starting Any Task
1. Confirm venture and repo match the task
2. Check the Code Queue filtered view on the Task Board — not semantic search
3. Search 3-5 keywords to check for duplicate tasks before creating new ones
4. Read the full task page content for spec (not just the title)

## Task Title Convention
Format: `{Assignee} — {Verb} {Object} ({Context})`

## Output Naming
- Content for publishing: `PUBLISH: {Venture} — {Title}`
- Data for another agent: `DATA HANDOFF: {Venture} — {Description} — for {Agent}`
- Items needing review: `REVIEW: {Venture} — {Item}`

## After Completing Any Task
1. Set Notion task Status = Done
2. Add completion note: `{YYYY-MM-DD HH:MM PT} — Completed by Code. {Summary}. Commit: {hash}.`
3. Log to Command Center: POST /api/log-output with X-Dashboard-Token header
4. If task creates work for another agent, create the handoff BEFORE marking Done
5. If Requires Human Review is checked, mark Done once deliverable is complete — Nidhi approval is separate

## If Blocked
- Leave Status = In progress
- Add note: `{YYYY-MM-DD HH:MM PT} — BLOCKED: {reason}. Needs: {what}. Next: {who}.`
- Log blocked status to Dashboard

## Source of Truth
- Task status: Notion Task Board filtered views
- Venture facts: ~/Desktop/CLAUDE/Operations/lucky-venture-registry.md
- @/Users/nidhiluckyhanda/Desktop/CLAUDE/Operations/lucky-shared-protocol.md
- This repo's behavior: this CLAUDE.md

## Source-of-Truth Gate
See **Source-of-Truth Gate** in `~/Desktop/CLAUDE/Operations/lucky-shared-protocol.md`. All factual claims (numbers, prices, calculations, scores, dates, medical claims, business listings) require stated sources. Invented or estimated data presented as fact is a P0 bug regardless of feature priority.

## Timestamps
All outputs: YYYY-MM-DD HH:MM PT (Pacific Time)

---

# mahjmahj-web (mahjmahj.co)

Public-facing MAHJ MAHJ website. Pulls events + news from `https://api.mahjmahj.co` (separate `mahjmahj-api` repo). The Capacitor iOS app wraps `app.mahjmahj.co`, which is a different repo (`mahj-mahj`). Full brand details: see the `lucky-ventures` skill.

## Stack
- Next.js App Router, TypeScript, Tailwind
- Vercel project: `prj_iw55X8J0EHSnK2AMUsiDVdotkHGn`
- GA4: `G-W1TBW9XH3N` (shared with mahj-mahj app)

## Hard rules

- The website auto-sanitizes "Chinese Mahjong" → "Hong Kong Mahjong" at the API rendering layer (`src/lib/api.ts` getEvents/getNews response handlers). Use contextually appropriate mahjong terminology in copy; the runtime sanitizer enforces brand consistency across event titles, descriptions, organizer, venue, and summary fields.
- The city manifest at `src/data/cities.ts` is the source of truth for which `/events/[city]` pages exist. Scraped events populate them but don't define them.
- Do not touch `app.mahjmahj.co` from this repo — that's the Capacitor app, separate codebase, separate brand surface area.

## Architecture quick map

- `src/app/events/page.tsx` — events hub, lists every manifest city as a tile/pill regardless of event count.
- `src/app/events/[city]/page.tsx` — per-city page; renders manifest intro + FAQ even when no events; emits Event + FAQPage + Breadcrumb JSON-LD.
- `src/app/sitemap.ts` — emits every manifest city plus any historical event-only cities.
- `src/data/cities.ts` — city manifest. Each entry: slug, name, state, country, tier (1/2/3), intro, faqs[].
- `src/lib/api.ts` — `getEvents`, `getNews`, `getCitySlug`, `getCityFromSlug`. Uses `https://api.mahjmahj.co` as the base.
- `src/lib/schema.ts` — JSON-LD builders (event, faq, breadcrumb, etc.).

## DO NOT
- Do NOT touch `app.mahjmahj.co` from this repo — that's `mahj-mahj`.
- Do NOT remove a city from `src/data/cities.ts` without verifying nothing links to it.
- Do NOT commit `.env*` files or API keys.

## Code Task Queue (auto-synced from Notion)

At session start, read `~/Desktop/CLAUDE/Operations/code-queue.md` for pending Notion tasks assigned to Code. Refreshed by cron 6x/day. If stale (>4h), run `node ~/Desktop/CLAUDE/Operations/sync-code-queue.js`. If tasks exist, present to Nidhi and ask which to work on.

---

## Command Center logging — REQUIRED at end of every task

After completing any non-trivial task in this repo, log it to the Lucky Media Command Center so the work shows up in the executive brief at https://social-dashboard-delta-one.vercel.app and in the weekly scorecard:

```bash
node ~/Desktop/CLAUDE/Operations/log-to-command-center.js \
  --brand MAHJ \
  --type <feature_shipped|bug_fix|page_deployed|content_draft|automation_run|infrastructure|seo_check|audit|other> \
  --title "Short imperative title" \
  --summary "What changed and why, in 1-3 sentences" \
  --status completed \
  --repo luckyduck33/mahjmahj-web \
  --commit $(git rev-parse --short HEAD 2>/dev/null || echo '')
```

Add `--requires-review true` if Nidhi needs to look at it. Add `--monetization-related true` for affiliate/revenue/email work. Add `--seo-geo-related true` for indexing/schema/LLM-citation work. Run with `--help` for the full flag list.

The Command Center is the source of truth for what Code, ChatGPT, Cowork, and Opus have shipped. Skip the log only for: typo fixes, README tweaks, work-in-progress commits that you'll roll up into a single later log.

<!-- LUCKY:no-default-aesthetic v1 -->
## Design: No Default Aesthetic

The problem with the default AI look is **recognizability, not ugliness.** If a result could be identified as "made by an AI on the first try," it's not done. Distinctiveness is the deliverable. Full rule: `Operations/no-default-aesthetic.md`.

**Don't default to these (both clusters — avoiding one by sliding into the other is not a fix):**
- Purple/indigo gradients, gradient headline text, `from-X to-Y` buttons
- `rounded-2xl` cards + soft shadows + three-up feature grid; Lucide icons in tinted squares
- Inter doing every job; emoji section headers; glassmorphism; Tailwind default palette
- Cream + serif + terracotta accent / near-black + one acid accent / broadsheet hairline rules
- `01 / 02 / 03` numbering on content that isn't an actual sequence

**Do this instead:**
1. **Constraints before pixels** — lock palette (exact hex), type pairing, hard rules *before* generating. If a brief specifies a direction, follow it exactly.
2. **No brief? Pin one** — name the subject, audience, and the page's single job; state it in one line before building.
3. **Derive from the subject** — pull choices from this venture's own world. Ventures should not look like siblings.
4. **Spend boldness in one place** — one signature element; keep everything around it quiet.
5. **Self-check** — "would I produce this same result for an unrelated brief?" If yes, it's a default. Revise.

**Escape hatch:** the recognizable look is fine *only when explicitly requested* (or for fast throwaways). Never default to it silently on client/venture work.
<!-- /LUCKY:no-default-aesthetic v1 -->
