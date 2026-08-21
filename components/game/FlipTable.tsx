"use client";

import { useMemo, useState } from "react";
import { FLIP_SEQUENCE } from "@/config/ecosystem";
import { STARTER_DECK_IDS, getCard } from "@/data/cards";
import { Button } from "@/components/ui/Button";
import { GoldFrame, Panel } from "@/components/ui/Panel";
import { useEstate } from "@/lib/estate";
import { xpFor } from "@/services/xp";
import type { FlipChoice, FlipResolveResult } from "@/types/flip";

export function FlipTable() {
  const { profile, grantXp } = useEstate();
  const deckIds = profile.starterCardIds.length ? profile.starterCardIds : STARTER_DECK_IDS.balanced;
  const hand = useMemo(() => deckIds.slice(0, 3).map((id) => getCard(id)).filter(Boolean), [deckIds]);
  const [choice, setChoice] = useState<FlipChoice>("attack");
  const [result, setResult] = useState<FlipResolveResult | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function commit() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/flip/resolve", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          seed: `${profile.estateName || "shadow"}-${Date.now()}`,
          choice,
          handCardIds: hand.map((card) => card!.id),
        }),
      });
      const data = (await response.json()) as FlipResolveResult & { error?: string; xp?: number };
      if (!response.ok) throw new Error(data.error || "Flip failed");
      setResult(data);
      grantXp(typeof data.xp === "number" ? data.xp : xpFor(data.winner === "player" ? "victory" : "flip"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Flip failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="graffiti text-6xl sm:text-8xl">FLIP 3</p>
        <p className="mt-2 font-black uppercase tracking-[0.28em]">Your three cards • Manchester warzone</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {hand.map((card) =>
          card ? (
            <div key={card.id} className="min-h-56 rounded-2xl border p-4" style={{ borderColor: card.glow, boxShadow: `0 0 22px ${card.glow}66` }}>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-purple-neon">F3</p>
              <h3 className="mt-6 font-display text-3xl uppercase">{card.name}</h3>
              <p className="mt-3 text-sm text-muted">{card.ability || card.flavour}</p>
              <p className="mt-4 text-xs font-black uppercase">ATK {card.attack} / DEF {card.defence}</p>
            </div>
          ) : null,
        )}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <GoldFrame>
          <p className="estate-serif">Expert rules</p>
          <ol className="mt-4 space-y-2 text-sm">
            <li>1. Draw 3</li>
            <li>2. Attack or defend</li>
            <li>3. Negotiate the crease</li>
            <li>4. Win & unlock</li>
          </ol>
          <div className="mt-4 flex flex-wrap gap-2">
            {FLIP_SEQUENCE.map((step) => (
              <span key={step} className="rounded-full border border-gold/30 px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em]">{step}</span>
            ))}
          </div>
        </GoldFrame>
        <Panel className="border-red-500/40">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-neon">Opponent profile</p>
          <p className="mt-2 font-display text-3xl uppercase">Top Boy</p>
          <p className="mt-2 text-sm text-muted">Playstyle: Aggressive bluffer • Risk: High • Known for: All-in flips</p>
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-pink-neon">Decisive intel. Make the right call.</p>
        </Panel>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant={choice === "attack" ? "pink" : "ghost"} onClick={() => setChoice("attack")}>Attack</Button>
        <Button variant={choice === "defend" ? "green" : "ghost"} onClick={() => setChoice("defend")}>Defend</Button>
        <Button variant="gold" onClick={commit} disabled={busy}>{busy ? "Flipping…" : "Commit the flick"}</Button>
      </div>
      {result ? (
        <GoldFrame>
          <p className="estate-serif">Resolve</p>
          <p className="mt-3 text-lg">You {result.playerChoice} vs opponent {result.opponentChoice}</p>
          <p className="mt-2 font-display text-4xl uppercase">{result.winner === "draw" ? "Crease draw" : result.winner === "player" ? "You take the table" : "They hold the street"}</p>
          <p className="mt-2 text-sm text-muted">Outcome: {result.outcome} • Score {result.playerScore} / {result.opponentScore}</p>
        </GoldFrame>
      ) : null}
      {error ? <p className="text-pink-neon">{error}</p> : null}
    </div>
  );
}
