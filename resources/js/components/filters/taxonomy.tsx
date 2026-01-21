import { FilterSection } from '@/components/filter-section';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { PostFilters } from '@/types/post';
import { Tag } from 'lucide-react';

const ALL = '__all__';

export function TaxonomySection({
	filters,
	apply,
	categories,
	tags,
}: {
	filters: PostFilters;
	apply: (v: Partial<PostFilters>) => void;
	categories: { id: number; name: string }[];
	tags: { id: number; name: string }[];
}) {
	return (
		<FilterSection
			title="Taxonomy"
			icon={<Tag className="size-4 text-primary" />}
		>
			<div className="grid grid-cols-2 gap-2">
				{/* CATEGORY */}
				<Select
					value={filters.category_id?.toString() ?? ALL}
					onValueChange={(v) =>
						apply({
							category_id: v === ALL ? null : Number(v),
						})
					}
				>
					<SelectTrigger className="h-9">
						<SelectValue placeholder="Category" />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value={ALL}>All Categories</SelectItem>
						{categories.map((c) => (
							<SelectItem key={c.id} value={String(c.id)}>
								{c.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{/* TAG */}
				<Select
					value={filters.tag_id?.toString() ?? ALL}
					onValueChange={(v) =>
						apply({
							tag_id: v === ALL ? null : Number(v),
						})
					}
				>
					<SelectTrigger className="h-9">
						<SelectValue placeholder="Tag" />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value={ALL}>All Tags</SelectItem>
						{tags.map((t) => (
							<SelectItem key={t.id} value={String(t.id)}>
								{t.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</FilterSection>
	);
}
