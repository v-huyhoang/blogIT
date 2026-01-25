import TablePagination from '@/components/table-pagination';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { usePermissions } from '@/hooks/use-permissions';
import AppLayout from '@/layouts/app-layout';
import { useDialogStore } from '@/lib/dialog-store';
import { Permission, SinglePermission, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import CreatePermissionDialog from './partials/create-dialog';
import EditPermissionDialog from './partials/edit-dialog';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Permissions',
		href: '/permissions',
	},
];

export default function Permissions({
	permissions,
}: {
	permissions: Permission;
}) {
	const [openAddNewPermissionDialog, setOpenAddNewPermissionDialog] =
		useState(false);
	const [openEditPermissionDialog, setOpenEditPermissionDialog] =
		useState(false);
	const [selectedPermission, setSelectedPermission] =
		useState<SinglePermission | null>(null);

	const { can } = usePermissions();
	const confirm = useDialogStore((state) => state.open);
	const { delete: destroy } = useForm();

	function edit(permission: SinglePermission) {
		setSelectedPermission(permission);
		setOpenEditPermissionDialog(true);
	}

	async function deletePermission(id: number) {
		const isConfirmed = await confirm({
			title: 'Delete Permission',
			message: 'Are you sure you want to delete this permission?',
			confirmText: 'Delete',
			cancelText: 'Cancel',
		});

		if (isConfirmed) {
			destroy(`/permissions/${id}`);
		}
	}

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Permissions" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Card>
					<CardHeader className="flex items-center justify-between">
						<CardTitle>Permissions Managements</CardTitle>
						<CardAction>
							{can('create_permissions') && (
								<Button
									variant="default"
									onClick={() => {
										setOpenAddNewPermissionDialog(true);
									}}
								>
									Add new
								</Button>
							)}
						</CardAction>
					</CardHeader>
					<hr />
					<CardContent>
						<Table className="table-striped table">
							<TableHeader className="bg-gray-50">
								<TableRow>
									<TableHead>ID</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Description</TableHead>
									<TableHead>Created at</TableHead>
									<TableHead>Updated at</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{permissions.data.map((permission, index) => (
									<TableRow key={permission.id}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{permission.name}</TableCell>
										<TableCell>
											{permission.description}
										</TableCell>
										<TableCell>
											{permission.created_at}
										</TableCell>
										<TableCell>
											{permission.updated_at}
										</TableCell>
										<TableCell>
											{can('edit_permissions') && (
												<Button
													variant={'outline'}
													size={'sm'}
													onClick={() =>
														edit(permission)
													}
												>
													Edit
												</Button>
											)}
											{can('delete_permissions') && (
												<Button
													variant="outline"
													size="sm"
													className="ms-2 text-red-600 hover:bg-red-50"
													onClick={() => {
														deletePermission(
															permission.id,
														);
													}}
												>
													Delete
												</Button>
											)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
					{permissions.data.length > 0 ? (
						<TablePagination
							total={permissions.total}
							from={permissions.from}
							to={permissions.to}
							links={permissions.links}
						/>
					) : (
						<div className="flex h-full items-center justify-center">
							No Results Found!
						</div>
					)}
				</Card>

				<CreatePermissionDialog
					open={openAddNewPermissionDialog}
					onOpenChange={setOpenAddNewPermissionDialog}
				/>

				<EditPermissionDialog
					open={openEditPermissionDialog}
					onOpenChange={setOpenEditPermissionDialog}
					permission={selectedPermission}
				/>
			</div>
		</AppLayout>
	);
}
