import { MEMBERSHIP_TIERS, formatMembershipPrice } from "@/config/membership";
import { Panel } from "@/components/ui/Panel";
import { Badge } from "@/components/ui/Badge";

export function MembershipTiers() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {MEMBERSHIP_TIERS.map((tier) => (
        <Panel key={tier.id}>
          <Badge tone={tier.id === "founder" ? "gold" : tier.id === "free" ? "muted" : "purple"}>
            {tier.name}
          </Badge>
          <p className="display mt-4 text-4xl">{formatMembershipPrice(tier)}</p>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            Benefits will be configured later. This tier is reserved in the account system.
          </p>
        </Panel>
      ))}
    </div>
  );
}
