import type { PostStatus, TrashedValue } from '@/constants/enums';
export interface CategoryPost {
	id: number;
	name: string;
}

export interface PostTag {
	id: number;
	name: string;
}

export interface PostUser {
	id: number;
	name: string;
}

export interface Post {
	id: number;
	user: PostUser;
	category: CategoryPost;
	title: string;
	slug: string;
	excerpt: string | null;
	content: string;
	image: string | null;
	image_url: string | null;
	meta_title: string | null;
	meta_description: string | null;
	status: string;
	comments_count: number;
	likes_count: number;
	views_count: number;
	status_metadata: {
		label: string;
		color: string;
	};
	published_at: string | null;
	tags: PostTag[];
	created_at: string;
	updated_at: string;
}
export interface PostIndexProps {
	posts: Post[];
}
export interface PostFormData {
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	image: string | null;
	meta_title: string | null;
	meta_description: string | null;
	category_id: number;
	status: string;
	published_at: string | null;
}

export type PostFilters = {
	q: string | null;
	sort: string | null;
	direction: 'asc' | 'desc' | null;
	per_page: number | null;
	category_id: number | null;
	status: PostStatus | null;
	user_id: number | null;
	tag_id: number | null;
	trashed: TrashedValue | null;

	published_at_from?: string | null;
	published_at_to?: string | null;

	[key: string]: unknown;
};
