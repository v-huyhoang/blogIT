import { FilterSection } from '@/components/filter-section';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { POST_STATUSES, TRASHED_OPTIONS } from '@/constants/enums';
import { enumOrNull, isEnumValue } from '@/lib/enum';
import { PostFilters } from '@/types/post';
import { Activity } from 'lucide-react';

const ALL = '__all__';

export function StatusSection({
	filters,
	apply,
}: {
	filters: PostFilters;
	apply: (v: Partial<PostFilters>) => void;
}) {
	return (
		<FilterSection
			title="Status & Visibility"
			icon={<Activity className="size-4 text-primary" />}
		>
			<div className="grid grid-cols-1 gap-2">
				<Select
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
				>
					<SelectTrigger className="h-9 w-full">
						<SelectValue placeholder="All status" />
					</SelectTrigger>
					<SelectContent className="max-h-[200px]">
						<SelectItem value={ALL}>All Status</SelectItem>
						<SelectItem value="draft">Draft</SelectItem>
						<SelectItem value="pending">Pending</SelectItem>
						<SelectItem value="published">Published</SelectItem>
					</SelectContent>
				</Select>

				<Select
					value={filters.trashed ?? ALL}
					onValueChange={(v) =>
						apply({
							trashed:
								v === ALL
									? null
									: enumOrNull(v, TRASHED_OPTIONS),
						})
					}
				>
					<SelectTrigger className="h-9 w-full">
						<SelectValue placeholder="Active only" />
					</SelectTrigger>
					<SelectContent className="max-h-[200px]">
						<SelectItem value={ALL}>Active</SelectItem>
						<SelectItem value="with">With Trashed</SelectItem>
						<SelectItem value="only">Trashed Only</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</FilterSection>
	);
}
