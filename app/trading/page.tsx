"use client";

import { usePlayer } from "@/lib/state/player";
import { ALL_CARDS } from "@/lib/data/cards";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function TradingPage() {
  const { state, toggleTrade } = usePlayer();
  const [note, setNote] = useState("Offers are local until the trade service confirms ownership server-side.");
  const listed = state.collection.filter((item) => item.tradeListed && item.qty > 0);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">Exchange</p>
      <h1 className="display mt-2 text-5xl">Trading</h1>
      <p className="mt-3 max-w-2xl text-muted">{note}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {ALL_CARDS.filter((card) => {
          const owned = state.collection.find((item) => item.cardId === card.id);
          return owned && owned.qty > 0;
        }).map((card) => {
          const owned = state.collection.find((item) => item.cardId === card.id);
          return (
            <article key={card.id} className="gold-frame rounded-2xl p-4">
              <p className="font-black">{card.name}</p>
              <p className="text-sm text-muted">Qty {owned?.qty} · {owned?.tradeListed ? "Listed" : "In vault"}</p>
              <Button className="mt-3" variant={owned?.tradeListed ? "pink" : "ghost"} onClick={() => toggleTrade(card.id)}>
                {owned?.tradeListed ? "Unlist" : "List for trade"}
              </Button>
            </article>
          );
        })}
      </div>
      <section className="gold-frame mt-8 rounded-2xl p-5">
        <h2 className="estate-title">Open listings</h2>
        {listed.length === 0 ? <p className="mt-2 text-muted">No cards listed.</p> : listed.map((item) => <p key={item.cardId}>{item.cardId} × {item.qty}</p>)}
        <Button className="mt-4" variant="gold" onClick={() => setNote("A future trade API will validate both inventories before status can become completed.")}>How trades complete</Button>
      </section>
    </main>
  );
}
