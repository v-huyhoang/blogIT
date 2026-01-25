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
import {
	SEARCH_DEBOUNCE_DELAY,
	USER_STATUS_ACTIVE,
	USER_STATUS_INACTIVE,
} from '@/constants';
import { usePermissions } from '@/hooks/use-permissions';
import AppLayout from '@/layouts/app-layout';
import type { PageProps, UserIndexResponse } from '@/types';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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

export default function Users({ users }: { users: UserIndexResponse }) {
	const { filters } = usePage<PageProps>().props;

	const { can } = usePermissions();

	const [search, setSearch] = useState(filters.q ?? '');

	useEffect(() => {
		const currentQ = filters.q ?? '';
		if (search === currentQ) return;

		const timeout = setTimeout(() => {
			router.get(
				'/users',
				search ? { q: search } : {},
				{
					preserveState: true,
					replace: true,
				},
			);
		}, SEARCH_DEBOUNCE_DELAY);

		return () => clearTimeout(timeout);
	}, [search, filters.q]);

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
														<SelectItem
															value={
																USER_STATUS_ACTIVE
															}
														>
															Active
														</SelectItem>
														<SelectItem
															value={
																USER_STATUS_INACTIVE
															}
														>
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
						<Table className="table-striped table">
							<TableHeader className="bg-gray-50">
								<TableRow>
									<TableHead>ID</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Roles</TableHead>
									<TableHead>Created At</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{users.data.map((user, index) => (
									<TableRow key={index + 1}>
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
													{role.name}
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
													variant="outline"
													size="sm"
													className="ms-2 text-red-600 hover:bg-red-50"
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
