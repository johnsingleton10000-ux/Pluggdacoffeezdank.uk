import { EcosystemLoop } from "@/components/home/ecosystem-loop";
import { FoundationDashboard } from "@/components/home/foundation-dashboard";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/indicators";
import { Panel } from "@/components/ui/panel";
import {
  formatMembershipPrice,
  MEMBERSHIP_PLANS,
} from "@/config/memberships";

const foundationLayers = [
  {
    number: "01",
    title: "One player identity",
    copy: "Profile, membership, progression, collection, commerce, community, and play reference the same user.",
  },
  {
    number: "02",
    title: "Server authority",
    copy: "XP, membership, ownership, and rewards are designed to be validated and recorded on the server.",
  },
  {
    number: "03",
    title: "Replaceable services",
    copy: "Data, authentication, payment, and AI providers sit behind typed boundaries instead of UI code.",
  },
  {
    number: "04",
    title: "Versioned progression",
    copy: "Assessments, deck revisions, matches, ownership, and XP transactions keep traceable history.",
  },
] as const;

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b-2 border-line">
        <div
          aria-hidden="true"
          className="absolute -right-24 top-12 size-72 rotate-12 rounded-[2rem] border-[18px] border-purple-500/10 sm:size-96"
        />
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
          <div className="relative z-10">
            <Badge tone="orange">Technical foundation</Badge>
            <h1 className="mt-6 max-w-4xl font-display text-5xl uppercase leading-[0.92] tracking-[-0.055em] text-white sm:text-7xl lg:text-[5.8rem]">
              One identity.
              <span className="block text-purple-300">One ecosystem.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-muted sm:text-xl">
              A secure, mobile-first base for DCBD&apos;s player journey,
              progression, cards, community, commerce, and future competitive
              game.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#ecosystem">See the system</ButtonLink>
              <ButtonLink href="#foundation" variant="quiet">
                Foundation status
              </ButtonLink>
            </div>
          </div>
          <FoundationDashboard />
        </div>
      </section>

      <section
        className="border-b-2 border-line bg-surface/60 py-16 sm:py-20"
        id="ecosystem"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">
              The connected loop
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase tracking-[-0.04em] text-white sm:text-5xl">
              Built as one system
            </h2>
            <p className="mt-4 text-lg leading-8 text-text-muted">
              Each stage can be added independently without splitting DCBD into
              unrelated products or duplicating player data.
            </p>
          </div>
          <div className="mt-9">
            <EcosystemLoop />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" id="foundation">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-200">
                Architecture
              </p>
              <h2 className="mt-3 font-display text-4xl uppercase tracking-[-0.04em] text-white sm:text-5xl">
                Stable by design
              </h2>
            </div>
            <Badge tone="positive">Foundation ready</Badge>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {foundationLayers.map((layer, index) => (
              <Panel
                accent={index % 2 === 0 ? "purple" : "gold"}
                as="article"
                key={layer.number}
              >
                <span className="font-display text-sm text-text-subtle">
                  {layer.number}
                </span>
                <h3 className="mt-7 font-display text-2xl uppercase text-white">
                  {layer.title}
                </h3>
                <p className="mt-3 leading-7 text-text-muted">{layer.copy}</p>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y-2 border-line bg-surface/60 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-soft">
              Membership model
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase tracking-[-0.04em] text-white sm:text-5xl">
              Four tiers. No invented benefits.
            </h2>
            <p className="mt-4 text-lg leading-8 text-text-muted">
              Prices are central configuration. Benefits and permissions remain
              intentionally undefined until product rules are supplied.
            </p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.values(MEMBERSHIP_PLANS).map((plan) => (
              <Panel as="article" key={plan.tier}>
                <Badge tone={plan.tier === "FOUNDER" ? "gold" : "neutral"}>
                  {plan.tier}
                </Badge>
                <p className="mt-8 font-display text-3xl text-white">
                  {formatMembershipPrice(plan)}
                </p>
                <p className="mt-4 text-sm leading-6 text-text-muted">
                  Benefits awaiting product-owner specification.
                </p>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <Panel
            accent="orange"
            className="grid items-center gap-8 md:grid-cols-[1fr_auto]"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-soft">
                Scope held
              </p>
              <h2 className="mt-3 font-display text-3xl uppercase text-white sm:text-4xl">
                Ready for the next specified system
              </h2>
              <p className="mt-4 max-w-3xl leading-7 text-text-muted">
                No game rules, questionnaire, stock avatars, card statistics,
                shop catalogue, forum, trading flow, payment processing, or AI
                provider has been invented.
              </p>
            </div>
            <Badge tone="positive">Incremental build</Badge>
          </Panel>
        </div>
      </section>
    </main>
  );
}
