export type VaultId =
  | "flowers"
  | "extracts"
  | "edibles"
  | "tinctures"
  | "hash"
  | "merch"
  | "goodies"
  | "cards"
  | "membership"
  | "deals";

export type Vault = {
  id: VaultId;
  name: string;
  navLabel: string;
  icon: string;
  glow: string;
  description: string;
  sealed?: boolean;
};

export const VAULTS: Vault[] = [
  {
    id: "flowers",
    name: "Flower Vault",
    navLabel: "Flowers",
    icon: "leaf",
    glow: "#39ff14",
    description: "Herbal tea blends from the launch catalogue.",
  },
  {
    id: "hash",
    name: "Hash Vault",
    navLabel: "Hash",
    icon: "diamond",
    glow: "#d4af37",
    description: "Classic reserve-style teas including Patella collector blends.",
  },
  {
    id: "extracts",
    name: "Extracts Vault",
    navLabel: "Extracts",
    icon: "crystal",
    glow: "#a020f0",
    description: "Collector art cards from the concentrate-inspired range.",
  },
  {
    id: "edibles",
    name: "Edibles Vault",
    navLabel: "Edibles",
    icon: "candy",
    glow: "#ff2bd6",
    description: "Vault architecture is live. Catalogue products have not been supplied yet.",
    sealed: true,
  },
  {
    id: "tinctures",
    name: "Tincture Vault",
    navLabel: "Tinctures",
    icon: "dropper",
    glow: "#ff6ad5",
    description: "Vault architecture is live. Catalogue products have not been supplied yet.",
    sealed: true,
  },
  {
    id: "goodies",
    name: "Goodies",
    navLabel: "Goodies",
    icon: "cup",
    glow: "#c4a574",
    description: "Coffee-shop goods and dessert-profile teas.",
  },
  {
    id: "merch",
    name: "Merch Vault",
    navLabel: "Merch",
    icon: "cap",
    glow: "#c8c8c8",
    description: "Estate merch and street-story posters.",
  },
  {
    id: "cards",
    name: "Card Vault",
    navLabel: "Cards",
    icon: "card",
    glow: "#f1be48",
    description: "Rookie packs and digital collector concepts.",
  },
  {
    id: "membership",
    name: "Membership Vault",
    navLabel: "Membership",
    icon: "crown",
    glow: "#d4af37",
    description: "Estate Born+ live Stripe membership.",
  },
  {
    id: "deals",
    name: "Deals",
    navLabel: "Deals",
    icon: "bolt",
    glow: "#ff2bd6",
    description: "Membership, packs and featured vault entries.",
  },
];

export function getVault(id: VaultId) {
  return VAULTS.find((vault) => vault.id === id);
}
