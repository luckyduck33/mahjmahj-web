import { promises as fs } from 'fs';
import path from 'path';
import type { ClaimRequest } from '@/lib/claim';

// Persistence for claim requests — the "ops queue" a human reviews before
// flipping a listing to managed-by-organizer.
//
// v1 (this file): primary sink is the "MAHJ MAHJ — Organizer Claims" Notion DB
// (a page insert via the plain Notion REST API — no SDK, to keep the bundle
// lean). Notion survives Vercel's ephemeral filesystem, which the old NDJSON
// store did not. If NOTION_TOKEN is not set (local dev), we fall back to an
// append-only newline-delimited JSON file on disk so dev still works.
//
// IMPORTANT (P0): we persist tokenHash, NOT the raw token. The raw token is
// returned to the requester once by the API and never stored, so a leaked
// store cannot be used to impersonate a pending claim.
//
// SETUP (see CLAIM_FLOW_SETUP.md): the Vercel env needs NOTION_TOKEN (a Notion
// internal-integration secret) and, optionally, ORGANIZERS_DB_ID. The
// integration behind NOTION_TOKEN MUST be shared with the Organizer Claims
// database (Notion → database → ••• → Connections) or the write 404s.

const STORE_DIR = path.join(process.cwd(), '.data');
const STORE_FILE = path.join(STORE_DIR, 'claim-requests.ndjson');

// Notion REST config.
const NOTION_API = 'https://api.notion.com/v1/pages';
const NOTION_VERSION = '2022-06-28';
// The "MAHJ MAHJ — Organizer Claims" database. Overridable via env; the token
// has NO default — it must come from the environment.
const DEFAULT_ORGANIZERS_DB_ID = '064ee901-376c-4a0e-8fdd-903385ed8920';

// What we actually persist — the raw `token` is stripped.
type StoredClaim = Omit<ClaimRequest, 'token'>;

export async function persistClaimRequest(request: ClaimRequest): Promise<void> {
  // Strip the raw token; keep only the hash.
  const { token: _token, ...stored } = request;
  void _token;

  const notionToken = process.env.NOTION_TOKEN;
  if (!notionToken) {
    // Graceful fallback for local dev — Notion is the production sink, but we
    // must not crash a dev machine that has no integration secret configured.
    console.warn(
      '[claim] NOTION_TOKEN is not set — falling back to the local NDJSON store. ' +
        'This is expected in local dev; in production, set NOTION_TOKEN (and share ' +
        'the integration with the Organizer Claims DB) or claim requests will not persist.',
    );
    await writeToLocalStore(stored);
    return;
  }

  const dbId = process.env.ORGANIZERS_DB_ID || DEFAULT_ORGANIZERS_DB_ID;
  await writeToNotion(stored, notionToken, dbId);
}

// ── Notion write ────────────────────────────────────────────────────────────

/** Build the Notion `properties` payload from a stored claim. */
export function buildNotionProperties(stored: StoredClaim): Record<string, unknown> {
  const text = (value: string | undefined) =>
    value && value.trim()
      ? { rich_text: [{ type: 'text', text: { content: truncate(value, 2000) } }] }
      : { rich_text: [] };

  // Notion "Listings" = the event id(s)/url(s) being claimed, plus any free-text
  // note the organizer left. Keep it human-readable for the ops reviewer.
  const listings = [stored.listingId, stored.listingsNote].filter(Boolean).join(' — ');

  return {
    // title — the organizer's public/group name.
    Name: { title: [{ type: 'text', text: { content: truncate(stored.organizerName, 2000) } }] },
    // select — always created as "Pending"; a human flips it later.
    Status: { select: { name: 'Pending' } },
    'Public Name': text(stored.organizerName),
    Role: text(stored.role),
    'Contact Channel': { select: { name: stored.channel } },
    'Contact Value': text(stored.contactValue),
    Listings: text(listings || undefined),
    City: text(stored.city),
    'Token Hash': text(stored.tokenHash),
    Submitted: { date: { start: stored.createdAt } },
    Notes: text(stored.contactName ? `Contact name: ${stored.contactName}` : undefined),
  };
}

async function writeToNotion(
  stored: StoredClaim,
  notionToken: string,
  dbId: string,
): Promise<void> {
  const payload = {
    parent: { database_id: dbId },
    properties: buildNotionProperties(stored),
  };

  const res = await fetch(NOTION_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${notionToken}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // Surface the Notion error body so the route can log it and return 500.
    // A 404 here almost always means the integration was not shared with the
    // database (see CLAIM_FLOW_SETUP.md).
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

function truncate(value: string, max: number): string {
  // Notion rejects rich_text content over 2000 chars per item.
  return value.length > max ? value.slice(0, max) : value;
}

// ── Local fallback store (dev only) ─────────────────────────────────────────

async function writeToLocalStore(stored: StoredClaim): Promise<void> {
  await fs.mkdir(STORE_DIR, { recursive: true });
  await fs.appendFile(STORE_FILE, JSON.stringify(stored) + '\n', 'utf8');
}

/** Read all pending claim requests from the local store (dev ops-loop helper). */
export async function readClaimRequests(): Promise<StoredClaim[]> {
  try {
    const raw = await fs.readFile(STORE_FILE, 'utf8');
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as StoredClaim);
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw e;
  }
}
