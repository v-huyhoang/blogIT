import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useDialogStore } from '@/lib/dialog-store';

export default function ConfirmDialog() {
	const { isOpen, options, close } = useDialogStore();

	const handleConfirm = () => {
		close(true);
	};

	const handleCancel = () => {
		close(false);
	};

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			handleCancel();
		}
	};

	if (!options) return null;

	return (
		<AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{options.title}</AlertDialogTitle>
					{options.message && (
						<AlertDialogDescription>
							{options.message}
						</AlertDialogDescription>
					)}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={handleCancel}>
						{options.cancelText || 'Cancel'}
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleConfirm}
						className="bg-red-500 text-white hover:bg-destructive"
					>
						{options.confirmText || 'Confirm'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
