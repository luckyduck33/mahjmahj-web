#!/usr/bin/env node
// Submit new/changed URLs from the production sitemap to IndexNow.
//
// IndexNow notifies Bing and Yandex (and Perplexity, which shares Bing's
// index) that URLs have been added or updated, prompting an immediate
// recrawl instead of waiting for the normal discovery cycle.
//
// Diff-based since 2026-07-16: Bing Webmaster Tools flags full-sitemap
// resubmission on every deploy ("Avoid IndexNow Batch Mode to prevent
// excessive server load and potential indexing delays"). The script now
// persists the last-seen sitemap snapshot ({url: lastmod}) in a state file
// and submits only URLs that are new or have a meaningfully changed lastmod.
// Build-stamped lastmods (one value shared by many URLs = deploy timestamp,
// not a content date) are ignored as change signals — without this, sites
// whose sitemap stamps every URL with the build time would still resubmit
// everything on every push.
//
// Triggered by .github/workflows/indexnow.yml on every push to main, after
// a delay long enough for the Vercel production deploy to go live. The
// workflow persists the state file between runs via actions/cache; when the
// state file is missing (first run / evicted cache) the full sitemap is
// submitted once to reseed it.
//
// Run manually (new/changed URLs only):  node scripts/submit-indexnow.mjs
// Full resubmit (monthly/manual use):    node scripts/submit-indexnow.mjs --full
// Preview without submitting:            node scripts/submit-indexnow.mjs --dry-run
// Submit specific URLs (priority ping, skips the sitemap diff and state):
//   node scripts/submit-indexnow.mjs /some/updated-page /another-page
//   Full URLs are also accepted:
//   node scripts/submit-indexnow.mjs https://mahjmahj.co/some/updated-page
// Override host:  INDEXNOW_HOST=<staging host> node scripts/submit-indexnow.mjs
// Override state: INDEXNOW_STATE_FILE=/path/state.json node scripts/submit-indexnow.mjs

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const HOST = process.env.INDEXNOW_HOST || 'mahjmahj.co';
const KEY = 'becb76ec22816f0c603319d99a1c3ab3';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const BATCH_SIZE = 500;
const STATE_FILE = process.env.INDEXNOW_STATE_FILE || '.indexnow-state.json';
// A lastmod value shared by more than this many URLs is a build/deploy
// timestamp, not a per-page content date — changes to it are not treated as
// content changes. Genuine content updates stamp one or a few URLs (the page
// plus perhaps its category hub); build stamps hit dozens at once.
const BULK_LASTMOD_THRESHOLD = 5;

// Returns Map(url → lastmod-or-''), deduped, in sitemap order.
async function readSitemap() {
  const res = await fetch(SITEMAP_URL, { redirect: 'follow' });
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status} ${res.statusText}`);
  const xml = await res.text();
  const entries = new Map();
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1].trim();
    if (!loc || entries.has(loc)) continue;
    entries.set(loc, m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1].trim() ?? '');
  }
  return entries;
}

function readState() {
  if (!existsSync(STATE_FILE)) return null;
  try {
    const parsed = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
    return new Map(Object.entries(parsed.urls ?? {}));
  } catch (err) {
    console.log(`[indexnow] state file unreadable (${err.message}) — treating as first run`);
    return null;
  }
}

function writeState(entries) {
  const urls = Object.fromEntries([...entries.entries()].sort());
  writeFileSync(STATE_FILE, `${JSON.stringify({ urls }, null, 2)}\n`);
  console.log(`[indexnow] state written: ${entries.size} URLs → ${STATE_FILE}`);
}

// Diff the live sitemap against the last-seen state. A URL is submitted when
// it is new, or when its lastmod moved to a value that is not a bulk
// (build-stamp) timestamp shared across many URLs.
function diffUrls(entries, state) {
  const freq = new Map();
  for (const lastmod of entries.values()) {
    if (lastmod) freq.set(lastmod, (freq.get(lastmod) ?? 0) + 1);
  }
  const isBulk = (lastmod) => (freq.get(lastmod) ?? 0) > BULK_LASTMOD_THRESHOLD;
  const out = { added: [], changed: [], ignoredBulk: 0, removed: 0 };
  for (const [url, lastmod] of entries) {
    if (!state.has(url)) {
      out.added.push(url);
    } else if (lastmod && lastmod !== state.get(url)) {
      if (isBulk(lastmod)) out.ignoredBulk++;
      else out.changed.push(url);
    }
  }
  for (const url of state.keys()) if (!entries.has(url)) out.removed++;
  return out;
}

async function waitForKeyFile() {
  // IndexNow rejects submissions with 403 SiteVerificationNotCompleted when
  // it can't fetch the key file. On a fresh deploy the file may not be live
  // yet even after the workflow's sleep, so poll until it's reachable.
  const maxAttempts = 20;
  for (let i = 1; i <= maxAttempts; i++) {
    try {
      const res = await fetch(KEY_LOCATION, { redirect: 'follow' });
      if (res.ok) {
        const body = (await res.text()).trim();
        if (body === KEY) {
          console.log(`[indexnow] key file verified at ${KEY_LOCATION} (attempt ${i})`);
          return;
        }
        console.log(`[indexnow] key file body mismatch on attempt ${i}: got "${body.slice(0, 40)}"`);
      } else {
        console.log(`[indexnow] key file attempt ${i}: status ${res.status}`);
      }
    } catch (err) {
      console.log(`[indexnow] key file attempt ${i}: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 15000));
  }
  throw new Error(`key file not reachable at ${KEY_LOCATION} after ${maxAttempts} attempts`);
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function submitBatch(urls) {
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return { status: res.status, text };
}

// Explicit URLs passed as CLI args → priority submission (skip the sitemap
// diff and leave the state file untouched). Accepts full URLs or
// root-relative paths (resolved against HOST).
function explicitUrls() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('-'));
  if (args.length === 0) return null;
  return args.map((a) => {
    if (/^https?:\/\//i.test(a)) return a;
    return `https://${HOST}${a.startsWith('/') ? '' : '/'}${a}`;
  });
}

async function main() {
  const full = process.argv.includes('--full');
  const dryRun = process.argv.includes('--dry-run');
  console.log(`[indexnow] host=${HOST} keyLocation=${KEY_LOCATION}${full ? ' (--full)' : ''}${dryRun ? ' (--dry-run)' : ''}`);
  if (!dryRun) await waitForKeyFile();

  const explicit = explicitUrls();
  let urls;
  let entries = null; // sitemap snapshot to persist after a successful run
  if (explicit) {
    urls = explicit;
    console.log(`[indexnow] priority submission of ${urls.length} explicit URL(s) — state untouched`);
  } else {
    entries = await readSitemap();
    if (entries.size === 0) {
      console.error('[indexnow] sitemap returned zero URLs — aborting');
      process.exit(1);
    }
    const state = full ? null : readState();
    if (!state) {
      urls = [...entries.keys()];
      console.log(
        full
          ? `[indexnow] full resubmit of all ${urls.length} sitemap URLs`
          : `[indexnow] no state file — first run: submitting all ${urls.length} sitemap URLs to seed state`
      );
    } else {
      const d = diffUrls(entries, state);
      urls = [...d.added, ...d.changed];
      console.log(
        `[indexnow] sitemap ${entries.size} URLs vs state ${state.size}: ` +
          `${d.added.length} new, ${d.changed.length} changed, ` +
          `${d.ignoredBulk} bulk-lastmod churn ignored, ${d.removed} removed`
      );
    }
  }

  if (dryRun) {
    for (const u of urls) console.log(`[indexnow] would submit: ${u}`);
    console.log(`[indexnow] dry run — ${urls.length} URL(s) would be submitted, state untouched`);
    return;
  }

  if (urls.length === 0) {
    console.log('[indexnow] nothing new or changed — no submission');
    if (entries) writeState(entries); // still record lastmods + prune removed URLs
    return;
  }

  const batches = chunk(urls, BATCH_SIZE);
  let failures = 0;
  for (let i = 0; i < batches.length; i++) {
    const { status, text } = await submitBatch(batches[i]);
    const ok = status >= 200 && status < 300;
    console.log(`[indexnow] batch ${i + 1}/${batches.length} (${batches[i].length} urls) → ${status} ${text || '(empty body)'}`);
    if (!ok) failures++;
  }
  if (failures > 0) {
    // State is NOT written on failure, so unsubmitted URLs are retried on the
    // next run rather than silently dropped.
    console.error(`[indexnow] ${failures} batch(es) failed`);
    process.exit(1);
  }
  if (entries) writeState(entries);
  console.log('[indexnow] done');
}

main().catch((e) => {
  console.error('[indexnow] fatal', e);
  process.exit(1);
});
