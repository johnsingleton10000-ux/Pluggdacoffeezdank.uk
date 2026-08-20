import { AccountIdentityForm } from "@/components/account/AccountIdentityForm";
import { AuthForm } from "@/components/account/AuthForm";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Panel } from "@/components/ui/Panel";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { XpDisplay } from "@/components/ui/XpDisplay";
import { getMembershipTier, formatMembershipPrice } from "@/config/membership";
import { authIsConfigured, getCurrentAccount, getCurrentUser } from "@/services/auth";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  if (!authIsConfigured()) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <EmptyState
          title="Account not configured"
          body="Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then apply supabase/migrations/0001_foundation.sql."
        />
      </main>
    );
  }

  const user = await getCurrentUser();
  const account = await getCurrentAccount();

  return (
    <main className="mx-auto grid max-w-5xl gap-6 px-4 py-12">
      <div>
        <Badge>Account foundation</Badge>
        <h1 className="display mt-4 text-5xl sm:text-7xl">Player account</h1>
        <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
          Identity lives here. XP, membership, avatar, deck and collection attach later without rebuilding this page.
        </p>
      </div>

      {!user ? (
        <Panel>
          <h2 className="display text-3xl">Sign in</h2>
          <p className="mt-2 mb-6 text-[var(--color-text-muted)]">
            Email authentication is provided by Supabase. Game values are never taken from the browser.
          </p>
          <AuthForm />
        </Panel>
      ) : !account ? (
        <EmptyState
          title="Profile missing"
          body="The auth user exists, but no profile row was found. Apply the foundation migration so new accounts create a profile automatically."
        />
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel>
              <h2 className="display text-3xl">Identity</h2>
              <dl className="mt-5 grid gap-3 text-sm">
                <Row label="User ID" value={account.id} />
                <Row label="Email" value={account.email ?? "—"} />
                <Row label="Archetype" value={account.archetypeId ?? "Not assigned"} />
                <Row label="Avatar" value={account.avatarId ?? "Not assigned"} />
                <Row label="Starter deck" value={account.starterDeckId ?? "Not assigned"} />
              </dl>
              <div className="mt-6">
                <AccountIdentityForm account={account} />
              </div>
            </Panel>
            <Panel>
              <div className="flex items-center justify-between gap-3">
                <h2 className="display text-3xl">Membership</h2>
                <Badge tone="purple">{getMembershipTier(account.membershipTier).name}</Badge>
              </div>
              <p className="mt-3 text-[var(--color-text-muted)]">
                {formatMembershipPrice(getMembershipTier(account.membershipTier))}
              </p>
              <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                Membership status is stored on the server. Clients cannot grant a paid tier.
              </p>
              <div className="mt-8">
                <h3 className="display text-3xl">XP ledger</h3>
                <div className="mt-4">
                  <XpDisplay xp={account.xp} />
                </div>
                <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                  Current, earned and spent are derived from server-side transactions.
                </p>
              </div>
            </Panel>
          </div>
          <Panel>
            <h2 className="display text-3xl">Connected systems</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              <LaterRow label="Collection" />
              <LaterRow label="Forum profile" />
              <LaterRow label="Trading history" />
              <LaterRow label="Flip history" />
              <LaterRow label="Purchase history" />
              <LaterRow label="Blood Test" />
            </ul>
          </Panel>
        </>
      )}
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-[var(--color-line)] pb-3 sm:flex-row sm:items-center sm:justify-between">
      <dt className="font-bold uppercase tracking-wide text-[var(--color-text-muted)]">{label}</dt>
      <dd className="break-all font-mono text-sm">{value}</dd>
    </div>
  );
}

function LaterRow({ label }: { label: string }) {
  return (
    <li className="flex min-h-12 items-center justify-between rounded-[var(--radius-control)] border-2 border-[var(--color-line)] px-4">
      <span className="font-bold uppercase">{label}</span>
      <StatusIndicator tone="later" label="Later" />
    </li>
  );
}
