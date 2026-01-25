import TablePagination from '@/components/table-pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
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
import { Role, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Roles',
		href: '/roles',
	},
];

export default function Roles({ roles }: { roles: Role }) {
	const { can } = usePermissions();
	const confirm = useDialogStore((state) => state.open);

	const deleteRole = async (id: number) => {
		const isConfirmed = await confirm({
			title: 'Delete Role',
			message: 'Are you sure you want to delete this role?',
			confirmText: 'Delete',
			cancelText: 'Cancel',
		});

		if (isConfirmed) {
			router.delete(`/roles/${id}`);
		}
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Roles" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Card>
					<CardHeader className="flex items-center justify-between">
						<CardTitle>Roles Managements</CardTitle>
						<CardAction>
							{can('create_roles') && (
								<Link href={'/roles/create'}>
									<Button variant={'default'}>Add New</Button>
								</Link>
							)}
						</CardAction>
					</CardHeader>
					<hr />
					<CardContent>
						<Table className="table-striped table">
							<TableHeader className="bg-gray-50">
								<TableRow>
									<TableHead className="w-[80px]">
										ID
									</TableHead>
									<TableHead className="w-[150px]">
										Name
									</TableHead>
									<TableHead className="min-w-[200px]">
										Description
									</TableHead>
									<TableHead className="min-w-[250px]">
										Permissions
									</TableHead>
									<TableHead className="w-[180px] text-right">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{roles.data.map((role, index) => (
									<TableRow key={index + 1}>
										<TableCell className="font-medium">
											{index + 1}
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<span>{role.name}</span>
											</div>
										</TableCell>
										<TableCell className="text-sm text-muted-foreground">
											{role.description || '-'}
										</TableCell>
										<TableCell>
											<div className="flex flex-wrap items-center gap-1.5">
												{role.permissions
													.slice(0, 4)
													.map((permission, idx) => (
														<Badge
															key={idx}
															variant={
																'secondary'
															}
															className="text-[10px] tracking-wider uppercase"
														>
															{permission.name}
														</Badge>
													))}
												{role.permissions.length >
													4 && (
													<Popover>
														<PopoverTrigger asChild>
															<Button
																variant="ghost"
																size="sm"
																className="h-6 px-2 text-xs font-bold text-primary hover:bg-primary/10"
															>
																+
																{role
																	.permissions
																	.length -
																	4}{' '}
																more
															</Button>
														</PopoverTrigger>
														<PopoverContent
															className="w-[400px] p-4"
															align="start"
														>
															<div className="mb-2 border-b pb-2">
																<h4 className="text-sm font-bold">
																	All
																	Permissions
																	for{' '}
																	{role.name}
																</h4>
															</div>
															<div className="flex max-h-[300px] flex-wrap gap-2 overflow-y-auto">
																{role.permissions.map(
																	(p, i) => (
																		<Badge
																			key={
																				i
																			}
																			variant="outline"
																			className="text-[10px] uppercase"
																		>
																			{
																				p.name
																			}
																		</Badge>
																	),
																)}
															</div>
														</PopoverContent>
													</Popover>
												)}
												{role.permissions.length ===
													0 && (
													<span className="text-xs text-muted-foreground italic">
														No permissions assigned
													</span>
												)}
											</div>
										</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-2">
												{can('edit_roles') && (
													<Link
														href={`/roles/${role.id}/edit`}
													>
														<Button
															variant={'outline'}
															size={'sm'}
															className="h-8"
														>
															Edit
														</Button>
													</Link>
												)}
												{can('delete_roles') && (
													<Button
														variant="outline"
														size="sm"
														className="h-8 text-red-600 hover:bg-red-50 hover:text-red-700"
														onClick={() =>
															deleteRole(role.id)
														}
													>
														Delete
													</Button>
												)}
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
					{roles.data.length > 0 ? (
						<TablePagination
							total={roles.total}
							from={roles.from}
							to={roles.to}
							links={roles.links}
						/>
					) : (
						<div className="flex h-full items-center justify-center p-8 text-muted-foreground">
							No roles found.
						</div>
					)}
				</Card>
			</div>
		</AppLayout>
	);
}
