import type { VaultId } from "@/lib/data/vaults";

export type CatalogProduct = {
  id: string;
  name: string;
  category: string;
  vault: VaultId;
  priceGbp: number;
  profile: string;
  color: string;
  stripe?: string;
  code: string;
  xpEligible: boolean;
  cardReward: boolean;
};

const CATEGORY_VAULT: Record<string, VaultId> = {
  "Herbal Tea": "flowers",
  "Classic Tea": "hash",
  "Collector Range": "extracts",
  Cards: "cards",
  Art: "merch",
  Merch: "merch",
  Membership: "membership",
};

function product(
  id: string,
  name: string,
  category: string,
  priceGbp: number,
  profile: string,
  color: string,
  extra?: Partial<CatalogProduct>,
): CatalogProduct {
  return {
    id,
    name,
    category,
    vault: extra?.vault ?? CATEGORY_VAULT[category] ?? "goodies",
    priceGbp,
    profile,
    color,
    code: id.toUpperCase(),
    xpEligible: category !== "Membership",
    cardReward: category !== "Membership",
    ...extra,
  };
}

export const CATALOG: CatalogProduct[] = [
  product("p001", "Mango Kush Inspired Blend", "Herbal Tea", 24.99, "Sweet mango, citrus and smooth tropical notes.", "#ff9f1c"),
  product("p002", "Tropic Thunder Blend", "Herbal Tea", 24.99, "Pineapple, passionfruit and bright citrus profile.", "#22c55e"),
  product("p003", "Dragonfruit Ice Blend", "Herbal Tea", 24.99, "Dragonfruit profile with a cool edge.", "#ff3fbc"),
  product("p004", "Purple Haze Inspired Blend", "Herbal Tea", 24.99, "Grape, berry and floral notes.", "#8e38ff"),
  product("p005", "Watermelon Wave Blend", "Herbal Tea", 24.99, "Juicy watermelon and summer-cool finish.", "#2dd4bf"),
  product("p006", "Berlin Berries Blend", "Herbal Tea", 24.99, "Dark berry blend with a city-night profile.", "#7c3aed"),
  product("p007", "Golden Drip Blend", "Herbal Tea", 24.99, "Honey, vanilla and golden dessert notes.", "#f1be48"),
  product("p008", "Pineapple Express Inspired Blend", "Herbal Tea", 24.99, "Pineapple, citrus and tropical profile.", "#facc15"),
  product("p009", "Caribbean Cream Blend", "Herbal Tea", 24.99, "Coconut cream and island fruit profile.", "#fb7185"),
  product("p010", "Passionfruit Punch Blend", "Herbal Tea", 24.99, "Passionfruit, citrus and tropical notes.", "#f97316"),
  product("p011", "Cali Sunset Blend", "Herbal Tea", 24.99, "Orange, berry and sunset dessert profile.", "#fb923c"),
  product("p012", "Cherry Cola Blend", "Herbal Tea", 24.99, "Cherry cola profile with sweet fizz notes.", "#dc2626"),
  product("p013", "Lychee Lemonade Blend", "Herbal Tea", 24.99, "Lychee, lemon and bright citrus profile.", "#fde68a"),
  product("p014", "Peach Paradise Blend", "Herbal Tea", 24.99, "Peach, vanilla and soft paradise profile.", "#fdba74"),
  product("p015", "Blue Raspberry Burst Blend", "Herbal Tea", 24.99, "Blue raspberry sweet-shop style profile.", "#38bdf8"),
  product("p016", "Strawberry Kiwi Blend", "Herbal Tea", 24.99, "Strawberry, kiwi and fresh fruit finish.", "#ef4444"),
  product("p017", "Coconut Breeze Blend", "Herbal Tea", 24.99, "Coconut and cool breezy island profile.", "#e7e5e4"),
  product("p018", "Blackberry Gelato Blend", "Herbal Tea", 24.99, "Blackberry and creamy gelato-style notes.", "#a855f7"),
  product("p019", "Candy Melon Blend", "Herbal Tea", 24.99, "Melon and candy-shop sweetness.", "#84cc16"),
  product("p020", "Grape Soda Blend", "Herbal Tea", 24.99, "Grape soda profile with fizzy sweetness.", "#9333ea"),
  product("p021", "Moroccan Blonde Style Tea", "Classic Tea", 17.99, "Soft sandy blonde-inspired artwork and spice notes.", "#d6a23d"),
  product("p022", "Ketama Gold Style Tea", "Classic Tea", 16.99, "Caramel, earth and nutty gold profile.", "#c0843d"),
  product("p023", "Temple Ball Reserve Style Tea", "Classic Tea", 20.49, "Reserve-style artwork with sandalwood and pepper notes.", "#7c4a22"),
  product("p024", "Amsterdam Blonde Pollen Style Tea", "Classic Tea", 16.99, "Blonde pollen-style artwork with mellow aroma.", "#d4a64e"),
  product("p025", "Red Light Reserve Style Tea", "Classic Tea", 16.99, "Classic reserve profile with warm old-school notes.", "#ef4444"),
  product("p026", "Canalside Cream Style Tea", "Classic Tea", 20.49, "Creamy canalside profile with smooth finish.", "#c7a46a"),
  product("p027", "Afghan Cream Style Tea", "Classic Tea", 23.99, "Dark chocolate, earth and creamy heritage profile.", "#7f5539"),
  product("p028", "Lemon Haze Black Style Tea", "Classic Tea", 20.99, "Lemon notes with bold dark base profile.", "#eab308"),
  product("p029", "Apple & Peaches Style Tea", "Classic Tea", 19.99, "Apple, peach and fruity heritage profile.", "#f97316"),
  product("p030", "Wedding Z Reserve Style Tea", "Classic Tea", 21.99, "Sweet dessert reserve profile with smooth depth.", "#f9a8d4"),
  product("p031", "Patella 69 Collector Blend", "Classic Tea", 27.0, "Apple Gas-inspired collector artwork and educational profile.", "#16a34a"),
  product("p032", "Jungle Boyz Reserve Blend", "Classic Tea", 26.99, "Graffiti jungle profile with bold tropical notes.", "#22c55e"),
  product("p033", "Mango Cream Reserve Blend", "Classic Tea", 22.99, "Mango cream profile with soft dessert edge.", "#fb923c"),
  product("p034", "Tropic Gold Blend", "Classic Tea", 22.99, "Tropical fruit and gold reserve profile.", "#fde047"),
  product("p035", "Banana Split Blonde Blend", "Classic Tea", 21.99, "Banana dessert and blonde-style notes.", "#facc15"),
  product("p036", "Sunset Sherbet Art Card", "Collector Range", 35.99, "Sweet berry, citrus and coastal sunset artwork.", "#fb7185"),
  product("p037", "Cali Gold Art Card", "Collector Range", 47.99, "Earthy pine and lemon profile with golden styling.", "#f1be48"),
  product("p038", "Pacific OG Art Card", "Collector Range", 47.99, "Pine and ocean cliff collector artwork.", "#38bdf8"),
  product("p039", "Golden State Art Card", "Collector Range", 47.99, "Mango, pineapple and golden coast artwork.", "#f97316"),
  product("p040", "Lost Coast Haze Art Card", "Collector Range", 53.99, "Lemon, herbs and misty coast profile.", "#14b8a6"),
  product("p041", "Mojave OG Art Card", "Collector Range", 29.99, "Dry desert pine and spicy earth artwork.", "#f97316"),
  product("p042", "Coastal Dream Art Card", "Collector Range", 47.99, "Lavender and sweet berry coastline artwork.", "#a78bfa"),
  product("p043", "Crystal Dream Art Card", "Collector Range", 29.99, "Clean crystal-inspired collector card style.", "#e0f2fe"),
  product("p044", "Pineapple Diesel Art Card", "Collector Range", 47.99, "Pineapple, citrus and bold collector artwork.", "#facc15"),
  product("p045", "Mango Kush Diamonds Art Card", "Collector Range", 49.99, "Mango collector style with premium artwork.", "#fb923c"),
  product("p046", "Blueberry Melt Art Card", "Collector Range", 39.99, "Blueberry and smooth melt-style artwork.", "#3b82f6"),
  product("p047", "Dragonfruit Resin Art Card", "Collector Range", 44.99, "Dragonfruit and berry collector artwork.", "#ec4899"),
  product("p048", "Rookie Card Pack", "Cards", 9.99, "Digital collector pack concept with common set and rare chance.", "#f1be48"),
  product("p049", "Estate Born Poster", "Art", 14.99, "Street-story poster slot for Cloudinary artwork.", "#8e38ff"),
  product("p050", "DCBD Mug", "Merch", 14.99, "Coffee-shop merch item for the DCBD universe.", "#ffffff", { vault: "goodies" }),
  product("p051", "Black DCBD Hoodie", "Merch", 56.0, "Black hoodie concept with custom artwork placement.", "#111827"),
  product("p052", "Estate Born+ Membership", "Membership", 8.99, "Stripe-linked membership with member board access.", "#8e38ff", {
    stripe: "https://buy.stripe.com/8x2aEX4Kh3js3Li7S2cjS00",
    xpEligible: false,
    cardReward: false,
  }),
];

export function getProduct(id: string) {
  return CATALOG.find((product) => product.id === id);
}

export function productsForVault(vault: VaultId) {
  if (vault === "deals") {
    return CATALOG.filter((product) => product.vault === "membership" || product.vault === "cards" || product.id === "p031");
  }
  if (vault === "goodies") {
    return CATALOG.filter((product) => product.vault === "goodies" || product.id === "p050" || product.vault === "flowers");
  }
  return CATALOG.filter((product) => product.vault === vault);
}

export function relatedProducts(product: CatalogProduct, limit = 4) {
  return CATALOG.filter((item) => item.id !== product.id && item.vault === product.vault).slice(0, limit);
}
