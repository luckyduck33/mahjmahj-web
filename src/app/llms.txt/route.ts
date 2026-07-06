export async function GET() {
  const content = `
# MAHJ MAHJ
> MAHJ MAHJ is a community platform for Hong Kong, Taiwanese, and American mahjong — city event listings, recurring club games, learning resources, and the Score My Hand scoring app.

## Home
- [Mahj Mahj — A Modern Guide to Mahjong](https://mahjmahj.co): MAHJ MAHJ is a community platform for mahjong players in the United States. Find local events, learn rules and strategy for Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong, and connect with players in cities across the US.

## About
- [About MAHJ MAHJ | MAHJ MAHJ](https://mahjmahj.co/about): MAHJ MAHJ is a community platform for mahjong players in the United States...

## Main Pages
- [Mahjong Events Near You | MAHJ MAHJ](https://mahjmahj.co/events): Find upcoming mahjong events across the United States. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong events in your city.
- [Hong Kong Mahjong — Rules, Strategy, and Scoring](https://mahjmahj.co/styles/hong-kong-mahjong): A complete guide to Hong Kong Mahjong: rules, tile setup, faan scoring, winning hands, strategy, and etiquette. Learn how to play one of the most popular mahjong styles in the world.
- [Taiwanese Mahjong — Rules, Strategy, and the 16-Tile Hand](https://mahjmahj.co/styles/taiwanese-mahjong): A complete guide to Taiwanese Mahjong: the 16-tile hand structure, tai scoring, gameplay flow, strategy basics, and how it compares to Hong Kong and American Mahjong.
- [American Mahjong — Rules, Jokers, and the NMJL Card](https://mahjmahj.co/styles/american-mahjong): Learn American Mahjong: how the NMJL card works, the role of jokers, the Charleston tile exchange, gameplay flow, winning hands, and how it compares to other styles.
- [How to Play Mahjong — A Beginner&#x27;s Guide](https://mahjmahj.co/learn/how-to-play-mahjong): Learn how to play mahjong from scratch. Covers tiles, hand structure, how a round works, the three main styles, beginner mistakes, and how to choose your first style.
- [Which Mahjong Style Is Right for Me?](https://mahjmahj.co/learn/which-mahjong-style-is-right-for-me): Not sure which mahjong style to learn first? This guide helps you choose between Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong based on your personality, community, and goals.
- [Mahjong Events in Los Angeles | MAHJ MAHJ](https://mahjmahj.co/events/los-angeles): Find upcoming mahjong events in Los Angeles. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong games and meetups.
- [Mahjong Events in Atlanta | MAHJ MAHJ](https://mahjmahj.co/events/atlanta): Find upcoming mahjong events in Atlanta. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong games and meetups.
- [Mahjong Events in Seattle | MAHJ MAHJ](https://mahjmahj.co/events/seattle): Find upcoming mahjong events in Seattle. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong games and meetups.
- [Mahjong Events in Boston | MAHJ MAHJ](https://mahjmahj.co/events/boston): Find upcoming mahjong events in Boston. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong games and meetups.
- [Mahjong Events in Chicago | MAHJ MAHJ](https://mahjmahj.co/events/chicago): Find upcoming mahjong events in Chicago. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong games and meetups.
- [Mahjong Events in Washington Dc | MAHJ MAHJ](https://mahjmahj.co/events/washington-dc): Find upcoming mahjong events in Washington Dc. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong games and meetups.
- [Mahjong Events in Denver | MAHJ MAHJ](https://mahjmahj.co/events/denver): Find upcoming mahjong events in Denver. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong games and meetups.
- [Mahjong Events in San Diego | MAHJ MAHJ](https://mahjmahj.co/events/san-diego): Find upcoming mahjong events in San Diego. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong games and meetups.
- [Mahjong Events in Miami | MAHJ MAHJ](https://mahjmahj.co/events/miami): Find upcoming mahjong events in Miami. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong games and meetups.
- [Mahjong Events in Houston | MAHJ MAHJ](https://mahjmahj.co/events/houston): Find upcoming mahjong events in Houston. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong games and meetups.
- [Mahjong Events in Portland | MAHJ MAHJ](https://mahjmahj.co/events/portland): Find upcoming mahjong events in Portland. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong games and meetups.
- [Mahjong Events in New York | MAHJ MAHJ](https://mahjmahj.co/events/new-york): Find upcoming mahjong events in New York. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong games and meetups.
- [Mahjong Events in San Francisco | MAHJ MAHJ](https://mahjmahj.co/events/san-francisco): Find upcoming mahjong events in San Francisco. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong games and meetups.
- [Mahjong Events in Bay Area | MAHJ MAHJ](https://mahjmahj.co/events/bay-area): Find upcoming mahjong events in Bay Area. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong games and meetups.

## Comparison Pages
- [Mahjong Styles Comparison — Hong Kong vs Taiwanese vs American](https://mahjmahj.co/compare/mahjong-styles): Compare Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong side by side. Hand size, scoring, jokers, pace, and which style is right for you.

## Research & Data
- [The State of American Mahjong 2026 — A Listings Census](https://mahjmahj.co/research/state-of-american-mahjong-2026): A structured, dated count of publicly-listed in-person mahjong events across US cities, with a transparent methodology, top-cities table, organizer ecosystem, and a downloadable CC BY 4.0 dataset. A listings census — not an estimate of all US mahjong activity.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
