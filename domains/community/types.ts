import type { AuditedEntity, EntityId } from "@/types/core";

export interface ForumProfile extends AuditedEntity {
  userId: EntityId;
  reputation: number;
}

export interface ForumPost extends AuditedEntity {
  authorId: EntityId;
  categoryId: EntityId;
  title: string;
  body: string;
  status: "published" | "locked" | "hidden";
}

export interface ForumComment extends AuditedEntity {
  postId: EntityId;
  authorId: EntityId;
  parentCommentId: EntityId | null;
  body: string;
  status: "published" | "hidden";
}

export interface CommunityActivityEvent {
  id: EntityId;
  userId: EntityId;
  activityType: "post_created" | "comment_created" | "reputation_changed";
  subjectId: EntityId;
}
