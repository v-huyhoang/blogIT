import InputError from '@/components/input-error';
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
import { usePermissions } from '@/hooks/use-permissions';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { SingleTag, Tag, TagFilters } from '@/types/blog';
import { Head, useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TagFilterAdvance } from './partials/filters';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'tags',
		href: '/tags',
	},
];

export default function Tags({
	tags,
	filters,
}: {
	tags: Tag;
	filters: TagFilters;
}) {
	const [openAddNewTagDialog, setOpenAddNewTagDialog] = useState(false);
	const [openEditTagDialog, setOpenEditTagDialog] = useState(false);

	const { flash } = usePage<{ flash: { message?: string; error: string } }>()
		.props;

	const { can } = usePermissions();

	useEffect(() => {
		if (flash.message) {
			setOpenAddNewTagDialog(false);
			setOpenEditTagDialog(false);
		}
	}, [flash.message]);

	const {
		data,
		setData,
		post,
		put,
		delete: destroy,
		processing,
		errors,
		reset,
		clearErrors,
	} = useForm({
		id: '',
		name: '',
	});

	function create() {
		setData({
			id: '',
			name: '',
		});
		clearErrors();
		setOpenAddNewTagDialog(true);
	}

	function submit(e: React.FormEvent) {
		e.preventDefault();
		post('/tags', {
			onSuccess: () => {
				reset();
			},
		});
	}

	function edit(tag: SingleTag) {
		setData({
			id: tag.id.toString(),
			name: tag.name,
		});
		clearErrors();
		setOpenEditTagDialog(true);
	}

	function update(e: React.FormEvent) {
		e.preventDefault();
		put(`/tags/${data.id}`, {
			onSuccess: () => {
				reset();
				setOpenEditTagDialog(false);
			},
		});
	}

	function deleteTag(id: number) {
		destroy(`/tags/${id}`);
	}

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Tags" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Card>
					<CardHeader className="space-y-4 border-b">
						<div className="flex items-center justify-between">
							<CardTitle>Tags Managements</CardTitle>
							<CardAction>
								{can('create_tags') && (
									<Button
										variant="default"
										onClick={() => {
											create();
										}}
									>
										Add new
									</Button>
								)}
							</CardAction>
						</div>
						<br />
						{/* BOTTOM HEADER */}
						<div className="flex flex-wrap items-center justify-end gap-4">
							{/* RIGHT: SEARCH / FILTER */}
							<div className="flex-end flex flex-wrap items-center gap-2">
								<TagFilterAdvance filters={filters} />
							</div>
						</div>
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
									<TableHead>Updated at</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{tags.data.map((tag, index) => (
									<TableRow key={index + 1}>
										<TableCell>{tag.id}</TableCell>
										<TableCell>{tag.name}</TableCell>
										<TableCell>{tag.slug}</TableCell>
										<TableCell>
											{format(
												tag.created_at,
												'dd-MM-yyyy',
											)}
										</TableCell>
										<TableCell>
											{format(
												tag.updated_at,
												'dd-MM-yyyy',
											)}
										</TableCell>
										<TableCell>
											{can('edit_tags') && (
												<Button
													variant={'outline'}
													size={'sm'}
													onClick={() => {
														edit(tag);
													}}
												>
													Edit
												</Button>
											)}
											{can('delete_tags') && (
												<Button
													variant="outline"
													size="sm"
													className="ms-2 text-red-600 hover:bg-red-50"
													onClick={() => {
														deleteTag(tag.id);
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
					{tags.data.length > 0 ? (
						<TablePagination
							total={tags.total}
							from={tags.from}
							to={tags.to}
							links={tags.links}
						/>
					) : (
						<div className="flex h-full items-center justify-center">
							No Results Found!
						</div>
					)}
				</Card>
				{/* add new permission diaglog start */}
				<Dialog
					open={openAddNewTagDialog}
					onOpenChange={setOpenAddNewTagDialog}
				>
					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Add New Tags</DialogTitle>
							</DialogHeader>
							<div className="grid gap-4">
								<div className="grid gap-3">
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
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
								<Button
									type="submit"
									onClick={submit}
									disabled={processing}
								>
									{processing && (
										<Loader2 className="animate-spin" />
									)}
									Submit
								</Button>
							</DialogFooter>
						</DialogContent>
					</form>
				</Dialog>
				{/* add new permission diaglog end */}

				<Dialog
					open={openEditTagDialog}
					onOpenChange={setOpenEditTagDialog}
				>
					<form onSubmit={update}>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Edit Tags</DialogTitle>
							</DialogHeader>
							<hr />

							<div className="grid gap-4">
								<div className="grid gap-3">
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
							</div>

							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
								<Button
									type="submit"
									onClick={update}
									disabled={processing}
								>
									{processing && (
										<Loader2 className="animate-spin" />
									)}
									Update
								</Button>
							</DialogFooter>
						</DialogContent>
					</form>
				</Dialog>
			</div>
		</AppLayout>
	);
}
