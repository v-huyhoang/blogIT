import { FilterSection } from '@/components/filter-section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PostFilters } from '@/types/post';
import { CalendarIcon, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DateSection({
	filters,
	apply,
}: {
	filters: PostFilters;
	apply: (v: Partial<PostFilters>) => void;
}) {
	const [from, setFrom] = useState<string | ''>(filters.published_from ?? '');
	const [to, setTo] = useState<string | ''>(filters.published_to ?? '');

	// sync khi filter từ server đổi (Back / Reset all)
	useEffect(() => {
		setFrom(filters.published_from ?? '');
		setTo(filters.published_to ?? '');
	}, [filters.published_from, filters.published_to]);

	const hasValue = Boolean(from || to);
	const hasChanged =
		from !== (filters.published_from ?? '') ||
		to !== (filters.published_to ?? '');

	const canApply = Boolean(hasChanged && (from || to));

	const onApply = () => {
		apply({
			published_from: from || null,
			published_to: to || null,
		});
	};

	const onReset = () => {
		setFrom('');
		setTo('');

		if (filters.published_from || filters.published_to) {
			apply({
				published_from: null,
				published_to: null,
			});
		}
	};

	return (
		<FilterSection 
			title="Published Date" 
			icon={<CalendarIcon className="size-4 text-primary" />}
		>
			<div className="grid gap-4 py-2">
				<div className="space-y-1.5">
					<Label className="text-[11px] uppercase tracking-wider text-muted-foreground">From</Label>
					<Input
						type="date"
						value={from}
						onChange={(e) => setFrom(e.target.value)}
						className="h-9 transition-all focus:ring-2 focus:ring-primary/20"
					/>
				</div>

				<div className="space-y-1.5">
					<Label className="text-[11px] uppercase tracking-wider text-muted-foreground">To</Label>
					<Input
						type="date"
						value={to}
						onChange={(e) => setTo(e.target.value)}
						className="h-9 transition-all focus:ring-2 focus:ring-primary/20"
					/>
				</div>
			</div>

			<div className="flex items-center justify-between gap-2 pt-2 border-t mt-2">
				<Button
					size="sm"
					variant="ghost"
					disabled={!hasValue}
					onClick={onReset}
					className="h-8 text-xs text-muted-foreground hover:text-destructive"
				>
					<RefreshCw className="mr-1.5 size-3" />
					Reset
				</Button>

				<div className="flex gap-2">
					<Button 
						size="sm" 
						disabled={!canApply} 
						onClick={onApply}
						className="h-8 px-4 text-xs shadow-sm"
					>
						Apply Filter
					</Button>
				</div>
			</div>
		</FilterSection>
	);
}
