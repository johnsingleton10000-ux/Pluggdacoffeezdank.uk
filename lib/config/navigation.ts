export type NavItem = {
  href: string;
  label: string;
  mobile?: boolean;
};

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/membership", label: "Membership" },
  { href: "/deck", label: "My Deck" },
  { href: "/cards", label: "Cards" },
  { href: "/flip", label: "Flip Three" },
  { href: "/community", label: "Community" },
  { href: "/account", label: "Account" },
];

export const vaultNav: NavItem[] = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?vault=extracts", label: "Extracts" },
  { href: "/shop?vault=edibles", label: "Edibles" },
  { href: "/shop?vault=tinctures", label: "Tinctures" },
  { href: "/shop?vault=merch", label: "Merch" },
  { href: "/shop?vault=goodies", label: "Goodies" },
  { href: "/shop?vault=deals", label: "Deals" },
];
