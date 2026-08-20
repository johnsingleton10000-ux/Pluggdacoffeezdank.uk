import { cn } from "@/lib/cn";

interface RarityIndicatorProps {
  label: string;
  token:
    | "standard"
    | "uncommon"
    | "rare"
    | "epic"
    | "legendary"
    | "custom";
}

const rarityTokens = {
  standard: "border-rarity-standard text-rarity-standard",
  uncommon: "border-rarity-uncommon text-rarity-uncommon",
  rare: "border-rarity-rare text-rarity-rare",
  epic: "border-rarity-epic text-rarity-epic",
  legendary: "border-rarity-legendary text-rarity-legendary",
  custom: "border-secondary text-secondary",
};

export function RarityIndicator({ label, token }: RarityIndicatorProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border-2 bg-ink/40 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em]",
        rarityTokens[token],
      )}
    >
      {label}
    </span>
  );
}
