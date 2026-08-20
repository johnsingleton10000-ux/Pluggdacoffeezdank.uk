import { features } from "@/lib/config/features";

export type NavStatus = "live" | "later";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  status: NavStatus;
  description: string;
};

export const primaryNav: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    status: features.home ? "live" : "later",
    description: "DCBD ecosystem home",
  },
  {
    id: "account",
    label: "Account",
    href: "/account",
    status: features.account ? "live" : "later",
    description: "Player identity foundation",
  },
];

export const futureNav: NavItem[] = [
  {
    id: "membership",
    label: "Membership",
    href: "/membership",
    status: "later",
    description: "Four-tier membership will be configured later",
  },
  {
    id: "blood-test",
    label: "Blood Test",
    href: "/blood-test",
    status: "later",
    description: "Onboarding personality and strategy assessment",
  },
  {
    id: "avatar",
    label: "My Avatar",
    href: "/avatar",
    status: "later",
    description: "System-selected stock avatar and permitted cosmetics",
  },
  {
    id: "deck",
    label: "My Deck",
    href: "/deck",
    status: "later",
    description: "Starter deck generated from Blood Test results",
  },
  {
    id: "collection",
    label: "Collection",
    href: "/collection",
    status: "later",
    description: "Owned cards and collection status",
  },
  {
    id: "flip",
    label: "Flip",
    href: "/flip",
    status: "later",
    description: "DCBD competitive card game",
  },
  {
    id: "community",
    label: "Community",
    href: "/community",
    status: "later",
    description: "Forum connected to XP, reputation and trading",
  },
  {
    id: "trading",
    label: "Trading",
    href: "/trading",
    status: "later",
    description: "Player-to-player eligible card trades",
  },
  {
    id: "shop",
    label: "Shop",
    href: "/shop",
    status: "later",
    description: "Ecommerce connected to XP, cards and membership",
  },
];

export const allNavItems: NavItem[] = [...primaryNav, ...futureNav];

export function isNavLive(item: NavItem): boolean {
  return item.status === "live";
}
