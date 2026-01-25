import PostController from '@/actions/App/Http/Controllers/Admin/PostController';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PostForm } from './partials/post-form';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Posts',
		href: '/admin/posts',
	},
	{
		title: 'Create',
		href: '/admin/posts/create',
	},
];

interface CreatePostProps {
	categories: { id: number; name: string }[];
	tags: { id: number; name: string }[];
}

export default function CreatePost({ categories, tags }: CreatePostProps) {
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="mx-auto w-full p-4">
				<Head title="Create Post" />
				<PostForm
					categories={categories}
					tags={tags}
					action={PostController.store.url()}
					submitLabel="Create Post"
				/>
			</div>
		</AppLayout>
	);
}
