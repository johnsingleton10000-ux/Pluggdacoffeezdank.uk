import { Badge } from "@/components/ui/Badge";
import { Panel } from "@/components/ui/Panel";
import { XpDisplay } from "@/components/ui/XpDisplay";
import { SignOutButton } from "@/components/account/SignOutButton";
import type { AccountFoundation } from "@/lib/types/profile";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border-3 border-line bg-ink p-4">
      <p className="font-display text-xs uppercase tracking-[0.16em] text-gold">{label}</p>
      <p className="mt-2 break-all text-cream">{value}</p>
    </div>
  );
}

export function AccountSummary({ account }: { account: AccountFoundation }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge tone="gold">Signed in</Badge>
          <h1 className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">Player account</h1>
        </div>
        <SignOutButton />
      </div>
      <p className="text-muted">
        These values come from the server account record. XP, membership and ownership are never taken from the browser.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="User ID" value={account.userId} />
        <Field label="Username" value={account.username ?? "Not set"} />
        <Field label="Display name" value={account.displayName ?? "Not set"} />
        <Field label="Membership tier" value={account.membershipTier} />
        <Field label="Archetype" value={account.archetypeId ?? "Not assigned"} />
        <Field label="Active deck" value={account.activeDeckId ?? "None"} />
        <Field label="Avatar" value={account.avatarId ?? "Not assigned"} />
        <Field label="Collection" value={String(account.collectionCount)} />
        <Field label="Trades" value={String(account.tradingHistoryCount)} />
        <Field label="Flip matches" value={String(account.flipHistoryCount)} />
        <Field label="Purchases" value={String(account.purchaseHistoryCount)} />
        <Field label="Forum profile" value={account.forumProfileId ?? "None"} />
      </div>
      <XpDisplay currentXp={account.xp.currentXp} earnedXp={account.xp.earnedXp} spentXp={account.xp.spentXp} />
    </div>
  );
}
