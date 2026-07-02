// Recurring club games — standing sessions published by clubs/venues on
// their OWN sites (or clearly attributed directories, flagged in `note`).
//
// TRUST RULES (P0 — Source-of-Truth Gate):
// - Every entry carries sourceUrl (the page the schedule was read from)
//   and lastVerified (the date we read it). No invented schedules.
// - These are NOT MAHJ MAHJ listings. The rendering section labels them as
//   the clubs' own published schedules and tells players to confirm with
//   the club. Do not merge them into the scraped-events grid.
// - Record each club's real game style in their own terms.
// - Entries whose schedule claim comes from press/directories (not the
//   club's own channel) must say so in `note`.
//
// Curation bar: concrete published schedule (or explicit "dates announced
// on X" pattern) from the 2026-07 Organizer Ecosystem Map research. When a
// club's page stops showing the schedule, remove the entry — the
// fr-clubs freshness check (event-scraper) flags Paris drift automatically.

export interface RecurringGame {
  organizer: string;
  schedule: string; // as published by the source
  venue: string;
  style: string; // the club's own styling terms
  sourceUrl: string;
  lastVerified: string; // YYYY-MM-DD we read the source
  note?: string; // caveats: registration required, third-party source, etc.
}

export const recurringGames: Record<string, RecurringGame[]> = {
  paris: [
    {
      organizer: 'Magic Mahjong Social Pung (MMSP)',
      schedule: 'Mondays 6:45–10 PM and Wednesdays 6–10 PM',
      venue: "Paris Anim' Jacques Bravo (Mon) and Club des Maréchaux (Wed), 9e arrondissement",
      style: 'MCR + Riichi',
      sourceUrl: 'https://www.magicmahjong.fr/',
      lastVerified: '2026-07-01',
      note: 'Monthly beginner initiations; association founded 2005, FFMJ-affiliated.',
    },
    {
      organizer: 'Tri Nitro Tiles (TNT)',
      schedule: 'Regular Riichi sessions (12 seats, online registration)',
      venue: 'Maison des Associations, 28 rue Laure Diebold, 8e arrondissement',
      style: 'Riichi',
      sourceUrl: 'https://tnt-rcr.com/',
      lastVerified: '2026-07-01',
      note: 'Registration required via the club site.',
    },
    {
      organizer: 'Mahjong en Seine',
      schedule: 'Thursdays (beginner-friendly) and Fridays from 7 PM',
      venue: 'Nanterre — 5 min from RER A Nanterre Université/Préfecture',
      style: 'MCR',
      sourceUrl: 'https://mahjongenseine.fr/',
      lastVerified: '2026-07-01',
      note: 'Free beginner initiations on Thursdays.',
    },
  ],
  toronto: [
    {
      organizer: 'Toronto Riichi Club (TORI)',
      schedule: '3rd Tuesday, 4th Sunday, and 2nd/3rd Saturday monthly',
      venue: 'For The Win Board Game Cafe (Yonge St), Dicey Business (Mississauga), Twilight Cafe (Scarborough)',
      style: 'Riichi',
      sourceUrl: 'https://www.torontoriichi.club/',
      lastVerified: '2026-07-01',
    },
    {
      organizer: 'Tsung Tsin Association of Ontario',
      schedule: "Beginner lessons Mondays 11 AM–2 PM; get-together 1st Sunday monthly from 11 AM",
      venue: '3880 Midland Ave, Scarborough',
      style: 'Hong Kong (taught "the old style way")',
      sourceUrl: 'https://www.tsungtsinontario.ca/activities',
      lastVerified: '2026-07-01',
      note: 'Lessons noted as limited to members and family — check with the association.',
    },
    {
      organizer: 'Toronto Canasta / Mah Jongg Meetup',
      schedule: 'Tuesdays 10:15 AM weekly',
      venue: 'The Guild House, 579 St Clair Ave W',
      style: 'American (NMJL)',
      sourceUrl: 'https://www.meetup.com/toronto-canasta-card-game-mah-jongg-meetup-group/',
      lastVerified: '2026-07-01',
    },
  ],
  sydney: [
    {
      organizer: 'Lucky Tiles Social Club',
      schedule: 'Every 2nd & 4th Thursday (CBD) and 3rd Sunday monthly (Newtown)',
      venue: 'Ni Hao Bar, Sydney CBD · 8:52 Hong Kong Restaurant, Newtown',
      style: 'Hong Kong style, beginner-friendly',
      sourceUrl: 'https://luckytilesocialclub.com/',
      lastVerified: '2026-07-01',
      note: 'Ticketed (~$20–25, includes a drink).',
    },
    {
      organizer: 'Australian Riichi Mahjong Association — Sydney',
      schedule: 'Thursdays 2 PM and fortnightly Saturdays 2 PM',
      venue: 'DOUBLE KILL GAMES, Level 1/203 Thomas St, Haymarket',
      style: 'Riichi',
      sourceUrl: 'https://riichimahjong.com.au/club-directory/',
      lastVerified: '2026-07-01',
      note: 'RSVP via the ARMA Discord (linked from their club directory).',
    },
  ],
  melbourne: [
    {
      organizer: 'Riichi Victoria',
      schedule: 'Thursdays 5:30–11 PM (CBD) and Saturdays 12:30–5:30 PM (Box Hill)',
      venue: "Marche Board Game Cafe, 63 A'Beckett St · Good Games Box Hill",
      style: 'Riichi',
      sourceUrl: 'https://www.vicriichi.org/mahjong-meetups',
      lastVerified: '2026-07-01',
    },
    {
      organizer: 'Melbourne Mahjong Meetup Group',
      schedule: 'Regular evening sessions from 5:30 PM (see Meetup for dates)',
      venue: 'MIT Mahjong (3rd floor), 139 Franklin St, CBD',
      style: 'Riichi and Cantonese styles',
      sourceUrl: 'https://www.meetup.com/melbourne-mahjong-meetup/',
      lastVerified: '2026-07-01',
      note: '$10/night.',
    },
    {
      organizer: 'Lucky Tiles Social Club (Melbourne)',
      schedule: 'Recurring Wednesday evenings 6–8:30 PM (see site for dates)',
      venue: 'The Collectivist, Ascot Vale',
      style: 'Hong Kong style, all levels',
      sourceUrl: 'https://luckytilesocialclub.com/products/melbourne-ascot-vale-social-mahjong',
      lastVerified: '2026-07-01',
      note: '$20 incl. one drink.',
    },
  ],
  london: [
    {
      organizer: 'Four Winds Mahjong Club',
      schedule: 'Saturdays 10 AM–12 PM (Hackney) and 2nd & 4th Sundays 1:30–4 PM (Camden)',
      venue: 'ESEA Community Centre, Englefield Rd N1 · Camden Chinese Community Centre, Tavistock Pl WC1H',
      style: 'Hong Kong Old Style (no gambling)',
      sourceUrl: 'https://www.fourwindsmahjong.club/',
      lastVerified: '2026-07-01',
      note: 'Beginner signups via Ticket Tailor.',
    },
    {
      organizer: 'Munk Mahjong Club',
      schedule: 'Wednesdays 7–11 PM weekly',
      venue: 'SET Social, 55a Nigel Rd, Peckham SE15',
      style: 'Casual, all styles welcome',
      sourceUrl: 'https://setspace.uk/event/munk-mahjong-club/2029-07-18/',
      lastVerified: '2026-07-01',
      note: 'Free drop-in; sets provided. Schedule from the venue calendar.',
    },
    {
      organizer: 'Mahjong Twickenham',
      schedule: 'Tuesdays 6 PM weekly',
      venue: 'The Cricketers Pub, Richmond Green TW9',
      style: 'Riichi',
      sourceUrl: 'https://www.meetup.com/mahjong-twickenham/',
      lastVerified: '2026-07-01',
      note: '£5 cash; beginners taught.',
    },
  ],
  seattle: [
    {
      organizer: 'Seattle Riichi Mahjong Club',
      schedule: 'Sundays 12–9 PM (Capitol Hill) and Tuesdays 6:30 PM (Bellevue)',
      venue: 'Stoup Brewing, Capitol Hill · Lincoln Square South, Bellevue',
      style: 'Riichi',
      sourceUrl: 'https://www.meetup.com/seattleriichimahjongclub/',
      lastVerified: '2026-07-01',
    },
    {
      organizer: 'Seattle Mahjong Club',
      schedule: 'Weekly "Mahjong for Newbies" sessions (see Meetup for days)',
      venue: '19202 33rd Ave S, SeaTac (near Angle Lake light rail)',
      style: 'Taiwanese (other styles welcome)',
      sourceUrl: 'https://www.meetup.com/seattle-mahjong-club-group/',
      lastVerified: '2026-07-01',
      note: 'Free, no gambling; automatic tables.',
    },
  ],
  portland: [
    {
      organizer: 'Portland Mah Jong Meetup',
      schedule: 'Tuesdays 5–8 PM weekly',
      venue: 'The Encorepreneur Cafe, 1548 NE 15th Ave',
      style: 'Riichi & classical Chinese rules',
      sourceUrl: 'https://www.meetup.com/portland-mah-jong-meetup/',
      lastVerified: '2026-07-01',
      note: 'Sliding-scale $5–10 venue fee.',
    },
    {
      organizer: 'The Encorepreneur Cafe',
      schedule: 'Fridays 1–4 PM weekly',
      venue: '1548 NE 15th Ave',
      style: 'Simplified rules taught; American & Riichi sets welcome',
      sourceUrl: 'https://encorepreneurcafe.com/friday-afternoon-mahjong',
      lastVerified: '2026-07-01',
      note: '$5; beginner and intermediate tables.',
    },
    {
      organizer: 'Portland American Mahjongg Meetup',
      schedule: 'Mondays 5:30–8 PM weekly',
      venue: 'Capes and Crepes, 4990 SE Division St',
      style: 'American (NMJL)',
      sourceUrl: 'https://www.meetup.com/portland-western-mahjongg-meetup-group/',
      lastVerified: '2026-07-01',
      note: '$10 drop-in play, $20 to learn; instructor present.',
    },
  ],
  minneapolis: [
    {
      organizer: 'TC Metro & Suburban Mah Jongg Club',
      schedule: 'Multiple weekly sessions — Thu 2:30 PM, Fri 6 PM, Sat 1 PM (Riichi), Sun 12 PM',
      venue: 'Venn Brewery · New Brighton Community Center · Byerly’s Roseville (see Meetup)',
      style: 'American (NMJL) + Saturday Riichi',
      sourceUrl: 'https://www.meetup.com/tc-metro-suburban-mah-jongg-club/',
      lastVerified: '2026-07-01',
    },
    {
      organizer: 'Minneapolis Mah Jongg Club',
      schedule: 'Beginner series and mini-leagues on a rolling schedule (see site)',
      venue: '3942 Market St, Edina (50th & France)',
      style: 'American (NMJL)',
      sourceUrl: 'https://mplsmahjclub.com/',
      lastVerified: '2026-07-01',
    },
  ],
  detroit: [
    {
      organizer: 'Southeast Michigan Riichi (SEMI)',
      schedule: 'Open-to-the-public meetups (see site for current dates)',
      venue: 'Ann Arbor (U-M), Livonia, Royal Oak, and Detroit (Wayne State)',
      style: 'Riichi',
      sourceUrl: 'https://semiriichi.github.io/',
      lastVerified: '2026-07-01',
      note: 'Club operating since 2009.',
    },
    {
      organizer: 'Motor City Mahjong',
      schedule: 'Summer Tuesday open plays (Jul 14, Aug 4, Aug 11, 2026)',
      venue: "Nick Gilbert Way at Hudson's Detroit",
      style: 'American (NMJL)',
      sourceUrl: 'https://motorcitymahjong.com/',
      lastVerified: '2026-07-01',
    },
  ],
  pittsburgh: [
    {
      organizer: 'PGH Mahjong Club',
      schedule: 'Recurring learn & play sessions, 6:30–8:30 PM (see Eventbrite for dates)',
      venue: 'The Picket Fence, Sewickley',
      style: 'Mixed / open',
      sourceUrl: 'https://www.eventbrite.com/e/pgh-mahjong-club-learn-play-mahjong-tickets-1222874583799',
      lastVerified: '2026-07-01',
    },
  ],
  honolulu: [
    {
      organizer: 'Bad Luck Club',
      schedule: 'Monthly gatherings — dates announced on Instagram (@hibadluckclub)',
      venue: "Arts & Letters Nu'uanu, Chinatown",
      style: 'Hong Kong style, beginner-friendly',
      sourceUrl: 'https://fluxhawaii.com/mahjong-club-honolulu/',
      lastVerified: '2026-07-01',
      note: 'Monthly cadence per FLUX Hawaii coverage — confirm dates on the club’s Instagram.',
    },
    {
      organizer: "'Āina Haina Public Library",
      schedule: 'Open-play sessions plus beginner classes (July–August 2026)',
      venue: "5246 Kalaniana'ole Hwy, Honolulu",
      style: 'Chinese-style open play (6+ months experience for open tables)',
      sourceUrl: 'https://www.librarieshawaii.org/event/chinese-mahjong-3-2-2-2-2/',
      lastVerified: '2026-07-01',
      note: 'Class sign-up at the Reference Desk.',
    },
    {
      organizer: 'Mah Jong House Jun-Jun',
      schedule: 'Standing parlor hours by phone reservation',
      venue: '2570 South Beretania St Ste 208',
      style: 'Parlor with automatic tables; free beginner classes',
      sourceUrl: 'http://mahjonghouse.web.fc2.com',
      lastVerified: '2026-07-01',
      note: 'Listing via Vivinavi Hawaii directory — phone ahead.',
    },
  ],
  buffalo: [
    {
      organizer: 'YMCA Buffalo Niagara — Southtowns MahJong Club',
      schedule: 'Wednesdays 12:30–2:30 PM weekly',
      venue: 'Southtowns YMCA, 1620 Southwestern Blvd, West Seneca',
      style: 'American (NMJL)',
      sourceUrl: 'https://www.ymcabn.org/events/mahjong-club',
      lastVerified: '2026-07-01',
      note: 'Open to members; no registration required.',
    },
    {
      organizer: "UB Women's Club Mah Jongg Group",
      schedule: 'Wednesdays weekly',
      venue: 'Congregation Shir Shalom, 4660 Sheridan Dr, Williamsville',
      style: 'American (NMJL)',
      sourceUrl: 'https://ubwp.buffalo.edu/ubwomensclub/activities/',
      lastVerified: '2026-07-01',
      note: '$1 donation per session; contact the group leader to join (details on their page).',
    },
  ],
};

export const getRecurringGames = (slug: string): RecurringGame[] =>
  recurringGames[slug] ?? [];
