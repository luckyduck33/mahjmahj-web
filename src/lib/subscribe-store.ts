import { promises as fs } from 'fs';
import path from 'path';
import type { SubscribeRecord } from '@/lib/subscribe';

// Persistence for newsletter signups. Sinks tried in priority order so the same
// code works today and upgrades to a real ESP by only setting env vars:
//
//   1. Beehiiv     — if BEEHIIV_API_KEY + BEEHIIV_PUBLICATION_ID are set. This
//      is the chosen production sink for MAHJ MAHJ: MAHJ is a genuine newsletter
//      publication (archive + referrals), which is what Beehiiv is built for.
//      Sends Beehiiv's own welcome email when SEND_WELCOME_EMAIL is enabled.
//   2. MailerLite  — if MAILERLITE_API_KEY is set. Kept as a portable seam; not
//      provisioned for MAHJ (MAHJ went to Beehiiv), but leaving it costs nothing.
//   3. Notion      — if NOTION_TOKEN is set. Durable audit copy that survives
//      Vercel's ephemeral filesystem; runs in ADDITION to the ESP above when a
//      token is present, so we always keep a first-party record of every signup.
//   4. Local file  — dev fallback so `npm run dev` works with no secrets.
//
// Beehiiv and Notion are complementary: Beehiiv owns sending, Notion is the
// first-party backup. If the ESP write succeeds we still mirror to Notion when a
// token is configured, so a lost/rotated ESP key never means lost subscribers.

const STORE_DIR = path.join(process.cwd(), '.data');
const STORE_FILE = path.join(STORE_DIR, 'subscribers.ndjson');

// ── MailerLite ───────────────────────────────────────────────────────────────
const MAILERLITE_API = 'https://connect.mailerlite.com/api/subscribers';

async function writeToMailerLite(
  record: SubscribeRecord,
  apiKey: string,
): Promise<void> {
  const groupId = process.env.MAILERLITE_GROUP_ID;
  const payload: Record<string, unknown> = {
    email: record.email,
    fields: {
      ...(record.city ? { city: record.city } : {}),
    },
    // Provenance so we can see which surface converts in the ESP dashboard.
    ...(record.source ? { source: record.source } : {}),
    ...(groupId ? { groups: [groupId] } : {}),
  };

  const res = await fetch(MAILERLITE_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  // MailerLite returns 200/201 for create, and 200 for an already-subscribed
  // email (idempotent upsert) — both are success from our side.
  if (!res.ok) {
    let detail = '';
    try {
      detail = await res.text();
    } catch {
      /* ignore */
    }
    throw new Error(
      `MailerLite write failed (${res.status} ${res.statusText}): ${detail.slice(0, 500)}`,
    );
  }
}

// ── Beehiiv ──────────────────────────────────────────────────────────────────
// Beehiiv v2 subscriptions API. Publication ID (prefixed `pub_`) and API key both
// come from the Beehiiv dashboard (Settings → Integrations → API). Docs:
// https://developers.beehiiv.com/api-reference/subscriptions/create
async function writeToBeehiiv(
  record: SubscribeRecord,
  apiKey: string,
  publicationId: string,
): Promise<void> {
  // Opt-in: only let Beehiiv send its welcome email when explicitly enabled, so
  // turning on double-opt-in / welcome flows is a config choice, not a deploy.
  const sendWelcome = process.env.BEEHIIV_SEND_WELCOME_EMAIL === 'true';

  const payload: Record<string, unknown> = {
    email: record.email,
    reactivate_existing: false,
    send_welcome_email: sendWelcome,
    // Provenance for Beehiiv's acquisition reporting.
    utm_source: record.source || 'mahjmahj.co',
    referring_site: 'mahjmahj.co',
    ...(record.city
      ? { custom_fields: [{ name: 'City', value: record.city }] }
      : {}),
  };

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  // Beehiiv returns 201 for a new subscription and 200 for an already-existing
  // one — both are success from our side (idempotent capture).
  if (!res.ok) {
    let detail = '';
    try {
      detail = await res.text();
    } catch {
      /* ignore */
    }
    throw new Error(
      `Beehiiv write failed (${res.status} ${res.statusText}): ${detail.slice(0, 500)}`,
    );
  }
}

// ── Notion ───────────────────────────────────────────────────────────────────
const NOTION_API = 'https://api.notion.com/v1/pages';
const NOTION_VERSION = '2022-06-28';
// "MAHJ MAHJ — Email Signups" database (created via the Notion API during this
// feature's setup, parented under Lucky Command Center). Overridable via env.
// The token has NO default — it must come from the environment, and the
// integration behind it must be shared with this DB (see SUBSCRIBE_SETUP.md).
const DEFAULT_SIGNUPS_DB_ID = 'a5ef6eaa-6e1d-4b5c-8e04-ddced6b0608c';

function buildNotionProperties(record: SubscribeRecord): Record<string, unknown> {
  const text = (value: string | undefined) =>
    value && value.trim()
      ? { rich_text: [{ type: 'text', text: { content: value.slice(0, 2000) } }] }
      : { rich_text: [] };
  return {
    Email: { title: [{ type: 'text', text: { content: record.email.slice(0, 2000) } }] },
    City: text(record.city),
    Source: { select: { name: record.source || 'unknown' } },
    Status: { select: { name: 'Subscribed' } },
    Submitted: { date: { start: record.createdAt } },
  };
}

async function writeToNotion(
  record: SubscribeRecord,
  notionToken: string,
  dbId: string,
): Promise<void> {
  const res = await fetch(NOTION_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${notionToken}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: dbId },
      properties: buildNotionProperties(record),
    }),
  });
  if (!res.ok) {
    let detail = '';
    try {
      detail = await res.text();
    } catch {
      /* ignore */
    }
    throw new Error(
      `Notion write failed (${res.status} ${res.statusText}): ${detail.slice(0, 500)}`,
    );
  }
}

// ── Local dev fallback ────────────────────────────────────────────────────────
async function writeToLocalStore(record: SubscribeRecord): Promise<void> {
  await fs.mkdir(STORE_DIR, { recursive: true });
  await fs.appendFile(STORE_FILE, JSON.stringify(record) + '\n', 'utf8');
}

// ── Public entry point ────────────────────────────────────────────────────────
export async function persistSubscriber(record: SubscribeRecord): Promise<void> {
  const beehiivKey = process.env.BEEHIIV_API_KEY;
  const beehiivPub = process.env.BEEHIIV_PUBLICATION_ID;
  const mailerliteKey = process.env.MAILERLITE_API_KEY;
  const notionToken = process.env.NOTION_TOKEN;

  // Pick the sending ESP: Beehiiv is MAHJ's chosen sink; MailerLite remains a
  // fallback seam for portability. Exactly one owns "sending."
  let espError: unknown = null;
  let espWrote = false;
  if (beehiivKey && beehiivPub) {
    try {
      await writeToBeehiiv(record, beehiivKey, beehiivPub);
      espWrote = true;
    } catch (e) {
      espError = e;
    }
  } else if (mailerliteKey) {
    try {
      await writeToMailerLite(record, mailerliteKey);
      espWrote = true;
    } catch (e) {
      espError = e;
    }
  }

  // Notion is a first-party backup copy that runs alongside the ESP whenever a
  // token is present, so a lost/rotated ESP key never means a lost subscriber.
  let notionWrote = false;
  if (notionToken) {
    try {
      const dbId = process.env.SIGNUPS_DB_ID || DEFAULT_SIGNUPS_DB_ID;
      await writeToNotion(record, notionToken, dbId);
      notionWrote = true;
    } catch (e) {
      // Only surface this if the ESP also failed — otherwise the subscriber is
      // safely captured and the backup miss is a warning, not a request failure.
      if (espWrote) {
        console.warn('[subscribe] Notion backup write failed (ESP succeeded):', e);
      } else {
        espError = espError ?? e;
      }
    }
  }

  if (espWrote || notionWrote) return;

  // Neither the ESP nor Notion captured the record. If a sink was configured but
  // errored, fail loudly so the route returns 500 (don't silently drop a lead).
  if (espError) throw espError;

  // No production sink configured at all — dev machine. Persist locally so the
  // flow is testable end-to-end without secrets.
  console.warn(
    '[subscribe] No ESP (BEEHIIV_API_KEY / MAILERLITE_API_KEY) and no ' +
      'NOTION_TOKEN set — falling back to the local NDJSON store. Expected in ' +
      'local dev; in production, configure a sink (see SUBSCRIBE_SETUP.md) or ' +
      'signups will not persist.',
  );
  await writeToLocalStore(record);
}
