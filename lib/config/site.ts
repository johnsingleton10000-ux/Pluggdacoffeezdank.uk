export const site = {
  name: "DCBD",
  shortName: "DCBD",
  legalName: "Pluggd Coffee & Dank",
  tagline: "Manchester grit × Amsterdam lounge × collectible card ecosystem",
  description:
    "DCBD is a connected ecosystem for membership, XP, collectible cards, community, trading and Flip.",
  ageRestriction: "18+",
  contact: {
    whatsappNumber: "447763383729",
    whatsappDisplay: "07763 383729",
    email: "johnsingleton10000@gmail.com",
    founderHandle: "ElCastroPlugged",
  },
} as const;

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(subject?: string): string {
  const base = `mailto:${site.contact.email}`;
  if (!subject) return base;
  return `${base}?subject=${encodeURIComponent(subject)}`;
}
