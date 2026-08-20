import type { ArchetypeId, DimensionScores } from "@/domains/blood-test/types";

export type StockAvatar = {
  id: string;
  slug: string;
  name: string | null;
  artworkUrl: string | null;
  isCoreStock: boolean;
  hybridFamily: ArchetypeId | null;
  bias: Partial<DimensionScores> | null;
  sortOrder: number;
};

export type CosmeticSlot =
  | "hair"
  | "skin"
  | "clothing"
  | "accessories"
  | "colours"
  | "details";

export type AvatarCustomization = Partial<Record<CosmeticSlot, string>>;

export type PlayerAvatar = {
  id: string;
  userId: string;
  avatarId: string;
  customization: AvatarCustomization;
  lockedArchetypeId: ArchetypeId | null;
  selectedAt: string;
  createdAt: string;
  updatedAt: string;
};
