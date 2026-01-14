import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { UserRole } from '@/types/user';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Edit Users',
		href: '/users/edit',
	},
];

export default function EditUsers({
	roles,
	user,
}: {
	roles: string[];
	user: UserRole;
}) {
	const roleList = user.roles.map((role) => role.name);

	const { data, setData, put, processing, errors } = useForm({
		name: user.name,
		email: user.email,
		roles: roleList || [],
	});

	function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		put(`/users/${user.id}`);
	}

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Edit Users" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Card>
					<CardHeader className="flex items-center justify-between">
						<CardTitle>Edit User</CardTitle>
						<CardAction>
							<Link href={'/users'}>
								<Button variant="default">Go back</Button>
							</Link>
						</CardAction>
					</CardHeader>
					<hr />
					<CardContent>
						<form onSubmit={submit}>
							<div className="mb-4">
								<Label htmlFor="name">User Name</Label>
								<Input
									id="name"
									type="text"
									value={data.name}
									onChange={(e) =>
										setData('name', e.target.value)
									}
									aria-invalid={!!errors.name}
								/>
								<InputError
									message={errors.name}
									className="mt-2"
								/>
							</div>
							<div className="mb-4">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="text"
									value={data.email}
									onChange={(e) =>
										setData('email', e.target.value)
									}
									aria-invalid={!!errors.email}
								/>
								<InputError
									message={errors.email}
									className="mt-2"
								/>
							</div>
							<Label htmlFor="roles">Select Roles</Label>
							<div className="my-4">
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
									{roles.map((role) => (
										<div
											key={role}
											className="flex items-center gap-3"
										>
											<Checkbox
												id={role}
												checked={data.roles.includes(
													role,
												)}
												onCheckedChange={(checked) => {
													if (checked) {
														setData('roles', [
															...data.roles,
															role,
														]);
													} else {
														setData(
															'roles',
															data.roles.filter(
																(p) =>
																	p !== role,
															),
														);
													}
												}}
											/>
											<Label htmlFor={role}>{role}</Label>
										</div>
									))}
								</div>
							</div>
							<div className="flex justify-end">
								<Button
									size={'lg'}
									type="submit"
									disabled={processing}
								>
									Update
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
}
