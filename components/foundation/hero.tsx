import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { Progress } from "@/components/ui/progress";
import { StatusIndicator } from "@/components/ui/status-indicator";

const profileSignals = [
  { label: "Control", value: 46, tone: "bg-purple-bright" },
  { label: "Attack", value: 34, tone: "bg-orange" },
  { label: "Defence", value: 20, tone: "bg-gold" },
] as const;

export function FoundationHero() {
  return (
    <section className="texture-grid relative overflow-hidden border-b-2 border-line">
      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-shell items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
        <div className="relative z-10">
          <Badge tone="orange">DCBD technical foundation</Badge>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.3rem,11vw,7.8rem)] uppercase leading-[0.79] tracking-[-0.035em] text-primary text-shadow-heavy">
            One player.
            <span className="block text-purple-soft">One ecosystem.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base font-medium leading-7 text-secondary sm:text-lg sm:leading-8">
            A connected foundation for identity, progression, cards, community,
            commerce and Flip—designed to grow one verified system at a time.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#blueprint">Explore the blueprint</ButtonLink>
            <ButtonLink href="#membership" variant="ghost">
              View membership tiers
            </ButtonLink>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-5">
            <StatusIndicator label="Mobile first" status="online" />
            <StatusIndicator label="Server authoritative" status="online" />
            <StatusIndicator label="Provider flexible" status="online" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-6 rotate-2 rounded-[2rem] border-2 border-purple-muted bg-purple-wash"
          />
          <Panel className="relative border-line-strong bg-surface/95 p-0 sm:p-0">
            <div className="flex items-center justify-between border-b-2 border-line px-5 py-4">
              <div>
                <p className="text-[0.64rem] font-black uppercase tracking-[0.2em] text-orange-soft">
                  Player signal
                </p>
                <h2 className="mt-1 font-display text-2xl uppercase text-primary">
                  Identity input
                </h2>
              </div>
              <Badge tone="purple">Weighted</Badge>
            </div>

            <div className="grid gap-5 p-5 sm:p-6">
              <div className="grid gap-3">
                {profileSignals.map((signal) => (
                  <div className="grid grid-cols-[5rem_1fr_2.5rem] items-center gap-3" key={signal.label}>
                    <span className="text-xs font-black uppercase tracking-[0.1em] text-secondary">
                      {signal.label}
                    </span>
                    <span className="h-3 overflow-hidden rounded-full border border-line bg-canvas">
                      <span
                        className={`block h-full ${signal.tone}`}
                        style={{ width: `${signal.value}%` }}
                      />
                    </span>
                    <span className="font-display text-lg text-primary">
                      {signal.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border-2 border-line bg-canvas p-4">
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-secondary">
                    Archetype
                  </p>
                  <p className="mt-2 font-display text-xl uppercase text-primary">
                    System assigned
                  </p>
                  <p className="mt-2 text-xs leading-5 text-secondary">
                    Derived from weighted results. Never changed by cosmetics.
                  </p>
                </div>
                <div className="rounded-xl border-2 border-line bg-canvas p-4">
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-secondary">
                    Starter deck
                  </p>
                  <p className="mt-2 font-display text-xl uppercase text-primary">
                    Profile matched
                  </p>
                  <p className="mt-2 text-xs leading-5 text-secondary">
                    Generated through a replaceable provider boundary.
                  </p>
                </div>
              </div>

              <Progress label="Foundation phase" max={4} value={1} />
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}
