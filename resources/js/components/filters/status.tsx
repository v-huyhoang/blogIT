import { SelectFilter } from '@/components/select-filter';
import { POST_STATUSES, TRASHED_OPTIONS } from '@/constants/enums';
import { enumOrNull, isEnumValue } from '@/lib/enum';
import { PostFilters } from '@/types/post';
import { Activity, Eye } from 'lucide-react';

const ALL = '__all__';

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
			value={filters.status ?? ALL}
			onValueChange={(v) => {
				if (v === ALL) {
					apply({ status: null });
					return;
				}

				if (isEnumValue(v, POST_STATUSES)) {
					apply({ status: v });
				}
			}}
			options={[
				{ label: 'All Status', value: ALL },
				{ label: 'Draft', value: 'draft' },
				{ label: 'Pending', value: 'pending' },
				{ label: 'Published', value: 'published' },
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
