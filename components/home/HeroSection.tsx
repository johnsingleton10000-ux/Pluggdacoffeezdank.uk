import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/lib/config/site";

export function HeroSection() {
  return (
    <section className="px-4 py-10 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2 lg:items-center">
        <div>
          <Badge tone="ember">Manchester grit × Amsterdam lounge</Badge>
          <h1 className="mt-5 font-display text-5xl uppercase leading-[0.9] sm:text-7xl">
            {site.legalName}
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
            One connected ecosystem: player identity, membership, XP, cards, community, trading and Flip.
            This release is the technical foundation, not the finished game.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#loop" size="lg">
              See the loop
            </ButtonLink>
            <ButtonLink href="/account" size="lg" variant="secondary">
              Account foundation
            </ButtonLink>
          </div>
        </div>
        <div className="relative min-h-[280px] overflow-hidden rounded-[var(--radius-panel)] border-3 border-ink bg-purple-deep shadow-stamp sm:min-h-[420px]">
          <img
            src="/assets/hero.svg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-ink/35" />
          <div className="relative flex h-full min-h-[280px] flex-col justify-end p-6 sm:min-h-[420px] sm:p-8">
            <p className="font-display text-sm uppercase tracking-[0.24em] text-gold">DCBD Universe</p>
            <h2 className="mt-2 font-display text-4xl uppercase leading-none sm:text-5xl">Premium underground ecosystem</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
