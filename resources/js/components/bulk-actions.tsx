// components/bulk/BulkActions.tsx
import { Button } from '@/components/ui/button';

export type BulkAction = {
	key: string;
	label: string;
	variant?: 'default' | 'outline' | 'destructive';
	onClick: () => void;
	visible?: boolean;
};

export function BulkActions({
	selectedCount,
	actions,
}: {
	selectedCount: number;
	actions: BulkAction[];
}) {
	const disabled = selectedCount === 0;

	return (
		<div className="flex items-center gap-2">
			<span className="text-sm text-muted-foreground">
				Selected: {selectedCount}
			</span>

			{actions
				.filter((a) => a.visible !== false)
				.map((action) => (
					<Button
						key={action.key}
						size="sm"
						variant={action.variant ?? 'outline'}
						disabled={disabled}
						onClick={action.onClick}
					>
						{action.label}
					</Button>
				))}
		</div>
	);
}
