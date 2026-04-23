export async function GET() {
  const content = `# MAHJ MAHJ
> A community platform for mahjong players in the United States

## About
MAHJ MAHJ helps people discover mahjong, learn the rules, find local events, and connect with players. We cover three major styles: Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong.

## Pages
- Homepage: https://mahjmahj.co/
- Events: https://mahjmahj.co/events
- Hong Kong Mahjong: https://mahjmahj.co/styles/hong-kong-mahjong
- Taiwanese Mahjong: https://mahjmahj.co/styles/taiwanese-mahjong
- American Mahjong: https://mahjmahj.co/styles/american-mahjong
- Compare Styles: https://mahjmahj.co/compare/mahjong-styles
- How to Play: https://mahjmahj.co/learn/how-to-play-mahjong
- Which Style: https://mahjmahj.co/learn/which-mahjong-style-is-right-for-me
- About: https://mahjmahj.co/about

## API
- Events: https://api.mahjmahj.co/api/events
- News: https://api.mahjmahj.co/api/news

## Contact
hello@mahjmahj.co
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
