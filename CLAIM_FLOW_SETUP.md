# Claim Flow v1 — Notion persistence setup

The organizer "claim your listing" flow (`/api/claim`) persists each request as a
page in a Notion database so requests survive Vercel's ephemeral filesystem.

## Required Vercel environment variables

Set these in the Vercel project (`prj_iw55X8J0EHSnK2AMUsiDVdotkHGn`) →
Settings → Environment Variables (Production, and Preview if you want claim
writes from preview deploys):

| Variable          | Value                                                                 | Required |
| ----------------- | --------------------------------------------------------------------- | -------- |
| `NOTION_TOKEN`    | Notion internal-integration secret (starts with `ntn_` / `secret_`)   | **Yes**  |
| `ORGANIZERS_DB_ID`| `064ee901-376c-4a0e-8fdd-903385ed8920`                                | Optional (this id is the built-in default) |

If `NOTION_TOKEN` is **not** set, the code logs a warning and falls back to a
local NDJSON file (`.data/claim-requests.ndjson`). That is fine for local dev,
but in production the token MUST be set or claim requests will not persist.

## One-time Notion step (REQUIRED — writes 404 without it)

The integration behind `NOTION_TOKEN` must be granted access to the database:

1. Create/locate the Notion internal integration and copy its secret →
   `NOTION_TOKEN`.
2. Open the **"MAHJ MAHJ — Organizer Claims"** database in Notion.
3. Click the **•••** menu (top-right) → **Connections** → **Add connections** →
   select the integration.

Without this share step, the Notion API returns **404** on write (it behaves as
if the database does not exist for that token).

## Database properties (must match exactly)

Parent database id: `064ee901-376c-4a0e-8fdd-903385ed8920`

| Property          | Type   | Written value                                             |
| ----------------- | ------ | --------------------------------------------------------- |
| `Name`            | title  | Organizer's public/group name                             |
| `Status`          | select | Always `Pending` (a human flips to Verified/Rejected)     |
| `Public Name`     | text   | Organizer's public/group name                             |
| `Role`            | text   | Self-identified role                                      |
| `Contact Channel` | select | Email / Instagram / Facebook / Website / Other            |
| `Contact Value`   | text   | Email / IG handle / URL                                   |
| `Listings`        | text   | Event id(s)/url(s) + free-text note                       |
| `City`            | text   | City, if provided                                         |
| `Token Hash`      | text   | SHA-256 hash of the claim token — **never the raw token** |
| `Submitted`       | date   | ISO submission time                                       |
| `Notes`           | text   | Contact name of the person submitting                     |

## Security note

Only the SHA-256 **token hash** is persisted. The raw token is returned to the
requester once by the API and never stored, so a leaked Notion DB cannot be used
to impersonate a pending claim.
