"use client";

import { motion } from "framer-motion";
import { RarityBadge } from "@/components/ui/RarityBadge";
import type { CardDefinition } from "@/types/card";

export function CollectibleCard({ card, owned }: { card: CardDefinition; owned?: boolean }) {
  return (
    <motion.article
      whileHover={{ rotateY: 8, y: -6 }}
      className="relative min-h-[280px] overflow-hidden rounded-2xl border bg-black p-4"
      style={{ borderColor: card.glow, boxShadow: `0 0 22px ${card.glow}55` }}
    >
      <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle at 50% 20%, ${card.glow}, transparent 55%)` }} />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <RarityBadge rarity={card.rarity} />
          <span className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-muted">{card.set}</span>
        </div>
        <h3 className="font-display text-3xl uppercase leading-none">{card.name}</h3>
        <p className="text-sm text-muted">{card.flavour}</p>
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.14em]">
          <span className="text-pink-neon">ATK {card.attack ?? "—"}</span>
          <span className="text-green-neon">DEF {card.defence ?? "—"}</span>
          <span className="text-gold">{owned ? "Owned" : "Locked"}</span>
        </div>
      </div>
    </motion.article>
  );
}
