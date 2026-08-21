import { EcosystemLoop } from "@/components/home/EcosystemLoop";
import { EstateDashboard } from "@/components/home/EstateDashboard";
import { Hero } from "@/components/home/Hero";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Panel } from "@/components/ui/Panel";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProductCarousel />
      <EstateDashboard />
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">The loop</p>
          <h2 className="display mt-3 text-5xl">Everything connects</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Shop feeds cards. Cards feed the deck. The deck feeds Flip Three. XP, membership and community keep the Estate alive.
          </p>
          <div className="mt-8">
            <EcosystemLoop />
          </div>
        </div>
      </section>
      <section className="px-4 pb-16">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-3">
          <Panel>
            <h3 className="display text-3xl">Shop</h3>
            <p className="mt-3 text-muted">Real catalogue. Server-quoted prices. Add to waistband.</p>
            <ButtonLink href="/shop" variant="pink" className="mt-5">Enter the Vault</ButtonLink>
          </Panel>
          <Panel>
            <h3 className="display text-3xl">Flip Three</h3>
            <p className="mt-3 text-muted">Three cards. Attack or defend. The crease is real.</p>
            <ButtonLink href="/flip-three" variant="purple" className="mt-5">Enter the warzone</ButtonLink>
          </Panel>
          <Panel>
            <h3 className="display text-3xl">Blood Test</h3>
            <p className="mt-3 text-muted">Three questions. One avatar. One starter deck.</p>
            <ButtonLink href="/onboarding" variant="green" className="mt-5">Lock your name</ButtonLink>
          </Panel>
        </div>
      </section>
    </main>
  );
}
