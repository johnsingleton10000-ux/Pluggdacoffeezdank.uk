export type NavigationItem =
  | {
      readonly label: string;
      readonly status: "available";
      readonly href: "/";
    }
  | {
      readonly label: string;
      readonly status: "planned";
    };

export const PRIMARY_NAVIGATION: readonly NavigationItem[] = [
  { label: "Home", status: "available", href: "/" },
  { label: "Membership", status: "planned" },
  { label: "Blood Test", status: "planned" },
  { label: "My Avatar", status: "planned" },
  { label: "My Deck", status: "planned" },
  { label: "Collection", status: "planned" },
  { label: "Flip", status: "planned" },
  { label: "Community", status: "planned" },
  { label: "Trading", status: "planned" },
  { label: "Shop", status: "planned" },
  { label: "Account", status: "planned" },
] as const;
