"use client";

import { AvatarGrid } from "@/components/cards/AvatarPortrait";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GoldFrame } from "@/components/ui/Panel";
import { XpDisplay } from "@/components/ui/XpDisplay";
import { useEstate } from "@/lib/estate";
import { useStash } from "@/lib/stash";

export default function AccountPage() {
  const { profile } = useEstate();
  const { count } = useStash();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="display text-6xl">Account</h1>
      <p className="mt-4 max-w-2xl text-muted">
        One player identity. Membership, profile, avatar, deck, collection, XP, purchases, rewards, trades and game history hang off this seat. Supabase auth attaches when those keys are configured.
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <GoldFrame>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Estate name</p>
          <p className="mt-2 font-estate text-2xl">{profile.estateName || "Unsealed"}</p>
          <p className="mt-4 text-sm text-muted">Rank {profile.rank}</p>
          <p className="text-sm text-muted">Tier {profile.membershipTier}</p>
        </GoldFrame>
        <GoldFrame>
          <XpDisplay current={profile.xp.current} />
          <p className="mt-4 text-sm text-muted">Earned {profile.xp.earned} • Spent {profile.xp.spent}</p>
          <p className="mt-2 text-sm text-muted">Waistband items {count}</p>
        </GoldFrame>
        <GoldFrame>
          <p className="estate-serif">Next moves</p>
          <div className="mt-4 grid gap-2">
            <ButtonLink href="/onboarding" variant="pink">Blood Test</ButtonLink>
            <ButtonLink href="/membership" variant="gold">Membership</ButtonLink>
            <ButtonLink href="/deck" variant="purple">My Deck</ButtonLink>
          </div>
        </GoldFrame>
      </div>
      <section className="mt-12">
        <h2 className="display text-4xl">Stock character system</h2>
        <p className="mt-3 max-w-2xl text-muted">Twenty core archetypes. Paid membership can later unlock hair, skin, clothing, tattoos and accessories without destroying the original identity.</p>
        <div className="mt-6">
          <AvatarGrid selectedId={profile.avatar?.id} />
        </div>
      </section>
    </main>
  );
}
