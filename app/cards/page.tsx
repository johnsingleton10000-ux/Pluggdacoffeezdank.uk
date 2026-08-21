"use client";

import Image from "next/image";
import { ALL_CARDS } from "@/lib/data/cards";
import { CollectibleCard } from "@/components/ui/CollectibleCard";
import { usePlayer } from "@/lib/state/player";
import { CARD_EXCHANGE } from "@/lib/config/xp";
import { Button } from "@/components/ui/Button";
import { PRODUCT_ART_CARDS } from "@/lib/data/cards";

export default function CardsPage() {
  const { state, grantCard } = usePlayer();

  function demoDraw() {
    const pool = ALL_CARDS.filter((card) => card.type === "rookie");
    const card = pool[Math.floor(Math.random() * pool.length)];
    if (card) grantCard(card.id);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">Collection</p>
      <h1 className="display mt-2 text-5xl sm:text-7xl">DCBD Cards</h1>
      <p className="mt-3 max-w-2xl text-muted">Owned cards, rarity, holster status and trade flags. Universe cards from the Gangsta Decks stay locked until earned. Demo reveal is local until the commerce backend confirms a qualifying order.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        {CARD_EXCHANGE.rates.map((rate) => (
          <article key={rate.rarity} className="gold-frame rounded-2xl p-4">
            <p className="font-black uppercase">{rate.count} {rate.rarity}</p>
            <p className="text-sm text-muted">{rate.reward}</p>
          </article>
        ))}
      </div>
      <Button className="mt-6" variant="lime" onClick={demoDraw}>Demo Card Reveal</Button>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ALL_CARDS.map((card) => {
          const owned = state.collection.find((item) => item.cardId === card.id);
          return <CollectibleCard key={card.id} card={card} owned={Boolean(owned && owned.qty > 0)} dim />;
        })}
      </div>
      <section className="mt-12">
        <h2 className="estate-title text-3xl">Artwork already in the repo</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_ART_CARDS.map((card) => (
            <Image key={card.id} src={card.image} alt={card.name} width={900} height={1200} className="h-80 w-full rounded-2xl object-cover" />
          ))}
        </div>
      </section>
    </main>
  );
}
