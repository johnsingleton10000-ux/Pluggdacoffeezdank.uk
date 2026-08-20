import { AccountSummary } from "@/components/account/AccountSummary";
import { AuthPanel } from "@/components/account/AuthPanel";
import { Panel } from "@/components/ui/Panel";
import { getAccountFoundation } from "@/lib/services/profile-service";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const account = await getAccountFoundation();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {account ? (
        <AccountSummary account={account} />
      ) : (
        <div className="space-y-4">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-gold">Account foundation</p>
            <h1 className="mt-3 font-display text-4xl uppercase leading-none sm:text-6xl">Player identity</h1>
            <p className="mt-4 max-w-2xl text-muted">
              A DCBD account will hold username, avatar, membership, XP ledger, archetype, deck, collection,
              forum profile, trades, Flip history and purchases. Those systems are not live yet.
            </p>
          </div>
          <AuthPanel />
          <Panel>
            <h2 className="font-display text-2xl uppercase">Reserved fields</h2>
            <ul className="mt-4 grid gap-2 text-sm text-muted sm:grid-cols-2">
              <li>Unique user ID</li>
              <li>Username and display name</li>
              <li>Avatar and cosmetics</li>
              <li>Membership tier</li>
              <li>XP current / earned / spent</li>
              <li>Archetype from Blood Test</li>
              <li>Active deck and collection</li>
              <li>Forum, trading, Flip and purchase history</li>
            </ul>
          </Panel>
        </div>
      )}
    </main>
  );
}
