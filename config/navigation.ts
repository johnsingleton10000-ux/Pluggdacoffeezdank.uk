import type { FeatureStatus } from "@/types/common";

export interface NavItem {
  href: string;
  label: string;
  status: FeatureStatus;
}

export const PRIMARY_NAV: NavItem[] = [
  { href: "/", label: "Home", status: "live" },
  { href: "/account", label: "Account", status: "live" },
  { href: "/membership", label: "Membership", status: "later" },
  { href: "/blood-test", label: "Blood Test", status: "later" },
  { href: "/avatar", label: "My Avatar", status: "later" },
  { href: "/deck", label: "My Deck", status: "later" },
  { href: "/collection", label: "Collection", status: "later" },
  { href: "/flip", label: "Flip", status: "later" },
  { href: "/community", label: "Community", status: "later" },
  { href: "/trading", label: "Trading", status: "later" },
  { href: "/shop", label: "Shop", status: "later" },
];

export const LIVE_NAV = PRIMARY_NAV.filter((item) => item.status === "live");
export const LATER_NAV = PRIMARY_NAV.filter((item) => item.status === "later");
