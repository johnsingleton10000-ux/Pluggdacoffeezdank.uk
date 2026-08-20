import { MEMBERSHIP_TIERS } from "@/domains/membership";
import { formatGbp } from "@/lib/utils/format";
import { Panel } from "@/components/ui/Panel";

export function MembershipPreview() {
  return (
    <section id="membership" className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-sm uppercase tracking-[0.2em] text-gold">Membership architecture</p>
        <h2 className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">Four tiers</h2>
        <p className="mt-4 max-w-2xl text-muted">
          Prices are locked to the current product spec. Benefits and permissions stay empty until they are specified.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MEMBERSHIP_TIERS.map((tier) => (
            <Panel key={tier.id}>
              <p className="font-display text-sm uppercase tracking-[0.18em] text-ember">{tier.label}</p>
              <p className="mt-3 font-display text-3xl uppercase">
                {tier.priceGbpMonthly === 0 ? "£0" : `${formatGbp(tier.priceGbpMonthly)}/mo`}
              </p>
              <p className="mt-4 text-sm text-muted">Benefits not configured yet.</p>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
