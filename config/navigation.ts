export interface NavigationItem {
  label: string;
  href: string;
  status: "active" | "planned";
}

export const primaryNavigation = [
  { label: "Home", href: "/", status: "active" },
  { label: "Membership", href: "/membership", status: "planned" },
  { label: "Blood Test", href: "/blood-test", status: "planned" },
  { label: "My Avatar", href: "/avatar", status: "planned" },
  { label: "My Deck", href: "/deck", status: "planned" },
  { label: "Collection", href: "/collection", status: "planned" },
  { label: "Flip", href: "/flip", status: "planned" },
  { label: "Community", href: "/community", status: "planned" },
  { label: "Trading", href: "/trading", status: "planned" },
  { label: "Shop", href: "/shop", status: "planned" },
  { label: "Account", href: "/account", status: "planned" },
] as const satisfies readonly NavigationItem[];
