import { membershipTiers, formatMembershipPrice } from "@/config/memberships";
import { Badge } from "@/components/ui/badge";

export function MembershipPreview() {
  return (
    <section
      aria-labelledby="membership-title"
      className="border-y-2 border-line bg-ink py-16 sm:py-20"
      id="membership"
    >
      <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow">Membership foundation</p>
            <h2
              className="mt-3 font-display text-4xl uppercase leading-[0.9] text-primary sm:text-6xl"
              id="membership-title"
            >
              Four tiers.
              <span className="block text-gold-soft">Benefits to follow.</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-secondary lg:justify-self-end lg:text-right">
            Pricing is configured centrally. Access, XP, card, commerce,
            community and Flip capabilities remain intentionally unset until
            product rules are approved.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {membershipTiers.map((tier, index) => (
            <article
              className="relative overflow-hidden rounded-2xl border-2 border-line-strong bg-surface p-5 shadow-panel"
              key={tier.id}
            >
              <div
                aria-hidden="true"
                className="absolute -right-4 -top-4 font-display text-8xl text-surface-overlay"
              >
                {index + 1}
              </div>
              <div className="relative">
                <Badge tone={tier.id === "founder" ? "gold" : "purple"}>
                  Tier {index + 1}
                </Badge>
                <h3 className="mt-8 font-display text-3xl uppercase text-primary">
                  {tier.name}
                </h3>
                <p className="mt-2 font-display text-4xl text-gold-soft">
                  {formatMembershipPrice(tier)}
                  {tier.monthlyPricePence > 0 ? (
                    <span className="ml-1 font-sans text-xs font-black uppercase tracking-[0.1em] text-secondary">
                      / month
                    </span>
                  ) : null}
                </p>
                <p className="mt-7 border-t border-line pt-4 text-xs font-bold uppercase tracking-[0.11em] text-secondary">
                  Capabilities not yet configured
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
