import { PostStatus } from '@/constants';
import { BaseFilter } from './filter';
import { Pagination } from './pagination';

// Interface for post
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
	category: { id: number; name: string };
	title: string;
	slug: string;
	excerpt: string | null;
	content: string;
	image: string | null;
	image_url: string | null;
	meta_title: string | null;
	meta_description: string | null;
	status: PostStatus;
	is_featured: boolean;
	comments_count: number;
	likes_count: number;
	views_count: number;
	status_metadata: {
		label: string;
		color: string;
	};
	publish_at?: string | null;
	published_at: string | null;
	tags: PostTag[];
	created_at: string;
	updated_at: string;
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
	status: PostStatus;
	published_at: string | null;
}

export interface PostFilters extends BaseFilter {
	category_id: number | null;
	status: PostStatus | null;
	user_id: number | null;
	tag_id: number | null;
	trashed: string | null;
	is_featured: boolean | string | number | null;
	published_at_from?: string | null;
	published_at_to?: string | null;
}

// Interface for category
export interface SingleCategory {
	id: number;
	name: string;
	slug: string;
	description: string;
	parent_id: number | null;
	is_active: boolean;
	created_at: string;
	updated_at: string;
	children_recursive?: SingleCategory[];
}

export interface Category extends Pagination {
	data: SingleCategory[];
}

export interface FlatCategory extends SingleCategory {
	level: number;
}

export interface CategoryFormData {
	name: string;
	description: string;
	parent_id: number | null;
	is_active: boolean;
}

export interface CategoryFormProps {
	form: {
		data: CategoryFormData;
		setData: (
			key: keyof CategoryFormData,
			value: string | number | null | boolean,
		) => void;
		errors: Partial<Record<keyof CategoryFormData, string>>;
	};
	flatCategories: FlatCategory[];
	isEdit?: boolean;
}

export interface EditCategoryDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	category: SingleCategory | null;
	flatCategories: FlatCategory[];
}

// Interface Tag
export interface SingleTag {
	id: number;
	name: string;
	slug?: string;
	created_at: string;
	updated_at: string;
}
export interface Tag extends Pagination {
	data: SingleTag[];
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TagFilters extends BaseFilter {}
