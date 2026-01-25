// Delays
export const DEBOUNCE_DELAY = 500;
export const SEARCH_DEBOUNCE_DELAY = 400;

// Layout
export const NESTED_PADDING_STEP = 24;
export const NESTED_MARGIN_STEP = 20;

// Table Column Counts
export const POST_INDEX_TABLE_COLUMNS = 13;
export const CATEGORY_INDEX_TABLE_COLUMNS = 5;
export const PERMISSION_INDEX_TABLE_COLUMNS = 6;
export const ROLE_INDEX_TABLE_COLUMNS = 5;
export const USER_INDEX_TABLE_COLUMNS = 6;

// Trashed Filter
export const TRASHED_ONLY = 'only';
export const TRASHED_WITH = 'with';
export const TRASHED_OPTIONS = [TRASHED_ONLY, TRASHED_WITH] as const;
export type TrashedOption = (typeof TRASHED_OPTIONS)[number];

// User
export const USER_STATUS_ACTIVE = 'active';
export const USER_STATUS_INACTIVE = 'inactive';

// Active Status
export enum ActiveStatus {
	INACTIVE = 0,
	ACTIVE = 1,
}

export const statusMap = {
	[ActiveStatus.ACTIVE]: {
		label: 'Active',
		variant: 'default' as const,
		className: 'bg-green-500 hover:bg-green-600',
	},
	[ActiveStatus.INACTIVE]: {
		label: 'Inactive',
		variant: 'destructive' as const,
		className: '',
	},
};
