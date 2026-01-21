import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { router } from '@inertiajs/react';

import PostController from '@/actions/App/Http/Controllers/Admin/PostController';
import { ResetButton } from '@/components/reset-button';
import { SearchBox } from '@/components/search-box';
import { cleanFilters } from '@/lib/clean-filters';
import { PostFilters } from '@/types/post';
import { ChevronDown, Filter } from 'lucide-react';
import { AuthorSection } from '../../../../components/filters/author';
import { DateSection } from '../../../../components/filters/date';
import { SortSection } from '../../../../components/filters/sort';
import { StatusSection } from '../../../../components/filters/status';
import { TaxonomySection } from '../../../../components/filters/taxonomy';

export function PostFilterAdvance({
	filters,
	tags,
	categories,
	users,
}: {
	filters: PostFilters;
	tags: { id: number; name: string }[];
	categories: { id: number; name: string }[];
	users: { id: number; name: string }[];
}) {
	const apply = (next: Partial<PostFilters>) => {
		const payload = cleanFilters({
			...filters,
			...next,
			page: 1,
		});

		router.get(PostController.index.url(), payload, {
			preserveScroll: true,
			preserveState: true,
			replace: true,
		});
	};

	const onReset = () => {
		router.get(
			PostController.index.url(),
			{},
			{
				preserveScroll: true,
				preserveState: true,
				replace: true,
			},
		);
	};

	return (
		<div className="flex items-center justify-between gap-2">
			<SearchBox
				defaultValue={filters.q ?? ''}
				placeholder="Search posts..."
				onSearch={(q) => apply({ q })}
			/>

			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						className="hover:cursor-pointer"
					>
						<Filter className="h-4 w-4" />
						Filters
						<ChevronDown className="h-4 w-4" />
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-[420px] space-y-4">
					<StatusSection filters={filters} apply={apply} />
					<TaxonomySection
						filters={filters}
						apply={apply}
						tags={tags}
						categories={categories}
					/>
					<AuthorSection
						filters={filters}
						apply={apply}
						users={users}
					/>
					<DateSection filters={filters} apply={apply} />
					<SortSection filters={filters} apply={apply} />

					<ResetButton onReset={onReset} />
				</PopoverContent>
			</Popover>
		</div>
	);
}
