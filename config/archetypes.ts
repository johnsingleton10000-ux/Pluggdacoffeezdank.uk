import type { ArchetypeDefinition } from "@/types/archetype";

export const ARCHETYPES: readonly ArchetypeDefinition[] = [
  {
    id: "control",
    name: "Control",
    primaryDimensions: ["control"],
    vector: { control: 1, attack: 0, defence: 0 },
  },
  {
    id: "attack",
    name: "Attack",
    primaryDimensions: ["attack"],
    vector: { control: 0, attack: 1, defence: 0 },
  },
  {
    id: "defence",
    name: "Defence",
    primaryDimensions: ["defence"],
    vector: { control: 0, attack: 0, defence: 1 },
  },
  {
    id: "control_attack",
    name: "Control / Attack",
    primaryDimensions: ["control", "attack"],
    vector: { control: 0.5, attack: 0.5, defence: 0 },
  },
  {
    id: "control_defence",
    name: "Control / Defence",
    primaryDimensions: ["control", "defence"],
    vector: { control: 0.5, attack: 0, defence: 0.5 },
  },
  {
    id: "attack_defence",
    name: "Attack / Defence",
    primaryDimensions: ["attack", "defence"],
    vector: { control: 0, attack: 0.5, defence: 0.5 },
  },
  {
    id: "balanced",
    name: "Balanced",
    primaryDimensions: ["control", "attack", "defence"],
    vector: { control: 1 / 3, attack: 1 / 3, defence: 1 / 3 },
  },
] as const;
