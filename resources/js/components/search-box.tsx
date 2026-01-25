import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchBox({
	defaultValue,
	placeholder = 'Search...',
	onSearch,
}: {
	defaultValue?: string;
	placeholder?: string;
	onSearch: (value: string) => void;
}) {
	return (
		<div className="relative">
			<Search className="absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				type="search"
				placeholder={placeholder}
				defaultValue={defaultValue}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						onSearch((e.target as HTMLInputElement).value);
					}
				}}
				className="w-[250px] pl-9"
			/>
		</div>
	);
}
