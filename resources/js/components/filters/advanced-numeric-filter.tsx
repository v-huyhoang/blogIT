import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { PostFilters } from '@/types';
import React, { useState } from 'react';

interface AdvancedNumericFilterProps {
	fields: { label: string; value: string }[];
	filters: PostFilters;
	apply: (v: Partial<PostFilters>) => void;
}

const OPERATORS = [
	{ label: '=', value: '__exact__' },
	{ label: '>', value: '_gt' },
	{ label: '>=', value: '_gte' },
	{ label: '<', value: '_lt' },
	{ label: '<=', value: '_lte' },
];

export function AdvancedNumericFilter({
	fields,
	filters,
	apply,
}: AdvancedNumericFilterProps) {
	const [selectedField, setSelectedField] = useState<string>(
		fields[0]?.value || '',
	);
	const [operator, setOperator] = useState<string>('__exact__');
	const [value, setValue] = useState<string>('');

	// Sync local state with filters prop when selectedField changes
	React.useEffect(() => {
		const activeOp = OPERATORS.find((op) => {
			const suffix = op.value === '__exact__' ? '' : op.value;
			const key = `${selectedField}${suffix}`;
			return filters[key] !== undefined && filters[key] !== null;
		});

		if (activeOp) {
			setOperator(activeOp.value);
			const suffix = activeOp.value === '__exact__' ? '' : activeOp.value;
			setValue(String(filters[`${selectedField}${suffix}`] ?? ''));
		} else {
			setOperator('__exact__');
			setValue('');
		}
	}, [filters, selectedField]);

	// Sync local changes to parent
	React.useEffect(() => {
		if (!selectedField) return;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const updates: any = {};

		// Clear all possible operator keys for the currently selected field
		OPERATORS.forEach((op) => {
			const suffix = op.value === '__exact__' ? '' : op.value;
			updates[`${selectedField}${suffix}`] = null;
		});

		// Set the new one if value is not empty
		if (value !== '') {
			const suffix = operator === '__exact__' ? '' : operator;
			const key = `${selectedField}${suffix}`;
			updates[key] = value;
		}

		apply(updates);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [operator, value]); // Intentionally exclude selectedField to avoid double-firing on switch

	return (
		<div className="flex items-center gap-1.5 py-1">
			<Select value={selectedField} onValueChange={setSelectedField}>
				<SelectTrigger className="h-8 w-1/2 text-xs hover:cursor-pointer">
					<SelectValue placeholder="Field" />
				</SelectTrigger>
				<SelectContent>
					{fields.map((f) => (
						<SelectItem
							key={f.value}
							value={f.value}
							className="text-xs"
						>
							{f.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Select value={operator} onValueChange={setOperator}>
				<SelectTrigger className="h-8 w-1/4 text-xs hover:cursor-pointer">
					<SelectValue placeholder="Op" />
				</SelectTrigger>
				<SelectContent>
					{OPERATORS.map((op) => (
						<SelectItem
							key={op.value}
							value={op.value}
							className="text-xs"
						>
							{op.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Input
				type="number"
				placeholder="Value"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="h-8 w-1/4 text-xs hover:cursor-pointer"
			/>
		</div>
	);
}
