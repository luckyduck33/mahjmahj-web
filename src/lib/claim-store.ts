import { promises as fs } from 'fs';
import path from 'path';
import type { ClaimRequest } from '@/lib/claim';

// Persistence for claim requests — the "ops queue" a human reviews before
// flipping a listing to managed-by-organizer.
//
// v1 (this file): append to a newline-delimited JSON file on disk. This is the
// simplest thing that works locally and on a single writable instance. It is
// deliberately swappable — see persistClaimRequest's Notion stub below.
//
// IMPORTANT (P0): we persist tokenHash, NOT the raw token. The raw token is
// returned to the requester once by the API and never stored, so a leaked
// store cannot be used to impersonate a pending claim.
//
// NOTE for the eventual v1 ship: Vercel's serverless filesystem is ephemeral
// and read-only outside /tmp, so this JSON store is for LOCAL DEV + the ops
// loop only. Before this goes live, wire persistClaimRequest to the Organizers
// Notion DB (or the mahjmahj-api repo) — see the marked TODO. Leaving it as a
// local store now keeps v1 self-contained and avoids inventing an API contract
// the api repo hasn't agreed to yet.

const STORE_DIR = path.join(process.cwd(), '.data');
const STORE_FILE = path.join(STORE_DIR, 'claim-requests.ndjson');

// What we actually write — the raw `token` is stripped.
type StoredClaim = Omit<ClaimRequest, 'token'>;

export async function persistClaimRequest(request: ClaimRequest): Promise<void> {
  // Strip the raw token; keep only the hash.
  const { token: _token, ...stored } = request;
  void _token;

  // ── TODO(v1 ship): replace this file write with a Notion "Organizers /
  // Claim Requests" DB insert (Notion-first per the spec's data model), or a
  // POST to the mahjmahj-api repo. The StoredClaim shape maps 1:1 to the
  // planned Notion properties (Organizer, City, Contact Name, Role, Channel,
  // Contact, Notes, Status=pending, Token Hash, Created At). ──
  await writeToLocalStore(stored);
}

async function writeToLocalStore(stored: StoredClaim): Promise<void> {
  await fs.mkdir(STORE_DIR, { recursive: true });
  await fs.appendFile(STORE_FILE, JSON.stringify(stored) + '\n', 'utf8');
}

/** Read all pending claim requests (ops-loop helper). Local store only. */
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
