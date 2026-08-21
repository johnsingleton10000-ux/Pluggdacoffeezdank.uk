import type { Product, ProductVaultId } from "@/types/ecommerce";

interface RawProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  profile: string;
  color: string;
  stripe?: string;
}

const RAW: RawProduct[] = [
  { id: "p001", name: "Mango Kush Inspired Blend", category: "Herbal Tea", price: 24.99, profile: "Sweet mango, citrus and smooth tropical notes.", color: "#ff9f1c" },
  { id: "p002", name: "Tropic Thunder Blend", category: "Herbal Tea", price: 24.99, profile: "Pineapple, passionfruit and bright citrus profile.", color: "#22c55e" },
  { id: "p003", name: "Dragonfruit Ice Blend", category: "Herbal Tea", price: 24.99, profile: "Dragonfruit profile with a cool edge.", color: "#ff3fbc" },
  { id: "p004", name: "Purple Haze Inspired Blend", category: "Herbal Tea", price: 24.99, profile: "Grape, berry and floral notes.", color: "#8e38ff" },
  { id: "p005", name: "Watermelon Wave Blend", category: "Herbal Tea", price: 24.99, profile: "Juicy watermelon and summer-cool finish.", color: "#2dd4bf" },
  { id: "p006", name: "Berlin Berries Blend", category: "Herbal Tea", price: 24.99, profile: "Dark berry blend with a city-night profile.", color: "#7c3aed" },
  { id: "p007", name: "Golden Drip Blend", category: "Herbal Tea", price: 24.99, profile: "Honey, vanilla and golden dessert notes.", color: "#f1be48" },
  { id: "p008", name: "Pineapple Express Inspired Blend", category: "Herbal Tea", price: 24.99, profile: "Pineapple, citrus and tropical profile.", color: "#facc15" },
  { id: "p009", name: "Caribbean Cream Blend", category: "Herbal Tea", price: 24.99, profile: "Coconut cream and island fruit profile.", color: "#fb7185" },
  { id: "p010", name: "Passionfruit Punch Blend", category: "Herbal Tea", price: 24.99, profile: "Passionfruit, citrus and tropical notes.", color: "#f97316" },
  { id: "p011", name: "Cali Sunset Blend", category: "Herbal Tea", price: 24.99, profile: "Orange, berry and sunset dessert profile.", color: "#fb923c" },
  { id: "p012", name: "Cherry Cola Blend", category: "Herbal Tea", price: 24.99, profile: "Cherry cola profile with sweet fizz notes.", color: "#dc2626" },
  { id: "p013", name: "Lychee Lemonade Blend", category: "Herbal Tea", price: 24.99, profile: "Lychee, lemon and bright citrus profile.", color: "#fde68a" },
  { id: "p014", name: "Peach Paradise Blend", category: "Herbal Tea", price: 24.99, profile: "Peach, vanilla and soft paradise profile.", color: "#fdba74" },
  { id: "p015", name: "Blue Raspberry Burst Blend", category: "Herbal Tea", price: 24.99, profile: "Blue raspberry sweet-shop style profile.", color: "#38bdf8" },
  { id: "p016", name: "Strawberry Kiwi Blend", category: "Herbal Tea", price: 24.99, profile: "Strawberry, kiwi and fresh fruit finish.", color: "#ef4444" },
  { id: "p017", name: "Coconut Breeze Blend", category: "Herbal Tea", price: 24.99, profile: "Coconut and cool breezy island profile.", color: "#e7e5e4" },
  { id: "p018", name: "Blackberry Gelato Blend", category: "Herbal Tea", price: 24.99, profile: "Blackberry and creamy gelato-style notes.", color: "#a855f7" },
  { id: "p019", name: "Candy Melon Blend", category: "Herbal Tea", price: 24.99, profile: "Melon and candy-shop sweetness.", color: "#84cc16" },
  { id: "p020", name: "Grape Soda Blend", category: "Herbal Tea", price: 24.99, profile: "Grape soda profile with fizzy sweetness.", color: "#9333ea" },
  { id: "p021", name: "Moroccan Blonde Style Tea", category: "Classic Tea", price: 17.99, profile: "Soft sandy blonde-inspired artwork and spice notes.", color: "#d6a23d" },
  { id: "p022", name: "Ketama Gold Style Tea", category: "Classic Tea", price: 16.99, profile: "Caramel, earth and nutty gold profile.", color: "#c0843d" },
  { id: "p023", name: "Temple Ball Reserve Style Tea", category: "Classic Tea", price: 20.49, profile: "Reserve-style artwork with sandalwood and pepper notes.", color: "#7c4a22" },
  { id: "p024", name: "Amsterdam Blonde Pollen Style Tea", category: "Classic Tea", price: 16.99, profile: "Blonde pollen-style artwork with mellow aroma.", color: "#d4a64e" },
  { id: "p025", name: "Red Light Reserve Style Tea", category: "Classic Tea", price: 16.99, profile: "Classic reserve profile with warm old-school notes.", color: "#ef4444" },
  { id: "p026", name: "Canalside Cream Style Tea", category: "Classic Tea", price: 20.49, profile: "Creamy canalside profile with smooth finish.", color: "#c7a46a" },
  { id: "p027", name: "Afghan Cream Style Tea", category: "Classic Tea", price: 23.99, profile: "Dark chocolate, earth and creamy heritage profile.", color: "#7f5539" },
  { id: "p028", name: "Lemon Haze Black Style Tea", category: "Classic Tea", price: 20.99, profile: "Lemon notes with bold dark base profile.", color: "#eab308" },
  { id: "p029", name: "Apple & Peaches Style Tea", category: "Classic Tea", price: 19.99, profile: "Apple, peach and fruity heritage profile.", color: "#f97316" },
  { id: "p030", name: "Wedding Z Reserve Style Tea", category: "Classic Tea", price: 21.99, profile: "Sweet dessert reserve profile with smooth depth.", color: "#f9a8d4" },
  { id: "p031", name: "Patella 69 Collector Blend", category: "Classic Tea", price: 27.0, profile: "Apple Gas-inspired collector artwork and educational profile.", color: "#16a34a" },
  { id: "p032", name: "Jungle Boyz Reserve Blend", category: "Classic Tea", price: 26.99, profile: "Graffiti jungle profile with bold tropical notes.", color: "#22c55e" },
  { id: "p033", name: "Mango Cream Reserve Blend", category: "Classic Tea", price: 22.99, profile: "Mango cream profile with soft dessert edge.", color: "#fb923c" },
  { id: "p034", name: "Tropic Gold Blend", category: "Classic Tea", price: 22.99, profile: "Tropical fruit and gold reserve profile.", color: "#fde047" },
  { id: "p035", name: "Banana Split Blonde Blend", category: "Classic Tea", price: 21.99, profile: "Banana dessert and blonde-style notes.", color: "#facc15" },
  { id: "p036", name: "Sunset Sherbet Art Card", category: "Collector Range", price: 35.99, profile: "Sweet berry, citrus and coastal sunset artwork.", color: "#fb7185" },
  { id: "p037", name: "Cali Gold Art Card", category: "Collector Range", price: 47.99, profile: "Earthy pine and lemon profile with golden styling.", color: "#f1be48" },
  { id: "p038", name: "Pacific OG Art Card", category: "Collector Range", price: 47.99, profile: "Pine and ocean cliff collector artwork.", color: "#38bdf8" },
  { id: "p039", name: "Golden State Art Card", category: "Collector Range", price: 47.99, profile: "Mango, pineapple and golden coast artwork.", color: "#f97316" },
  { id: "p040", name: "Lost Coast Haze Art Card", category: "Collector Range", price: 53.99, profile: "Lemon, herbs and misty coast profile.", color: "#14b8a6" },
  { id: "p041", name: "Mojave OG Art Card", category: "Collector Range", price: 29.99, profile: "Dry desert pine and spicy earth artwork.", color: "#f97316" },
  { id: "p042", name: "Coastal Dream Art Card", category: "Collector Range", price: 47.99, profile: "Lavender and sweet berry coastline artwork.", color: "#a78bfa" },
  { id: "p043", name: "Crystal Dream Art Card", category: "Collector Range", price: 29.99, profile: "Clean crystal-inspired collector card style.", color: "#e0f2fe" },
  { id: "p044", name: "Pineapple Diesel Art Card", category: "Collector Range", price: 47.99, profile: "Pineapple, citrus and bold collector artwork.", color: "#facc15" },
  { id: "p045", name: "Mango Kush Diamonds Art Card", category: "Collector Range", price: 49.99, profile: "Mango collector style with premium artwork.", color: "#fb923c" },
  { id: "p046", name: "Blueberry Melt Art Card", category: "Collector Range", price: 39.99, profile: "Blueberry and smooth melt-style artwork.", color: "#3b82f6" },
  { id: "p047", name: "Dragonfruit Resin Art Card", category: "Collector Range", price: 44.99, profile: "Dragonfruit and berry collector artwork.", color: "#ec4899" },
  { id: "p048", name: "Rookie Card Pack", category: "Cards", price: 9.99, profile: "Digital collector pack concept with common set and rare chance.", color: "#f1be48" },
  { id: "p049", name: "Estate Born Poster", category: "Art", price: 14.99, profile: "Street-story poster slot for Cloudinary artwork.", color: "#8e38ff" },
  { id: "p050", name: "DCBD Mug", category: "Merch", price: 14.99, profile: "Coffee-shop merch item for the DCBD universe.", color: "#ffffff" },
  { id: "p051", name: "Black DCBD Hoodie", category: "Merch", price: 56.0, profile: "Black hoodie concept with custom artwork placement.", color: "#111827" },
  { id: "p052", name: "Estate Born+ Membership", category: "Membership", price: 8.99, profile: "Stripe-linked membership with member board access.", color: "#8e38ff", stripe: "https://buy.stripe.com/8x2aEX4Kh3js3Li7S2cjS00" },
];

const CATEGORY_VAULT: Record<string, ProductVaultId> = {
  "Herbal Tea": "herbal-tea",
  "Classic Tea": "classics",
  "Collector Range": "collector",
  Cards: "cards",
  Art: "art",
  Merch: "merch",
  Membership: "membership",
};

export const PRODUCTS: Product[] = RAW.map((item) => ({
  id: item.id,
  name: item.name,
  category: item.category,
  vaultId: CATEGORY_VAULT[item.category] ?? "herbal-tea",
  priceGbp: item.price,
  profile: item.profile,
  color: item.color,
  stripeUrl: item.stripe,
  code: `DCBD-${item.id.toUpperCase()}`,
  cardId: `card-${item.id}`,
  xpKey: item.category === "Membership" ? "membership" : "purchase",
  availability: item.category === "Membership" ? "membership" : "in_vault",
}));

export const VAULTS: { id: ProductVaultId; name: string; blurb: string; glow: string; artwork: string | null }[] = [
  { id: "herbal-tea", name: "Herbal / Tea Collection", blurb: "Flavour wall. Loud natural profiles.", glow: "#22c55e", artwork: "/assets/thca-herbal-teas-menu.svg" },
  { id: "classics", name: "Dam Classics Vault", blurb: "Heritage-style teas and reserve blends.", glow: "#d6a23d", artwork: "/assets/dam-classics-cards.svg" },
  { id: "collector", name: "Collector Vault", blurb: "Art cards. Physical product, digital collectible.", glow: "#8e38ff", artwork: "/assets/cali-extracts-grid.svg" },
  { id: "cards", name: "Card Vault", blurb: "Rookie packs and collectible draws.", glow: "#f1be48", artwork: "/images/blueberry-slush-card.svg" },
  { id: "art", name: "Art Vault", blurb: "Estate Born posters and street story prints.", glow: "#ff3fbc", artwork: "/assets/hero.svg" },
  { id: "merch", name: "Merchandise Vault", blurb: "Hoodies, mugs and waistband gear.", glow: "#c26bff", artwork: "/assets/hoodie-black-dcbd.svg" },
  { id: "membership", name: "Membership Vault", blurb: "Estate Born+ — the key to the wider ecosystem.", glow: "#f1be48", artwork: "/assets/membership-card.svg" },
];

export function getProduct(id: string) {
  return PRODUCTS.find((item) => item.id === id) ?? null;
}

export function getVault(id: string) {
  return VAULTS.find((item) => item.id === id) ?? null;
}

export function productsInVault(id: ProductVaultId) {
  return PRODUCTS.filter((item) => item.vaultId === id);
}

export const FEATURED_PRODUCT_IDS = ["p018", "p023", "p043", "p031", "p051", "p046", "p007", "p048"] as const;
