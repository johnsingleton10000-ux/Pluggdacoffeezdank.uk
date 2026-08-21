"use client";

import { Panel } from "@/components/ui/Panel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { usePlayer } from "@/lib/state/player";
import { getMembershipTier } from "@/lib/config/membership";

export function EstatePlaque() {
  const { state } = usePlayer();
  const result = state.bloodTest;
  const tier = getMembershipTier(state.membershipTier);

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <Panel drip className="overflow-hidden p-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/30 bg-black/50 px-5 py-4">
            <div>
              <p className="estate-title text-2xl sm:text-3xl">DCBD Estate — Your Blood Seat</p>
              <p className="text-xs uppercase tracking-[0.22em] text-muted">The player hub. One account. One identity.</p>
            </div>
            <CrownRow />
          </div>
          <div className="grid gap-px bg-gold/20 lg:grid-cols-[1fr_1.1fr_1fr]">
            <div className="bg-[#0c0a0d] p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-neon">Who did the AI find inside you?</p>
              {result ? (
                <>
                  <h3 className="estate-title mt-3 text-3xl">{result.avatar.name}</h3>
                  <p className="text-sm text-muted">{result.avatar.title}</p>
                  <p className="mt-4 italic text-gold">“{result.quote}”</p>
                </>
              ) : (
                <p className="mt-4 text-muted">Take the Personality Blood Test. Three questions. One truth. Your unique deck is assigned.</p>
              )}
              <ButtonLink href="/onboarding" variant="pink" className="mt-5">Blood Test</ButtonLink>
            </div>
            <div className="bg-[#0c0a0d] p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-neon">Live Flip Table</p>
              <ul className="mt-4 space-y-2 text-sm">
                {["Table Flip", "Strategic Betrayal", "Crease Management", "Holster Draw"].map((item) => (
                  <li key={item} className="flex items-center gap-2"><span className="text-gold">▣</span> {item}</li>
                ))}
              </ul>
              <p className="mt-5 font-black text-purple-neon">{state.flipHistory.length} flips logged this cycle</p>
              <ButtonLink href="/flip" variant="ghost" className="mt-4">Enter Flip Three</ButtonLink>
            </div>
            <div className="bg-[#0c0a0d] p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Street Control</p>
              <ul className="mt-4 space-y-2 text-sm">
                {tier.entitlements.map((item) => (
                  <li key={item} className="flex items-center gap-2"><span className="text-gold">✓</span> {item}</li>
                ))}
              </ul>
              <p className="mt-5 text-xs uppercase tracking-widest text-purple-neon">{state.membershipTier === "estate_born_plus" ? "Full Access" : "Street Access"}</p>
            </div>
          </div>
          <div className="hood-row flex flex-wrap items-center justify-between gap-4 px-5 py-5">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted">Blood Log / Estate Feed</p>
              <p className="mt-1 font-black">
                [{state.estateName || "SHADOW"}] · Rank {tier.rankLabel} · Deck {result?.avatar.deckName || "Unassigned"} · XP {state.xp.currentXp}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="wax-seal">∞</div>
              <div className="wax-seal">♛</div>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}

function CrownRow() {
  return <p className="hidden text-gold sm:block">♛</p>;
}
