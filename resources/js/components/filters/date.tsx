import { FilterSection } from '@/components/filter-section';
import { Input } from '@/components/ui/input';
import { PostFilters } from '@/types';
import { CalendarIcon } from 'lucide-react';

export function DateSection({
	filters,
	apply,
}: {
	filters: PostFilters;
	apply: (v: Partial<PostFilters>) => void;
}) {
	const onChange = (
		key: 'published_at_from' | 'published_at_to',
		value: string,
	) => {
		apply({ [key]: value || null });
	};

	return (
		<FilterSection
			title="Published Date"
			icon={<CalendarIcon className="size-4 text-primary" />}
		>
			<div className="grid grid-cols-2 gap-2">
				<div className="space-y-1.5">
					<Input
						type="date"
						value={filters.published_at_from ?? ''}
						onChange={(e) =>
							onChange('published_at_from', e.target.value)
						}
						className="h-9 w-full !text-xs transition-all hover:cursor-pointer focus:ring-2 focus:ring-primary/20"
					/>
				</div>

				<div className="space-y-1.5">
					<Input
						type="date"
						value={filters.published_at_to ?? ''}
						onChange={(e) =>
							onChange('published_at_to', e.target.value)
						}
						className="h-9 w-full !text-xs transition-all hover:cursor-pointer focus:ring-2 focus:ring-primary/20"
					/>
				</div>
			</div>
		</FilterSection>
	);
}
