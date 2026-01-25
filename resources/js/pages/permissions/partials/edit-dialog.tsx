import FormDialog from '@/components/dialogs/FormDialog';
import { SinglePermission } from '@/types';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import PermissionForm from './form';

interface EditPermissionDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	permission: SinglePermission | null;
}

export default function EditPermissionDialog({
	open,
	onOpenChange,
	permission,
}: EditPermissionDialogProps) {
	const { data, setData, put, processing, errors, reset } = useForm({
		name: '',
		description: '',
	});

	useEffect(() => {
		if (permission && open) {
			setData({
				name: permission.name,
				description: permission.description || '',
			});
		} else if (!open) {
			reset();
		}
	}, [permission, open, setData, reset]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!permission) return;

		put(`/permissions/${permission.id}`, {
			onSuccess: () => {
				onOpenChange(false);
			},
		});
	};

	return (
		<FormDialog
			open={open}
			onOpenChange={onOpenChange}
			title="Edit Permission"
			onSubmit={handleSubmit}
			isSubmitting={processing}
		>
			<PermissionForm data={data} setData={setData} errors={errors} />
		</FormDialog>
	);
}
