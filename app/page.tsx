import { ArtworkWall } from "@/components/home/ArtworkWall";
import { EcosystemLoop } from "@/components/home/EcosystemLoop";
import { MembershipTiers } from "@/components/home/MembershipTiers";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Panel } from "@/components/ui/Panel";
import { SITE } from "@/config/site";

export default function HomePage() {
  return (
    <main className="grit">
      <section className="px-4 py-12 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge tone="orange">{SITE.tagline}</Badge>
            <h1 className="display mt-5 text-6xl sm:text-8xl">{SITE.name}</h1>
            <p className="mt-5 max-w-xl text-lg text-[var(--color-text-muted)] sm:text-xl">
              {SITE.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/account" size="lg">
                Open account
              </ButtonLink>
              <ButtonLink href="#loop" variant="ghost" size="lg">
                See the loop
              </ButtonLink>
            </div>
          </div>
          <Panel className="min-h-72 bg-[var(--color-purple-deep)]/40">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
              Foundation
            </p>
            <h2 className="display mt-4 text-5xl">One ecosystem</h2>
            <p className="mt-4 text-[var(--color-text-muted)]">
              Shop, membership, collection, community and Flip will share the same player identity.
              This stage establishes the architecture, not the finished systems.
            </p>
          </Panel>
        </div>
      </section>

      <section id="loop" className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">Core loop</p>
          <h2 className="display mt-3 text-4xl sm:text-6xl">Back into the ecosystem</h2>
          <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
            Each later system plugs into this loop. Nothing here is a placeholder game, shop or forum.
          </p>
          <div className="mt-8">
            <EcosystemLoop />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">Membership</p>
          <h2 className="display mt-3 text-4xl sm:text-6xl">Four tiers</h2>
          <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
            Prices are locked to the current product specification. Benefits are not invented here.
          </p>
          <div className="mt-8">
            <MembershipTiers />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">Visual identity</p>
          <h2 className="display mt-3 text-4xl sm:text-6xl">Existing card art</h2>
          <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
            Artwork already in the repository is preserved and reused. Final card mechanics come later.
          </p>
          <div className="mt-8">
            <ArtworkWall />
          </div>
        </div>
      </section>
    </main>
  );
}
