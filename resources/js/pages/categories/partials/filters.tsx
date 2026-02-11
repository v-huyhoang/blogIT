import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

import { FilterSection } from '@/components/filter-section';
import SearchBox, { SearchBoxRef } from '@/components/search-box';

import CategoryController from '@/actions/App/Http/Controllers/CategoryController';
import { StatusFilter } from '@/components/filters/status_v2';
import { cleanFilters } from '@/lib/clean-filters';
import { CategoryFilters } from '@/types';
import { ArrowUpDown, ChevronDown, Filter } from 'lucide-react';
import { SortOrderFilter } from '../../../components/filters/sort';

import { ActiveStatus } from '@/constants';

export function CategoryFilterAdvance({
	filters,
}: {
	filters: CategoryFilters;
}) {
	const [open, setOpen] = useState(false);
	const [localFilters, setLocalFilters] = useState<CategoryFilters>(filters);
	const inputRef = useRef<SearchBoxRef>(null);

	// Sync local filters with prop when opened
	useEffect(() => {
		if (open) {
			setLocalFilters(filters);
		}
	}, [open, filters]);

	const updateFilter = (next: Partial<CategoryFilters>) => {
		setLocalFilters((prev) => ({ ...prev, ...next }));
	};

	const apply = (next: Partial<CategoryFilters>) => {
		const payload = cleanFilters({
			...next,
			page: 1,
		});

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		router.get(CategoryController.index.url(), payload as any, {
			preserveScroll: true,
			preserveState: true,
			replace: true,
			onFinish: () => setOpen(false),
		});
	};

	const handleApply = () => {
		console.log(localFilters);
		apply(localFilters);
	};

	const handleReset = () => {
		setLocalFilters({
			q: localFilters.q ?? '',
		} as CategoryFilters);
	};

	return (
		<div className="flex flex-wrap items-center justify-between gap-3">
			<div className="flex flex-1 flex-wrap items-center gap-2">
				<div className="max-w-md min-w-[200px] flex-1">
					<SearchBox
						defaultValue={filters.q ?? ''}
						placeholder="Search Category..."
						onSearch={(q) => apply({ ...filters, q })}
						ref={inputRef}
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
						<ChevronDown className="h-4 w-4" />
					</Button>
				</PopoverTrigger>

				<PopoverContent
					align="end"
					className="mt-2 max-h-[80vh] w-[800px] overflow-y-auto p-4"
				>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
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
									{ label: 'Name', value: 'name' },
								]}
							/>
						</FilterSection>
						<StatusFilter
							filters={localFilters}
							apply={updateFilter}
							title="Status"
							filterKey="is_active"
							options={[
								{ label: 'Active', value: ActiveStatus.ACTIVE },
								{
									label: 'Inactive',
									value: ActiveStatus.INACTIVE,
								},
							]}
						/>
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
