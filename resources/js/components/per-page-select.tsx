import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { PAGINATION_OPTIONS } from '@/constants/pagination';
import { cleanFilters } from '@/lib/clean-filters';
import { router } from '@inertiajs/react';

export function PerPageSelect({
	value,
	filters,
	url,
	options = [...PAGINATION_OPTIONS],
}: {
	value: number | null;
	filters: Record<string, unknown>;
	url: string;
	options?: number[];
}) {
	const apply = (perPage: string) => {
		const payload = cleanFilters({
			...filters,
			per_page: Number(perPage),
			page: 1,
		});

		router.get(url, payload, {
			preserveScroll: true,
			preserveState: true,
			replace: true,
		});
	};

	return (
		<Select value={String(value ?? options[0])} onValueChange={apply}>
			<SelectTrigger className="h-8 w-[70px]">
				<SelectValue placeholder={String(value)} />
			</SelectTrigger>
			<SelectContent>
				{options.map((n) => (
					<SelectItem key={n} value={String(n)}>
						{n}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
