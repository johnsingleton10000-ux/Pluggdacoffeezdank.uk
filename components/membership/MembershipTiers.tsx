import { ButtonLink } from "@/components/ui/ButtonLink";
import { formatMembershipPrice, listMembershipTiers } from "@/services/membership";

export function MembershipTiers() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {listMembershipTiers().map((tier) => (
        <article key={tier.id} className="gold-frame rounded-2xl bg-black/70 p-6">
          <p className="estate-serif text-xl">{tier.name}</p>
          <p className="mt-3 font-display text-4xl text-gold">{formatMembershipPrice(tier)}</p>
          <ul className="mt-5 space-y-2 text-sm text-muted">
            {tier.benefits.map((benefit) => (
              <li key={benefit.id}>✓ {benefit.label}</li>
            ))}
          </ul>
          {tier.stripeUrl ? (
            <ButtonLink href={tier.stripeUrl} external variant="gold" className="mt-6 w-full">
              Join with Stripe
            </ButtonLink>
          ) : (
            <ButtonLink href="/onboarding" variant="ghost" className="mt-6 w-full">
              {tier.id === "street" ? "Start free" : "Ask the Plugz"}
            </ButtonLink>
          )}
        </article>
      ))}
    </div>
  );
}
