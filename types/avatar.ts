import type { ArchetypeId } from "@/types/archetype";
import type { Uuid } from "@/types/common";

export const AVATAR_SLOT_COUNT = 20;

export type AvatarCosmeticSlot =
  | "hair"
  | "skin"
  | "clothing"
  | "accessories"
  | "colours"
  | "details";

export interface AvatarDefinition {
  id: Uuid;
  slot: number;
  name: string | null;
  artworkUrl: string | null;
  archetypeId: ArchetypeId | null;
}

export interface AvatarCosmeticOptions {
  hair: string | null;
  skin: string | null;
  clothing: string | null;
  accessories: string | null;
  colours: string | null;
  details: string | null;
}

export interface PlayerAvatar {
  id: Uuid;
  userId: Uuid;
  stockAvatarId: Uuid;
  archetypeId: ArchetypeId;
  cosmetics: AvatarCosmeticOptions;
}

export interface AvatarMatch {
  stockAvatarId: Uuid;
  archetypeId: ArchetypeId;
  distance: number;
}
