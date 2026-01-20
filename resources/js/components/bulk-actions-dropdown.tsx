import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { EllipsisVerticalIcon } from 'lucide-react';
import React from 'react';

type BulkAction = {
	key: string;
	label: string;
	icon?: React.ReactNode;
	destructive?: boolean;
	visible?: boolean;
	onClick: () => void;
};

export function BulkActionsDropdown({
	disabled,
	actions,
}: {
	disabled: boolean;
	actions: BulkAction[];
}) {
	const items = actions.filter((a) => a.visible !== false);

	if (items.length === 0) return null;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					disabled={disabled}
					className="hover:cursor-pointer"
				>
					<EllipsisVerticalIcon className="h-4 w-4" />
					Bulk actions
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="start">
				{items.map((action) => (
					<DropdownMenuItem
						key={action.key}
						onClick={action.onClick}
						className={cn(
							'flex items-center gap-2 hover:cursor-pointer',
							action.destructive ? 'text-red-600' : undefined,
						)}
					>
						{action.icon}
						{action.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
