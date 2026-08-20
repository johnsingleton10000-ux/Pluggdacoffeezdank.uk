import type { MembershipTier } from "../types/dcbd";

export const BRAND = {
  name: "DCBD",
  strapline: "The connected player ecosystem",
  description:
    "A premium underground world connecting identity, community, collecting and play.",
} as const;

export const MEMBERSHIP_TIER_CONFIG: Record<
  MembershipTier,
  { label: string; priceInPence: number; priceLabel: string; description: string }
> = {
  FREE: {
    label: "Free",
    priceInPence: 0,
    priceLabel: "£0",
    description: "The starting point for every player.",
  },
  ESTATE: {
    label: "Estate",
    priceInPence: 599,
    priceLabel: "£5.99/month",
    description: "A configurable membership tier for the next stage.",
  },
  ELITE: {
    label: "Elite",
    priceInPence: 1299,
    priceLabel: "£12.99/month",
    description: "A configurable membership tier for committed players.",
  },
  FOUNDER: {
    label: "Founder",
    priceInPence: 2000,
    priceLabel: "£20/month",
    description: "A configurable membership tier for the founding circle.",
  },
};

export const NAVIGATION_ITEMS = [
  { label: "Home", href: "/foundation", enabled: true },
  { label: "Membership", href: "/membership", enabled: false },
  { label: "Blood Test", href: "/blood-test", enabled: false },
  { label: "My Avatar", href: "/avatar", enabled: false },
  { label: "My Deck", href: "/deck", enabled: false },
  { label: "Collection", href: "/collection", enabled: false },
  { label: "Flip", href: "/flip", enabled: false },
  { label: "Community", href: "/community", enabled: false },
  { label: "Trading", href: "/trading", enabled: false },
  { label: "Shop", href: "/shop", enabled: false },
  { label: "Account", href: "/account", enabled: false },
] as const;

export const XP_FOUNDATION_LABELS = {
  balance: "Current XP",
  earned: "XP earned",
  spent: "XP spent",
  history: "XP ledger",
} as const;
