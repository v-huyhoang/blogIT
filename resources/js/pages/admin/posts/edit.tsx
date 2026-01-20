import PostController from '@/actions/App/Http/Controllers/Admin/PostController';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Post } from '@/types/post';
import { Head, router } from '@inertiajs/react';
import { PostForm, PostFormDataType } from './partials/post-form';

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
	const handleSubmit = (data: PostFormDataType) => {
		router.post(PostController.update.url({ post: post.id }), {
			...data,
			_method: 'PUT',
		});
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="mx-auto w-full p-4">
				<Head title={`Edit Post: ${post.title}`} />
				<PostForm
					post={post}
					categories={categories}
					tags={tags}
					onSubmit={handleSubmit}
					submitLabel="Update Post"
				/>
			</div>
		</AppLayout>
	);
}
