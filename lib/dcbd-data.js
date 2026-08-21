export const navigation = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#vault" },
  { label: "Membership", href: "#membership" },
  { label: "My Deck", href: "#deck" },
  { label: "Cards", href: "#cards" },
  { label: "Flip Three", href: "#flip-three" },
  { label: "Community", href: "#community" },
];

export const featuredVault = [
  {
    code: "DCBD-P031",
    name: "Patella 69",
    collection: "Dark Clay Collection",
    type: "Collector blend",
    price: 27,
    note: "Raw, rooted, resinous. A broader extraction profile with character.",
    accent: "#b57034",
    initials: "P69",
  },
  {
    code: "DCBD-P043",
    name: "Crystal Dream",
    collection: "Isolate Collection",
    type: "Collector art card",
    price: 29.99,
    note: "Precision-refined visual language. Clean, crystalline and elevated.",
    accent: "#9b5cff",
    initials: "CD",
  },
  {
    code: "DCBD-P046",
    name: "Blueberry Melt",
    collection: "Collector Range",
    type: "Collector art card",
    price: 39.99,
    note: "Blueberry profile with a smooth, old-school melt-inspired artwork.",
    accent: "#198cff",
    initials: "BM",
  },
  {
    code: "DCBD-P023",
    name: "Temple Ball Reserve",
    collection: "Classic Tea",
    type: "Heritage profile",
    price: 20.49,
    note: "Reserve-style artwork with sandalwood and pepper notes.",
    accent: "#ff8a22",
    initials: "TB",
  },
];

export const collectionCards = [
  {
    name: "Blueberry Slush",
    rarity: "Special edition",
    image: "/images/blueberry-slush-card.svg",
    attack: 72,
    control: 81,
  },
  {
    name: "Wedding Cake",
    rarity: "Founder drop",
    image: "/images/wedding-cake-card.svg",
    attack: 58,
    control: 88,
  },
  {
    name: "Temple Ball",
    rarity: "Legendary",
    image: "/images/temple-ball-card.svg",
    attack: 63,
    control: 91,
  },
  {
    name: "Danish Crumble",
    rarity: "Rare card",
    image: "/images/danish-crumble-card.svg",
    attack: 77,
    control: 69,
  },
];

export const activity = [
  { user: "Shadow Kid", action: "flipped a table", meta: "+3 legion points", time: "12m" },
  { user: "Crown of Richs", action: "pulled a rare card", meta: "Vault #0047", time: "31m" },
  { user: "Estate Queen", action: "won in three flips", meta: "+120 XP", time: "1h" },
];

export function formatPrice(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}
