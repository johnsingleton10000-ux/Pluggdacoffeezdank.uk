import type { AuditedEntity, EntityId } from "@/types/shared";

export interface ForumProfile extends AuditedEntity {
  readonly userId: EntityId;
  readonly reputation: number;
}

export interface ForumPost extends AuditedEntity {
  readonly authorId: EntityId;
  readonly title: string;
  readonly body: string;
}

export interface ForumComment extends AuditedEntity {
  readonly postId: EntityId;
  readonly authorId: EntityId;
  readonly parentCommentId: EntityId | null;
  readonly body: string;
}
