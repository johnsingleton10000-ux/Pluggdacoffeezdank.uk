"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { DcbdCard } from "@/lib/data/cards";
import { RarityBadge } from "@/components/ui/RarityBadge";

export function CollectibleCard({ card, owned, dim }: { card: DcbdCard; owned?: boolean; dim?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? false : { y: 12, opacity: 0 }}
      whileInView={reduce ? undefined : { y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className={cn("neon-card relative overflow-hidden rounded-2xl p-4 min-h-[220px] flex flex-col justify-between", dim && !owned && "opacity-45")}
      style={{ ["--glow" as string]: card.glow }}
    >
      <div className="flex items-start justify-between gap-2">
        <RarityBadge rarity={card.rarity} />
        <span className="text-[0.65rem] uppercase tracking-widest text-muted">{card.set}</span>
      </div>
      <div>
        <p className="display text-2xl">{card.name}</p>
        <p className="mt-1 text-sm text-muted">{card.ability}</p>
      </div>
      <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
        <span>ATK {card.attack}</span>
        <span>DEF {card.defence}</span>
      </div>
    </motion.article>
  );
}
