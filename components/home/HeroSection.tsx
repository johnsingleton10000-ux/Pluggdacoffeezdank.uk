"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/lib/config/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-10 sm:pt-16">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{site.tagline} 🌿 {site.established}</p>
          <h1 className="graffiti-title mt-4 text-6xl sm:text-8xl lg:text-[7.2rem]">
            Da Cofeez<br />Dank DCBD
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Manchester grit. Dark luxury. Collectible cards. The Vault feeds the deck, the deck feeds Flip Three, Flip Three feeds the Estate.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/shop" variant="pink">Shop Now</ButtonLink>
            <ButtonLink href="/membership" variant="lime">Join The Family</ButtonLink>
          </div>
        </div>
        <div className="gold-frame drip relative min-h-[280px] overflow-hidden rounded-3xl p-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-neon">Enter the universe</p>
          <p className="estate-title mt-3 text-4xl">More than a checkout.</p>
          <p className="mt-4 text-muted">Every page is a piece of art. Every qualifying buy can draw a card. Every card can sit in a holster.</p>
          <div className="absolute -bottom-6 right-6 h-24 w-24 rounded-full bg-purple-neon/30 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
