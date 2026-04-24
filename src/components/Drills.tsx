'use client';
import { useState, useCallback, useMemo } from 'react';

/* ── Quiz Data ──────────────────────────── */
const decks: Record<string, Array<{ q: string; choices: string[]; correct: number; expl: string }>> = {
  american: [
    { q: "How many tiles are in a standard American Mahjong set?", choices: ["152 tiles", "144 tiles", "136 tiles"], correct: 0, expl: "The standard American set uses 144 suit/honor tiles plus 8 Joker tiles, totaling 152. Hong Kong Mahjong uses 136; Taiwanese uses 144." },
    { q: "What can a Joker tile do in American Mahjong?", choices: ["Substitute for any suited tile in a set of 3 or more identical tiles", "Substitute for any tile in any position, including pairs", "Score bonus points when drawn from the wall — then set aside"], correct: 0, expl: "Jokers cannot form pairs and cannot replace honor tiles in a non-suited set. If exposed, the actual tile can be swapped in by any player holding it." },
    { q: "What is 'The Charleston' in American Mahjong?", choices: ["A mandatory tile-passing ritual at the start of each hand", "A scoring bonus for winning with all tiles from the same suit", "An optional extra draw taken when your opening hand is weak"], correct: 0, expl: "Players pass 3 tiles right, across, then left — and may repeat. This pre-hand exchange is unique to American Mahjong and shapes strategy from the first moment." },
    { q: "What is the NMJL card?", choices: ["The National Mah Jongg League's annual card listing all valid winning hands", "A reference card showing the point value of each individual tile", "A membership card required to enter licensed American Mahjong tournaments"], correct: 0, expl: "Updated every year. You must win with a hand exactly matching one on the current card. Hands from previous years are not valid." },
    { q: "Can a Joker tile be used to form a pair?", choices: ["No — Jokers cannot form pairs under any circumstances", "Yes — two Jokers count as a wild pair in any hand", "Only if both Jokers are in the concealed portion of your hand"], correct: 0, expl: "Jokers substitute only in sets of 3 or more identical tiles (Pungs or Kongs). A pair must consist of two real matching tiles." },
    { q: "What happens when you 'call' a Joker out of an opponent's exposed set?", choices: ["You place the real tile into the set and claim the Joker for your own hand", "You may only do this on your own turn when drawing from the wall", "The Joker is returned to the wall and a new tile is drawn by its owner"], correct: 0, expl: "Any player holding the matching tile may swap it in — on their turn — and take the Joker. Exposed sets with Jokers are vulnerable to Joker-theft." },
    { q: "When two players could declare Mahjong from the same discard, who wins?", choices: ["The player whose turn it is next; the discarder pays double", "The first player to verbally call Mahjong wins", "The player seated closest to the discarder wins"], correct: 0, expl: "Only one player can win from each discarded tile. Priority goes to the player next in turn order. The discarder typically pays double." },
    { q: "What is a 'wall game' in American Mahjong?", choices: ["All tiles are drawn with no winner — the hand is a push and replayed", "A winning hand built entirely from self-drawn tiles with no claims", "A penalty round triggered when a player makes an illegal discard"], correct: 0, expl: "When the wall runs out without anyone winning, no money changes hands. The hand is simply redealt." },
  ],
  chinese: [
    { q: "How many tiles are in a standard Hong Kong Mahjong set (without flowers)?", choices: ["136 tiles", "144 tiles", "152 tiles"], correct: 0, expl: "36 Bamboo + 36 Characters + 36 Dots + 16 Winds + 12 Dragons = 136. Many sets include 8 Flower/Season bonus tiles, bringing the total to 144." },
    { q: "What is a Chow?", choices: ["A set of 3 consecutive numbered tiles in the same suit", "A set of 3 identical tiles claimed from any player", "Any 3 honor tiles grouped as a set"], correct: 0, expl: "Example: 3-4-5 Bamboo. Chows must be in the same suit and consecutive. Chows can only be claimed from the player to your left." },
    { q: "What is a Pung?", choices: ["A set of 3 identical tiles — can be claimed from any player's discard", "A set of 3 consecutive tiles — can only be claimed from the player to your left", "A set of 4 identical tiles that earns an immediate bonus draw"], correct: 0, expl: "You call Pung to claim any discarded tile that completes your triplet, from any player. The Pung becomes an exposed set." },
    { q: "What is a Kong?", choices: ["A set of 4 identical tiles — the player earns a bonus draw immediately", "A set of 3 identical tiles upgraded by drawing a 4th from the wall", "A complete suit run of tiles 1 through 9 in a single hand"], correct: 0, expl: "A Kong must be declared immediately. There are concealed Kongs (all 4 from your own draws) and exposed Kongs (claimed + added tile)." },
    { q: "What is a self-draw win called — and why is it more valuable?", choices: ["Zimo — all three opponents each pay you, tripling the payout", "A bonus for the largest valid winning hand", "A concealed win where no opponent may challenge it"], correct: 0, expl: "Winning by drawing your own tile means all three opponents pay you individually — far greater than winning off a discard." },
    { q: "What are the three Dragon tiles?", choices: ["Red (Center), Green (Prosperity), White (blank/bordered)", "East, West, South", "Bamboo 1, Circle 1, Character 1"], correct: 0, expl: "Red means 'center' and is marked in red. Green means 'prosperity.' White is either blank or has a simple border. They are honor tiles." },
    { q: "What makes a fully concealed winning hand more valuable?", choices: ["A significant scoring multiplier for winning without exposing any sets", "A bonus for winning within the first 5 draws", "A bonus for using tiles from only a single suit plus honors"], correct: 0, expl: "Exposing a Pung or Kong locks you into a visible set and removes flexibility. A fully concealed hand is harder and is rewarded with a scoring bonus." },
    { q: "What are Flower tiles in Hong Kong Mahjong?", choices: ["Bonus tiles: drawn and immediately set aside; you draw a replacement", "Wild tiles that can substitute for any numbered suit tile", "Honor tiles representing the four seasons that must be held until winning"], correct: 0, expl: "When you draw a Flower or Season tile, you reveal it, set it aside, and draw a replacement. Flowers score bonus points but don't contribute to hand structure." },
  ],
  taiwanese: [
    { q: "How many tiles does each player hold in Taiwanese Mahjong?", choices: ["16 tiles", "13 tiles", "14 tiles"], correct: 0, expl: "Taiwanese Mahjong is played with 16-tile hands, compared to 13 in Chinese. The extra tiles create more flexible hands and longer play." },
    { q: "What is tenpai?", choices: ["Being exactly one tile away from a complete winning hand", "Formally announcing your intention to win before drawing", "Reaching the last round of tile draws without having won yet"], correct: 0, expl: "In Taiwanese rules, players who reach tenpai receive a payment from non-tenpai players at round end — even if someone else wins first." },
    { q: "What is fang pao in Taiwanese Mahjong?", choices: ["Dealing into an opponent's win — the discarder alone pays the full amount", "Drawing the winning tile from the wall — earns a double payout", "Swapping a Joker out of an exposed set during your turn"], correct: 0, expl: "In Taiwanese Mahjong the discarder typically covers the full winning payment alone — making every discard consequential." },
    { q: "How many tiles are in a standard Taiwanese Mahjong set?", choices: ["144 tiles", "136 tiles", "152 tiles"], correct: 0, expl: "Taiwanese sets include 136 base tiles plus 8 Flower and Season bonus tiles for 144 total." },
    { q: "What is the significance of the East position?", choices: ["East is dealer; winning as East or from East's discard earns bonus payment", "East draws an extra tile each round and holds 17 tiles", "East is the only position permitted to call a Chow from any player"], correct: 0, expl: "Winning as East — or discarding into an opponent's win — often results in multiplied payments. Being East is both an advantage and a risk." },
    { q: "Can any player claim a discard for a Chow?", choices: ["No — Chow claims are restricted to the next player in turn order", "Yes — any player may call a Chow from any discard", "Only the player directly across from the discarder may claim"], correct: 0, expl: "While any player may claim a discard to win, Pung, or Kong, a Chow can only be claimed by the player whose turn comes next." },
    { q: "What is a tai in Taiwanese Mahjong scoring?", choices: ["A scoring unit — winning hands are worth a fixed number of tai", "A bonus tile drawn when you first reach tenpai", "The agreed table limit on the maximum payment per hand"], correct: 0, expl: "Players agree on a monetary value per tai before the game. Each winning hand has a base tai count; specific patterns add more. Total tai x value = payment." },
    { q: "What happens at round end if no one has won?", choices: ["Players in tenpai receive payment from players who are not in tenpai", "All players redraw and the round is replayed without payment", "The player closest to winning scores half the usual hand value"], correct: 0, expl: "This rule rewards near-completion. Being in tenpai when the wall runs out still earns you something." },
  ],
};

const DECK_META: Record<string, { icon: string; label: string }> = {
  american:  { icon: '\uD83C\uDC04', label: 'American' },
  chinese:   { icon: '\uD83C\uDC07', label: 'Chinese' },
  taiwanese: { icon: '\uD83C\uDC19', label: 'Taiwanese' },
};

type MasteryState = 'new' | 'learning' | 'strong' | 'mastered';
type MasteryEntry = { correct: number; attempts: number; state: MasteryState };
type MasteryData = Record<string, Record<number, MasteryEntry>>;

function defaultMastery(): MasteryData {
  const m: MasteryData = {};
  ['american', 'chinese', 'taiwanese'].forEach(deck => {
    m[deck] = {};
    for (let i = 0; i < 8; i++) m[deck][i] = { correct: 0, attempts: 0, state: 'new' };
  });
  return m;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function priorityShuffle(mastery: MasteryData, deckName: string): number[] {
  const m = mastery[deckName];
  const pri: Record<string, number> = { learning: 0, new: 1, strong: 2, mastered: 3 };
  const indices = shuffle([...Array(8).keys()]);
  indices.sort((a, b) => pri[m[a].state] - pri[m[b].state]);
  return indices;
}

export default function Drills() {
  const [mastery, setMastery] = useState<MasteryData>(defaultMastery);
  const [currentDeck, setCurrentDeck] = useState('american');
  const [deckOrder, setDeckOrder] = useState<number[]>(() => priorityShuffle(defaultMastery(), 'american'));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [seen, setSeen] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [displayMap, setDisplayMap] = useState<number[]>(() => shuffle([0, 1, 2]));
  const [deckComplete, setDeckComplete] = useState(false);

  const card = decks[currentDeck][deckOrder[currentIdx]] || decks[currentDeck][0];
  const correctDisplayIdx = displayMap.indexOf(0);

  const handleSelectAnswer = useCallback((displayIdx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(displayIdx);

    const cardIdx = deckOrder[currentIdx];
    const isCorrect = displayIdx === displayMap.indexOf(0);

    setMastery(prev => {
      const next = { ...prev, [currentDeck]: { ...prev[currentDeck] } };
      const m = { ...next[currentDeck][cardIdx] };
      m.attempts++;
      if (isCorrect) {
        m.correct++;
        if (m.correct >= 2) m.state = 'mastered';
        else if (m.correct === 1) m.state = 'strong';
      } else {
        m.state = 'learning';
      }
      next[currentDeck][cardIdx] = m;
      return next;
    });

    if (isCorrect) setCorrect(c => c + 1);
    setSeen(s => s + 1);
  }, [selectedAnswer, deckOrder, currentIdx, displayMap, currentDeck]);

  const handleNext = useCallback(() => {
    if (currentIdx + 1 >= 8) {
      setDeckComplete(true);
      return;
    }
    const nextIdx = currentIdx + 1;
    setCurrentIdx(nextIdx);
    setSelectedAnswer(null);
    setDisplayMap(shuffle([0, 1, 2]));
  }, [currentIdx]);

  const resetDeck = useCallback(() => {
    const newOrder = priorityShuffle(mastery, currentDeck);
    setDeckOrder(newOrder);
    setCurrentIdx(0);
    setCorrect(0);
    setSeen(0);
    setSelectedAnswer(null);
    setDisplayMap(shuffle([0, 1, 2]));
    setDeckComplete(false);
  }, [mastery, currentDeck]);

  const switchDeck = useCallback((deck: string) => {
    setCurrentDeck(deck);
    const newOrder = priorityShuffle(mastery, deck);
    setDeckOrder(newOrder);
    setCurrentIdx(0);
    setCorrect(0);
    setSeen(0);
    setSelectedAnswer(null);
    setDisplayMap(shuffle([0, 1, 2]));
    setDeckComplete(false);
  }, [mastery]);

  const resetMastery = useCallback(() => {
    setMastery(defaultMastery());
    resetDeck();
  }, [resetDeck]);

  // Mastery summary for deck complete
  const masterySummary = useMemo(() => {
    if (!deckComplete) return null;
    const m = mastery[currentDeck];
    const counts = { mastered: 0, strong: 0, learning: 0, new: 0 };
    for (let i = 0; i < 8; i++) counts[m[i].state as keyof typeof counts]++;
    return counts;
  }, [deckComplete, mastery, currentDeck]);

  return (
    <section id="drills" className="drills-section grain">
      <div className="fc-layout sec-inner">
        {/* Left column */}
        <div className="fc-left">
          <span className="label peri">Quick Drills</span>
          <h2>Build fluency.<br />One tile at a time.</h2>
          <p>Mahj Mahj drills are fast, focused, and deliberately repetitive. We surface the rules and patterns you need to internalize — and bring them back until they stick.</p>
          <p>Choose your answer before seeing the result. Every question gives you feedback and context. Switch decks to cover all three variants.</p>
          <div className="mode-grid">
            {Object.entries(DECK_META).map(([key, meta]) => (
              <div
                key={key}
                className={`mode-btn ${currentDeck === key ? 'active' : ''}`}
                onClick={() => switchDeck(key)}
              >
                <span className="mode-btn-icon">{meta.icon}</span>
                <span className="mode-btn-name">{meta.label}</span>
                <span className="mode-btn-count">8 cards</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="fc-right">
          {/* Progress bar */}
          <div className="fc-prog">
            <div className="fc-prog-bar">
              <div className="fc-prog-fill" style={{ width: `${((currentIdx + 1) / 8) * 100}%` }} />
            </div>
            <span className="fc-prog-txt">{deckComplete ? '8 / 8' : `${currentIdx + 1} / 8`}</span>
          </div>

          {/* Mastery dots */}
          <div className="mastery-dots">
            {deckOrder.map((cardIdx, i) => {
              const state = mastery[currentDeck][cardIdx]?.state || 'new';
              return (
                <div
                  key={i}
                  className={`mastery-dot ${state !== 'new' ? state : ''} ${i === currentIdx && !deckComplete ? 'current' : ''}`}
                />
              );
            })}
          </div>

          {deckComplete ? (
            <>
              <div className="quiz-card">
                <p className="quiz-q">Deck complete! {correct} / 8 correct.</p>
              </div>
              {masterySummary && (
                <div className="mastery-summary">
                  <div className="mastery-summary-item"><span className="mastery-summary-dot" style={{ background: '#1A7A50' }} />{masterySummary.mastered} Mastered</div>
                  <div className="mastery-summary-item"><span className="mastery-summary-dot" style={{ background: 'rgba(58,140,176,0.70)' }} />{masterySummary.strong} Strong</div>
                  <div className="mastery-summary-item"><span className="mastery-summary-dot" style={{ background: 'rgba(229,53,37,0.60)' }} />{masterySummary.learning} Learning</div>
                  <div className="mastery-summary-item"><span className="mastery-summary-dot" style={{ background: 'rgba(26,20,16,0.12)' }} />{masterySummary.new} New</div>
                </div>
              )}
              <button className="quiz-next" onClick={resetDeck}>Reset Deck</button>
            </>
          ) : (
            <>
              {/* Question card */}
              <div className="quiz-card">
                <p className="quiz-q">{card.q}</p>
              </div>

              {/* Choices */}
              <div className="quiz-choices">
                {displayMap.map((origIdx, displayIdx) => {
                  let cls = 'quiz-choice';
                  if (selectedAnswer !== null) {
                    if (displayIdx === correctDisplayIdx) cls += ' correct';
                    else if (displayIdx === selectedAnswer) cls += ' wrong';
                    else cls += ' dim';
                  }
                  return (
                    <button
                      key={displayIdx}
                      className={cls}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleSelectAnswer(displayIdx)}
                    >
                      {card.choices[origIdx]}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {selectedAnswer !== null && (
                <div className="quiz-expl">{card.expl}</div>
              )}

              {/* Next button */}
              {selectedAnswer !== null && (
                <button className="quiz-next" onClick={handleNext}>
                  Next →
                </button>
              )}
            </>
          )}

          {/* Scores */}
          <div className="fc-scores">
            <div><span className="fc-score-n green">{correct}</span><span className="fc-score-l">Correct</span></div>
            <div><span className="fc-score-n">{seen}</span><span className="fc-score-l">Seen</span></div>
            <div><span className="fc-score-n">{Math.max(0, 8 - currentIdx - (deckComplete ? 0 : 1))}</span><span className="fc-score-l">Remaining</span></div>
          </div>

          <button className="reset-progress" onClick={resetMastery}>Reset Progress</button>
        </div>
      </div>
    </section>
  );
}
