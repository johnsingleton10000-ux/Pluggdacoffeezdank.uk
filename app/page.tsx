import Image from "next/image";
import { EstatePlaque } from "@/components/home/EstatePlaque";
import { HeroSection } from "@/components/home/HeroSection";
import { VaultCarousel } from "@/components/home/VaultCarousel";
import { VaultStrip } from "@/components/home/VaultStrip";
import { WhatsAppBanner } from "@/components/home/WhatsAppBanner";
import { PRODUCT_ART_CARDS } from "@/lib/data/cards";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <VaultCarousel />
      <EstatePlaque />
      <VaultStrip />
      <section className="px-4 pb-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">The loop</p>
          <h2 className="display mt-2 text-4xl sm:text-6xl">Shop → Card → Deck → Flip → Return</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ["Vault", "Physical products from the live catalogue.", "/shop"],
              ["Blood Test", "AI reads your energy. Starter deck assigned.", "/onboarding"],
              ["Collection", "Rookie cards, universe cards, holster status.", "/cards"],
              ["Flip Three", "Manchester Warzone. Outthink. Outflick. Win.", "/flip"],
            ].map(([title, copy, href]) => (
              <a key={title} href={href} className="gold-frame rounded-2xl p-5">
                <h3 className="estate-title text-2xl">{title}</h3>
                <p className="mt-2 text-sm text-muted">{copy}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">Committed artwork</p>
              <h2 className="display mt-2 text-4xl">Card wall</h2>
            </div>
            <ButtonLink href="/cards" variant="ghost">Open Cards</ButtonLink>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCT_ART_CARDS.map((card) => (
              <article key={card.id} className="relative h-80 overflow-hidden rounded-3xl border border-white/10">
                <Image src={card.image} alt={`${card.name} artwork`} fill className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black p-5">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-ember">{card.label}</p>
                  <h3 className="display mt-1 text-2xl">{card.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <WhatsAppBanner />
    </main>
  );
}
