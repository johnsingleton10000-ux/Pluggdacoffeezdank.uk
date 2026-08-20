import { AVATAR_SLOT_COUNT, type AvatarDefinition } from "@/types/avatar";

/**
 * Exactly 20 stock avatar slots. Names, artwork and family assignment
 * will be supplied separately. Do not invent characters here.
 */
export const AVATAR_POOL: readonly AvatarDefinition[] = Array.from(
  { length: AVATAR_SLOT_COUNT },
  (_, index) => ({
    id: `avatar-slot-${String(index + 1).padStart(2, "0")}`,
    slot: index + 1,
    name: null,
    artworkUrl: null,
    archetypeId: null,
  }),
);
