import { SelectFilter } from '@/components/select-filter';
import { PostFilters } from '@/types';
import { Tag } from 'lucide-react';

const ALL = '__all__';

export function CategoryFilter({
	filters,
	apply,
	categories,
}: {
	filters: PostFilters;
	apply: (v: Partial<PostFilters>) => void;
	categories: { id: number; name: string }[];
}) {
	return (
		<SelectFilter
			title="Category"
			icon={<Tag className="size-4 text-primary" />}
			value={filters.category_id?.toString() ?? ALL}
			onValueChange={(v) =>
				apply({
					category_id: v === ALL ? null : Number(v),
				})
			}
			options={[
				{ label: 'All Categories', value: ALL },
				...categories.map((c) => ({
					label: c.name,
					value: String(c.id),
				})),
			]}
			placeholder="Category"
		/>
	);
}

export function TagFilter({
	filters,
	apply,
	tags,
}: {
	filters: PostFilters;
	apply: (v: Partial<PostFilters>) => void;
	tags: { id: number; name: string }[];
}) {
	return (
		<SelectFilter
			title="Tag"
			icon={<Tag className="size-4 text-primary" />}
			value={filters.tag_id?.toString() ?? ALL}
			onValueChange={(v) =>
				apply({
					tag_id: v === ALL ? null : Number(v),
				})
			}
			options={[
				{ label: 'All Tags', value: ALL },
				...tags.map((t) => ({
					label: t.name,
					value: String(t.id),
				})),
			]}
			placeholder="Tag"
		/>
	);
}
