// Amazon Associates picks for the "Get your table started" module on
// /guides/mahjong-night. Sourced from a verified gear list (each entry
// checked directly against its Amazon listing or, where the listing was
// unreachable, corroborated via two independent retailers citing the same
// ASIN — see whyChosen for the per-item rationale).
//
// PRIMARY picks only — alternates (used if a primary goes out of stock) are
// intentionally left out of this page; this keeps the module short and
// avoids showing near-duplicate cards. Names are cleaned up from the full
// Amazon SEO titles per house style, and never use "Chinese Mahjong" in our
// own copy (brand rule: "Hong Kong Mahjong").
//
// lastVerified is a data attribute on each card, not visible copy — see the
// module's rendering in src/app/guides/mahjong-night/page.tsx.
export interface GearItem {
  category: string;
  name: string;
  url: string;
  whyChosen: string;
  lastVerified: string;
}

export const mahjongNightGear: GearItem[] = [
  {
    category: 'Tile set',
    name: 'GUSTARIA Mahjong Tile Set — 146 Numbered Tiles',
    url: 'https://www.amazon.com/dp/B0987XC3YQ?tag=mahjmahj-20',
    whyChosen:
      'Large 1.5-inch tiles with Arabic numerals engraved alongside the characters make this easy for beginners to read at a glance, and the carrying case suits home hosts.',
    lastVerified: '2026-08-13',
  },
  {
    category: 'American-style set',
    name: 'American Mah Jongg Set — 166 Tiles with Racks',
    url: 'https://www.amazon.com/dp/B01N0NJEJU?tag=mahjmahj-20',
    whyChosen:
      'Complete 166-tile American set with the four all-in-one rack/pusher trays American players expect, plus a carrying bag for club or home hosting.',
    lastVerified: '2026-08-13',
  },
  {
    category: 'Table mat',
    name: 'plusvivo Mahjong Table Mat',
    url: 'https://www.amazon.com/dp/B08H1QQJ6B?tag=mahjmahj-20',
    whyChosen:
      'Rubber-foam-backed mat sized to cover a standard folding table and specifically marketed to dampen tile-clacking noise — a real consideration for apartment hosts.',
    lastVerified: '2026-08-13',
  },
  {
    category: 'Travel set',
    name: 'My Fair Mahjong Mini Anywhere Set',
    url: 'https://www.amazon.com/dp/B0DH7JSN5G?tag=mahjmahj-20',
    whyChosen:
      'Full 166-tile set with wooden racks and a carrying bag from a dedicated mahjong brand, genuinely pocketable for travel or a small table.',
    lastVerified: '2026-08-13',
  },
  {
    category: 'Folding table',
    name: 'PEXMOR Folding Mahjong Table',
    url: 'https://www.amazon.com/dp/B0DH35WLZP?tag=mahjmahj-20',
    whyChosen:
      'True 35-inch square footprint sized for four players with built-in cup holders and chip grooves, folds flat for apartment storage between game nights.',
    lastVerified: '2026-08-13',
  },
  {
    category: 'Beginner book',
    name: 'The Complete Book of Mah Jongg',
    url: 'https://www.amazon.com/dp/0804845301?tag=mahjmahj-20',
    whyChosen:
      'A traditionally published, illustrated guide covering Asian-style play alongside American and international rules — a long-time go-to beginner reference with a real publisher and ISBN.',
    lastVerified: '2026-08-13',
  },
];
