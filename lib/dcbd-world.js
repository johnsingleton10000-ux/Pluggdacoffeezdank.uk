export const ecosystemSteps = [
  { number: "01", title: "Discover", copy: "Enter the Estate and explore products, stories and characters.", tone: "pink" },
  { number: "02", title: "Join", copy: "One membership identity connects your access and profile.", tone: "purple" },
  { number: "03", title: "Build", copy: "Your answers shape an avatar, alignment and starter deck.", tone: "cyan" },
  { number: "04", title: "Progress", copy: "Collect cards, earn XP and evolve through the DCBD world.", tone: "lime" },
];

export const vaults = [
  { name: "Flower Vault", code: "FV-01", visual: "flower", description: "Curated flower collection", status: "Catalogue pending" },
  { name: "Extract Vault", code: "XV-02", visual: "crystal", description: "Concentrates and extracts", status: "Catalogue pending" },
  { name: "Herbal Vault", code: "HV-03", visual: "herbal", description: "Herbal and tea collection", status: "Catalogue pending" },
  { name: "Merch Vault", code: "MV-04", visual: "merch", description: "Estate uniform and goods", status: "Catalogue pending" },
];

export const alignments = [
  {
    name: "Attack",
    subtitle: "Cracked Obelisk",
    description: "Fast pressure. Decisive moves. High-risk instinct.",
    className: "attack",
    stats: ["Pressure", "Tempo", "Risk"],
  },
  {
    name: "Control",
    subtitle: "Silent Strategist",
    description: "Read the room. Shape the field. Own the outcome.",
    className: "control",
    stats: ["Timing", "Intel", "Leverage"],
  },
  {
    name: "Defence",
    subtitle: "Fortress Mind",
    description: "Protect value. Absorb pressure. Outlast the play.",
    className: "defence",
    stats: ["Resolve", "Guard", "Counter"],
  },
];

export const collectibleCards = [
  { name: "Blueberry Slush", rarity: "Special edition", image: "/images/blueberry-slush-card.svg", tone: "cyan" },
  { name: "Wedding Cake", rarity: "Founder drop", image: "/images/wedding-cake-card.svg", tone: "gold" },
  { name: "Temple Ball", rarity: "Legendary", image: "/images/temple-ball-card.svg", tone: "orange" },
  { name: "Danish Crumble", rarity: "Rare card", image: "/images/danish-crumble-card.svg", tone: "purple" },
];

export const footerNavigation = [
  {
    title: "The Estate",
    links: [["Home", "#top"], ["Membership", "#membership"], ["Community", "#community"]],
  },
  {
    title: "Collect",
    links: [["Vaults", "#vaults"], ["Cards", "#cards"], ["My Deck", "#deck"]],
  },
  {
    title: "Play",
    links: [["Flip Three", "#flip-three"], ["XP System", "#ecosystem"], ["Onboarding", "#identity"]],
  },
];
