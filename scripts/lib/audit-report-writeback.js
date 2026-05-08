// Shared module for posting a weekly site audit report to Notion as a child
// of the Site Audit Reports parent page (35a3eb58-3f43-81c2-88b5-e1ab984a2cfd).
//
// Used by full-site-audit.js in each repo. Failures are non-fatal — audits
// always succeed locally; Notion writeback is best-effort.

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const PARENT_PAGE_ID = '35a3eb58-3f43-81c2-88b5-e1ab984a2cfd'; // Site Audit Reports
const NOTION_VERSION = '2022-06-28';

function loadKey(notionApiKey) {
  if (notionApiKey) return notionApiKey;
  if (process.env.NOTION_API_KEY) return process.env.NOTION_API_KEY;
  const candidates = [
    path.join(os.homedir(), 'Desktop/CLAUDE/RangeYourself/rangeyourself-engine/.env'),
    path.join(os.homedir(), 'Desktop/CLAUDE/Operations/.env'),
  ];
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
      const m = line.match(/^\s*NOTION_API_KEY\s*=\s*"?([^"\s]+)"?/);
      if (m) return m[1];
    }
  }
  return null;
}

function summaryToBlocks(summary) {
  const blocks = [];
  blocks.push({
    object: 'block',
    type: 'heading_2',
    heading_2: {
      rich_text: [{ type: 'text', text: { content: `${summary.project} — ${summary.site}` } }],
    },
  });
  blocks.push({
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [{ type: 'text', text: { content: `Generated: ${summary.generated}` }, annotations: { italic: true } }],
    },
  });
  blocks.push({
    object: 'block',
    type: 'heading_3',
    heading_3: { rich_text: [{ type: 'text', text: { content: 'Totals' } }] },
  });
  for (const [k, v] of Object.entries(summary.totals)) {
    blocks.push({
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          { type: 'text', text: { content: `${k}: ` }, annotations: { bold: true } },
          { type: 'text', text: { content: String(v) } },
        ],
      },
    });
  }

  // Detail sections — one heading per finding category that has entries
  const findings = summary.findings || {};
  let added = 0;
  for (const [category, items] of Object.entries(findings)) {
    if (!Array.isArray(items) || items.length === 0) continue;
    if (added >= 8) break; // Notion API caps blocks per request, keep it reasonable
    blocks.push({
      object: 'block',
      type: 'heading_3',
      heading_3: { rich_text: [{ type: 'text', text: { content: `${category} (${items.length})` } }] },
    });
    for (const item of items.slice(0, 25)) {
      const text = JSON.stringify(item);
      blocks.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [{ type: 'text', text: { content: text.slice(0, 200) } }],
        },
      });
    }
    if (items.length > 25) {
      blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{
            type: 'text',
            text: { content: `… ${items.length - 25} more entries (see local JSON report)` },
            annotations: { italic: true, color: 'gray' },
          }],
        },
      });
    }
    added++;
  }

  return blocks.slice(0, 95); // Notion caps children at 100 per page-create
}

async function writeAuditReport(summary, notionApiKey) {
  const key = loadKey(notionApiKey);
  if (!key) {
    console.error('[audit-writeback] NOTION_API_KEY not found, skipping Notion post');
    return false;
  }

  // summary.generated is "YYYY-MM-DD HH:MM PT" — extract the date part directly
  // rather than re-parsing through Date which doesn't handle that format.
  const generatedDate = (summary.generated || '').match(/^\d{4}-\d{2}-\d{2}/)
    ? summary.generated.slice(0, 10)
    : new Date().toISOString().slice(0, 10);
  const title = `${summary.project} Audit — ${generatedDate}`;

  try {
    const res = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { page_id: PARENT_PAGE_ID },
        properties: {
          title: { title: [{ type: 'text', text: { content: title } }] },
        },
        children: summaryToBlocks(summary),
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error(`[audit-writeback] Notion API ${res.status}: ${err.slice(0, 300)}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[audit-writeback] fetch failed:', err.message);
    return false;
  }
}

module.exports = { writeAuditReport };
