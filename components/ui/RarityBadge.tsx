import { cn } from "@/lib/utils";
import { RARITY_GLOW, type Rarity } from "@/lib/data/cards";

export function RarityBadge({ rarity }: { rarity: Rarity }) {
  return (
    <span
      className={cn("rounded-full px-2 py-1 text-[0.65rem] font-black uppercase tracking-widest")}
      style={{ color: RARITY_GLOW[rarity], border: `1px solid ${RARITY_GLOW[rarity]}` }}
    >
      {rarity}
    </span>
  );
}
