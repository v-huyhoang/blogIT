import FormDialog from '@/components/dialogs/FormDialog';
import { useForm } from '@inertiajs/react';
import PermissionForm from './form';

interface CreatePermissionDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function CreatePermissionDialog({
	open,
	onOpenChange,
}: CreatePermissionDialogProps) {
	const { data, setData, post, processing, errors, reset } = useForm({
		name: '',
		description: '',
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		post('/permissions', {
			onSuccess: () => {
				onOpenChange(false);
				reset();
			},
		});
	};

	return (
		<FormDialog
			open={open}
			onOpenChange={onOpenChange}
			title="Add New Permission"
			onSubmit={handleSubmit}
			isSubmitting={processing}
		>
			<PermissionForm data={data} setData={setData} errors={errors} />
		</FormDialog>
	);
}
