export const site = {
  name: "DCBD",
  fullName: "Da Cofeez Dank",
  domain: "PluggdaCoffeezDank.uk",
  tagline: "PREMIUM • POTENT • PLUGGED IN",
  established: "EST. 2020",
  description:
    "DCBD is a connected Manchester universe: the Vault, Estate membership, AI Blood Test, collectible decks, Flip Three and the street that feeds them.",
  ageRestriction: "18+",
  stripeMembershipUrl: process.env.NEXT_PUBLIC_STRIPE_MEMBERSHIP_URL || "https://buy.stripe.com/8x2aEX4Kh3js3Li7S2cjS00",
  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447763383729",
    whatsappDisplay: "07763 383729",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "johnsingleton10000@gmail.com",
    founderHandle: "ElCastroPlugged",
  },
} as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${site.contact.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(subject?: string) {
  const base = `mailto:${site.contact.email}`;
  if (!subject) return base;
  return `${base}?subject=${encodeURIComponent(subject)}`;
}
