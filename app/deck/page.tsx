"use client";

import { CollectibleCard } from "@/components/cards/CollectibleCard";
import { AvatarPortrait } from "@/components/cards/AvatarPortrait";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GoldFrame } from "@/components/ui/Panel";
import { XpDisplay } from "@/components/ui/XpDisplay";
import { getCard } from "@/data/cards";
import { useEstate } from "@/lib/estate";
import { ARCHETYPES } from "@/config/archetypes";

export default function DeckPage() {
  const { profile } = useEstate();
  const archetype = ARCHETYPES.find((item) => item.id === profile.archetypeId);
  const cards = profile.starterCardIds.map((id) => getCard(id)).filter(Boolean);

  if (!profile.onboarded) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="display text-6xl">My Deck</h1>
        <p className="mt-4 text-muted">The AI assigns your starter deck after the Personality Blood Test.</p>
        <ButtonLink href="/onboarding" variant="pink" className="mt-8">Lock your Blood Seat</ButtonLink>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[0.4fr_1fr]">
        {profile.avatar ? <AvatarPortrait avatar={profile.avatar} large /> : null}
        <GoldFrame>
          <p className="estate-serif">This is my DCBD deck</p>
          <h1 className="display mt-3 text-5xl">{profile.deckName}</h1>
          <p className="mt-3 text-muted">{archetype?.summary} — {profile.avatar?.quote}</p>
          <div className="mt-5">
            <XpDisplay current={profile.xp.current} />
          </div>
          <ButtonLink href="/flip-three" variant="purple" className="mt-6">Take it to Flip Three</ButtonLink>
        </GoldFrame>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (card ? <CollectibleCard key={card.id} card={card} owned /> : null))}
      </div>
    </main>
  );
}
