export interface ResourceCollection<T> {
	data: T[];
}

export interface PostLatestHomePage {
	id: number;
	user: {
		id: number;
		name: string;
		avatar: string;
	};
	category: {
		id: number;
		name: string;
		slug?: string;
	};
	title: string;
	slug: string;
	excerpt: string | null;
	image: string | null;
	image_url: string | null;
	is_featured: boolean;
	comments_count: number;
	likes_count: number;
	views_count: number;
	published_at: string;
	created_at: string;
}

export interface TopAuthorsSectionProps {
	name: string;
	role?: string;
	posts_count: number;
	followers_count?: string;
	avatar: string;
}
