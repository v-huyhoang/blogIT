import { FilterSection } from '@/components/filter-section';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { PostFilters } from '@/types/post';
import { ArrowUpDown } from 'lucide-react';

export function SortSection({
	filters,
	apply,
}: {
	filters: PostFilters;
	apply: (v: Partial<PostFilters>) => void;
}) {
	return (
		<FilterSection title="Sort & Order" icon={<ArrowUpDown className="size-4 text-primary" />}>
			<div className="grid grid-cols-2 gap-2">
				<Select
					value={filters.sort ?? 'id'}
					onValueChange={(v) => apply({ sort: v })}
				>
					<SelectTrigger className="h-9">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="id">ID</SelectItem>
						<SelectItem value="published_at">Published</SelectItem>
						<SelectItem value="created_at">Created</SelectItem>
						<SelectItem value="title">Title</SelectItem>
						<SelectItem value="views_count">Views</SelectItem>
						<SelectItem value="comments_count">Comments</SelectItem>
						<SelectItem value="likes_count">Likes</SelectItem>
					</SelectContent>
				</Select>

				<Select
					value={filters.direction ?? 'desc'}
					onValueChange={(v) => apply({ direction: v as 'asc' | 'desc' })}
				>
					<SelectTrigger className="h-9">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="desc">Desc</SelectItem>
						<SelectItem value="asc">Asc</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</FilterSection>
	);
}
