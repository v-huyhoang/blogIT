// Post Statuses
export const POST_STATUS_DRAFT = 0;
export const POST_STATUS_PENDING = 1;
export const POST_STATUS_PUBLISHED = 2;

export const POST_STATUSES = [
	POST_STATUS_DRAFT,
	POST_STATUS_PENDING,
	POST_STATUS_PUBLISHED,
] as const;

export type PostStatus = (typeof POST_STATUSES)[number];

// Comment Statuses
export const COMMENT_STATUS_PENDING = 0;
export const COMMENT_STATUS_APPROVED = 1;
export const COMMENT_STATUS_SPAM = 2;

export const COMMENT_STATUSES = [
	COMMENT_STATUS_PENDING,
	COMMENT_STATUS_APPROVED,
	COMMENT_STATUS_SPAM,
] as const;

export type CommentStatus = (typeof COMMENT_STATUSES)[number];

// SEO Limits
export const SEO_TITLE_MAX_LENGTH = 60;
export const SEO_DESCRIPTION_MAX_LENGTH = 160;

// Taxonomy
export const CATEGORY_ROOT_VALUE = 'root';
