import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PermissionFormProps {
	data: {
		name: string;
		description: string;
	};
	setData: (key: string, value: string) => void;
	errors: {
		name?: string;
		description?: string;
	};
}

export default function PermissionForm({
	data,
	setData,
	errors,
}: PermissionFormProps) {
	return (
		<div className="grid gap-4">
			<div className="grid gap-3">
				<Label htmlFor="name">Permission Name</Label>
				<Input
					id="name"
					name="name"
					placeholder="Permission Name"
					value={data.name}
					onChange={(e) => setData('name', e.target.value)}
					aria-invalid={!!errors.name}
				/>
				<InputError message={errors.name} />
			</div>

			<div className="grid gap-3">
				<Label htmlFor="description">Description</Label>
				<Input
					id="description"
					name="description"
					placeholder="Description"
					value={data.description}
					onChange={(e) => setData('description', e.target.value)}
					aria-invalid={!!errors.description}
				/>
				<InputError message={errors.description} />
			</div>
		</div>
	);
}
