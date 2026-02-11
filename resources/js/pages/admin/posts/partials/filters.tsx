import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

import PostController from '@/actions/App/Http/Controllers/Admin/PostController';
import { FilterSection } from '@/components/filter-section';
import SearchBox, { SearchBoxRef } from '@/components/search-box';
import {
	METRIC_FILTER_SUFFIXES,
	RESERVED_FILTER_KEYS,
	TRASHED_ONLY,
} from '@/constants';
import { cleanFilters } from '@/lib/clean-filters';
import { PostFilters } from '@/types';
import { ArrowUpDown, ChevronDown, Filter, PlusCircle, X } from 'lucide-react';
import { AdvancedNumericFilter } from '../../../../components/filters/advanced-numeric-filter';
import { AuthorSection } from '../../../../components/filters/author';
import { DateSection } from '../../../../components/filters/date';
import { SortOrderFilter } from '../../../../components/filters/sort';
import {
	FeaturedFilter,
	StatusFilter,
	VisibilityFilter,
} from '../../../../components/filters/status';
import {
	CategoryFilter,
	TagFilter,
} from '../../../../components/filters/taxonomy';

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
	const [open, setOpen] = useState(false);
	const [localFilters, setLocalFilters] = useState<PostFilters>(filters);
	const inputRef = useRef<SearchBoxRef>(null);

	// Sync local filters with prop when opened
	useEffect(() => {
		if (open) {
			setLocalFilters(filters);
		}
		if (filters.length == 0) {
			inputRef.current?.reset();
		}
	}, [open, filters]);

	const updateFilter = (next: Partial<PostFilters>) => {
		setLocalFilters((prev) => ({ ...prev, ...next }));
	};

	const apply = (next: Partial<PostFilters>) => {
		const payload = cleanFilters({
			...next,
		});

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		router.get(PostController.index.url(), payload as any, {
			preserveScroll: true,
			preserveState: true,
			replace: true,
			onFinish: () => setOpen(false),
		});
	};

	const handleApply = () => {
		apply(localFilters);
	};

	const handleReset = () => {
		setLocalFilters({
			q: localFilters.q ?? '',
		} as PostFilters);
	};

	const removeFilter = (key: string) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const next = { ...filters } as any;
		delete next[key];

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		router.get(PostController.index.url(), cleanFilters(next) as any, {
			preserveScroll: true,
			preserveState: true,
			replace: true,
		});
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const getFilterLabel = (key: string, value: any): string | null => {
		if (value === null || value === '' || value === undefined) return null;

		switch (key) {
			case 'status':
				return `Status: ${value}`;
			case 'category_id': {
				const category = categories.find(
					(c) => String(c.id) === String(value),
				);
				return category
					? `Category: ${category.name}`
					: `Category: ${value}`;
			}
			case 'user_id': {
				const user = users.find((u) => String(u.id) === String(value));
				return user ? `Author: ${user.name}` : `Author: ${value}`;
			}
			case 'tag_id': {
				const tag = tags.find((t) => String(t.id) === String(value));
				return tag ? `Tag: ${tag.name}` : `Tag: ${value}`;
			}
			case 'trashed':
				return `Visibility: ${value === TRASHED_ONLY ? 'Trashed' : 'With Trashed'}`;
			case 'published_at_from':
				return `From: ${value}`;
			case 'published_at_to':
				return `To: ${value}`;
			case 'is_featured': {
				const isFeatured =
					value === 'true' ||
					value === true ||
					value === '1' ||
					value === 1;
				return isFeatured ? 'Featured: Yes' : 'Featured: No';
			}
		}

		if (key.endsWith(METRIC_FILTER_SUFFIXES.GT))
			return `${key.replace(`${METRIC_FILTER_SUFFIXES.COUNT}${METRIC_FILTER_SUFFIXES.GT}`, '')} > ${value}`;
		if (key.endsWith(METRIC_FILTER_SUFFIXES.GTE))
			return `${key.replace(`${METRIC_FILTER_SUFFIXES.COUNT}${METRIC_FILTER_SUFFIXES.GTE}`, '')} >= ${value}`;
		if (key.endsWith(METRIC_FILTER_SUFFIXES.LT))
			return `${key.replace(`${METRIC_FILTER_SUFFIXES.COUNT}${METRIC_FILTER_SUFFIXES.LT}`, '')} < ${value}`;
		if (key.endsWith(METRIC_FILTER_SUFFIXES.LTE))
			return `${key.replace(`${METRIC_FILTER_SUFFIXES.COUNT}${METRIC_FILTER_SUFFIXES.LTE}`, '')} <= ${value}`;

		const isExactMetric = [
			'views_count',
			'comments_count',
			'likes_count',
		].includes(key);
		if (isExactMetric)
			return `${key.replace(METRIC_FILTER_SUFFIXES.COUNT, '')} = ${value}`;

		return null;
	};

	const activeFilters = Object.entries(filters).filter(([key, value]) => {
		return (
			!RESERVED_FILTER_KEYS.includes(key) &&
			getFilterLabel(key, value) !== null
		);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}) as [string, any][];

	return (
		<div className="flex flex-wrap items-center justify-between gap-3">
			<div className="flex flex-1 flex-wrap items-center gap-2">
				{activeFilters.length > 0 && (
					<div className="mr-2 flex flex-wrap items-center gap-1.5">
						{activeFilters.map(([key, value]) => (
							<Badge
								key={key}
								variant="secondary"
								className="h-7 pr-1 pl-2 hover:bg-gray-100/60 hover:shadow-xs"
							>
								{getFilterLabel(key, value)}
								<button
									onClick={() => removeFilter(key)}
									className="ml-1 rounded-full p-0.5 transition-colors hover:cursor-pointer hover:bg-muted-foreground/20"
								>
									<X className="size-3" />
								</button>
							</Badge>
						))}
					</div>
				)}

				<div className="max-w-md min-w-[200px] flex-1">
					<SearchBox
						ref={inputRef}
						defaultValue={filters.q ?? ''}
						placeholder="Search posts..."
						onSearch={(q) => apply({ ...filters, q })}
					/>
				</div>
			</div>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						className="shrink-0 hover:cursor-pointer"
					>
						<Filter className="h-4 w-4" />
						Filters
						{activeFilters.length > 0 && (
							<span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
								{activeFilters.length}
							</span>
						)}
						<ChevronDown className="h-4 w-4" />
					</Button>
				</PopoverTrigger>

				<PopoverContent
					align="end"
					className="max-h-[80vh] w-[800px] overflow-y-auto p-4"
				>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
						<StatusFilter
							filters={localFilters}
							apply={updateFilter}
						/>
						<VisibilityFilter
							filters={localFilters}
							apply={updateFilter}
						/>
						<FeaturedFilter
							filters={localFilters}
							apply={updateFilter}
						/>
						<CategoryFilter
							filters={localFilters}
							apply={updateFilter}
							categories={categories}
						/>
						<TagFilter
							filters={localFilters}
							apply={updateFilter}
							tags={tags}
						/>
						<AuthorSection
							filters={localFilters}
							apply={updateFilter}
							users={users}
						/>
						<DateSection
							filters={localFilters}
							apply={updateFilter}
						/>
						<FilterSection
							title="Metrics"
							icon={
								<PlusCircle className="size-4 text-primary" />
							}
						>
							<AdvancedNumericFilter
								fields={[
									{ label: 'Views', value: 'views_count' },
									{
										label: 'Comments',
										value: 'comments_count',
									},
									{ label: 'Likes', value: 'likes_count' },
								]}
								filters={localFilters}
								apply={updateFilter}
							/>
						</FilterSection>
						<FilterSection
							title="Sort Order"
							icon={
								<ArrowUpDown className="size-4 text-primary" />
							}
						>
							<SortOrderFilter
								filters={localFilters}
								apply={updateFilter}
								sortOptions={[
									{ label: 'ID', value: 'id' },
									{
										label: 'Published',
										value: 'published_at',
									},
									{ label: 'Created', value: 'created_at' },
									{ label: 'Title', value: 'title' },
									{ label: 'Views', value: 'views_count' },
									{
										label: 'Comments',
										value: 'comments_count',
									},
									{ label: 'Likes', value: 'likes_count' },
								]}
							/>
						</FilterSection>
					</div>

					<div className="mt-4 flex items-center justify-end gap-2 border-t pt-4">
						<Button
							variant="ghost"
							size="sm"
							onClick={handleReset}
							className="hover:cursor-pointer"
						>
							Reset
						</Button>
						<Button
							size="sm"
							onClick={handleApply}
							className="hover:cursor-pointer"
						>
							Apply Filter
						</Button>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
