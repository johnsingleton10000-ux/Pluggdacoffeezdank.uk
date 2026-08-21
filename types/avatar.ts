import type { ArchetypeId } from "@/types/archetype";
export const AVATAR_SLOT_COUNT = 20;

export type AvatarCosmeticSlot =
  | "hair"
  | "skin"
  | "clothing"
  | "tattoos"
  | "accessories"
  | "details";

export interface AvatarDefinition {
  id: string;
  slot: number;
  name: string;
  title: string;
  quote: string;
  glow: string;
  silhouette: "caesar" | "boss" | "queen" | "hood" | "obelisk" | "fortress" | "monk" | "lion";
  archetypeId: ArchetypeId;
  personality: string;
}

export interface AvatarCosmeticOptions {
  hair: string | null;
  skin: string | null;
  clothing: string | null;
  tattoos: string | null;
  accessories: string | null;
  details: string | null;
}

export interface PlayerAvatar {
  stockAvatarId: string;
  archetypeId: ArchetypeId;
  cosmetics: AvatarCosmeticOptions;
}
