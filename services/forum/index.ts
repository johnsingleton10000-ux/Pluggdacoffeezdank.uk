export const FORUM_BOARDS = [
  { id: "announcements", name: "DCBD announcements" },
  { id: "game", name: "Flip Three" },
  { id: "cards", name: "Cards" },
  { id: "trading", name: "Trading" },
  { id: "general", name: "Estate Born" },
] as const;

export const DEFAULT_POSTS = [
  { id: "p1", author: "EstateBorn", board: "announcements" as const, text: "Member voting board opens after the first product drop.", createdAt: "2d ago" },
  { id: "p2", author: "PandaProfessor", board: "cards" as const, text: "Show off your rookie card collection here.", createdAt: "1d ago" },
  { id: "p3", author: "SmokeKing23", board: "general" as const, text: "What flavour should return next month?", createdAt: "2h ago" },
];
