import { SelectFilter } from '@/components/select-filter';
import {
	POST_STATUS_DRAFT,
	POST_STATUS_PENDING,
	POST_STATUS_PUBLISHED,
	POST_STATUS_SCHEDULE,
	POST_STATUSES,
	TRASHED_OPTIONS,
} from '@/constants';
import { enumOrNull, isEnumValue } from '@/lib/enum';
import { PostFilters } from '@/types';
import { Activity, Eye, Star } from 'lucide-react';

const ALL = '__all__';

export function FeaturedFilter({
	filters,
	apply,
}: {
	filters: PostFilters;
	apply: (v: Partial<PostFilters>) => void;
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
					apply({ is_featured: null });
				} else if (v === 'featured') {
					apply({ is_featured: '1' });
				} else {
					apply({ is_featured: '0' });
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

export function StatusFilter({
	filters,
	apply,
}: {
	filters: PostFilters;
	apply: (v: Partial<PostFilters>) => void;
}) {
	return (
		<SelectFilter
			title="Status"
			icon={<Activity className="size-4 text-primary" />}
			value={filters.status?.toString() ?? ALL}
			onValueChange={(v) => {
				if (v === ALL) {
					apply({ status: null });
					return;
				}

				const numValue = Number(v);
				if (isEnumValue(numValue, POST_STATUSES)) {
					apply({ status: numValue });
				}
			}}
			options={[
				{ label: 'All Status', value: ALL },
				{ label: 'Draft', value: POST_STATUS_DRAFT.toString() },
				{ label: 'Pending', value: POST_STATUS_PENDING.toString() },
				{ label: 'Schedule', value: POST_STATUS_SCHEDULE.toString() },
				{ label: 'Published', value: POST_STATUS_PUBLISHED.toString() },
			]}
			placeholder="All status"
		/>
	);
}

export function VisibilityFilter({
	filters,
	apply,
}: {
	filters: PostFilters;
	apply: (v: Partial<PostFilters>) => void;
}) {
	return (
		<SelectFilter
			title="Visibility"
			icon={<Eye className="size-4 text-primary" />}
			value={filters.trashed ?? ALL}
			onValueChange={(v) =>
				apply({
					trashed: v === ALL ? null : enumOrNull(v, TRASHED_OPTIONS),
				})
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
