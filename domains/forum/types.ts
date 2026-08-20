export type ForumPost = {
  id: string;
  userId: string;
  title: string;
  body: string;
  topic: "general" | "cards" | "flip" | "strategy" | "products" | "trades";
  createdAt: string;
  updatedAt: string;
};

export type ForumComment = {
  id: string;
  postId: string;
  userId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export type ReputationSnapshot = {
  userId: string;
  score: number;
  sourceBreakdown: Record<string, number>;
};
