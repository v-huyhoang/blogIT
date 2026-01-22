import { Button } from '@/components/ui/button';

export function ResetButton({ onReset }: { onReset: () => void }) {
	return (
		<div className="pt-2 text-right">
			<Button
				size="sm"
				variant="secondary"
				onClick={onReset}
				className="hover:cursor-pointer hover:bg-gray-200"
			>
				Reset filters
			</Button>
		</div>
	);
}
