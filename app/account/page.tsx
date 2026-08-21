"use client";

import { usePlayer } from "@/lib/state/player";
import { getMembershipTier } from "@/lib/config/membership";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EstatePlaque } from "@/components/home/EstatePlaque";

export default function AccountPage() {
  const { state } = usePlayer();
  const tier = getMembershipTier(state.membershipTier);
  const result = state.bloodTest;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">Account</p>
      <h1 className="estate-title mt-2 text-5xl">[{state.estateName || "SHADOW"}]</h1>
      <p className="mt-3 text-muted">Rank {tier.rankLabel} · Deck {result?.avatar.deckName || "Unassigned"} · XP {state.xp.currentXp}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <ButtonLink href="/onboarding" variant="pink">Blood Test</ButtonLink>
        <ButtonLink href="/deck" variant="gold">Open Deck</ButtonLink>
        <ButtonLink href="/membership" variant="lime">Membership</ButtonLink>
      </div>
      <div className="mt-8">
        <EstatePlaque />
      </div>
      <section className="grid gap-4 md:grid-cols-3">
        <Stat label="Earned XP" value={String(state.xp.earnedXp)} />
        <Stat label="Cards owned" value={String(state.collection.filter((item) => item.qty > 0).length)} />
        <Stat label="Flip history" value={String(state.flipHistory.length)} />
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="gold-frame rounded-2xl p-5">
      <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
      <p className="display mt-2 text-4xl">{value}</p>
    </div>
  );
}
