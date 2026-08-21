import type { MembershipTierDefinition } from "@/types/membership";
import { SITE } from "@/config/site";

/**
 * Only Estate Born+ has a supplied public price (£8.99) and Stripe link.
 * Other tiers exist as entitlement slots. Do not invent missing prices.
 */
export const MEMBERSHIP_TIERS: readonly MembershipTierDefinition[] = [
  {
    id: "street",
    name: "Street Seat",
    priceMonthlyGbp: 0,
    stripeUrl: null,
    benefits: [
      { id: "browse", label: "Shop the Vault" },
      { id: "stash", label: "My Stash / Waistband" },
      { id: "blood", label: "Personality Blood Test" },
      { id: "read-board", label: "Read Estate Born boards" },
    ],
    permissions: [
      { id: "shop.browse", description: "View catalogue" },
      { id: "onboarding.run", description: "Complete blood test" },
    ],
  },
  {
    id: "estate_born_plus",
    name: "Estate Born+",
    priceMonthlyGbp: 8.99,
    stripeUrl: SITE.stripeMembershipUrl,
    benefits: [
      { id: "badge", label: "Estate Born+ member badge" },
      { id: "vote", label: "Private boards and voting" },
      { id: "drops", label: "Exclusive drops and card odds" },
      { id: "avatar", label: "Avatar customisation slots" },
      { id: "future", label: "Future membership rewards" },
    ],
    permissions: [
      { id: "community.vote", description: "Vote on boards" },
      { id: "avatar.customise", description: "Unlock cosmetic slots" },
      { id: "cards.odds", description: "Improved card odds" },
    ],
  },
  {
    id: "founder_circle",
    name: "Founder Circle",
    priceMonthlyGbp: null,
    stripeUrl: null,
    benefits: [
      { id: "blood-seat", label: "DCBD Estate Blood Seat" },
      { id: "full-access", label: "Street Control: full access" },
      { id: "deck-advanced", label: "Advanced deck functionality" },
    ],
    permissions: [
      { id: "estate.founder", description: "Founder entitlements when granted" },
    ],
  },
];
