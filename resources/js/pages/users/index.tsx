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
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { usePermissions } from '@/hooks/user-permissions';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { PageProps } from '@/types/page';
import { User } from '@/types/user';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Users',
		href: '/users',
	},
];

function deleteUser(id: number) {
	if (confirm('Are you sure you want to delete this user?')) {
		router.delete(`/users/${id}`);
	}
}

export default function Users({ users }: { users: User }) {
	const { flash } = usePage<{ flash: { message?: string; error: string } }>()
		.props;

	const { filters } = usePage<PageProps>().props;

	const { can } = usePermissions();

	const [search, setSearch] = useState(filters.q ?? '');

	useEffect(() => {
		if (flash.message) {
			toast.success(flash.message);
		}
	}, [flash.message]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			router.get(
				'/users',
				{ q: search },
				{
					preserveState: true,
					replace: true,
				},
			);
		}, 400);

		return () => clearTimeout(timeout);
	}, [search]);

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Users" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Card>
					<CardHeader className="flex items-center justify-between">
						<CardTitle>Users Managements</CardTitle>
						<CardAction>
							{can('create_users') && (
								<Link href={'/users/create'}>
									<Button variant={'default'}>Add New</Button>
								</Link>
							)}
						</CardAction>
					</CardHeader>
					<hr />
					<CardContent>
						<div className="pb-4">
							<Table>
								<TableHeader>
									<TableRow className="border-none hover:bg-transparent">
										<TableHead>Search</TableHead>
										<TableHead>Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow className="hover:bg-transparent">
										<TableCell>
											<Input
												placeholder="Filter by name or email..."
												id="search"
												value={search}
												onChange={(e) =>
													setSearch(e.target.value)
												}
											/>
										</TableCell>
										<TableCell>
											<Select>
												<SelectTrigger className="w-[180px]">
													<SelectValue placeholder="Select a status" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectItem value="active">
															Active
														</SelectItem>
														<SelectItem value="inactive">
															Inactive
														</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>
						<Table>
							<TableHeader className="bg-slate-500 dark:bg-slate-700">
								<TableRow>
									<TableHead className="font-bold text-white">
										ID
									</TableHead>
									<TableHead className="font-bold text-white">
										Name
									</TableHead>
									<TableHead className="font-bold text-white">
										Email
									</TableHead>
									<TableHead className="font-bold text-white">
										Roles
									</TableHead>
									<TableHead className="font-bold text-white">
										Created At
									</TableHead>
									<TableHead className="font-bold text-white">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{users.data.map((user, index) => (
									<TableRow
										key={index + 1}
										className="odd:bg-slate-100 dark:odd:bg-slate-800"
									>
										<TableCell>{user.id}</TableCell>
										<TableCell>{user.name}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell className="flex flex-wrap items-center gap-2">
											{user.roles.map((role, idx) => (
												<Badge
													key={idx}
													variant={'outline'}
													className="me-1"
												>
													{role}
												</Badge>
											))}
										</TableCell>
										<TableCell>{user.created_at}</TableCell>
										<TableCell>
											{can('edit_users') && (
												<Link
													href={`/users/${user.id}/edit`}
												>
													<Button
														variant={'outline'}
														size={'sm'}
													>
														Edit
													</Button>
												</Link>
											)}
											{can('delete_users') && (
												<Button
													className="ms-2"
													variant={'destructive'}
													size={'sm'}
													onClick={() =>
														deleteUser(user.id)
													}
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
					{users.data.length > 0 ? (
						<TablePagination
							total={users.total}
							from={users.from}
							to={users.to}
							links={users.links}
						/>
					) : (
						<div className="flex h-full items-center justify-center">
							No Results Found!
						</div>
					)}
				</Card>
			</div>
		</AppLayout>
	);
}
