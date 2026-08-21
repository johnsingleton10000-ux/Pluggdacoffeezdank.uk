"use client";

import { MEMBERSHIP_TIERS } from "@/lib/config/membership";
import { money } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { usePlayer } from "@/lib/state/player";
import { Button } from "@/components/ui/Button";

export default function MembershipPage() {
  const { state, markMember } = usePlayer();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">Join the family</p>
      <h1 className="estate-title mt-2 text-5xl sm:text-7xl">DCBD Membership</h1>
      <p className="mt-4 max-w-2xl text-muted">Membership is an entitlement layer, not a generic subscription page. Live price is the Estate Born+ catalogue entry. Extra tiers can be added later without inventing numbers.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {MEMBERSHIP_TIERS.map((tier) => (
          <article key={tier.id} className="gold-frame rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-purple-neon">{tier.rankLabel}</p>
            <h2 className="display mt-2 text-4xl">{tier.name}</h2>
            <p className="mt-3 text-4xl text-gold">{tier.priceGbp === 0 ? "£0" : `${money(tier.priceGbp || 0)}/${tier.cadence}`}</p>
            <ul className="mt-5 space-y-2 text-sm text-muted">
              {tier.entitlements.map((item) => <li key={item}>✓ {item}</li>)}
            </ul>
            {tier.stripeUrl ? (
              <ButtonLink href={tier.stripeUrl} variant="pink" className="mt-6">Join with Stripe</ButtonLink>
            ) : (
              <p className="mt-6 text-sm text-muted">Guest access. Take the Blood Test to lock a starter deck.</p>
            )}
          </article>
        ))}
      </div>
      <div className="gold-frame mt-8 rounded-2xl p-5">
        <p className="text-sm text-muted">Current local rank: {state.membershipTier}. Stripe remains the payment source of truth. Marking local access does not replace Stripe.</p>
        {state.membershipTier === "free" ? <Button className="mt-4" variant="ghost" onClick={markMember}>I completed Stripe — unlock local Founder Circle</Button> : <p className="mt-3 text-lime">Founder Circle flags are on for this device.</p>}
      </div>
    </main>
  );
}
