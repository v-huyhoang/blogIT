export function enumOrNull<T extends readonly string[]>(
	value: string,
	allowed: T,
): T[number] | null {
	return allowed.includes(value as T[number]) ? (value as T[number]) : null;
}

export function isEnumValue<T extends readonly string[]>(
	value: string,
	enumValues: T,
): value is T[number] {
	return enumValues.includes(value);
}
