import type { Uuid } from "@/types/common";

export interface ForumProfile {
  id: Uuid;
  userId: Uuid;
  reputation: number;
}

export interface ForumPost {
  id: Uuid;
  authorId: Uuid;
  title: string;
  body: string;
  topic: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ForumComment {
  id: Uuid;
  postId: Uuid;
  authorId: Uuid;
  body: string;
  createdAt: string;
}
