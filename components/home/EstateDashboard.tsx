"use client";

import Link from "next/link";
import { GoldFrame } from "@/components/ui/Panel";
import { HoodSilhouette, WaxSeal } from "@/components/ui/Marks";
import { useEstate } from "@/lib/estate";

const QUICK = [
  { href: "/shop/herbal-tea", label: "Teas", glow: "#22c55e" },
  { href: "/shop/classics", label: "Classics", glow: "#f1be48" },
  { href: "/shop/collector", label: "Collector", glow: "#c26bff" },
  { href: "/shop/merch", label: "Merch", glow: "#ff3fbc" },
  { href: "/cards", label: "Cards", glow: "#b8ff3d" },
  { href: "/flip-three", label: "Flip", glow: "#38bdf8" },
];

export function EstateDashboard() {
  const { profile } = useEstate();
  const name = profile.estateName || "SHADOW";
  const rank = profile.onboarded ? (profile.membershipTier === "estate_born_plus" ? "Estate Born+" : "Street Seat") : "Founder Circle demo";
  const deck = profile.deckName || "Caesar's Hand";
  const archetype = profile.avatar?.title || "Conqueror / Strategist";

  return (
    <section className="px-4 py-10">
      <GoldFrame className="mx-auto max-w-6xl drip-edge">
        <div className="text-center">
          <p className="estate-serif text-2xl sm:text-4xl">DCBD Estate — Your Blood Seat</p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <Stat label="Estate Name" value={name} />
          <Stat label="Rank" value={rank} />
          <Stat label="Deck" value={deck} />
          <Stat label="Archetype" value={archetype} />
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-purple-neon/30 bg-black/50 p-4">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-purple-neon">Who did the AI find inside you?</p>
            <h3 className="mt-3 font-estate text-xl text-gold">{profile.avatar?.name || "Julius Caesar — Caesar's Hand"}</h3>
            <p className="mt-2 text-sm italic text-muted">“{profile.avatar?.quote || "I came, I saw, I flipped the table."}”</p>
            <Link href="/onboarding" className="mt-4 inline-block text-xs font-black uppercase tracking-[0.16em] text-pink-neon">
              Take the Personality Blood Test →
            </Link>
          </div>
          <div className="rounded-xl border border-gold/30 bg-black/50 p-4">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gold">Live Flip Table</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>✓ Table Flip</li>
              <li>✓ Legion Command</li>
              <li>✓ Hidden Ability</li>
            </ul>
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-purple-neon">Active flips: {profile.xp.earned || 0} this cycle</p>
          </div>
          <div className="rounded-xl border border-green-neon/30 bg-black/50 p-4">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-green-neon">Street Control</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>✓ Product access</li>
              <li>✓ Exclusive drops</li>
              <li>✓ Deck + XP loop</li>
            </ul>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-gold">Status: {profile.onboarded ? "Sealed" : "Enter the Estate"}</p>
          </div>
        </div>
        <div className="relative mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/60 p-4">
          <div className="absolute inset-y-0 left-4 flex items-center"><WaxSeal /></div>
          <div className="absolute inset-y-0 right-4 hidden items-center sm:flex"><WaxSeal /></div>
          <p className="text-center text-[0.65rem] font-black uppercase tracking-[0.22em] text-gold">Blood Log / Estate Feed</p>
          <p className="mt-3 text-center text-sm text-muted">
            {name} {profile.onboarded ? "just locked a Blood Seat." : "is watching the table. Take the test to seal your name."}
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <HoodSilhouette />
            <HoodSilhouette />
            <HoodSilhouette />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {QUICK.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-xl border bg-black/40 py-4 text-center text-[0.65rem] font-black uppercase tracking-[0.14em]" style={{ borderColor: item.glow, color: item.glow, boxShadow: `0 0 12px ${item.glow}55` }}>
              {item.label}
            </Link>
          ))}
        </div>
      </GoldFrame>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gold/25 bg-black/40 px-3 py-2">
      <p className="text-[0.6rem] font-black uppercase tracking-[0.18em] text-muted">{label}</p>
      <p className="mt-1 font-estate text-sm text-gold">{value}</p>
    </div>
  );
}
