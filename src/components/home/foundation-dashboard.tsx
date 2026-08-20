import { Badge, XpDisplay } from "@/components/ui/indicators";
import { Panel } from "@/components/ui/panel";

const dimensions = [
  { label: "Control", value: 46, colour: "bg-purple-300" },
  { label: "Attack", value: 34, colour: "bg-orange" },
  { label: "Defence", value: 20, colour: "bg-gold" },
] as const;

export function FoundationDashboard() {
  return (
    <Panel
      accent="purple"
      aria-label="Player foundation interface preview"
      className="grid gap-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-purple-200">
            Player identity
          </p>
          <h2 className="mt-1 font-display text-3xl uppercase text-white">
            Not connected
          </h2>
        </div>
        <Badge>Foundation</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <XpDisplay current={0} />
        <div className="rounded-md border-2 border-gold/50 bg-gold/10 px-4 py-3">
          <span className="block text-[0.65rem] font-black uppercase tracking-[0.18em] text-gold-soft">
            Membership
          </span>
          <strong className="mt-1 block font-display text-2xl text-white">
            Free
          </strong>
        </div>
      </div>

      <div className="rounded-md border border-line bg-ink p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-text-muted">
            Weighted strategy model
          </p>
          <Badge tone="purple">Example</Badge>
        </div>
        <div className="mt-4 grid gap-3">
          {dimensions.map((dimension) => (
            <div className="grid gap-1.5" key={dimension.label}>
              <div className="flex justify-between text-xs font-bold uppercase tracking-[0.1em]">
                <span>{dimension.label}</span>
                <span>{dimension.value}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-raised">
                <div
                  className={`h-full rounded-full ${dimension.colour}`}
                  style={{ width: `${dimension.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm leading-6 text-text-muted">
        No assessment, avatar, deck, or rewards have been generated. This
        surface demonstrates how those systems can share one player identity.
      </p>
    </Panel>
  );
}
