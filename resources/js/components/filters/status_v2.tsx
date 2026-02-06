import { SelectFilter } from '@/components/select-filter';
import { TRASHED_OPTIONS } from '@/constants';
import { enumOrNull } from '@/lib/enum';
import { Activity, Eye, Star } from 'lucide-react';

const ALL = '__all__';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FeaturedFilter<T extends Record<string, any>>({
	filters,
	apply,
}: {
	filters: T;
	apply: (v: Partial<T>) => void;
}) {
	const val = filters.is_featured;
	const current =
		val === 'true' || val === true || val === '1' || val === 1
			? 'featured'
			: val === 'false' || val === false || val === '0' || val === 0
				? 'not_featured'
				: ALL;

	return (
		<SelectFilter
			title="Featured"
			icon={<Star className="size-4 text-primary" />}
			value={current}
			onValueChange={(v) => {
				if (v === ALL) {
					apply({ is_featured: null } as unknown as Partial<T>);
				} else if (v === 'featured') {
					apply({ is_featured: '1' } as unknown as Partial<T>);
				} else {
					apply({ is_featured: '0' } as unknown as Partial<T>);
				}
			}}
			options={[
				{ label: 'All', value: ALL },
				{ label: 'Featured', value: 'featured' },
				{ label: 'Not Featured', value: 'not_featured' },
			]}
			placeholder="All"
		/>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function StatusFilter<T extends Record<string, any>>({
	filters,
	apply,
	options,
	title = 'Status',
	filterKey = 'status',
	placeholder = 'All status',
}: {
	filters: T;
	apply: (v: Partial<T>) => void;
	options: { label: string; value: string | number }[];
	title?: string;
	filterKey?: string;
	placeholder?: string;
}) {
	return (
		<SelectFilter
			title={title}
			icon={<Activity className="size-4 text-primary" />}
			value={filters[filterKey]?.toString() ?? ALL}
			onValueChange={(v) => {
				if (v === ALL) {
					apply({ [filterKey]: null } as Partial<T>);
					return;
				}

				const option = options.find((o) => o.value.toString() === v);
				if (option) {
					apply({ [filterKey]: option.value } as Partial<T>);
				}
			}}
			options={[
				{ label: placeholder, value: ALL },
				...options.map((o) => ({
					label: o.label,
					value: o.value.toString(),
				})),
			]}
			placeholder={placeholder}
		/>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function VisibilityFilter<T extends Record<string, any>>({
	filters,
	apply,
}: {
	filters: T;
	apply: (v: Partial<T>) => void;
}) {
	return (
		<SelectFilter
			title="Visibility"
			icon={<Eye className="size-4 text-primary" />}
			value={filters.trashed ?? ALL}
			onValueChange={(v) =>
				apply({
					trashed: v === ALL ? null : enumOrNull(v, TRASHED_OPTIONS),
				} as unknown as Partial<T>)
			}
			options={[
				{ label: 'Active', value: ALL },
				{ label: 'With Trashed', value: 'with' },
				{ label: 'Trashed Only', value: 'only' },
			]}
			placeholder="Active only"
		/>
	);
}
