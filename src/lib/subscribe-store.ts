import { promises as fs } from 'fs';
import path from 'path';
import type { SubscribeRecord } from '@/lib/subscribe';

// Persistence for newsletter signups. Three sinks, tried in priority order so
// the same code works today and upgrades to a real ESP by only setting env vars:
//
//   1. MailerLite  — if MAILERLITE_API_KEY is set. This is the intended
//      production sink (the org already has a MailerLite account). Optionally
//      MAILERLITE_GROUP_ID files subscribers into a specific group.
//   2. Notion      — if NOTION_TOKEN is set. Same durable pattern the claim
//      flow uses (survives Vercel's ephemeral filesystem). Acts as the sink
//      until MailerLite is wired, and as a permanent audit copy if desired.
//   3. Local file  — dev fallback so `npm run dev` works with no secrets.
//
// Rationale for building the seam now rather than hard-coding MailerLite: no
// MailerLite key is provisioned in this repo's env yet, and the Source-of-Truth
// Gate forbids shipping invented config. Notion is a real, already-working sink;
// MailerLite activates the instant a key is added, with zero code change.

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
  const mailerliteKey = process.env.MAILERLITE_API_KEY;
  if (mailerliteKey) {
    await writeToMailerLite(record, mailerliteKey);
    return;
  }

  const notionToken = process.env.NOTION_TOKEN;
  if (notionToken) {
    const dbId = process.env.SIGNUPS_DB_ID || DEFAULT_SIGNUPS_DB_ID;
    await writeToNotion(record, notionToken, dbId);
    return;
  }

  // No production sink configured — dev machine. Persist locally so the flow
  // is testable end-to-end without secrets.
  console.warn(
    '[subscribe] Neither MAILERLITE_API_KEY nor NOTION_TOKEN is set — falling ' +
      'back to the local NDJSON store. Expected in local dev; in production, ' +
      'configure a sink (see SUBSCRIBE_SETUP.md) or signups will not persist.',
  );
  await writeToLocalStore(record);
}
