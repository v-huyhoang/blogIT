export function enumOrNull<T extends readonly unknown[]>(
	value: unknown,
	allowed: T,
): T[number] | null {
	return (allowed as readonly unknown[]).includes(value)
		? (value as T[number])
		: null;
}

export function isEnumValue<T extends readonly unknown[]>(
	value: unknown,
	enumValues: T,
): value is T[number] {
	return (enumValues as readonly unknown[]).includes(value);
}
