import { Button } from '@/components/ui/button';

import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';
import { flattenCategories } from '@/lib/category-utils';

import TablePagination from '@/components/table-pagination';
import {
	BreadcrumbItem,
	Category,
	CategoryFilters,
	SingleCategory,
} from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import CategoriesTable from './partials/CategoriesTable';
import CreateCategoryDialog from './partials/CreateCategoryDialog';
import EditCategoryDialog from './partials/EditCategoryDialog';
import { CategoryFilterAdvance } from './partials/filters';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Category',
		href: '/categories',
	},
];

export default function CategoryPage() {
	const { categories: paginatedCategories, filters } = usePage<{
		categories: Category;
		filters: CategoryFilters;
	}>().props;

	const { data: categories } = paginatedCategories;

	const [showCreateDialog, setShowCreateDialog] = useState(false);
	const [showEditDialog, setShowEditDialog] = useState(false);
	const [editingCategory, setEditingCategory] =
		useState<SingleCategory | null>(null);

	const flatCategories = useMemo(() => {
		if (!Array.isArray(categories)) return [];
		return flattenCategories(categories);
	}, [categories]);

	const handleEdit = (category: SingleCategory) => {
		setEditingCategory(category);
		setShowEditDialog(true);
	};

	const handleCloseEditDialog = (open: boolean) => {
		if (!open) {
			setEditingCategory(null);
		}
		setShowEditDialog(open);
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Head title="Category" />
				<Card>
					<CardHeader className="space-y-4 border-b">
						<div className="flex flex-row items-center justify-between">
							<CardTitle>Category Management</CardTitle>
							<CardAction>
								<Button
									onClick={() => setShowCreateDialog(true)}
								>
									Add new
								</Button>
							</CardAction>
						</div>
						<br />
						<div className="flex flex-wrap items-center justify-end gap-4">
							{/* RIGHT: SEARCH / FILTER */}
							<div className="flex-end flex flex-wrap items-center gap-2">
								<CategoryFilterAdvance filters={filters} />
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<CategoriesTable
							categories={categories}
							onEdit={handleEdit}
						/>
						<TablePagination
							total={paginatedCategories.total}
							from={paginatedCategories.from}
							to={paginatedCategories.to}
							links={paginatedCategories.links}
						/>
					</CardContent>
				</Card>

				<CreateCategoryDialog
					open={showCreateDialog}
					onOpenChange={setShowCreateDialog}
					flatCategories={flatCategories}
				/>

				<EditCategoryDialog
					open={showEditDialog}
					onOpenChange={handleCloseEditDialog}
					category={editingCategory}
					flatCategories={flatCategories}
				/>
			</div>
		</AppLayout>
	);
}
