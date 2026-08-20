import type { ForumComment, ForumPost } from "../../../types/dcbd";

export interface CommunityRepository {
  listPosts(): Promise<ForumPost[]>;
  listComments(postId: string): Promise<ForumComment[]>;
}
