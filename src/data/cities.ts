// Master city manifest for mahjmahj.co.
//
// Every city listed here gets a static /events/[city] page generated at build
// time, even before scrapers populate events for it. The page falls back to
// "no events yet — submit one" copy and the static intro + FAQ below, so we
// stop being event-driven for routing.
//
// Tiers map to the Apr 2026 spec:
//   1 — existing MAHJ cities (long active community)
//   2 — new US cities being seeded (16 markets, May 2026 expansion)
//   3 — international (London is the first international beachhead)
//
// Always say "Hong Kong Mahjong" — never "Chinese Mahjong" — in any copy.

export interface CityFAQ {
  question: string;
  answer: string;
}

export interface CityEntry {
  slug: string;
  name: string;
  state: string; // 2-letter US abbreviation, or country code for non-US
  country: string; // 'US' or other
  tier: 1 | 2 | 3;
  intro: string;
  faqs: CityFAQ[];
}

export const cities: CityEntry[] = [
  // ─── Tier 1: Existing MAHJ cities ─────────────────────────────────────────
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    state: 'CA',
    country: 'US',
    tier: 1,
    intro:
      'Los Angeles has one of the most active mahjong scenes in the country, anchored by Hong Kong Mahjong games in the San Gabriel Valley and a growing American Mahjong community across the Westside. Expect a mix of casual home games, club nights, and pop-up events at cafés and tea houses.',
    faqs: [
      {
        question: 'Where can I play mahjong in Los Angeles?',
        answer:
          'Hong Kong Mahjong games are easiest to find in the San Gabriel Valley — Monterey Park, Alhambra, and Arcadia have several recurring meetups. American Mahjong is more common on the Westside and in Beverly Hills senior centers and clubs. Check the events list above for current sessions across the metro.',
      },
      {
        question: 'Are there beginner-friendly mahjong events in LA?',
        answer:
          'Yes — several Westside meetups run beginner nights with teachers, and Eastside cultural centers occasionally host introductory Hong Kong Mahjong workshops. Filter for "Lesson" or "Workshop" event types when they appear.',
      },
      {
        question: 'What style of mahjong is most popular in LA?',
        answer:
          'Hong Kong Mahjong dominates in immigrant and heritage communities; American Mahjong (with the National Mah Jongg League card) is more common in social and senior-center games. You can find both, often within a few miles of each other.',
      },
    ],
  },
  {
    slug: 'new-york',
    name: 'New York',
    state: 'NY',
    country: 'US',
    tier: 1,
    intro:
      'New York has a deep, multi-generational mahjong scene — Hong Kong Mahjong is widespread in Chinatown, Flushing, and Sunset Park, while American Mahjong has a strong club presence on the Upper East Side and across Long Island and Westchester. Manhattan, Brooklyn, and Queens each have distinct event calendars.',
    faqs: [
      {
        question: 'Where can I play mahjong in NYC?',
        answer:
          'Manhattan Chinatown and Flushing host Hong Kong Mahjong daily — both casual and stakes games. Brooklyn cafés and Queens cultural centers run regular sessions. American Mahjong groups gather at synagogues, JCCs, and senior centers across the boroughs and Long Island.',
      },
      {
        question: 'Are there mahjong clubs or membership groups in New York?',
        answer:
          'Yes — several long-running American Mahjong clubs operate on the Upper East Side and in suburbs like Great Neck and Scarsdale, with weekly club games. Hong Kong Mahjong tends to be organized through community associations rather than ticketed clubs.',
      },
      {
        question: 'Where can a beginner learn mahjong in NYC?',
        answer:
          'Look for American Mahjong classes at JCCs, the 92nd Street Y, and community centers across the boroughs. For Hong Kong Mahjong, Chinatown-area cultural centers occasionally run intro nights — check the events list for dates.',
      },
    ],
  },
  {
    slug: 'san-francisco',
    name: 'San Francisco',
    state: 'CA',
    country: 'US',
    tier: 1,
    intro:
      'San Francisco has a long-established Hong Kong Mahjong scene rooted in Chinatown, Richmond District, and Sunset District tea houses and senior centers. American Mahjong has steady community games across the city, and the broader Bay Area has its own dense calendar — check the Bay Area page for events outside SF proper.',
    faqs: [
      {
        question: 'Where can I play mahjong in San Francisco?',
        answer:
          'Chinatown community centers, Richmond and Sunset District tea houses, and senior centers across the city run regular Hong Kong Mahjong games. American Mahjong gatherings are more dispersed — community centers, residential clubs, and some libraries host weekly games.',
      },
      {
        question: "What's the difference between SF and Bay Area events?",
        answer:
          'San Francisco events are inside the city limits; Bay Area events cover the East Bay (Oakland, Berkeley), Peninsula (San Mateo, Palo Alto), and South Bay (San Jose, Cupertino). Many regulars travel between both calendars — check the Bay Area page for nearby options.',
      },
      {
        question: 'Are there beginner mahjong sessions in SF?',
        answer:
          'Yes — community centers in Chinatown and Richmond District occasionally run introductory Hong Kong Mahjong sessions, and a handful of cafés and bookshops in the Mission and SoMa have hosted beginner nights. Filter for "Lesson" or "Workshop" events.',
      },
    ],
  },
  {
    slug: 'bay-area',
    name: 'Bay Area',
    state: 'CA',
    country: 'US',
    tier: 1,
    intro:
      'The greater Bay Area — East Bay, Peninsula, and South Bay — has one of the densest mahjong communities outside of major Asian metro hubs. Cupertino, Palo Alto, San Mateo, and Oakland all have weekly Hong Kong Mahjong games, and tech-company affinity groups run regular socials. American Mahjong is also present in suburban clubs and senior centers.',
    faqs: [
      {
        question: 'Which Bay Area cities have the most mahjong events?',
        answer:
          'Cupertino, Palo Alto, Fremont, and San Mateo lead in volume, with San Jose, Oakland, and Berkeley close behind. The mix shifts by city — South Bay tends Hong Kong Mahjong-heavy, East Bay has more American Mahjong club activity.',
      },
      {
        question: 'Are there company or affinity-group mahjong events in the Bay?',
        answer:
          'Yes — several tech companies host internal mahjong meetups, and AAPI affinity groups across the Bay run quarterly tournaments and socials. Most are listed publicly when external attendees are welcome.',
      },
      {
        question: 'How does the Bay Area scene compare to San Francisco proper?',
        answer:
          'San Francisco events tend to skew toward Chinatown community centers and casual home-style games. The greater Bay Area has more organized clubs, recurring weekly meetups, and tournament-style play — and the geographic spread means you may need to drive 20-40 minutes to your closest game.',
      },
    ],
  },
  {
    slug: 'chicago',
    name: 'Chicago',
    state: 'IL',
    country: 'US',
    tier: 1,
    intro:
      'Chicago has a steady mahjong community split between Chinatown Hong Kong Mahjong games and a strong North Shore American Mahjong club scene. The South Loop, Logan Square, and Lincoln Park have hosted pop-up beginner nights at cafés and bookstores in recent years.',
    faqs: [
      {
        question: 'Where can I play mahjong in Chicago?',
        answer:
          "Chinatown community organizations and the Chinese American Service League run Hong Kong Mahjong games. American Mahjong clubs are concentrated on the North Shore — Highland Park, Glencoe, and Wilmette — with some downtown senior-center games as well.",
      },
      {
        question: 'Is American Mahjong popular in Chicago?',
        answer:
          'Yes — the North Shore in particular has a long tradition of American Mahjong clubs that meet weekly with the National Mah Jongg League card. Several clubs are open to new players and run beginner-friendly sessions.',
      },
      {
        question: 'Are there mahjong tournaments in Chicago?',
        answer:
          'Mid-sized American Mahjong tournaments occasionally run on the North Shore and downtown, and Chinatown community organizations have hosted Hong Kong Mahjong events. Tournament Cadence is irregular — check the events list for upcoming dates.',
      },
    ],
  },
  {
    slug: 'boston',
    name: 'Boston',
    state: 'MA',
    country: 'US',
    tier: 1,
    intro:
      "Boston's mahjong community runs through Chinatown for Hong Kong Mahjong and through Brookline, Newton, and Cambridge for American Mahjong club games. The college scene is also active — several universities have student mahjong groups that run public events.",
    faqs: [
      {
        question: 'Where can I play mahjong in Boston?',
        answer:
          'Chinatown community organizations run Hong Kong Mahjong games. American Mahjong clubs gather at synagogues, JCCs, and senior centers in Brookline, Newton, and the western suburbs. Some Cambridge cafés host casual game nights.',
      },
      {
        question: 'Are there college mahjong groups in Boston?',
        answer:
          "Yes — several Boston-area universities have student mahjong groups that run public events open to non-students. Check the events list for university-hosted sessions, especially during the school year.",
      },
      {
        question: 'What style is more common in Boston?',
        answer:
          'Hong Kong Mahjong dominates in Chinatown and immigrant-community settings; American Mahjong is more common in suburban clubs and senior centers. Both have steady weekly games — the choice usually comes down to which neighborhood is closer.',
      },
    ],
  },
  {
    slug: 'atlanta',
    name: 'Atlanta',
    state: 'GA',
    country: 'US',
    tier: 1,
    intro:
      "Atlanta has a growing mahjong community across the metro, with Buford Highway and the northern suburbs (Duluth, Johns Creek, Alpharetta) anchoring Hong Kong Mahjong games. American Mahjong is active in Sandy Springs, Dunwoody, and East Cobb synagogue and senior-center clubs.",
    faqs: [
      {
        question: 'Where can I play mahjong in Atlanta?',
        answer:
          'Asian community centers along Buford Highway and in the northern suburbs run Hong Kong Mahjong games. American Mahjong clubs meet weekly at synagogues, JCCs, and country clubs in Sandy Springs, Dunwoody, and East Cobb.',
      },
      {
        question: 'Are there beginner mahjong classes in Atlanta?',
        answer:
          'Yes — JCCs and community centers across the metro run American Mahjong classes seasonally, and a few cultural centers have hosted intro Hong Kong Mahjong sessions. Filter for "Lesson" or "Workshop" event types.',
      },
      {
        question: 'How do I find a mahjong group in Atlanta?',
        answer:
          'Recurring weekly games at JCCs, synagogues, and community centers are the most reliable entry points for American Mahjong. For Hong Kong Mahjong, Asian American cultural centers along Buford Highway and in Duluth are the main hubs — many run informal weekly games.',
      },
    ],
  },
  {
    slug: 'seattle',
    name: 'Seattle',
    state: 'WA',
    country: 'US',
    tier: 1,
    intro:
      "Seattle's mahjong scene blends Hong Kong Mahjong games in the International District with growing American Mahjong club activity in the Eastside (Bellevue, Redmond, Kirkland) and on Mercer Island. The tech-industry crowd has driven interest in social mahjong nights at cafés and co-working spaces.",
    faqs: [
      {
        question: 'Where can I play mahjong in Seattle?',
        answer:
          "Chinatown-International District community organizations host Hong Kong Mahjong games. American Mahjong clubs gather on the Eastside — Bellevue, Mercer Island, and Redmond — at synagogues, JCCs, and community centers. A few Capitol Hill cafés have hosted social game nights.",
      },
      {
        question: 'Is mahjong popular with the Seattle tech community?',
        answer:
          'Increasingly — several tech-affinity groups run quarterly mahjong socials, and a few co-working spaces in South Lake Union and Capitol Hill have hosted beginner-friendly game nights. The crossover with board-game culture is strong here.',
      },
      {
        question: 'Are there mahjong tournaments in Seattle?',
        answer:
          'Tournament Cadence is irregular but real — both American Mahjong and Hong Kong Mahjong tournaments have run in Seattle and on the Eastside in recent years. Check the events list for upcoming dates.',
      },
    ],
  },
  {
    slug: 'washington-dc',
    name: 'Washington DC',
    state: 'DC',
    country: 'US',
    tier: 1,
    intro:
      "DC has a quietly active mahjong community concentrated in Bethesda, Chevy Chase, and across the Maryland and Virginia suburbs, with Hong Kong Mahjong games in Rockville and Falls Church and American Mahjong clubs at JCCs and synagogues across the metro.",
    faqs: [
      {
        question: 'Where can I play mahjong in Washington DC?',
        answer:
          'American Mahjong clubs meet weekly at JCCs and synagogues in Bethesda, Rockville, Potomac, and Northern Virginia. Hong Kong Mahjong games are concentrated in Rockville, Wheaton, and Falls Church Asian American community centers.',
      },
      {
        question: 'Are there mahjong groups in Northern Virginia?',
        answer:
          'Yes — Falls Church, McLean, Vienna, and Tysons Corner all have recurring weekly games. The Eden Center area in Falls Church anchors much of the Hong Kong Mahjong activity for the region.',
      },
      {
        question: 'Are there beginner mahjong sessions in DC?',
        answer:
          'JCCs across the metro run American Mahjong beginner sessions seasonally. For Hong Kong Mahjong, look for cultural-center workshops — they run a few times a year and fill quickly.',
      },
    ],
  },
  {
    slug: 'denver',
    name: 'Denver',
    state: 'CO',
    country: 'US',
    tier: 1,
    intro:
      "Denver's mahjong community is small but active, anchored by American Mahjong clubs at synagogues and JCCs and a smaller Hong Kong Mahjong presence in Aurora and the eastern suburbs. The Front Range scene also includes Boulder and Fort Collins games.",
    faqs: [
      {
        question: 'Where can I play mahjong in Denver?',
        answer:
          'American Mahjong clubs meet weekly at JCCs, synagogues, and senior centers across the metro — Greenwood Village, Cherry Creek, and the southern suburbs lead in volume. Hong Kong Mahjong is harder to find but has a presence in Aurora.',
      },
      {
        question: 'Is there mahjong in Boulder or Fort Collins?',
        answer:
          'Yes — both cities have small but recurring American Mahjong groups, often community-center based. The Boulder scene tends to be casual home games; Fort Collins runs a few weekly meetups.',
      },
      {
        question: 'How do I find a beginner mahjong class in Denver?',
        answer:
          'JCCs across the Denver metro run American Mahjong classes most years. The Mizel JCC and Boulder JCC have both offered seasonal beginner sessions — check the events list for current dates.',
      },
    ],
  },
  {
    slug: 'san-diego',
    name: 'San Diego',
    state: 'CA',
    country: 'US',
    tier: 1,
    intro:
      "San Diego has a steady mahjong community spread across La Jolla, Carmel Valley, and Convoy Street, with both Hong Kong Mahjong and American Mahjong active. Convoy Street's Asian businesses anchor the Hong Kong Mahjong scene, while La Jolla and Carmel Valley host American Mahjong clubs.",
    faqs: [
      {
        question: 'Where can I play mahjong in San Diego?',
        answer:
          'Asian community centers along Convoy Street run Hong Kong Mahjong games. American Mahjong clubs meet at JCCs and synagogues in La Jolla, Carmel Valley, and Rancho Bernardo, with senior-center games scattered across the county.',
      },
      {
        question: 'Are there beach-adjacent mahjong meetups in San Diego?',
        answer:
          'Occasionally — La Jolla and Pacific Beach cafés have hosted casual mahjong nights, and a few weekend pop-ups have run on the boardwalk in summer. Most regular games are at clubs and community centers, not beachfront.',
      },
      {
        question: 'Is mahjong common in retiree communities in San Diego?',
        answer:
          'Yes — many retirement communities and senior centers across the county run weekly American Mahjong games. Some are open to non-residents — check the events list for sessions that publish publicly.',
      },
    ],
  },
  {
    slug: 'miami',
    name: 'Miami',
    state: 'FL',
    country: 'US',
    tier: 1,
    intro:
      "Miami has a strong American Mahjong community across South Beach, Aventura, Bal Harbour, and Boca Raton, anchored by JCCs, synagogues, and country-club games. Hong Kong Mahjong is less visible but has a presence in Kendall and the western suburbs.",
    faqs: [
      {
        question: 'Where can I play mahjong in Miami?',
        answer:
          'American Mahjong dominates here — clubs meet weekly at JCCs in Aventura, Bal Harbour, and Boca Raton, and at synagogues and country clubs across South Florida. South Beach has hosted social mahjong pop-ups at hotels and cafés.',
      },
      {
        question: 'Are there mahjong tournaments in Miami?',
        answer:
          'Yes — South Florida runs some of the largest American Mahjong tournaments in the country, often anchored at Boca Raton or Aventura venues. Check the events list for current dates and registration links.',
      },
      {
        question: 'Is Hong Kong Mahjong played in Miami?',
        answer:
          'It exists but is less common than American Mahjong. Asian community centers in Kendall and the western suburbs have hosted Hong Kong Mahjong games, and a few cultural events bring it back into rotation each year.',
      },
    ],
  },
  {
    slug: 'houston',
    name: 'Houston',
    state: 'TX',
    country: 'US',
    tier: 1,
    intro:
      "Houston's mahjong scene runs through Bellaire, Chinatown (along Bellaire Boulevard), and the Memorial / West University corridor. Hong Kong Mahjong is widely played in Asian community centers along Bellaire Boulevard, and American Mahjong clubs are active in West University, Memorial, and The Woodlands.",
    faqs: [
      {
        question: 'Where can I play mahjong in Houston?',
        answer:
          'Bellaire Boulevard\'s Asian community centers run Hong Kong Mahjong games regularly. American Mahjong clubs meet at JCCs, synagogues, and country clubs in West University, Memorial, and The Woodlands. Sugar Land also has recurring games.',
      },
      {
        question: 'Is there mahjong in Sugar Land or The Woodlands?',
        answer:
          'Yes — Sugar Land has both Hong Kong Mahjong and American Mahjong groups. The Woodlands tends more toward American Mahjong club play. Both have weekly recurring sessions worth checking.',
      },
      {
        question: 'How do I find a beginner mahjong class in Houston?',
        answer:
          'JCCs in Houston and the Memorial area run American Mahjong classes seasonally. Bellaire Boulevard cultural centers have hosted Hong Kong Mahjong workshops a few times a year — check the events list for current dates.',
      },
    ],
  },
  {
    slug: 'portland',
    name: 'Portland',
    state: 'OR',
    country: 'US',
    tier: 1,
    intro:
      "Portland's mahjong community is small but tight-knit, with American Mahjong clubs across the West Hills and Northeast neighborhoods, and Hong Kong Mahjong games anchored in the Jade District and a few cultural centers. The board-game culture here means mahjong often crosses over with tabletop nights.",
    faqs: [
      {
        question: 'Where can I play mahjong in Portland?',
        answer:
          'American Mahjong clubs meet at the Mittleman JCC and synagogues across the West Hills and Northeast neighborhoods. Hong Kong Mahjong games are smaller but present in the Jade District (82nd Avenue corridor) and at cultural centers.',
      },
      {
        question: 'Does Portland have mahjong nights at board-game cafés?',
        answer:
          "Some — Portland's strong tabletop culture means a few board-game cafés and bookshops have hosted mahjong-curious nights, often beginner-friendly. They're not always weekly, but they cycle through the events calendar.",
      },
      {
        question: 'Are there mahjong tournaments in Portland?',
        answer:
          'Smaller-scale American Mahjong tournaments occasionally run at the JCC and at suburban country clubs. Hong Kong Mahjong tournaments are rare in Portland but happen a few times a year regionally.',
      },
    ],
  },

  // ─── Tier 2: New US cities (May 2026 expansion) ───────────────────────────
  {
    slug: 'philadelphia',
    name: 'Philadelphia',
    state: 'PA',
    country: 'US',
    tier: 2,
    intro:
      "Philadelphia's mahjong scene runs through Chinatown for Hong Kong Mahjong and through Center City, Bala Cynwyd, and the Main Line for American Mahjong. The tight Chinatown community supports daily games, and the suburban club scene has grown in recent years.",
    faqs: [
      {
        question: 'Where can I play mahjong in Philadelphia?',
        answer:
          'Chinatown community organizations and the Asian Arts Initiative run Hong Kong Mahjong games. American Mahjong clubs meet at synagogues, JCCs, and country clubs across Center City, Bala Cynwyd, and the Main Line.',
      },
      {
        question: 'Is mahjong popular on the Main Line?',
        answer:
          'Yes — the Main Line has a steady American Mahjong club presence at synagogues and country clubs, often with weekly games and seasonal tournaments. Bryn Mawr, Wynnewood, and Penn Valley anchor much of this activity.',
      },
      {
        question: 'How do I find beginner mahjong classes in Philadelphia?',
        answer:
          'JCCs and synagogues across the metro run American Mahjong beginner sessions seasonally. For Hong Kong Mahjong, check the Asian Arts Initiative and Chinatown community center calendars for occasional intro nights.',
      },
    ],
  },
  {
    slug: 'dallas',
    name: 'Dallas',
    state: 'TX',
    country: 'US',
    tier: 2,
    intro:
      "Dallas-Fort Worth has a growing mahjong community split between Hong Kong Mahjong games in Plano, Frisco, and Richardson's Asian neighborhoods and American Mahjong clubs in Preston Hollow, North Dallas, and the Park Cities. Suburban country clubs and synagogues anchor much of the regular play.",
    faqs: [
      {
        question: 'Where can I play mahjong in Dallas?',
        answer:
          'Asian community centers in Plano, Frisco, and Richardson run Hong Kong Mahjong games. American Mahjong clubs meet at JCCs, synagogues, and country clubs in Preston Hollow, North Dallas, and Highland Park.',
      },
      {
        question: 'Is there mahjong in the Dallas suburbs?',
        answer:
          'Yes — Plano, Frisco, Richardson, and Allen all have recurring weekly games, both Hong Kong Mahjong and American Mahjong. The suburban scene is often more active than downtown.',
      },
      {
        question: 'Does the Dallas JCC offer mahjong?',
        answer:
          'The JCC of Dallas in North Dallas runs American Mahjong sessions and has hosted seasonal beginner classes. Their calendar usually publishes weekly games and occasional tournaments.',
      },
    ],
  },
  {
    slug: 'austin',
    name: 'Austin',
    state: 'TX',
    country: 'US',
    tier: 2,
    intro:
      "Austin's mahjong community is younger and growing fast, with both Hong Kong Mahjong and American Mahjong games appearing at cafés, co-working spaces, and the Asian American Resource Center. The tech industry's interest has driven beginner-friendly socials in recent years.",
    faqs: [
      {
        question: 'Where can I play mahjong in Austin?',
        answer:
          "The Asian American Resource Center hosts Hong Kong Mahjong games and cultural events. American Mahjong clubs meet at the Shalom Austin JCC and synagogues across the city. A few East Austin cafés and co-working spaces have run beginner-friendly socials.",
      },
      {
        question: 'Is mahjong popular with Austin\'s tech community?',
        answer:
          'Increasingly — tech-affinity groups have run quarterly socials, and a few co-working spaces in South Congress and East Austin have hosted beginner-friendly game nights. The crossover with board-game culture is strong here.',
      },
      {
        question: 'Are there beginner mahjong classes in Austin?',
        answer:
          'Yes — Shalom Austin and the Asian American Resource Center both run seasonal beginner sessions, and a few private teachers have hosted public intro nights at East Austin cafés.',
      },
    ],
  },
  {
    slug: 'nashville',
    name: 'Nashville',
    state: 'TN',
    country: 'US',
    tier: 2,
    intro:
      "Nashville's mahjong scene is small but active, with American Mahjong clubs at the Gordon JCC and synagogues in Belle Meade and Brentwood. Hong Kong Mahjong is rarer but has appeared at Asian community events in Antioch and Mt. Juliet.",
    faqs: [
      {
        question: 'Where can I play mahjong in Nashville?',
        answer:
          'The Gordon JCC in West Nashville runs American Mahjong games. Synagogues in Belle Meade and Brentwood host weekly clubs, and senior centers across the metro have recurring sessions. Asian community organizations in Antioch occasionally host Hong Kong Mahjong events.',
      },
      {
        question: 'Are there mahjong tournaments in Nashville?',
        answer:
          'Smaller American Mahjong tournaments occasionally run at the Gordon JCC and at Brentwood country clubs. Tournament Cadence is annual or semi-annual rather than monthly.',
      },
      {
        question: 'How do I find a beginner mahjong class in Nashville?',
        answer:
          'Gordon JCC runs American Mahjong beginner sessions seasonally. Synagogues across the metro occasionally host intro nights — check the events list for current dates.',
      },
    ],
  },
  {
    slug: 'minneapolis',
    name: 'Minneapolis',
    state: 'MN',
    country: 'US',
    tier: 2,
    intro:
      "The Twin Cities have a steady American Mahjong community at the Sabes JCC and synagogues across St. Louis Park and Edina, with smaller Hong Kong Mahjong games in Asian community centers in Eden Prairie and Bloomington. Winter doesn't slow it down — most games are indoors year-round.",
    faqs: [
      {
        question: 'Where can I play mahjong in Minneapolis?',
        answer:
          'The Sabes JCC in St. Louis Park runs American Mahjong games. Synagogues in St. Louis Park, Edina, and Minnetonka host weekly clubs. Asian community centers in Eden Prairie and Bloomington have Hong Kong Mahjong games.',
      },
      {
        question: 'Is mahjong played year-round in Minneapolis?',
        answer:
          "Yes — most mahjong games are indoor and run on a steady weekly cadence regardless of season. Winter actually drives some growth: it's a popular indoor social activity when outdoor options are limited.",
      },
      {
        question: 'Are there mahjong groups in St. Paul?',
        answer:
          "Yes — St. Paul has a smaller but recurring scene, often at synagogues and senior centers. The metro is geographically tight enough that Twin Cities players often travel between St. Paul, Minneapolis, and the western suburbs for games.",
      },
    ],
  },
  {
    slug: 'las-vegas',
    name: 'Las Vegas',
    state: 'NV',
    country: 'US',
    tier: 2,
    intro:
      "Las Vegas has both Hong Kong Mahjong and American Mahjong activity — Hong Kong Mahjong runs through Chinatown on Spring Mountain Road and Asian community centers, while American Mahjong has clubs in Summerlin, Henderson, and at the Adelson Educational Campus. The retiree population drives steady game volume.",
    faqs: [
      {
        question: 'Where can I play mahjong in Las Vegas?',
        answer:
          'Spring Mountain Road (Chinatown) hosts Hong Kong Mahjong games at cultural centers and a few restaurants. American Mahjong clubs meet at JCCs, synagogues, and country clubs in Summerlin, Henderson, and the southwest valley.',
      },
      {
        question: 'Is there mahjong in retirement communities in Las Vegas?',
        answer:
          'Yes — Sun City Summerlin, Sun City Anthem, and Sun City MacDonald Ranch all have weekly American Mahjong games. Some are open to non-residents — check the events list for sessions that publish publicly.',
      },
      {
        question: 'Are there mahjong tournaments in Las Vegas?',
        answer:
          'American Mahjong tournaments run a few times a year in Summerlin and Henderson. Hong Kong Mahjong tournaments are less common but happen during major Asian holidays and cultural events.',
      },
    ],
  },
  {
    slug: 'phoenix',
    name: 'Phoenix',
    state: 'AZ',
    country: 'US',
    tier: 2,
    intro:
      "Phoenix and Scottsdale have an active American Mahjong community, with strong club presence at the Bureau of Jewish Education, synagogues across the East Valley, and country clubs in Scottsdale and Paradise Valley. Hong Kong Mahjong is smaller but present in Mesa and Chandler Asian community centers.",
    faqs: [
      {
        question: 'Where can I play mahjong in Phoenix?',
        answer:
          'American Mahjong clubs meet at JCCs and synagogues across Scottsdale, Paradise Valley, and the East Valley. Country clubs in Scottsdale and the Biltmore area run weekly games. Hong Kong Mahjong is concentrated in Mesa and Chandler community centers.',
      },
      {
        question: 'Is there mahjong in retirement communities in Phoenix?',
        answer:
          'Yes — Sun City, Sun City West, and several Scottsdale active-adult communities have weekly American Mahjong games. Many are open to non-residents.',
      },
      {
        question: 'Are there mahjong tournaments in Phoenix or Scottsdale?',
        answer:
          'Yes — Scottsdale hosts mid-sized American Mahjong tournaments most years, often anchored at country clubs or JCCs. Tournament Cadence is annual to semi-annual.',
      },
    ],
  },
  {
    slug: 'sacramento',
    name: 'Sacramento',
    state: 'CA',
    country: 'US',
    tier: 2,
    intro:
      "Sacramento's mahjong community is small but steady, with Hong Kong Mahjong games in the Asian Resource Center neighborhood and Stockton Boulevard, plus American Mahjong clubs in suburban Roseville, Folsom, and El Dorado Hills. The proximity to the Bay Area means some regulars cross over to East Bay games.",
    faqs: [
      {
        question: 'Where can I play mahjong in Sacramento?',
        answer:
          'Asian American community centers along Stockton Boulevard and around the Asian Resource Center host Hong Kong Mahjong games. American Mahjong clubs meet at synagogues and senior centers in Carmichael, Roseville, and Folsom.',
      },
      {
        question: 'Is there mahjong in El Dorado Hills or Folsom?',
        answer:
          'Yes — both have recurring American Mahjong games, often at country clubs and senior centers. Folsom in particular has a steady weekly group.',
      },
      {
        question: 'Are there beginner mahjong classes in Sacramento?',
        answer:
          'Senior centers and JCCs in the metro occasionally run American Mahjong beginner sessions. Hong Kong Mahjong intro nights are rarer but happen at cultural centers a few times a year.',
      },
    ],
  },
  {
    slug: 'honolulu',
    name: 'Honolulu',
    state: 'HI',
    country: 'US',
    tier: 2,
    intro:
      "Honolulu has a deep, multi-generational mahjong scene rooted in Chinatown and across O'ahu's Asian American communities. Hong Kong Mahjong is the dominant style, with daily games at clubs, cultural associations, and home gatherings. American Mahjong has a smaller but growing presence at JCCs and senior centers.",
    faqs: [
      {
        question: 'Where can I play mahjong in Honolulu?',
        answer:
          "Chinatown and Mō'ili'ili host the most concentrated Hong Kong Mahjong activity, with cultural associations and family clubs running daily games. Senior centers across the island have weekly games as well.",
      },
      {
        question: 'Is American Mahjong played in Hawaii?',
        answer:
          'Yes — the JCC and a few synagogues run American Mahjong clubs, mostly with retirees and snowbird mainland residents. The community is smaller than the Hong Kong Mahjong scene but well established.',
      },
      {
        question: 'Are there mahjong events at Hawaiian cultural festivals?',
        answer:
          'Sometimes — Asian American cultural festivals occasionally include mahjong demonstrations or social games. Lunar New Year and Mid-Autumn Festival events tend to bring mahjong into public view.',
      },
    ],
  },
  {
    slug: 'detroit',
    name: 'Detroit',
    state: 'MI',
    country: 'US',
    tier: 2,
    intro:
      "Metro Detroit's mahjong scene runs through American Mahjong clubs in West Bloomfield, Bloomfield Hills, and Birmingham, anchored by the Jewish Community Center and synagogues across Oakland County. Hong Kong Mahjong has a smaller presence in Troy and Madison Heights Asian community centers.",
    faqs: [
      {
        question: 'Where can I play mahjong in Detroit?',
        answer:
          'The JCC of Metropolitan Detroit in West Bloomfield runs American Mahjong games. Synagogues and country clubs in Bloomfield Hills, Birmingham, and Franklin host weekly clubs. Asian community centers in Troy and Madison Heights have Hong Kong Mahjong games.',
      },
      {
        question: 'Is mahjong popular in Oakland County?',
        answer:
          'Yes — Oakland County has the densest mahjong activity in the metro. American Mahjong clubs at synagogues and JCCs run weekly games with strong attendance, and some run seasonal tournaments.',
      },
      {
        question: 'How do I find a beginner mahjong class in Detroit?',
        answer:
          'The JCC of Metropolitan Detroit and several Bloomfield-area synagogues run American Mahjong beginner sessions. Schedules are seasonal — check the events list for current dates.',
      },
    ],
  },
  {
    slug: 'charlotte',
    name: 'Charlotte',
    state: 'NC',
    country: 'US',
    tier: 2,
    intro:
      "Charlotte's mahjong community has grown alongside the city's expansion, with American Mahjong clubs at the Levine JCC and synagogues across SouthPark and Ballantyne, and a smaller Hong Kong Mahjong presence in University City and Matthews Asian community centers.",
    faqs: [
      {
        question: 'Where can I play mahjong in Charlotte?',
        answer:
          'The Levine JCC in SouthPark runs American Mahjong games. Synagogues and country clubs in SouthPark, Ballantyne, and Myers Park host weekly clubs. Asian community centers in University City and Matthews have Hong Kong Mahjong games.',
      },
      {
        question: 'Is there mahjong in Ballantyne or Lake Norman?',
        answer:
          'Ballantyne has recurring American Mahjong games at country clubs and synagogues. Lake Norman (Cornelius, Davidson) has a smaller scene that meets at community centers and homes — schedules vary.',
      },
      {
        question: 'Are there beginner mahjong classes in Charlotte?',
        answer:
          'Levine JCC runs American Mahjong beginner sessions seasonally. Synagogues and senior centers occasionally host intro nights — check the events list.',
      },
    ],
  },
  {
    slug: 'raleigh',
    name: 'Raleigh',
    state: 'NC',
    country: 'US',
    tier: 2,
    intro:
      "The Triangle (Raleigh, Durham, Chapel Hill) has a steady mahjong community, with American Mahjong clubs at the Raleigh-Cary JCC and across Cary's synagogues and country clubs. Hong Kong Mahjong is smaller but present in Cary and Morrisville Asian community centers.",
    faqs: [
      {
        question: 'Where can I play mahjong in Raleigh?',
        answer:
          'The Raleigh-Cary JCC runs American Mahjong games. Synagogues and country clubs in North Raleigh, Cary, and Apex host weekly clubs. Cary and Morrisville Asian community centers have Hong Kong Mahjong games — Cary in particular has a substantial Asian American population.',
      },
      {
        question: 'Is there mahjong in the Research Triangle area?',
        answer:
          "Yes — Cary, Morrisville, and Apex all have recurring weekly games. The university crowd in Chapel Hill and Durham has hosted occasional student-led mahjong nights.",
      },
      {
        question: 'How do I find a mahjong group in Raleigh?',
        answer:
          'Recurring weekly games at the Raleigh-Cary JCC, synagogues, and Cary community centers are the most reliable entry points. Check the events list for current schedules.',
      },
    ],
  },
  {
    slug: 'columbus',
    name: 'Columbus',
    state: 'OH',
    country: 'US',
    tier: 2,
    intro:
      "Columbus has a small but active mahjong community, with American Mahjong clubs at the JCC of Greater Columbus in Bexley and synagogues across the city. The OSU university crowd has driven some student-led casual mahjong activity, and a few cafés have hosted beginner socials.",
    faqs: [
      {
        question: 'Where can I play mahjong in Columbus?',
        answer:
          'The JCC of Greater Columbus in Bexley runs American Mahjong games. Synagogues across Bexley, Upper Arlington, and New Albany host weekly clubs. A few cafés in the Short North and German Village have hosted beginner-friendly socials.',
      },
      {
        question: 'Are there student mahjong groups at OSU?',
        answer:
          'Some — OSU has had student-led mahjong groups in recent years that occasionally run public events open to non-students. Check the events list for university-hosted sessions during the school year.',
      },
      {
        question: 'How do I find a beginner mahjong class in Columbus?',
        answer:
          'The JCC of Greater Columbus runs seasonal American Mahjong beginner sessions. Synagogues occasionally host intro nights — check the events list for dates.',
      },
    ],
  },
  {
    slug: 'pittsburgh',
    name: 'Pittsburgh',
    state: 'PA',
    country: 'US',
    tier: 2,
    intro:
      "Pittsburgh's mahjong community runs through Squirrel Hill — the city's traditional Jewish neighborhood — with American Mahjong clubs at the JCC of Greater Pittsburgh and synagogues across the East End. Hong Kong Mahjong is smaller, with occasional games at Asian community centers in Squirrel Hill and the South Hills.",
    faqs: [
      {
        question: 'Where can I play mahjong in Pittsburgh?',
        answer:
          'The JCC of Greater Pittsburgh in Squirrel Hill runs American Mahjong games. Synagogues across Squirrel Hill, Shadyside, and the eastern suburbs host weekly clubs. A few Asian community centers have Hong Kong Mahjong games.',
      },
      {
        question: 'Are there mahjong tournaments in Pittsburgh?',
        answer:
          'Smaller American Mahjong tournaments run a few times a year, usually at the JCC or at Mt. Lebanon-area country clubs. Tournament Cadence is annual rather than monthly.',
      },
      {
        question: 'How do I find a beginner mahjong class in Pittsburgh?',
        answer:
          'The JCC of Greater Pittsburgh runs American Mahjong beginner sessions seasonally. Synagogues and senior centers across the East End occasionally host intro nights.',
      },
    ],
  },
  {
    slug: 'st-louis',
    name: 'St. Louis',
    state: 'MO',
    country: 'US',
    tier: 2,
    intro:
      "St. Louis has a steady American Mahjong community, with clubs at the JCC and synagogues across Clayton, Creve Coeur, and Chesterfield. Hong Kong Mahjong is smaller but present in University City and at occasional Asian community events.",
    faqs: [
      {
        question: 'Where can I play mahjong in St. Louis?',
        answer:
          'The JCC of St. Louis in Creve Coeur runs American Mahjong games. Synagogues and country clubs in Clayton, Ladue, and Chesterfield host weekly clubs. A few Asian community centers in University City have Hong Kong Mahjong games.',
      },
      {
        question: 'Is mahjong common in St. Louis country clubs?',
        answer:
          'Yes — country clubs in Clayton, Ladue, and Chesterfield have weekly American Mahjong games, often with seasonal tournaments. Some are members-only; others open to guests.',
      },
      {
        question: 'How do I find a beginner mahjong class in St. Louis?',
        answer:
          'The JCC of St. Louis runs American Mahjong beginner sessions most years. Synagogues across the metro occasionally host intro nights — check the events list for dates.',
      },
    ],
  },
  {
    slug: 'new-orleans',
    name: 'New Orleans',
    state: 'LA',
    country: 'US',
    tier: 2,
    intro:
      "New Orleans has a small but distinctive mahjong community, with American Mahjong clubs at the JCC and synagogues in Uptown and Metairie, plus occasional Hong Kong Mahjong games tied to Asian cultural events. The city's hospitality culture means a few hotels and lounges have hosted seasonal mahjong socials.",
    faqs: [
      {
        question: 'Where can I play mahjong in New Orleans?',
        answer:
          'The JCC of New Orleans Uptown runs American Mahjong games. Synagogues in Uptown and Metairie host weekly clubs. Asian cultural events occasionally bring Hong Kong Mahjong into public view.',
      },
      {
        question: 'Are there mahjong nights at New Orleans hotels or lounges?',
        answer:
          'Occasionally — a few French Quarter and Garden District hotels have hosted social mahjong nights, often tied to seasonal events. Most regular games are at the JCC and synagogues, not hotels.',
      },
      {
        question: 'How do I find a beginner mahjong class in New Orleans?',
        answer:
          'The JCC of New Orleans runs American Mahjong beginner sessions seasonally. Synagogues occasionally host intro nights — check the events list for current dates.',
      },
    ],
  },

  // ─── Tier 2: July 2026 US expansion ───────────────────────────────────────
  // Added 2026-07-01. Every city below showed live mahjong events on
  // Eventbrite's public search at add time; intros describe what the scrape
  // actually surfaced — no invented scene claims.
  {
    slug: 'cleveland',
    name: 'Cleveland',
    state: 'OH',
    country: 'US',
    tier: 2,
    intro:
      'Cleveland has one of the busiest public mahjong calendars we track in the Midwest — guided American Mahjong play and beginner lessons run at wine bars, coffee shops, and restaurants across the metro, from downtown to the East Side suburbs. Expect a mix of Mahjong 101 nights, open play with a glass of wine, and social mixers.',
    faqs: [
      {
        question: 'Where can I play mahjong in Cleveland?',
        answer:
          'Wine bars, coffee shops, and restaurants across the Cleveland metro host guided play and open-play nights — recent listings include venues downtown and in the eastern suburbs like Beachwood and Shaker Heights. Check the events list above for current sessions.',
      },
      {
        question: 'Are there beginner-friendly mahjong events in Cleveland?',
        answer:
          'Yes — Mahjong 101 lessons and "martinis and mahjong" style beginner nights appear regularly on the Cleveland calendar. Filter for Class / Lesson event types in the list above.',
      },
      {
        question: 'What style of mahjong is played in Cleveland?',
        answer:
          'Most public events in Cleveland play American Mahjong (National Mah Jongg League card). Hong Kong Mahjong games exist but are more likely to be private or community-organized — if you host one, submit it to the events list.',
      },
    ],
  },
  {
    slug: 'providence',
    name: 'Providence',
    state: 'RI',
    country: 'US',
    tier: 2,
    intro:
      'Providence has an outsized public mahjong calendar for a city its size — bookshops, wine bars, and taverns across Rhode Island host learn-to-play sessions, guided play, and open-play meetups on a steady rotation. American Mahjong dominates the public calendar.',
    faqs: [
      {
        question: 'Where can I play mahjong in Providence?',
        answer:
          'Recent listings cluster at bookshops, wine bars, and taverns in and around Providence, with events reaching Cranston, Warwick, and the East Bay. Check the events list above for current sessions.',
      },
      {
        question: 'Are there beginner mahjong lessons in Providence?',
        answer:
          'Yes — learn-to-play and guided-play sessions are a staple of the Providence calendar. Filter for Class / Lesson event types above.',
      },
      {
        question: 'What style of mahjong is played in Providence?',
        answer:
          'American Mahjong (NMJL card) is the style at most public Rhode Island events. If you run a Hong Kong, Taiwanese, or Riichi game locally, submit it to the events list.',
      },
    ],
  },
  {
    slug: 'hartford',
    name: 'Hartford',
    state: 'CT',
    country: 'US',
    tier: 2,
    intro:
      'Greater Hartford has an active American Mah Jongg scene centered on West Hartford — bookshops run open-studio sessions and multi-week beginner and intermediate courses, with restaurant meetups and occasional tournaments rounding out the calendar.',
    faqs: [
      {
        question: 'Where can I play mahjong in Hartford?',
        answer:
          'West Hartford is the hub — a local bookshop runs recurring Mah Jongg open studio sessions and structured courses, and restaurant meetups appear across the metro. Check the events list above for current sessions.',
      },
      {
        question: 'Are there structured mahjong courses in Hartford?',
        answer:
          'Yes — Greater Hartford is one of the few metros where multi-level courses (101 beginner, 102 intermediate) run on a regular schedule. Filter for Class / Lesson event types above.',
      },
      {
        question: 'What style of mahjong is played in Hartford?',
        answer:
          'American Mah Jongg (NMJL card) dominates the public calendar in Connecticut. Other styles are likely played privately — submit your game to the events list if you host one.',
      },
    ],
  },
  {
    slug: 'milwaukee',
    name: 'Milwaukee',
    state: 'WI',
    country: 'US',
    tier: 2,
    intro:
      'Milwaukee has a fast-growing guided-play scene — local mahjong instructors run 101 classes and guided sessions at markets, boutiques, and cafés around the metro. Most public events are beginner-welcoming American Mahjong.',
    faqs: [
      {
        question: 'Where can I play mahjong in Milwaukee?',
        answer:
          'Markets, boutiques, and cafés around Milwaukee host recurring classes and guided play, often organized by dedicated local mahjong instructors. Check the events list above for current sessions.',
      },
      {
        question: 'Are there beginner mahjong classes in Milwaukee?',
        answer:
          'Yes — Mahjong 101 classes are the backbone of the Milwaukee calendar. Filter for Class / Lesson event types above.',
      },
      {
        question: 'What style of mahjong is played in Milwaukee?',
        answer:
          'American Mahjong (NMJL card) is the style at most public Milwaukee events. Submit other-style games to the events list if you host them.',
      },
    ],
  },
  {
    slug: 'richmond-va',
    name: 'Richmond VA',
    state: 'VA',
    country: 'US',
    tier: 2,
    intro:
      'Richmond and central Virginia have a lively social mahjong circuit — breweries, wineries, and event spaces host Mahjong 101 nights and guided play, with dedicated local organizers running sessions from Short Pump to the countryside wineries.',
    faqs: [
      {
        question: 'Where can I play mahjong in Richmond?',
        answer:
          'Breweries, wineries, and event spaces across the Richmond area host recurring guided play and beginner nights — recent listings run from Glen Allen and Short Pump out to Virginia wine country. Check the events list above.',
      },
      {
        question: 'Are there beginner mahjong lessons in Richmond?',
        answer:
          'Yes — Mahjong 101 sessions led by local organizers appear regularly. Filter for Class / Lesson event types above.',
      },
      {
        question: 'What style of mahjong is played in Richmond?',
        answer:
          'American Mahjong (NMJL card) is the style at most public central-Virginia events. If you host Hong Kong, Taiwanese, or Riichi games, submit them to the events list.',
      },
    ],
  },
  {
    slug: 'fort-lauderdale',
    name: 'Fort Lauderdale',
    state: 'FL',
    country: 'US',
    tier: 2,
    intro:
      "Broward County sits in the middle of South Florida's dense mahjong corridor — food halls, art centers, and restaurants from Hollywood up to Boca host themed mahjong nights, beginner tables, and open play, often run by dedicated local mahjong hosts.",
    faqs: [
      {
        question: 'Where can I play mahjong in Fort Lauderdale?',
        answer:
          'Food halls, art centers, and restaurants across Broward host recurring mahjong nights — recent listings span Hollywood, Fort Lauderdale, and the Boca Raton edge of the county. Check the events list above for current sessions.',
      },
      {
        question: 'Are there beginner-friendly mahjong events in Fort Lauderdale?',
        answer:
          'Yes — several venues run dedicated beginner tables alongside open play, and local hosts offer guided sessions. Filter for Class / Lesson or Open Play event types above.',
      },
      {
        question: 'What style of mahjong is played in Fort Lauderdale?',
        answer:
          "American Mahjong (NMJL card) dominates South Florida's public calendar, consistent with the region's deep Mah Jongg tradition. Other styles are played privately — submit yours to the events list.",
      },
    ],
  },
  {
    slug: 'cincinnati',
    name: 'Cincinnati',
    state: 'OH',
    country: 'US',
    tier: 2,
    intro:
      "Cincinnati's mahjong calendar runs through its neighborhood boutiques, breweries, and restaurants — local instructors teach free and paid 101/201 classes and host guided play from downtown Loveland to Mason. A beginner-friendly, social-first scene.",
    faqs: [
      {
        question: 'Where can I play mahjong in Cincinnati?',
        answer:
          'Boutiques, breweries, and restaurants across the metro — including Loveland, Mason, and the northern suburbs — host recurring classes and guided play. Check the events list above for current sessions.',
      },
      {
        question: 'Are there free mahjong classes in Cincinnati?',
        answer:
          'Free Mahjong 101 classes have appeared at local breweries, alongside paid guided-play sessions with local instructors. Filter for Class / Lesson event types above.',
      },
      {
        question: 'What style of mahjong is played in Cincinnati?',
        answer:
          'American Mahjong (NMJL card) is the style at most public Cincinnati events. Submit other-style games to the events list if you host them.',
      },
    ],
  },
  {
    slug: 'orlando',
    name: 'Orlando',
    state: 'FL',
    country: 'US',
    tier: 2,
    intro:
      "Orlando's mahjong scene lives in its wine markets, boutiques, and cafés — \"Mahj Mondays\" style recurring open play and wine-and-tiles evenings run across the metro from Winter Park to the tourist corridor.",
    faqs: [
      {
        question: 'Where can I play mahjong in Orlando?',
        answer:
          'Wine markets, boutiques, and cafés across Orlando and Winter Park host recurring open play and social evenings. Check the events list above for current sessions.',
      },
      {
        question: 'Are there beginner-friendly mahjong events in Orlando?',
        answer:
          'Yes — open-play evenings are generally beginner-welcoming, and guided sessions appear regularly. Filter for Class / Lesson or Open Play event types above.',
      },
      {
        question: 'What style of mahjong is played in Orlando?',
        answer:
          'American Mahjong (NMJL card) is the style at most public Orlando events. If you host Hong Kong, Taiwanese, or Riichi games, submit them to the events list.',
      },
    ],
  },
  {
    slug: 'tampa',
    name: 'Tampa',
    state: 'FL',
    country: 'US',
    tier: 2,
    intro:
      "Tampa Bay's mahjong calendar spans both sides of the bay — recent listings have included instructor-led open play at venues like Oxford Exchange, winery sessions in Clearwater, and social nights across St. Petersburg.",
    faqs: [
      {
        question: 'Where can I play mahjong in Tampa?',
        answer:
          'Recent listings include open play at Tampa venues and winery sessions in Clearwater, with events on both sides of the bay. Check the events list above for current sessions.',
      },
      {
        question: 'Are there beginner-friendly mahjong events in Tampa?',
        answer:
          'Yes — instructor-led open play is common and beginner-welcoming. Filter for Class / Lesson or Open Play event types above.',
      },
      {
        question: 'What style of mahjong is played in Tampa?',
        answer:
          'American Mahjong (NMJL card) is the style at most public Tampa Bay events. Submit other-style games to the events list if you host them.',
      },
    ],
  },
  {
    slug: 'kansas-city',
    name: 'Kansas City',
    state: 'MO',
    country: 'US',
    tier: 2,
    intro:
      "Kansas City's recent mahjong listings mix social play with philanthropy — tiles-and-tea afternoons at event spaces, Mahjong 101 and 102 classes at local wineries, and charity tournaments on both sides of the state line.",
    faqs: [
      {
        question: 'Where can I play mahjong in Kansas City?',
        answer:
          'Event spaces, wineries, and social venues across the metro — including Overland Park and the Kansas-side suburbs — host classes and social play. Check the events list above for current sessions.',
      },
      {
        question: 'Are there mahjong classes in Kansas City?',
        answer:
          'Yes — structured 101 and 102 classes run at local venues. Filter for Class / Lesson event types above.',
      },
      {
        question: 'What style of mahjong is played in Kansas City?',
        answer:
          'American Mahjong (NMJL card) is the style at most public Kansas City events, including the charity tournament circuit. Submit other-style games to the events list.',
      },
    ],
  },
  {
    slug: 'baltimore',
    name: 'Baltimore',
    state: 'MD',
    country: 'US',
    tier: 2,
    intro:
      "Baltimore's mahjong calendar runs from hotel social nights to game-café meetups, with recent listings including charity tournaments and community games around Pikesville and Owings Mills.",
    faqs: [
      {
        question: 'Where can I play mahjong in Baltimore?',
        answer:
          'Hotels, game cafés, and community venues across the metro host recurring meetups — recent listings include weekly game-café sessions and hotel mahjong nights. Check the events list above.',
      },
      {
        question: 'Are there mahjong tournaments in Baltimore?',
        answer:
          "Yes — recent listings have included charity Mah Jongg tournaments, such as one benefiting Alzheimer's research. Watch the events list for tournament dates.",
      },
      {
        question: 'What style of mahjong is played in Baltimore?',
        answer:
          "American Mah Jongg (NMJL card) dominates Baltimore's public listings. Submit other-style games to the events list if you host them.",
      },
    ],
  },
  {
    slug: 'buffalo',
    name: 'Buffalo',
    state: 'NY',
    country: 'US',
    tier: 2,
    intro:
      "Buffalo has a small but real mahjong presence — learn-to-play sessions at wine bars and open-play meetups downtown, with the bonus of Toronto's large mahjong scene about 100 miles up the QEW for players willing to travel.",
    faqs: [
      {
        question: 'Where can I play mahjong in Buffalo?',
        answer:
          'Wine bars and community venues in and around Buffalo host learn-to-play and open-play sessions. Check the events list above for current dates.',
      },
      {
        question: 'Are there beginner mahjong lessons in Buffalo?',
        answer:
          'Yes — learn-to-play sessions appear regularly at local venues. Filter for Class / Lesson event types above.',
      },
      {
        question: 'What style of mahjong is played in Buffalo?',
        answer:
          'American Mahjong (NMJL card) is the style at most public Buffalo events. Toronto, within day-trip range, adds Hong Kong and Riichi options for the committed.',
      },
    ],
  },
  {
    slug: 'fort-worth',
    name: 'Fort Worth',
    state: 'TX',
    country: 'US',
    tier: 2,
    intro:
      "Fort Worth has its own growing mahjong-and-mingle circuit — hotel socials, vineyard tasting-room sessions, and boutique events on the west side of the DFW metroplex, distinct from (but connected to) Dallas's larger scene.",
    faqs: [
      {
        question: 'Where can I play mahjong in Fort Worth?',
        answer:
          'Hotels, tasting rooms, and boutique venues on the western side of DFW host mahjong socials. Dallas-side events are listed separately on our Dallas page. Check the events list above.',
      },
      {
        question: 'Are there beginner-friendly mahjong events in Fort Worth?',
        answer:
          'Yes — mingle-style socials are generally beginner-tolerant, and guided sessions appear periodically. Filter for Class / Lesson event types above.',
      },
      {
        question: 'What style of mahjong is played in Fort Worth?',
        answer:
          'American Mahjong (NMJL card) is the style at most public Fort Worth events. Submit other-style games to the events list if you host them.',
      },
    ],
  },
  {
    slug: 'louisville',
    name: 'Louisville',
    state: 'KY',
    country: 'US',
    tier: 2,
    intro:
      "Louisville's mahjong events surface at boutiques and private clubs — think tiki-and-tiles socials and boutique open play — a small calendar, but a real one.",
    faqs: [
      {
        question: 'Where can I play mahjong in Louisville?',
        answer:
          'Boutiques and social clubs around Louisville host mahjong events — recent listings include boutique open play and themed socials. Check the events list above.',
      },
      {
        question: 'Are there beginner-friendly mahjong events in Louisville?',
        answer:
          'Social-format events are usually beginner-tolerant; dedicated lessons appear less often. Filter for Class / Lesson event types above when they surface.',
      },
      {
        question: 'What style of mahjong is played in Louisville?',
        answer:
          'American Mahjong (NMJL card) is the style at most public Louisville events. Submit other-style games to the events list if you host them.',
      },
    ],
  },
  {
    slug: 'san-antonio',
    name: 'San Antonio',
    state: 'TX',
    country: 'US',
    tier: 2,
    intro:
      "San Antonio's public mahjong calendar is early-stage — Mahjong 101 events appear at professional and social venues around the city, and the scene is growing alongside the statewide Texas mahjong boom.",
    faqs: [
      {
        question: 'Where can I play mahjong in San Antonio?',
        answer:
          "Mahjong 101 sessions and social events appear at venues around the city — the calendar is smaller than Austin's or Dallas's but active. Check the events list above.",
      },
      {
        question: 'Are there beginner mahjong classes in San Antonio?',
        answer:
          'Yes — 101-style intro events are the most common listing type here. Filter for Class / Lesson event types above.',
      },
      {
        question: 'What style of mahjong is played in San Antonio?',
        answer:
          'American Mahjong (NMJL card) is the style at most public San Antonio events. Submit other-style games to the events list if you host them.',
      },
    ],
  },
  {
    slug: 'virginia-beach',
    name: 'Virginia Beach',
    state: 'VA',
    country: 'US',
    tier: 2,
    intro:
      "Hampton Roads — Virginia Beach, Norfolk, and Chesapeake — has an emerging mahjong calendar anchored by arts venues and community fundraisers, with the region's military and retiree communities a natural fit for American Mah Jongg.",
    faqs: [
      {
        question: 'Where can I play mahjong in Virginia Beach?',
        answer:
          'Arts centers and community venues across Hampton Roads — including Norfolk — host mahjong socials and fundraiser events. Check the events list above for current dates.',
      },
      {
        question: 'Are there beginner-friendly mahjong events in Virginia Beach?',
        answer:
          'Social and fundraiser formats are usually beginner-tolerant; dedicated lessons appear periodically. Filter for Class / Lesson event types above.',
      },
      {
        question: 'What style of mahjong is played in Virginia Beach?',
        answer:
          'American Mah Jongg (NMJL card) is the style at most public Hampton Roads events. Submit other-style games to the events list if you host them.',
      },
    ],
  },
  {
    slug: 'oklahoma-city',
    name: 'Oklahoma City',
    state: 'OK',
    country: 'US',
    tier: 2,
    intro:
      "Oklahoma City's public mahjong calendar is young but structured — social play series and summer leagues run at sports bars and social venues, giving OKC a recurring calendar rather than one-off events.",
    faqs: [
      {
        question: 'Where can I play mahjong in Oklahoma City?',
        answer:
          'Sports bars and social venues host recurring play series — recent listings include a summer social-play league. Check the events list above for current sessions.',
      },
      {
        question: 'Are there beginner-friendly mahjong events in Oklahoma City?',
        answer:
          'League and social formats here are built for regulars and newcomers alike. Filter for Class / Lesson event types above when lessons surface.',
      },
      {
        question: 'What style of mahjong is played in Oklahoma City?',
        answer:
          'American Mahjong (NMJL card) is the style at most public OKC events. Submit other-style games to the events list if you host them.',
      },
    ],
  },

  {
    slug: 'birmingham',
    name: 'Birmingham',
    state: 'AL',
    country: 'US',
    tier: 2,
    intro:
      "Birmingham's public mahjong calendar is just getting started — recent listings include social mahjong-and-mocktails events at local venues, and the city's active social scene is a natural fit for more.",
    faqs: [
      {
        question: 'Where can I play mahjong in Birmingham?',
        answer:
          'Public listings are still sparse — recent ones include social events at local beverage venues. Check the events list above, and if you run a game in Birmingham, submit it so players can find you.',
      },
      {
        question: 'Are there beginner-friendly mahjong events in Birmingham?',
        answer:
          'Social-format events are usually beginner-tolerant. Filter for Class / Lesson event types above when lessons surface.',
      },
      {
        question: 'What style of mahjong is played in Birmingham?',
        answer:
          'Too few public listings to say definitively — American Mahjong (NMJL card) dominates the broader Southeast. If you host any style locally, submit it to the events list.',
      },
    ],
  },

  // ─── Tier 3: International beachhead ──────────────────────────────────────
  {
    slug: 'london',
    name: 'London',
    state: 'GB',
    country: 'GB',
    tier: 3,
    intro:
      "London has a deep, internationally inflected mahjong scene — Hong Kong Mahjong is widely played in Chinatown (Soho), Bayswater, and across the British Chinese community, with regular Cantonese-language games. American Mahjong has a small but established presence in North London Jewish community centers, and the British Mahjong Association also runs Riichi (Japanese) Mahjong events for a different style branch.",
    faqs: [
      {
        question: 'Where can I play mahjong in London?',
        answer:
          'Soho Chinatown runs Hong Kong Mahjong daily at cultural associations and tea houses. American Mahjong clubs meet in North London Jewish community centers. The British Mahjong Association runs Riichi (Japanese) Mahjong events for a different style branch — worth checking if you want to compare styles.',
      },
      {
        question: 'What style of mahjong is most popular in London?',
        answer:
          "Hong Kong Mahjong dominates in Chinese-heritage communities. Riichi (Japanese) Mahjong has a smaller but tournament-active scene through the British Mahjong Association. American Mahjong is the smallest of the three but has a steady presence in some Jewish community centers.",
      },
      {
        question: 'Are there mahjong tournaments in London?',
        answer:
          "Yes — the British Mahjong Association runs Riichi tournaments, and Hong Kong Mahjong tournaments happen a few times a year through Chinese cultural associations. American Mahjong tournaments are rarer but occasionally happen at JCC events.",
      },
    ],
  },
  // Added 2026-07-01 (Fable run): Paris (mandated pilot), Toronto, Sydney,
  // Melbourne — each passed the evidence bar (recurring organizers + live
  // event listings, documented in the run report).
  {
    slug: 'paris',
    name: 'Paris',
    state: 'FR',
    country: 'FR',
    tier: 3,
    intro:
      "Paris is the organized-club capital of European mahjong — the Fédération Française de Mahjong is headquartered here, and long-running associations like Magic Mahjong Social Pung (founded 2005) and Tri Nitro Tiles (France's first Riichi-only club) hold regular sessions and host tournaments on the European circuit. Competition rules (MCR) and Riichi dominate; casual social play is growing.",
    faqs: [
      {
        question: 'Where can I play mahjong in Paris?',
        answer:
          'Established clubs run regular sessions — Magic Mahjong Social Pung plays MCR and Riichi, and Tri Nitro Tiles holds Riichi sessions at the Maison des Associations in the 8th arrondissement. The Fédération Française de Mahjong maintains a club directory covering the Île-de-France region.',
      },
      {
        question: 'What style of mahjong is played in Paris?',
        answer:
          'French clubs mostly play MCR (Mahjong Competition Rules) and Riichi (Japanese) Mahjong — Paris hosts EMA-ranked tournaments in both. Hong Kong Mahjong is played socially in the Asian community; American Mah Jongg is rare.',
      },
      {
        question: 'Are there mahjong tournaments in Paris?',
        answer:
          'Yes — Paris clubs organize recurring tournaments, including Riichi events on the European Mahjong Association calendar. Check the events list above and the FFMJ calendar for dates.',
      },
    ],
  },
  {
    slug: 'toronto',
    name: 'Toronto',
    state: 'ON',
    country: 'CA',
    tier: 3,
    intro:
      "Toronto has one of the larger and most style-diverse mahjong scenes we track — a weekly downtown club night draws dozens of players to Spadina Avenue, the Toronto Riichi Club runs monthly in-person games across the GTA, and studios and cafés host game nights and tile-crafting workshops.",
    faqs: [
      {
        question: 'Where can I play mahjong in Toronto?',
        answer:
          'A large weekly club night runs on Spadina Avenue downtown on a pay-what-you-can basis, the Toronto Riichi Club coordinates monthly in-person games across Toronto, Peel, and York, and Meetup groups play American Mah Jongg. Check the events list above for current sessions.',
      },
      {
        question: 'What style of mahjong is played in Toronto?',
        answer:
          'All the major styles have a real presence: Hong Kong Mahjong in the Chinese community and at club nights, Riichi through a dedicated club, and American Mah Jongg through Meetup groups.',
      },
      {
        question: 'Are there beginner-friendly mahjong events in Toronto?',
        answer:
          'Yes — the big weekly club night welcomes newcomers, and studios around the city run beginner game nights and workshops. Filter for Class / Lesson event types above.',
      },
    ],
  },
  {
    slug: 'sydney',
    name: 'Sydney',
    state: 'NSW',
    country: 'AU',
    tier: 3,
    intro:
      'Sydney has a busy social mahjong circuit — dedicated social clubs run recurring nights at bars and restaurants in the CBD and Haymarket, pubs host Mahjong Mondays, and Hong Kong-style sessions run monthly at city venues.',
    faqs: [
      {
        question: 'Where can I play mahjong in Sydney?',
        answer:
          'Recurring social nights run at bars and dining rooms in the CBD and Haymarket, with pub sessions like Mahjong Mondays in the inner west. Check the events list above for current dates.',
      },
      {
        question: 'What style of mahjong is played in Sydney?',
        answer:
          'Hong Kong Mahjong is the anchor style at Sydney social nights, and the city\'s Cantonese heritage community plays it widely. Riichi and other styles appear at board-game meetups.',
      },
      {
        question: 'Are there beginner-friendly mahjong events in Sydney?',
        answer:
          'Yes — the social-club format is built around teaching newcomers, with hosted tables and included drinks at most ticketed nights. Filter for Class / Lesson event types above.',
      },
    ],
  },
  {
    slug: 'melbourne',
    name: 'Melbourne',
    state: 'VIC',
    country: 'AU',
    tier: 3,
    intro:
      'Melbourne mixes grassroots and institutional mahjong in a way few of our cities do — a long-running Meetup group plays Cantonese and Japanese styles at a dedicated mahjong space on Franklin Street, public libraries across the metro run free lessons and monthly meetups, and social clubs host bar nights in Ascot Vale and the CBD.',
    faqs: [
      {
        question: 'Where can I play mahjong in Melbourne?',
        answer:
          'The Melbourne Mahjong Meetup Group plays regularly at a dedicated space on Franklin Street in the CBD, several public libraries run free lessons and monthly meetups, and social clubs host bar nights. Check the events list above for current sessions.',
      },
      {
        question: 'Are there free mahjong lessons in Melbourne?',
        answer:
          'Yes — Melbourne is unusual in that public libraries across the metro run free mahjong lessons and learn-to-play sessions. Filter for Class / Lesson event types above.',
      },
      {
        question: 'What style of mahjong is played in Melbourne?',
        answer:
          'Cantonese (Hong Kong) and Riichi (Japanese) styles are both played at the main Meetup group, and library sessions typically teach simplified or Hong Kong rules. All levels are welcome at most sessions.',
      },
    ],
  },
];

export const allCitySlugs = (): string[] => cities.map((c) => c.slug);

export const getCityBySlug = (slug: string): CityEntry | undefined =>
  cities.find((c) => c.slug === slug);
