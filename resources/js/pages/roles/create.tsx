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
import { SinglePermission, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useMemo } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Create Roles',
		href: '/roles/create',
	},
];

export default function CreateRoles({
	permissions,
}: {
	permissions: SinglePermission[];
}) {
	const { data, setData, post, processing, errors } = useForm({
		name: '',
		description: '',
		permissions: [] as string[],
	});

	const groupedPermissions = useMemo(() => {
		return permissions.reduce(
			(acc, permission) => {
				const parts = permission.name.split('_');
				const model = parts.length > 1 ? parts.pop()! : 'other';
				if (!acc[model]) {
					acc[model] = [];
				}
				acc[model].push(permission);
				return acc;
			},
			{} as Record<string, SinglePermission[]>,
		);
	}, [permissions]);

	function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		post('/roles');
	}

	const handlePermissionChange = (name: string, checked: boolean) => {
		if (checked) {
			setData('permissions', [...data.permissions, name]);
		} else {
			setData(
				'permissions',
				data.permissions.filter((p) => p !== name),
			);
		}
	};

	const handleSelectAllGroup = (
		groupPermissions: string[],
		checked: boolean,
	) => {
		if (checked) {
			const newPermissions = Array.from(
				new Set([...data.permissions, ...groupPermissions]),
			);
			setData('permissions', newPermissions);
		} else {
			setData(
				'permissions',
				data.permissions.filter((p) => !groupPermissions.includes(p)),
			);
		}
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Roles" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Card>
					<CardHeader className="flex items-center justify-between">
						<CardTitle>Create Role</CardTitle>
						<CardAction>
							<Link href={'/roles'}>
								<Button variant="default">Go back</Button>
							</Link>
						</CardAction>
					</CardHeader>
					<hr />
					<CardContent>
						<form onSubmit={submit}>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="name">Role Name</Label>
									<Input
										id="name"
										type="text"
										value={data.name}
										onChange={(e) =>
											setData('name', e.target.value)
										}
										aria-invalid={!!errors.name}
										placeholder="e.g. Editor"
									/>
									<InputError message={errors.name} />
								</div>
								<div className="space-y-2">
									<Label htmlFor="description">
										Description
									</Label>
									<Input
										id="description"
										type="text"
										value={data.description}
										onChange={(e) =>
											setData(
												'description',
												e.target.value,
											)
										}
										aria-invalid={!!errors.description}
										placeholder="Describe the role's purpose"
									/>
									<InputError message={errors.description} />
								</div>
							</div>

							<div className="mt-8">
								<Label className="mb-4 block text-lg font-semibold text-gray-900">
									Permissions Assignment
								</Label>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
									{Object.entries(groupedPermissions).map(
										([model, perms]) => {
											const groupNames = perms.map(
												(p) => p.name,
											);
											const isAllSelected =
												groupNames.every((name) =>
													data.permissions.includes(
														name,
													),
												);

											return (
												<div
													key={model}
													className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
												>
													<div className="flex items-center justify-between border-b bg-gray-50/50 px-4 py-2.5">
														<h3 className="text-sm font-bold text-gray-800 capitalize">
															{model}
														</h3>
														<div className="flex items-center gap-2">
															<Checkbox
																id={`select-all-${model}`}
																checked={
																	isAllSelected
																}
																onCheckedChange={(
																	checked,
																) =>
																	handleSelectAllGroup(
																		groupNames,
																		!!checked,
																	)
																}
															/>
															<Label
																htmlFor={`select-all-${model}`}
																className="cursor-pointer text-[11px] font-medium tracking-wider text-gray-500 uppercase"
															>
																Select All
															</Label>
														</div>
													</div>
													<div className="grid grid-cols-1 gap-x-4 gap-y-2 p-4 sm:grid-cols-3 lg:grid-cols-4">
														{perms.map(
															(permission) => (
																<div
																	key={
																		permission.id
																	}
																	className="flex items-center gap-2.5"
																>
																	<Checkbox
																		id={
																			permission.name
																		}
																		checked={data.permissions.includes(
																			permission.name,
																		)}
																		onCheckedChange={(
																			checked,
																		) =>
																			handlePermissionChange(
																				permission.name,
																				!!checked,
																			)
																		}
																	/>
																	<Label
																		htmlFor={
																			permission.name
																		}
																		className="cursor-pointer text-xs font-medium text-gray-600 transition-colors hover:text-gray-900"
																	>
																		{permission.name
																			.replace(
																				`_${model}`,
																				'',
																			)
																			.replace(
																				/_/g,
																				' ',
																			)
																			.replace(
																				/^\w/,
																				(
																					c,
																				) =>
																					c.toUpperCase(),
																			)}
																	</Label>
																</div>
															),
														)}
													</div>
												</div>
											);
										},
									)}
								</div>
							</div>
							<div className="mt-8 flex justify-end">
								<Button
									size={'lg'}
									type="submit"
									disabled={processing}
									className="px-8"
								>
									{processing ? 'Creating...' : 'Create Role'}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
}
