export function cleanFilters<T extends Record<string, unknown>>(
	filters: T,
): Partial<T> {
	return Object.fromEntries(
		Object.entries(filters).filter(
			([, value]) =>
				value !== null &&
				value !== undefined &&
				value !== '' &&
				!(Array.isArray(value) && value.length === 0),
		),
	) as Partial<T>;
}
