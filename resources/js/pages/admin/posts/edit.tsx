import PostController from '@/actions/App/Http/Controllers/Admin/PostController';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Post } from '@/types';
import { Head } from '@inertiajs/react';
import { PostForm } from './partials/post-form';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Posts',
		href: '/admin/posts',
	},
	{
		title: 'Edit',
		href: '#',
	},
];

interface EditPostProps {
	post: Post;
	categories: { id: number; name: string }[];
	tags: { id: number; name: string }[];
}

export default function EditPost({ post, categories, tags }: EditPostProps) {
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="mx-auto w-full p-4">
				<Head title={`Edit Post: ${post.title}`} />
				<PostForm
					post={post}
					categories={categories}
					tags={tags}
					action={PostController.update.url({ post: post.id })}
					method="PUT"
					submitLabel="Update Post"
				/>
			</div>
		</AppLayout>
	);
}
