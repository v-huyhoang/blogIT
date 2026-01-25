export const RESERVED_FILTER_KEYS = [
	'q',
	'sort',
	'direction',
	'per_page',
	'page',
];

export const METRIC_FILTER_SUFFIXES = {
	GT: '_gt',
	GTE: '_gte',
	LT: '_lt',
	LTE: '_lte',
	COUNT: '_count',
} as const;
