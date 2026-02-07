import { BaseFilter, SortOrderFilterProps } from '@/types/filter';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

export function SortOrderFilter<T extends BaseFilter>({
	filters,
	apply,
	sortOptions,
}: SortOrderFilterProps<T>) {
	return (
		<div className="flex items-center gap-1.5">
			<Select
				value={filters.sort ?? ''}
				onValueChange={(v) => apply({ sort: v } as Partial<T>)}
			>
				<SelectTrigger className="h-8 flex-1 text-xs hover:cursor-pointer">
					<SelectValue placeholder="Sort by" />
				</SelectTrigger>
				<SelectContent>
					{sortOptions.map((option) => (
						<SelectItem
							key={option.value}
							value={option.value}
							className="text-xs"
						>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Select
				value={filters.direction ?? 'desc'}
				onValueChange={(v) =>
					apply({ direction: v as 'asc' | 'desc' } as Partial<T>)
				}
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
