import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { ActiveStatus, statusMap } from '@/enums/ActiveEnum';
import { usePermissions } from '@/hooks/use-permissions';
import { confirm } from '@/lib/dialog';
import { SingleCategory } from '@/types/category';
import { router } from '@inertiajs/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState, type ReactElement } from 'react';

interface CategoriesTableProps {
	categories: SingleCategory[];
	onEdit: (category: SingleCategory) => void;
}

export default function CategoriesTable({
	categories,
	onEdit,
}: CategoriesTableProps) {
	const [expanded, setExpanded] = useState<Set<number>>(new Set());
	const { can } = usePermissions();

	const toggleExpand = (id: number) => {
		setExpanded((prev) => {
			const newSet = new Set(prev);

			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}

			return newSet;
		});
	};

	const handleDelete = async (id: number) => {
		const ok = await confirm({
			title: 'Xoá danh mục?',
			message: 'Hành động này không thể hoàn tác.',
			confirmText: 'Xoá',
			cancelText: 'Huỷ',
		});

		if (ok) {
			router.delete(`/categories/${id}`, {
				onSuccess: () => {},
				onError: () => console.error('Delete failed'),
			});
		}
	};

	const renderCategoryRows = (
		cats: SingleCategory[],
		level: number = 0,
	): ReactElement[] => {
		return cats.flatMap((cat) => {
			const isExpanded = expanded.has(cat.id);
			const children = cat.children_recursive;
			const hasChildren = children && children.length > 0;

			return [
				<TableRow key={cat.id}>
					{/* <TableCell>{cat.id}</TableCell> */}
					<TableCell>
						<div
							className="flex items-center gap-2"
							style={{ paddingLeft: level * 24 }}
						>
							{hasChildren && (
								<button
									onClick={() => toggleExpand(cat.id)}
									className="text-sm hover:text-primary"
								>
									{isExpanded ? (
										<ChevronDown className="h-4 w-4" />
									) : (
										<ChevronRight className="h-4 w-4" />
									)}
								</button>
							)}
							<span>{cat.name}</span>
						</div>
					</TableCell>
					<TableCell className="">{cat.slug}</TableCell>
					<TableCell className="w-[350px] break-words">
						{cat.description}
					</TableCell>
					<TableCell>
						{(() => {
							const status = cat.is_active
								? ActiveStatus.ACTIVE
								: ActiveStatus.INACTIVE;
							const config = statusMap[status];
							return (
								<Badge
									variant={config.variant}
									className={config.className}
								>
									{config.label}
								</Badge>
							);
						})()}
					</TableCell>
					<TableCell className="flex gap-1">
						<Button
							variant="outline"
							size="sm"
							onClick={() => onEdit(cat)}
						>
							Edit
						</Button>
						{can('delete_categories') && (
							<Button
								variant="outline"
								size="sm"
								className="text-red-600 hover:bg-red-50"
								onClick={() => handleDelete(cat.id)}
							>
								Delete
							</Button>
						)}
					</TableCell>
				</TableRow>,

				...(isExpanded && hasChildren
					? renderCategoryRows(children, level + 1)
					: []),
			];
		});
	};

	return (
		<Table className="table-striped table">
			<TableHeader className="bg-gray-50">
				<TableRow>
					{/* <TableHead>Id</TableHead> */}
					<TableHead>Name</TableHead>
					<TableHead>Slug</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>Active</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{categories.length === 0 ? (
					<TableRow>
						<TableCell
							colSpan={5}
							className="py-8 text-center text-muted-foreground"
						>
							No categories found.
						</TableCell>
					</TableRow>
				) : (
					renderCategoryRows(categories)
				)}
			</TableBody>
		</Table>
	);
}
