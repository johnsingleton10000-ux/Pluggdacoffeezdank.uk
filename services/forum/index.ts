import { assertServerOnly } from "@/lib/security";
import type { ForumComment, ForumPost } from "@/types/forum";

/**
 * Community activity will later write XP and reputation through server-side hooks.
 * Posting surfaces are not implemented in the foundation.
 */
export async function onPostCreated(_post: ForumPost): Promise<void> {
  assertServerOnly();
}

export async function onCommentCreated(_comment: ForumComment): Promise<void> {
  assertServerOnly();
}
