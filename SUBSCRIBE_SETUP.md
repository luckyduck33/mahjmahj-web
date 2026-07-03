# Newsletter Signup — persistence setup

The marketing-site newsletter capture (`/api/subscribe`) writes each signup to
the first configured sink, checked in this order:

1. **MailerLite** — if `MAILERLITE_API_KEY` is set (intended production sink).
2. **Notion** — if `NOTION_TOKEN` is set (durable, ships working today).
3. **Local file** — `.data/subscribers.ndjson` (dev fallback, no secrets needed).

You do **not** need MailerLite to go live: with `NOTION_TOKEN` set (the same
token the claim flow already uses) signups land in the **"MAHJ MAHJ — Email
Signups"** Notion DB. Add MailerLite later by setting one env var — no code change.

## Environment variables (Vercel → `prj_iw55X8J0EHSnK2AMUsiDVdotkHGn`)

| Variable              | Value                                                          | Required |
| --------------------- | -------------------------------------------------------------- | -------- |
| `MAILERLITE_API_KEY`  | MailerLite API token — activates the MailerLite sink           | Optional (preferred once available) |
| `MAILERLITE_GROUP_ID` | MailerLite group to file subscribers into                      | Optional |
| `NOTION_TOKEN`        | Notion internal-integration secret (`ntn_` / `secret_`)        | Required if not using MailerLite (already set for claim flow) |
| `SIGNUPS_DB_ID`       | `a5ef6eaa-6e1d-4b5c-8e04-ddced6b0608c`                          | Optional (this id is the built-in default) |

If none are set, the code logs a warning and appends to a local NDJSON file.
Fine for local dev; in production, set a sink or signups will not persist.

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
