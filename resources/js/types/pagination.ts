export interface PaginationLink {
	url: string | null | undefined;
	label: string;
	active: boolean;
}

export interface Pagination {
	from: number | null;
	links: PaginationLink[];
	to: number | null;
	total: number;
}

export interface PaginatedResponse<T = unknown> {
	current_page: number;
	data: T[];
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	links: PaginationLink[];
	next_page_url: string | null;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number;
	total: number;
}
