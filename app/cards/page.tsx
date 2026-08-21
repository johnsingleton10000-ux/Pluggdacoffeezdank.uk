"use client";

import { useMemo, useState } from "react";
import { CollectibleCard } from "@/components/cards/CollectibleCard";
import { CARD_CATALOGUE } from "@/data/cards";
import { useEstate } from "@/lib/estate";
import type { CardRarity } from "@/types/card";

const FILTERS = ["all", "owned", "common", "uncommon", "rare", "epic", "wonder"] as const;

export default function CardsPage() {
  const { profile } = useEstate();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const owned = new Set(profile.collection.map((item) => item.cardId));
  const inDeck = new Set(profile.starterCardIds);
  const cards = useMemo(() => {
    return CARD_CATALOGUE.filter((card) => {
      if (filter === "all") return true;
      if (filter === "owned") return owned.has(card.id);
      return card.rarity === (filter as CardRarity);
    });
  }, [filter, owned]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="display text-6xl">Collection</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Cards owned, rarity, type, abilities, duplicates, deck status and trade flags. Ownership grants still confirm on the server after a real order.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button key={item} type="button" onClick={() => setFilter(item)} className={`min-h-touch rounded-full border px-4 py-2 text-xs font-black uppercase ${filter === item ? "border-gold bg-gold text-black" : "border-white/20"}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.id}>
            <CollectibleCard card={card} owned={owned.has(card.id)} />
            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              {inDeck.has(card.id) ? "In deck" : owned.has(card.id) ? "Available to trade" : "Locked"} • {card.type}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
