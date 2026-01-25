import { FilterSection } from '@/components/filter-section';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import React from 'react';

interface SelectFilterProps {
	title: string;
	icon?: React.ReactNode;
	value?: string;
	onValueChange: (value: string) => void;
	options: { label: string; value: string }[];
	placeholder?: string;
	className?: string;
}

export function SelectFilter({
	title,
	icon,
	value,
	onValueChange,
	options,
	placeholder,
}: SelectFilterProps) {
	return (
		<FilterSection title={title} icon={icon}>
			<Select value={value} onValueChange={onValueChange}>
				<SelectTrigger className="h-9 w-full text-xs hover:cursor-pointer">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent className="max-h-[200px]">
					{options.map((option) => (
						<SelectItem
							key={option.value}
							value={option.value}
							className="hover:cursor-pointer"
						>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</FilterSection>
	);
}
