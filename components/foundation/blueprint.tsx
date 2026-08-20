import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/panel";

const principles = [
  {
    number: "01",
    title: "One identity graph",
    description:
      "Profiles reference membership, archetype, avatar, deck and activity without duplicating ownership data.",
    tags: ["Typed IDs", "Relationships", "Audit timestamps"],
  },
  {
    number: "02",
    title: "Ledger progression",
    description:
      "XP is calculated from immutable credit and debit transactions, with source references for every change.",
    tags: ["Traceable", "Server writes", "Reversible"],
  },
  {
    number: "03",
    title: "Secure boundaries",
    description:
      "Authorization, repositories and service contracts prevent visual components from deciding trusted state.",
    tags: ["RLS ready", "Least privilege", "No client authority"],
  },
  {
    number: "04",
    title: "Replaceable intelligence",
    description:
      "Blood Test evaluation, avatar matching and identity generation sit behind provider-neutral interfaces.",
    tags: ["No vendor lock-in", "Versioned results", "Testable"],
  },
] as const;

const buildPhases = [
  {
    name: "Foundation",
    status: "Ready",
    description: "App shell, design tokens, domain contracts and security plan.",
  },
  {
    name: "Player identity",
    status: "Next",
    description: "Authentication, profile persistence and onboarding.",
  },
  {
    name: "Connected systems",
    status: "Later",
    description: "Cards, commerce, community, trading and Flip—one at a time.",
  },
] as const;

export function Blueprint() {
  return (
    <section className="texture-noise py-16 sm:py-24" id="blueprint">
      <div className="mx-auto max-w-shell px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow">Technical blueprint</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-[0.9] text-primary sm:text-6xl">
            Built to expand without rebuilding
          </h2>
          <p className="mt-5 text-base leading-7 text-secondary">
            The foundation defines ownership and integration points now, while
            deliberately leaving unspecified rewards, game rules and benefits
            out of production logic.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {principles.map((principle) => (
            <Panel className="group min-h-64" key={principle.number}>
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-5xl text-purple-soft">
                  {principle.number}
                </span>
                <span
                  aria-hidden="true"
                  className="text-2xl text-gold transition-transform group-hover:rotate-45"
                >
                  ◆
                </span>
              </div>
              <h3 className="mt-7 font-display text-2xl uppercase text-primary sm:text-3xl">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-secondary">
                {principle.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {principle.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </Panel>
          ))}
        </div>

        <div className="mt-12 border-t-2 border-line pt-10">
          <p className="eyebrow">Controlled rollout</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {buildPhases.map((phase, index) => (
              <div
                className="rounded-2xl border-2 border-line bg-canvas p-5"
                key={phase.name}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-2xl text-primary">
                    0{index + 1}
                  </span>
                  <Badge
                    tone={
                      phase.status === "Ready"
                        ? "success"
                        : phase.status === "Next"
                          ? "gold"
                          : "neutral"
                    }
                  >
                    {phase.status}
                  </Badge>
                </div>
                <h3 className="mt-8 font-display text-2xl uppercase text-primary">
                  {phase.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-secondary">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
