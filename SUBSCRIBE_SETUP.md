# Newsletter Signup — persistence setup

**MAHJ MAHJ's chosen ESP is Beehiiv** — MAHJ is a genuine newsletter publication
(browsable archive + referral mechanics), which is what Beehiiv is built for.

The marketing-site newsletter capture (`/api/subscribe`) sends to one ESP and
keeps a first-party backup in Notion:

1. **Beehiiv** (primary send) — if `BEEHIIV_API_KEY` + `BEEHIIV_PUBLICATION_ID`
   are set. Owns delivery and the welcome flow.
2. **MailerLite** (fallback ESP seam) — used only if no Beehiiv keys are set and
   `MAILERLITE_API_KEY` is. Not provisioned for MAHJ; left in for portability.
3. **Notion** (durable backup) — if `NOTION_TOKEN` is set, every signup is ALSO
   mirrored to the **"MAHJ MAHJ — Email Signups"** DB, alongside the ESP above.
   So a lost/rotated ESP key never means a lost subscriber.
4. **Local file** — `.data/subscribers.ndjson` (dev fallback, no secrets needed).

## Environment variables (Vercel → `prj_iw55X8J0EHSnK2AMUsiDVdotkHGn`)

| Variable                     | Value                                                          | Required |
| ---------------------------- | -------------------------------------------------------------- | -------- |
| `BEEHIIV_API_KEY`            | Beehiiv API token (Dashboard → Settings → Integrations → API)  | **Yes (primary send)** |
| `BEEHIIV_PUBLICATION_ID`     | Beehiiv publication id, prefixed `pub_`                        | **Yes (primary send)** |
| `BEEHIIV_SEND_WELCOME_EMAIL` | `true` to have Beehiiv send its welcome email on signup        | Optional (default off) |
| `NOTION_TOKEN`               | Notion internal-integration secret (`ntn_` / `secret_`)        | Recommended (durable backup; same token the claim flow uses) |
| `SIGNUPS_DB_ID`              | `a5ef6eaa-6e1d-4b5c-8e04-ddced6b0608c`                          | Optional (this id is the built-in default) |
| `MAILERLITE_API_KEY`         | Only if falling back to MailerLite instead of Beehiiv          | Optional (unused for MAHJ) |
| `MAILERLITE_GROUP_ID`        | MailerLite group, if MailerLite fallback is used               | Optional |

If none are set, the code logs a warning and appends to a local NDJSON file.
Fine for local dev; in production, set Beehiiv (and ideally Notion) or signups
will not persist.

## One-time Beehiiv step (REQUIRED for the Beehiiv sink)

1. Create the MAHJ MAHJ publication in Beehiiv (free tier covers up to 2,500
   subscribers, with automations + a hosted archive).
2. Dashboard → **Settings → Integrations → API** → create an API key →
   set `BEEHIIV_API_KEY`.
3. Copy the publication id (starts with `pub_`) → set `BEEHIIV_PUBLICATION_ID`.
4. Build a **Welcome automation** in Beehiiv (this replaces any code-side
   confirmation email). Set `BEEHIIV_SEND_WELCOME_EMAIL=true` if you want
   Beehiiv's built-in welcome email in addition to (or instead of) an automation.
5. Authenticate the sending domain (mahjmahj.co) in Beehiiv so mail passes
   SPF/DKIM and doesn't land in spam.

## One-time Notion step (REQUIRED for the Notion sink — writes 404 without it)

The integration behind `NOTION_TOKEN` must be granted access to the database:

1. Open the **"MAHJ MAHJ — Email Signups"** database in Notion
   (id `a5ef6eaa-6e1d-4b5c-8e04-ddced6b0608c`, under *Lucky Command Center*).
2. Click **•••** (top-right) → **Connections** → **Add connections** → select the
   same integration used for the Organizer Claims DB.

Without this share step, the Notion API returns **404** on write.

## Database properties (must match `subscribe-store.ts`)

| Property    | Type   | Written value                                  |
| ----------- | ------ | ---------------------------------------------- |
| `Email`     | title  | Subscriber email (lowercased)                  |
| `City`      | text   | Optional city hint (local-events targeting)    |
| `Source`    | select | `homepage` / `footer` / `unknown`              |
| `Status`    | select | Always `Subscribed` on write                   |
| `Submitted` | date   | ISO submission time                            |

## Notes

- **Do NOT add "check your inbox to confirm" (or any confirmation-email promise)
  to `SUBSCRIBE_COPY` in `src/lib/subscribe.ts` until MailerLite is the confirmed
  active sink with double opt-in verified on.** The Notion sink sends no email, so
  such copy would promise something the system does not do (Source-of-Truth Gate).
  The current `successBody` is intentionally sink-agnostic and makes no email
  promise — keep it that way while Notion is the active sink.
- No double opt-in is implemented in this repo; MailerLite (when wired) handles
  confirmation and unsubscribe.
- Honeypot + per-IP rate limiting live in `src/app/api/subscribe/route.ts`,
  matching the claim endpoint.
