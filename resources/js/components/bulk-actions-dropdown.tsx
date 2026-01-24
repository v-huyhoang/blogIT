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

			<DropdownMenuContent align="start" className="w-40">
				{items.map((action) => (
					<DropdownMenuItem
						key={action.key}
						onClick={action.onClick}
						className={cn(
							'flex items-center gap-2 py-1 pl-2 transition-colors hover:cursor-pointer',
							action.destructive
								? 'text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-950/30'
								: 'focus:bg-accent focus:text-accent-foreground',
						)}
					>
						{action.icon && (
							<span
								className={cn(
									'shrink-0',
									action.destructive
										? 'text-red-500'
										: 'text-muted-foreground',
								)}
							>
								{action.icon}
							</span>
						)}
						<span className="font-medium">{action.label}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
