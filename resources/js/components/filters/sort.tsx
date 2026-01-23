import { PostFilters } from '@/types/post';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

export function SortOrderFilter({
	filters,
	apply,
}: {
	filters: PostFilters;
	apply: (v: Partial<PostFilters>) => void;
}) {
	return (
		<div className="flex items-center gap-1.5 py-1">
			<Select
				value={filters.sort ?? ''}
				onValueChange={(v) => apply({ sort: v })}
			>
				<SelectTrigger className="h-8 flex-1 text-xs hover:cursor-pointer">
					<SelectValue placeholder="Sort by" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="id" className="text-xs">
						ID
					</SelectItem>
					<SelectItem value="published_at" className="text-xs">
						Published
					</SelectItem>
					<SelectItem value="created_at" className="text-xs">
						Created
					</SelectItem>
					<SelectItem value="title" className="text-xs">
						Title
					</SelectItem>
					<SelectItem value="views_count" className="text-xs">
						Views
					</SelectItem>
					<SelectItem value="comments_count" className="text-xs">
						Comments
					</SelectItem>
					<SelectItem value="likes_count" className="text-xs">
						Likes
					</SelectItem>
				</SelectContent>
			</Select>

			<Select
				value={filters.direction ?? 'desc'}
				onValueChange={(v) => apply({ direction: v as 'asc' | 'desc' })}
			>
				<SelectTrigger className="h-8 w-[120px] text-xs hover:cursor-pointer">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="desc" className="text-xs">
						Desc
					</SelectItem>
					<SelectItem value="asc" className="text-xs">
						Asc
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
