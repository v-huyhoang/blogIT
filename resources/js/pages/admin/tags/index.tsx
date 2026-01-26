import InputError from '@/components/input-error';
import TablePagination from '@/components/table-pagination';
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
import { Button } from '@/components/ui/button';
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useDebounce } from '@/hooks/use-debounce';
import { usePermissions } from '@/hooks/use-permissions';
import AppLayout from '@/layouts/app-layout';
import { SingleTag, Tag, type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Loader2, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Tags',
		href: '/admin/tags',
	},
];

export default function Tags({
	tags,
	filters,
}: {
	tags: Tag;
	filters: { q?: string };
}) {
	const [openAddNewTagDialog, setOpenAddNewTagDialog] = useState(false);
	const [openEditTagDialog, setOpenEditTagDialog] = useState(false);
	const [editingTag, setEditingTag] = useState<SingleTag | null>(null);
	const [search, setSearch] = useState(filters.q || '');
	const debouncedSearch = useDebounce(search, 500);

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [deleteTarget, setDeleteTarget] = useState<SingleTag | null>(null);

	const { flash } = usePage<{ flash: { message?: string; error: string } }>()
		.props;

	const { can } = usePermissions();

	useEffect(() => {
		if (flash.message) {
			setOpenAddNewTagDialog(false);
			setOpenEditTagDialog(false);
			setEditingTag(null);
			setOpenDeleteDialog(false);
			setDeleteTarget(null);
		}
	}, [flash.message]);

	useEffect(() => {
		const currentSearch = filters.q || '';
		if (debouncedSearch === currentSearch) return;

		router.get(
			'/admin/tags',
			debouncedSearch ? { q: debouncedSearch } : {},
			{
				preserveState: true,
				replace: true,
			},
		);
	}, [debouncedSearch, filters.q]);

	const {
		data,
		setData,
		post,
		put,
		delete: destroy,
		processing,
		errors,
		reset,
	} = useForm({
		name: '',
		slug: '',
	});

	function submit(e: React.FormEvent) {
		e.preventDefault();
		post('/admin/tags', {
			onSuccess: () => {
				reset();
			},
		});
	}

	function edit(tag: SingleTag) {
		setEditingTag(tag);
		setData({
			name: tag.name,
			slug: tag.slug,
		});
		setOpenEditTagDialog(true);
	}

	function handleUpdate(e: React.FormEvent) {
		e.preventDefault();
		put(`/admin/tags/${editingTag?.id}`, {
			onSuccess: () => {
				reset();
			},
		});
	}

	function askDelete(tag: SingleTag) {
		setDeleteTarget(tag);
		setOpenDeleteDialog(true);
	}

	function confirmDelete() {
		if (deleteTarget) {
			destroy(`/admin/tags/${deleteTarget.id}`, {
				onSuccess: () => {
					setOpenDeleteDialog(false);
					setDeleteTarget(null);
				},
			});
		}
	}

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Tags" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Card>
					<CardHeader className="flex items-center justify-between">
						<CardTitle>Tags Management</CardTitle>
						<CardAction className="flex gap-2">
							<div className="relative">
								<Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Search tags..."
									className="w-[200px] pl-8 md:w-[300px]"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							</div>
							{can('create_tags') && (
								<Button
									variant="default"
									onClick={() => {
										reset();
										setOpenAddNewTagDialog(true);
									}}
								>
									<Plus className="mr-2 h-4 w-4" />
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
									<TableHead>Slug</TableHead>
									<TableHead>Created at</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{tags.data.map((tag) => (
									<TableRow key={tag.id}>
										<TableCell>{tag.id}</TableCell>
										<TableCell>{tag.name}</TableCell>
										<TableCell>{tag.slug}</TableCell>
										<TableCell>
											{new Date(
												tag.created_at,
											).toLocaleDateString()}
										</TableCell>
										<TableCell>
											<div className="flex gap-2">
												{can('edit_tags') && (
													<Button
														variant={'outline'}
														size={'sm'}
														onClick={() =>
															edit(tag)
														}
													>
														Edit
													</Button>
												)}
												{can('delete_tags') && (
													<Button
														variant="outline"
														size="sm"
														className="text-red-600 hover:bg-red-50"
														onClick={() => {
															askDelete(tag);
														}}
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
					{tags.data.length > 0 ? (
						<TablePagination
							total={tags.total}
							from={tags.from}
							to={tags.to}
							links={tags.links}
						/>
					) : (
						<div className="flex h-64 items-center justify-center">
							No Results Found!
						</div>
					)}
				</Card>
				{/* add new tag dialog start */}
				<Dialog
					open={openAddNewTagDialog}
					onOpenChange={setOpenAddNewTagDialog}
				>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Add New Tag</DialogTitle>
						</DialogHeader>
						<form onSubmit={submit}>
							<div className="grid gap-4 py-4">
								<div className="grid gap-2">
									<Label htmlFor="name">Tag Name</Label>
									<Input
										id="name"
										name="name"
										placeholder="Tag Name"
										value={data.name}
										onChange={(e) =>
											setData('name', e.target.value)
										}
										aria-invalid={!!errors.name}
									/>
									<InputError message={errors.name} />
								</div>

								<div className="grid gap-2">
									<Label htmlFor="slug">
										Slug (optional)
									</Label>
									<Input
										id="slug"
										name="slug"
										placeholder="tag-slug"
										value={data.slug}
										onChange={(e) =>
											setData('slug', e.target.value)
										}
										aria-invalid={!!errors.slug}
									/>
									<InputError message={errors.slug} />
								</div>
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
								<Button type="submit" disabled={processing}>
									{processing && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Submit
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
				{/* add new tag dialog end */}

				{/* edit tag dialog start */}
				<Dialog
					open={openEditTagDialog}
					onOpenChange={setOpenEditTagDialog}
				>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Edit Tag</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleUpdate}>
							<div className="grid gap-4 py-4">
								<div className="grid gap-2">
									<Label htmlFor="edit-name">Tag Name</Label>
									<Input
										id="edit-name"
										name="name"
										placeholder="Tag Name"
										value={data.name}
										onChange={(e) =>
											setData('name', e.target.value)
										}
										aria-invalid={!!errors.name}
									/>
									<InputError message={errors.name} />
								</div>

								<div className="grid gap-2">
									<Label htmlFor="edit-slug">Slug</Label>
									<Input
										id="edit-slug"
										name="slug"
										placeholder="tag-slug"
										value={data.slug}
										onChange={(e) =>
											setData('slug', e.target.value)
										}
										aria-invalid={!!errors.slug}
									/>
									<InputError message={errors.slug} />
								</div>
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
								<Button type="submit" disabled={processing}>
									{processing && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Update
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
				{/* edit tag dialog end */}

				<AlertDialog
					open={openDeleteDialog}
					onOpenChange={setOpenDeleteDialog}
				>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle className="text-destructive">
								Delete Tag?
							</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to delete this tag? This
								action cannot be undone.
								{deleteTarget && (
									<div className="mt-2 font-medium text-foreground">
										Tag: {deleteTarget.name}
									</div>
								)}
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={confirmDelete}
								className="bg-red-500 text-white hover:bg-red-600"
							>
								{processing ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									'Delete'
								)}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</AppLayout>
	);
}
