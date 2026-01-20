import { Pagination } from './pagination';

export interface SingleCategory {
	id: number;
	name: string;
	slug: string;
	description: string;
	parent_id: number | null;
	is_active: boolean;
	created_at: string;
	updated_at: string;
	children_recursive?: SingleCategory[];
}

export interface Category extends Pagination {
	data: SingleCategory[];
}

export interface FlatCategory extends SingleCategory {
	level: number;
}

export interface CategoryFormData {
	name: string;
	description: string;
	parent_id: number | null;
	is_active: boolean;
}

export interface CategoryFormProps {
	form: {
		data: CategoryFormData;
		setData: (
			key: keyof CategoryFormData,
			value: string | number | null | boolean,
		) => void;
		errors: Partial<Record<keyof CategoryFormData, string>>;
	};
	flatCategories: FlatCategory[];
	isEdit?: boolean;
}

export interface EditCategoryDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	category: SingleCategory | null;
	flatCategories: FlatCategory[];
}
