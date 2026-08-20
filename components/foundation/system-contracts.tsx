import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";
import { Progress } from "@/components/ui/progress";
import { RarityIndicator } from "@/components/ui/rarity-indicator";

const protectedState = [
  "Membership status",
  "XP balance",
  "Card ownership",
  "Order rewards",
] as const;

export function SystemContracts() {
  return (
    <section className="bg-surface-subtle py-16 sm:py-20">
      <div className="mx-auto grid max-w-shell gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Panel tone="purple">
          <Badge tone="purple">Progression contract</Badge>
          <h2 className="mt-5 font-display text-3xl uppercase text-primary sm:text-4xl">
            XP has a paper trail
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-secondary">
            Every credit and debit records its source, reason, actor and time.
            The displayed balance is a derived summary—not a client-controlled
            number.
          </p>
          <div className="mt-8 rounded-xl border-2 border-line bg-canvas p-4">
            <Progress label="Example ledger balance" max={2500} value={860} />
            <p className="mt-3 text-xs leading-5 text-secondary">
              Display only. No reward values have been configured.
            </p>
          </div>
        </Panel>

        <Panel tone="gold">
          <Badge tone="gold">Authority boundary</Badge>
          <h2 className="mt-5 font-display text-3xl uppercase text-primary sm:text-4xl">
            Trusted state stays server-side
          </h2>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {protectedState.map((item) => (
              <li
                className="flex min-h-14 items-center gap-3 rounded-xl border-2 border-line bg-canvas px-4 text-sm font-black uppercase tracking-[0.07em] text-primary"
                key={item}
              >
                <span aria-hidden="true" className="text-success">
                  ●
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Panel>

        <div className="rounded-2xl border-2 border-line bg-canvas p-5 lg:col-span-2">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">Semantic rarity tokens</p>
              <p className="mt-2 text-sm text-secondary">
                Labels and probabilities remain configurable domain data.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <RarityIndicator label="Standard" token="standard" />
              <RarityIndicator label="Uncommon" token="uncommon" />
              <RarityIndicator label="Rare" token="rare" />
              <RarityIndicator label="Epic" token="epic" />
              <RarityIndicator label="Legendary" token="legendary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
