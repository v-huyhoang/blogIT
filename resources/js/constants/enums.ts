// Trashed
export const TRASHED_OPTIONS = ['only', 'with'] as const;
export type TrashedOption = (typeof TRASHED_OPTIONS)[number];

// Post
export const POST_STATUSES = ['draft', 'pending', 'published'] as const;
export type PostStatus = (typeof POST_STATUSES)[number];

// Comment
export const COMMENT_STATUSES = ['pending', 'approved', 'spam'] as const;
export type CommentStatus = (typeof COMMENT_STATUSES)[number];
