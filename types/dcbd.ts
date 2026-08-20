export const MEMBERSHIP_TIERS = ["FREE", "ESTATE", "ELITE", "FOUNDER"] as const;
export type MembershipTier = (typeof MEMBERSHIP_TIERS)[number];

export const ARCHETYPE_DIMENSIONS = ["CONTROL", "ATTACK", "DEFENCE"] as const;
export type ArchetypeDimension = (typeof ARCHETYPE_DIMENSIONS)[number];

export const ARCHETYPE_CODES = [
  "CONTROL",
  "ATTACK",
  "DEFENCE",
  "CONTROL_ATTACK",
  "CONTROL_DEFENCE",
  "ATTACK_DEFENCE",
  "BALANCED",
] as const;
export type ArchetypeCode = (typeof ARCHETYPE_CODES)[number];

export type ArchetypeScores = Record<ArchetypeDimension, number>;

export type CardRarity = string;
export type CardCategory = string;
export type CardSource = string;
export type TradeStatus = "LOCKED" | "ELIGIBLE" | "LISTED" | "IN_TRADE";

export interface UserAccount {
  id: string;
  username: string | null;
  displayName: string | null;
  createdAt: string;
}

export interface UserProfile extends UserAccount {
  avatarId: string | null;
  membershipTier: MembershipTier;
  xpBalance: number;
  archetype: ArchetypeCode | null;
  forumProfileId: string | null;
}

export interface Membership {
  id: string;
  userId: string;
  tier: MembershipTier;
  priceInPence: number;
  status: "ACTIVE" | "CANCELLED" | "PAST_DUE" | "INCOMPLETE";
  providerCustomerId: string | null;
  providerSubscriptionId: string | null;
  currentPeriodEnd: string | null;
}

export interface XpTransaction {
  id: string;
  userId: string;
  amount: number;
  balanceAfter: number;
  source: string;
  referenceId: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface BloodTestResult {
  id: string;
  userId: string;
  scores: ArchetypeScores;
  primaryArchetype: ArchetypeCode | null;
  completedAt: string | null;
  version: number;
}

export interface Avatar {
  id: string;
  name: string;
  archetype: ArchetypeCode;
  artworkUrl: string | null;
  isCoreAvatar: boolean;
  customizationSchema: Record<string, unknown>;
}

export interface AvatarCustomization {
  hair?: string;
  skinTone?: string;
  clothing?: string;
  accessories?: string[];
  colors?: string[];
  cosmetics?: Record<string, string>;
}

export interface PlayerAvatar {
  id: string;
  userId: string;
  avatarId: string;
  customization: AvatarCustomization;
}

export interface Deck {
  id: string;
  userId: string;
  name: string | null;
  personality: string | null;
  archetype: ArchetypeCode | null;
  version: number;
  isStarterDeck: boolean;
  createdAt: string;
}

export interface Card {
  id: string;
  name: string;
  artworkUrl: string | null;
  rarity: CardRarity | null;
  category: CardCategory | null;
  attack: number | null;
  defence: number | null;
  control: number | null;
  abilities: Record<string, unknown>[];
  source: CardSource | null;
}

export interface CardOwnership {
  id: string;
  cardId: string;
  ownerId: string;
  collectionStatus: "COLLECTED" | "IN_DECK" | "ARCHIVED";
  tradeStatus: TradeStatus;
  acquiredFrom: string | null;
  acquiredAt: string;
}

export interface Order {
  id: string;
  userId: string | null;
  providerOrderId: string | null;
  status: "PENDING" | "PAID" | "FULFILLED" | "CANCELLED" | "REFUNDED";
  totalInPence: number | null;
  createdAt: string;
}

export interface OrderReward {
  id: string;
  orderId: string;
  userId: string;
  rewardType: string;
  rewardReferenceId: string | null;
  grantedAt: string | null;
}

export interface ForumPost {
  id: string;
  authorId: string;
  title: string;
  body: string;
  createdAt: string;
}

export interface ForumComment {
  id: string;
  postId: string;
  authorId: string;
  body: string;
  createdAt: string;
}

export interface Trade {
  id: string;
  initiatorId: string;
  recipientId: string;
  status: "DRAFT" | "PROPOSED" | "ACCEPTED" | "DECLINED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
  completedAt: string | null;
}

export interface FlipMatch {
  id: string;
  playerOneId: string;
  playerTwoId: string | null;
  playerOneDeckId: string | null;
  playerTwoDeckId: string | null;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  winnerId: string | null;
  createdAt: string;
  completedAt: string | null;
}
