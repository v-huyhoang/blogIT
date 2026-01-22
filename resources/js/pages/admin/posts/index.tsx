import { TablePaginationLinks } from '@/components/table-paginate-simple';
import { Button } from '@/components/ui/button';

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
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import AppLayout from '@/layouts/app-layout';

import PostController from '@/actions/App/Http/Controllers/Admin/PostController';
import PostDuplicateController from '@/actions/App/Http/Controllers/Admin/PostDuplicateController';
import { BulkActionsDropdown } from '@/components/bulk-actions-dropdown';
import { PerPageSelect } from '@/components/per-page-select';
import { usePermissions } from '@/hooks/use-permissions';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { PaginatedResponse } from '@/types/pagination';
import { Post, PostFilters } from '@/types/post';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import {
	Copy,
	Edit,
	EllipsisVertical,
	FileSearch,
	Plus,
	RefreshCcw,
	Trash2,
	X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { bulkRoutes } from './partials/bulk-routes';
import { PostFilterAdvance } from './partials/filters';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Posts',
		href: '/admin/posts',
	},
];

export default function PostIndex({
	posts,
	filters,
}: {
	posts: PaginatedResponse<Post>;
	filters: PostFilters;
}) {
	const categories = Array.from(
		new Map(
			posts.data
				.map((p) => p.category)
				.filter(Boolean)
				.map((c) => [c.id, c]),
		).values(),
	);
	const users = Array.from(
		new Map(
			posts.data
				.map((p) => p.user)
				.filter(Boolean)
				.map((u) => [u.id, u]),
		).values(),
	);
	const tags = Array.from(
		new Map(
			posts.data
				.flatMap((p) => p.tags)
				.filter(Boolean)
				.map((t) => [t.id, t]),
		).values(),
	);

	const { can } = usePermissions();

	const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);
	const [open, setOpen] = useState(false);

	const askDelete = (post: Post) => {
		setDeleteTarget(post);
		setOpen(true);
	};

	const confirmDelete = () => {
		if (!deleteTarget) return;

		router.delete(PostController.destroy.url({ post: deleteTarget.id }), {
			preserveScroll: true,
			onFinish: () => {
				setOpen(false);
				setDeleteTarget(null);
			},
		});
	};

	//  Checkbox
	const isTrashedView = filters?.trashed === 'only';
	const [selected, setSelected] = useState<Record<number, boolean>>({});

	// Reset selection when data changes (page, sort, filter)
	useEffect(() => {
		setSelected({});
	}, [posts.data]);

	const selectedIds = Object.keys(selected)
		.filter((id) => selected[Number(id)])
		.map(Number);

	const pageIds = posts.data.map((p) => p.id);
	const allSelected =
		pageIds.length > 0 && pageIds.every((id) => selected[id]);
	const someSelected = pageIds.some((id) => selected[id]) && !allSelected;

	const toggleAllPage = (checked: boolean) => {
		setSelected((prev) => {
			const next = { ...prev };
			for (const id of pageIds) next[id] = checked;
			return next;
		});
	};

	const handleEdit = (post: Post) => {
		router.get(PostController.edit.url({ post: post.id }));
	};
	const handleCopy = (post: Post) => {
		router.post(PostDuplicateController.duplicate.url({ post: post.id }), {
			preserveScroll: true,
		});
	};

	const bulkActions = [
		{
			key: 'delete',
			label: 'Delete',
			icon: <Trash2 className="h-4 w-4" />,
			destructive: true,
			visible: !isTrashedView,
			onClick: () =>
				router.post(bulkRoutes.bulkDelete.url(), { ids: selectedIds }),
		},
		{
			key: 'forceDelete',
			label: 'Force delete',
			icon: <Trash2 className="h-4 w-4" />,
			destructive: true,
			visible: isTrashedView,
			onClick: () =>
				router.post(bulkRoutes.bulkForceDelete.url(), {
					ids: selectedIds,
				}),
		},
		{
			key: 'restore',
			label: 'Restore',
			icon: <RefreshCcw className="h-4 w-4" />,
			visible: isTrashedView,
			onClick: () =>
				router.post(bulkRoutes.bulkRestore.url(), { ids: selectedIds }),
		},
	];

	const hasFilters = Boolean(
		filters.q ||
			filters.status ||
			filters.category_id ||
			filters.user_id ||
			filters.tag_id ||
			filters.trashed ||
			filters.published_at_from ||
			filters.published_at_to,
	);

	const onReset = () => {
		router.get(
			PostController.index.url(),
			{},
			{
				preserveState: true,
				preserveScroll: true,
			},
		);
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Head title="Posts" />

				<Card>
					<CardHeader className="space-y-4">
						{/* TOP HEADER */}
						<div className="flex items-center justify-between">
							<CardTitle className="text-xl font-semibold">
								Posts
							</CardTitle>

							<Button asChild>
								<Link
									href={PostController.create.url()}
									prefetch
								>
									<Plus className="mr-2 h-4 w-4" />
									Add new
								</Link>
							</Button>
						</div>

						{/* BOTTOM HEADER */}
						<div className="flex flex-wrap items-center justify-between gap-4">
							{/* LEFT: BULK */}
							<div className="flex items-center gap-3">
								<BulkActionsDropdown
									disabled={selectedIds.length === 0}
									actions={bulkActions}
								/>
								<div className="flex items-center text-sm text-muted-foreground">
									{selectedIds.length} of {posts.total} row(s)
									selected.
								</div>
							</div>

							{/* RIGHT: SEARCH / FILTER */}
							<div className="flex flex-wrap items-center gap-2">
								<PostFilterAdvance
									filters={filters}
									tags={tags}
									categories={categories}
									users={users}
								/>
								{hasFilters && (
									<Button
										variant="outline"
										size="sm"
										onClick={onReset}
										className="h-9 bg-secondary hover:cursor-pointer hover:bg-secondary/80 hover:text-destructive"
									>
										<X className="h-4 w-4" />
										Clear Filters
									</Button>
								)}
							</div>
						</div>
					</CardHeader>

					<hr />
					<CardContent className="p-0">
						<div className="relative w-full overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-[50px] pl-6">
											<Checkbox
												checked={
													allSelected ||
													(someSelected &&
														'indeterminate')
												}
												onCheckedChange={(v) =>
													toggleAllPage(!!v)
												}
												className="size-4 hover:cursor-pointer"
											/>
										</TableHead>
										<TableHead className="w-[50px]">
											#
										</TableHead>
										<TableHead> Post </TableHead>
										<TableHead> Author </TableHead>
										<TableHead> Category </TableHead>
										<TableHead> Status </TableHead>
										<TableHead className="text-center">
											Views
										</TableHead>
										<TableHead className="text-center">
											Comments
										</TableHead>
										<TableHead className="text-center">
											Likes
										</TableHead>
										<TableHead> Published At </TableHead>
										<TableHead> Created At </TableHead>
										<TableHead className="w-[70px] pr-6 text-right">
											Actions
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{posts.data.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={13}
												className="h-24 text-center"
											>
												<div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
													<FileSearch className="h-10 w-10 opacity-20" />
													<p className="text-sm font-medium">
														No posts found.
													</p>
												</div>
											</TableCell>
										</TableRow>
									) : (
										posts.data.map((post: Post, index) => (
											<TableRow key={post.id}>
												<TableCell className="pl-6 font-medium">
													<Checkbox
														checked={
															!!selected[post.id]
														}
														onCheckedChange={(v) =>
															setSelected(
																(prev) => ({
																	...prev,
																	[post.id]:
																		!!v,
																}),
															)
														}
														className="size-4 hover:cursor-pointer"
													/>
												</TableCell>
												<TableCell className="font-medium">
													{posts.from + index}
												</TableCell>
												<TableCell className="font-medium">
													<div className="flex items-center gap-3">
														{post.image_url && (
															<div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border">
																<img
																	src={
																		post.image_url
																	}
																	alt=""
																	className="h-full w-full object-cover"
																/>
															</div>
														)}
														<div className="max-w-[300px] truncate">
															{post.title}
															<br />
															<div className="flex flex-wrap items-center gap-1">
																{post.tags
																	.length > 0
																	? post.tags.map(
																			(
																				tag,
																			) => (
																				<Badge
																					key={
																						tag.id
																					}
																					variant="secondary"
																					className="border-sky-200 bg-sky-50 text-xs text-sky-700 hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-900/20 dark:text-sky-400"
																				>
																					<small className="font-bold">
																						Tags:
																					</small>{' '}
																					<small>
																						{
																							tag.name
																						}
																					</small>
																				</Badge>
																			),
																		)
																	: ''}
															</div>
														</div>
													</div>
												</TableCell>
												<TableCell>
													{post.user.name}
												</TableCell>
												<TableCell>
													{post.category.name}
												</TableCell>
												<TableCell>
													<Badge
														variant="outline"
														className={cn(
															'px-2 py-0.5 font-semibold transition-colors',
															post.status_metadata
																.color,
														)}
													>
														{
															post.status_metadata
																.label
														}
													</Badge>
												</TableCell>
												<TableCell className="text-center font-medium">
													{post.views_count}
												</TableCell>
												<TableCell className="text-center font-medium">
													{post.comments_count}
												</TableCell>
												<TableCell className="text-center font-medium">
													{post.likes_count}
												</TableCell>
												<TableCell>
													{format(
														post.published_at as string,
														'dd-MM-yyyy',
													)}
												</TableCell>
												<TableCell>
													{format(
														post.created_at,
														'dd-MM-yyyy',
													)}
												</TableCell>
												<TableCell className="pr-6 text-right">
													<DropdownMenu>
														<DropdownMenuTrigger
															asChild
														>
															<Button
																variant="ghost"
																size="icon"
																className="size-8 hover:cursor-pointer"
															>
																<EllipsisVertical className="size-4" />
																<span className="sr-only">
																	Open menu
																</span>
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent
															align="end"
															className="w-[160px]"
														>
															<DropdownMenuItem
																onClick={() =>
																	handleEdit(
																		post,
																	)
																}
																className="hover:cursor-pointer hover:bg-orange-200 hover:text-orange-600"
															>
																<Edit className="mr-2 size-4 text-primary" />
																Edit
															</DropdownMenuItem>
															<DropdownMenuItem
																onClick={() =>
																	handleCopy(
																		post,
																	)
																}
																className="hover:cursor-pointer hover:bg-cyan-50 hover:text-cyan-600"
															>
																<Copy className="mr-2 size-4 text-cyan-500" />
																Copy
															</DropdownMenuItem>
															{can(
																'delete_categories',
															) && (
																<>
																	<hr className="-mx-1 my-1" />
																	<DropdownMenuItem
																		onClick={() =>
																			askDelete(
																				post,
																			)
																		}
																		className="text-red-600 hover:cursor-pointer focus:bg-red-50 focus:text-red-600"
																	>
																		<Trash2 className="mr-2 size-4 text-red-500" />
																		Delete
																	</DropdownMenuItem>
																</>
															)}
														</DropdownMenuContent>
													</DropdownMenu>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>
					</CardContent>

					<CardFooter className="flex flex-col items-center justify-between gap-4 border-t px-6 py-4 md:flex-row">
						{/* <div className="flex items-center text-sm text-muted-foreground">
							{selectedIds.length} of {posts.total} row(s)
							selected.
						</div> */}

						<div className="flex items-center gap-2">
							<span className="text-sm font-medium">
								Rows per page
							</span>
							<PerPageSelect
								value={filters.per_page ?? posts.per_page}
								filters={filters}
								url={PostController.index.url()}
							/>
						</div>
						<div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
							<div className="flex items-center text-sm font-medium">
								Page {posts.current_page} of {posts.last_page}
							</div>

							<TablePaginationLinks
								links={posts.links}
								preserveState
							/>
						</div>
					</CardFooter>
				</Card>

				<AlertDialog open={open} onOpenChange={setOpen}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Delete post?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone.
								{deleteTarget
									? ` Post: ${deleteTarget.title}`
									: null}
							</AlertDialogDescription>
						</AlertDialogHeader>

						<AlertDialogFooter>
							<AlertDialogCancel className="hover:cursor-pointer">
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={confirmDelete}
								className="bg-red-500 hover:cursor-pointer hover:bg-red-600"
							>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>

				{/* <AlertDialog open={bulkOpen} onOpenChange={setBulkOpen}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								{bulkIntent === 'delete' && 'Delete selected posts?'}
								{bulkIntent === 'forceDelete' && 'Permanently delete selected posts?'}
								{bulkIntent === 'restore' && 'Restore selected posts?'}
							</AlertDialogTitle>

							<AlertDialogDescription>
								{bulkIntent === 'delete' && 'You can restore later from Trash (if soft delete enabled).'}
								{bulkIntent === 'forceDelete' && 'This action cannot be undone.'}
								{bulkIntent === 'restore' && 'The posts will be restored to the active list.'}
								<br />
								Count: {selectedIds.length}
							</AlertDialogDescription>
						</AlertDialogHeader>

						<AlertDialogFooter>
							<AlertDialogCancel className="hover:cursor-pointer">Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={confirmBulk}
								className={bulkIntent === 'forceDelete'
									? 'bg-red-500 hover:bg-red-600 hover:cursor-pointer'
									: 'hover:cursor-pointer'}
							>
								Confirm
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog> */}
			</div>
		</AppLayout>
	);
}
