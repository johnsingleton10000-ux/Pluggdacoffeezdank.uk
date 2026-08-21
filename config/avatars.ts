import type { AvatarDefinition } from "@/types/avatar";

/** Twenty stock DCBD archetypes drawn from the Estate / Gangsta Deck visual language. */
export const AVATAR_POOL: readonly AvatarDefinition[] = [
  { id: "avatar-01", slot: 1, name: "Julius Caesar", title: "Caesar's Hand", quote: "I came, I saw, I flipped the table.", glow: "#c26bff", silhouette: "caesar", archetypeId: "attack_control", personality: "Conqueror who reads the table before the flick." },
  { id: "avatar-02", slot: 2, name: "Estate Boss", title: "Front Line", quote: "One flick. One shot. One win.", glow: "#ff3fbc", silhouette: "boss", archetypeId: "attack", personality: "Charges the warzone and never waits for smoke." },
  { id: "avatar-03", slot: 3, name: "Estate Queen", title: "Paper Crown", quote: "Outthink. Outflick. Win.", glow: "#ff3fbc", silhouette: "queen", archetypeId: "control", personality: "Reads pressure and denies what the opponent wants." },
  { id: "avatar-04", slot: 4, name: "Silent Strategist", title: "Lotus Control", quote: "Master the crease.", glow: "#c26bff", silhouette: "monk", archetypeId: "control", personality: "Calm mastery. Outlast the loud ones." },
  { id: "avatar-05", slot: 5, name: "Cracked Obelisk", title: "Aggressor", quote: "Strike first. No mercy.", glow: "#c45c26", silhouette: "obelisk", archetypeId: "attack", personality: "Pure pressure. Attack-focused." },
  { id: "avatar-06", slot: 6, name: "Fortress Mind", title: "Loffoffense", quote: "Protected power.", glow: "#8e38ff", silhouette: "fortress", archetypeId: "defence", personality: "Fortified attack stance. Controlled aggression." },
  { id: "avatar-07", slot: 7, name: "Spartan Roadman", title: "Bat Line", quote: "Estate bred. Arena ready.", glow: "#f1be48", silhouette: "boss", archetypeId: "attack", personality: "Ancient flex, modern street pressure." },
  { id: "avatar-08", slot: 8, name: "Pharaoh Flex", title: "Gold Mask", quote: "Vault first. Flex second.", glow: "#f1be48", silhouette: "lion", archetypeId: "control", personality: "Holds the table with gold-weight patience." },
  { id: "avatar-09", slot: 9, name: "Athena Boss Lady", title: "Shield Court", quote: "The strong still keep a watch.", glow: "#c26bff", silhouette: "queen", archetypeId: "defence_control", personality: "Protects the crease and the crew." },
  { id: "avatar-10", slot: 10, name: "Legion Commander", title: "Table Flip", quote: "Commit. Flip. Resolve.", glow: "#ff3fbc", silhouette: "caesar", archetypeId: "attack_defence", personality: "Commands the live flip and the hold." },
  { id: "avatar-11", slot: 11, name: "Shadow Plug", title: "Hidden Ability", quote: "They watch. Leave a mark.", glow: "#8e38ff", silhouette: "hood", archetypeId: "control", personality: "Operates from the holster, never the headline." },
  { id: "avatar-12", slot: 12, name: "Hooded Queen", title: "Crease Watch", quote: "Stay ready.", glow: "#c26bff", silhouette: "hood", archetypeId: "defence", personality: "Survives the crease, then collects." },
  { id: "avatar-13", slot: 13, name: "King Leonidas", title: "Gangsta King", quote: "No luck. Just flick.", glow: "#f1be48", silhouette: "lion", archetypeId: "attack", personality: "Luxury pressure. Crown on, gloves off." },
  { id: "avatar-14", slot: 14, name: "Cleopatra Roadman", title: "Street Sovereign", quote: "Own it. Control it. Live it.", glow: "#ff3fbc", silhouette: "queen", archetypeId: "attack_control", personality: "Regal street read with a live holster." },
  { id: "avatar-15", slot: 15, name: "Hades Accountant", title: "Dealer of Debts", quote: "Count up. Then collect.", glow: "#8e38ff", silhouette: "hood", archetypeId: "control", personality: "Trades, XP and the graveyard are the real board." },
  { id: "avatar-16", slot: 16, name: "Cornucopia King", title: "Baby Plutus", quote: "Fortune overlord.", glow: "#f1be48", silhouette: "lion", archetypeId: "control", personality: "Vault energy. Collection grows the deck." },
  { id: "avatar-17", slot: 17, name: "Medusa Barber", title: "Viking Cut", quote: "Look twice. Then move.", glow: "#22c55e", silhouette: "boss", archetypeId: "attack_defence", personality: "Hits first, holds the line, never blinks." },
  { id: "avatar-18", slot: 18, name: "Odin Executive", title: "All-Seeing Hold", quote: "Read their pressure.", glow: "#38bdf8", silhouette: "monk", archetypeId: "defence_control", personality: "Sees the six-step flip before it lands." },
  { id: "avatar-19", slot: 19, name: "Hercules Heavyweight", title: "Muscle Baby", quote: "Risk more. Reward more.", glow: "#c45c26", silhouette: "boss", archetypeId: "attack_defence", personality: "Heavy hand. Survives three creases easy." },
  { id: "avatar-20", slot: 20, name: "Ceesar Supreme", title: "Boss of Bosses", quote: "Founder Circle energy.", glow: "#f1be48", silhouette: "caesar", archetypeId: "attack_control", personality: "The Blood Seat. Full street control." },
];
