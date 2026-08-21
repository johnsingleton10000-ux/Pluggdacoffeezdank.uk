"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SITE } from "@/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-12 sm:pt-16">
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 20% 40%, rgba(255,63,188,.18), transparent 30%), radial-gradient(circle at 80% 30%, rgba(184,255,61,.12), transparent 28%)" }} />
      <div className="relative mx-auto max-w-6xl text-center">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-gold">
          {SITE.tagline} 🌿 {SITE.established}
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="graffiti mt-5 text-6xl sm:text-8xl lg:text-9xl"
        >
          Da Cofeez Dank DCBD
        </motion.h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          Manchester grit. Underground culture. Collectible cards. Flip Three. One account connecting shop, membership, AI, decks and the Estate.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/shop" variant="pink" className="min-w-52">
            Shop now
          </ButtonLink>
          <ButtonLink href="/membership" variant="green" className="min-w-52">
            Join the family
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
