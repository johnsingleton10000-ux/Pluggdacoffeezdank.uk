"use client";

import { usePlayer } from "@/lib/state/player";
import { CollectibleCard } from "@/components/ui/CollectibleCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Button } from "@/components/ui/Button";
import { getCard } from "@/lib/data/cards";

export default function DeckPage() {
  const { state, deckCards, toggleDeck } = usePlayer();
  const result = state.bloodTest;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-purple-neon">My Deck</p>
      <h1 className="display mt-2 text-5xl sm:text-7xl">{result?.avatar.deckName || "Unassigned Hand"}</h1>
      <p className="mt-3 max-w-2xl text-muted">
        {result ? `${result.avatar.name} · ${result.avatar.title} · ${result.deckStyle} style. This is your DCBD deck, not a random pack.` : "Take the Blood Test so the AI can assign your starter identity."}
      </p>
      {!result ? <ButtonLink href="/onboarding" variant="pink" className="mt-6">Start Blood Test</ButtonLink> : null}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {deckCards.map((card) => (
          <div key={card.id}>
            <CollectibleCard card={card} owned />
            <Button variant="ghost" className="mt-2 w-full" onClick={() => toggleDeck(card.id)}>Remove from holster</Button>
          </div>
        ))}
      </div>
      {result ? (
        <section className="mt-10">
          <h2 className="estate-title text-3xl">Owned, not in holster</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {state.collection.filter((item) => item.qty > 0 && !item.inDeck).map((item) => {
              const card = getCard(item.cardId);
              if (!card) return null;
              return (
                <div key={card.id}>
                  <CollectibleCard card={card} owned />
                  <Button variant="gold" className="mt-2 w-full" onClick={() => toggleDeck(card.id)}>Add to holster</Button>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
    </main>
  );
}
