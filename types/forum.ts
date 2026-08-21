export interface ForumPost {
  id: string;
  author: string;
  board: "announcements" | "game" | "cards" | "trading" | "general";
  text: string;
  createdAt: string;
}

export interface PlayerPublicProfile {
  estateName: string;
  rank: string;
  deckName: string;
  archetype: string;
}
