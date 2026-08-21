"use client";

import { useMemo, useState } from "react";
import { usePlayer } from "@/lib/state/player";
import { resolveFlip, type FlipAction } from "@/lib/domains/flip";
import { XP_CONFIG } from "@/lib/config/xp";
import { Button } from "@/components/ui/Button";
import { ROOKIE_CARDS } from "@/lib/data/cards";

export default function FlipPage() {
  const { deckCards, awardXp, recordFlip } = usePlayer();
  const holster = deckCards.length ? deckCards.slice(0, 6) : ROOKIE_CARDS.slice(0, 6);
  const hand = useMemo(() => holster.slice(0, 3), [holster]);
  const [selected, setSelected] = useState(hand[0]?.id || holster[0]?.id);
  const [action, setAction] = useState<FlipAction>("attack");
  const [risk, setRisk] = useState(62);
  const [log, setLog] = useState("");

  function flick() {
    const result = resolveFlip({ cardId: selected, action, risk });
    if (!result) return;
    const xp = result.outcome === "survive" ? XP_CONFIG.flipSurvive : result.outcome === "creased" ? XP_CONFIG.flipCrease : XP_CONFIG.flipDestroy;
    awardXp(xp, "flip", result.outcome);
    recordFlip({ cardName: result.playerCard.name, outcome: result.outcome });
    setLog(`${result.playerCard.name} ${action.toUpperCase()} → ${result.outcome.toUpperCase()} · power ${result.playerPower} vs ${result.opponentPower} · +${xp} XP`);
  }

  return (
    <main className="relative min-h-dvh overflow-hidden px-4 py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(160,32,240,.25),transparent_30%),radial-gradient(circle_at_80%_0,rgba(255,43,214,.15),transparent_28%),linear-gradient(#050505,#120814)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-graffiti text-2xl text-pink">Manchester Warzone</p>
            <h1 className="graffiti-title text-6xl sm:text-8xl">Flip 3</h1>
            <p className="mt-2 rounded-full bg-black px-4 py-1 text-sm font-black uppercase tracking-widest">Your three cards</p>
          </div>
          <p className="display text-2xl text-ember">Outthink. Outflick. Win.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {hand.map((card) => (
            <button
              key={card.id}
              onClick={() => setSelected(card.id)}
              className="neon-card min-h-40 rounded-2xl p-4 text-left"
              style={{ ["--glow" as string]: selected === card.id ? "#ff2bd6" : card.glow }}
            >
              <p className="text-xs uppercase tracking-widest">F3</p>
              <p className="display mt-6 text-3xl">{card.name}</p>
              <p className="mt-2 text-sm">ATK {card.attack} · DEF {card.defence}</p>
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <section className="gold-frame rounded-2xl p-5">
            <p className="estate-title">Expert Rules</p>
            <ol className="mt-3 space-y-2 text-sm">
              <li>1. Draw 3</li>
              <li>2. Attack or Defend</li>
              <li>3. Negotiate the crease</li>
              <li>4. Survive, crease or destroy</li>
            </ol>
          </section>
          <section className="rounded-2xl border-2 border-blood p-5">
            <p className="font-black uppercase text-pink">Opponent Profile</p>
            <p className="mt-2">Playstyle: Aggressive Bluffer</p>
            <p>Risk level: High</p>
            <p className="mt-3 text-sm text-muted">Decisive intel. Make the right call. Training table until live multiplayer is wired.</p>
          </section>
        </div>
        <label className="mt-6 block">
          <span className="flex justify-between text-xs font-black uppercase tracking-widest"><span>Safe play</span><span>All-in warzone</span></span>
          <input type="range" min={0} max={100} value={risk} onChange={(event) => setRisk(Number(event.target.value))} className="mt-2 w-full" />
        </label>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant={action === "attack" ? "pink" : "ghost"} onClick={() => setAction("attack")}>Attack</Button>
          <Button variant={action === "defend" ? "lime" : "ghost"} onClick={() => setAction("defend")}>Defend</Button>
          <Button variant="gold" onClick={flick}>Flick</Button>
        </div>
        {log ? <p className="mt-5 font-black text-lime">{log}</p> : null}
        <section className="gold-frame mt-8 rounded-2xl p-5">
          <p className="estate-title">Side deck / Holster</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {holster.map((card) => (
              <button key={card.id} onClick={() => setSelected(card.id)} className="rounded-xl border border-gold/40 px-3 py-2 text-left text-sm">
                <b>{card.name}</b>
                <div>ATK {card.attack}</div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
