import { MembershipTiers } from "@/components/membership/MembershipTiers";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function MembershipPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">Join the family</p>
      <h1 className="display mt-3 text-6xl">DCBD membership is the key, not a checkout extra</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Entitlements are configurable. Only Estate Born+ has a supplied public price and live Stripe link. Founder Circle pricing stays with the membership backend until it is published.
      </p>
      <div className="mt-10">
        <MembershipTiers />
      </div>
      <ButtonLink href="/onboarding" variant="pink" className="mt-10">Take the Blood Test</ButtonLink>
    </main>
  );
}
