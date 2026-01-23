import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import * as React from 'react';

export interface Option {
	label: string;
	value: string | number;
}

interface MultiSelectProps {
	options: Option[];
	selected: (string | number)[];
	onChange: (values: (string | number)[]) => void;
	placeholder?: string;
	className?: string;
}

export function MultiSelect({
	options,
	selected,
	onChange,
	placeholder = 'Select items...',
	className,
}: MultiSelectProps) {
	const [open, setOpen] = React.useState(false);
	const [search, setSearch] = React.useState('');

	const filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(search.toLowerCase()),
	);

	const handleSelect = (value: string | number) => {
		if (selected.includes(value)) {
			onChange(selected.filter((item) => item !== value));
		} else {
			onChange([...selected, value]);
		}
	};

	const handleRemove = (e: React.MouseEvent, value: string | number) => {
		e.stopPropagation();
		onChange(selected.filter((item) => item !== value));
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn(
						'h-auto min-h-10 w-full justify-between hover:cursor-pointer',
						className,
					)}
				>
					<div className="flex flex-wrap gap-1 py-1 text-left">
						{selected.length > 0 ? (
							selected.map((val) => {
								const option = options.find(
									(o) => o.value === val,
								);
								return (
									<Badge
										key={val}
										variant="secondary"
										className="mr-1 mb-1 bg-blue-100/50 hover:bg-blue-100/80"
									>
										{option?.label ?? val}
										<div
											className="ml-1 rounded-full p-0.5 hover:cursor-pointer hover:bg-muted-foreground/20"
											onClick={(e) =>
												handleRemove(e, val)
											}
										>
											<X className="size-3" />
										</div>
									</Badge>
								);
							})
						) : (
							<span className="text-muted-foreground">
								{placeholder}
							</span>
						)}
					</div>
					<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full min-w-[500px] p-2" align="start">
				<Input
					placeholder="Search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="h-8 text-xs focus-visible:ring-1"
				/>
				<div className="mt-2 max-h-[200px] space-y-1 overflow-y-auto">
					{filteredOptions.length === 0 ? (
						<div className="py-2 text-center text-xs text-muted-foreground">
							No items found.
						</div>
					) : (
						filteredOptions.map((option) => {
							const isSelected = selected.includes(option.value);
							return (
								<div
									key={option.value}
									className={cn(
										'flex items-center gap-1 rounded-sm px-2 py-1.5 text-sm hover:cursor-pointer hover:bg-accent hover:text-accent-foreground',
										isSelected && 'bg-accent',
									)}
									onClick={() => handleSelect(option.value)}
								>
									<div
										className={cn(
											'flex size-4 items-center justify-center rounded-sm border border-primary',
											isSelected
												? 'bg-primary text-primary-foreground'
												: 'opacity-50 [&_svg]:invisible',
										)}
									>
										<Check className="size-3" />
									</div>
									<span>{option.label}</span>
								</div>
							);
						})
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}
