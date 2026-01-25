import PostController from '@/actions/App/Http/Controllers/Admin/PostController';
import PostViewController from '@/actions/App/Http/Controllers/Admin/PostViewController';
import LexicalPreview from '@/components/editor/lexical-preview';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Post } from '@/types';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { format } from 'date-fns';
import {
	ArrowLeft,
	Calendar,
	Edit,
	Eye,
	MessageSquare,
	Tag as TagIcon,
	ThumbsUp,
	User,
} from 'lucide-react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Posts',
		href: '/admin/posts',
	},
	{
		title: 'Post Details',
		href: '#',
	},
];

export default function PostShow({ post }: { post: Post }) {
	useEffect(() => {
		// Increment view count when the component mounts
		axios
			.post(PostViewController.url({ post: post.id }))
			.catch((error) =>
				console.error('Failed to increment view count:', error),
			);
	}, [post.id]);

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title={`Post: ${post.title}`} />

			<div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-8">
				<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
					<Button
						variant="ghost"
						asChild
						size="sm"
						className="-ml-2 px-0 hover:bg-transparent"
					>
						<Link
							href={PostController.index.url()}
							className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to list
						</Link>
					</Button>
					<div className="flex items-center gap-2">
						<Badge
							variant="outline"
							className={cn(
								'px-3 py-1 font-semibold capitalize',
								post.status_metadata.color,
							)}
						>
							{post.status_metadata.label}
						</Badge>
						<Button asChild size="sm" variant="default">
							<Link
								href={PostController.edit.url({
									post: post.id,
								})}
							>
								<Edit className="mr-2 h-4 w-4" />
								Edit Post
							</Link>
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
					<div className="flex flex-col gap-8 lg:col-span-3">
						<Card className="overflow-hidden border-muted/60 shadow-sm">
							<CardHeader className="p-6 md:p-8">
								<div className="space-y-4">
									<div className="flex items-center gap-2 text-sm font-medium text-primary">
										<Badge
											variant="secondary"
											className="rounded-full px-4"
										>
											{post.category.name}
										</Badge>
									</div>
									<CardTitle className="scroll-m-20 text-xl font-bold lg:text-2xl">
										{post.title}
									</CardTitle>
									<div className="flex flex-wrap items-center gap-6 py-2 text-sm text-muted-foreground">
										<div className="flex items-center gap-2">
											<div className="flex h-9 w-9 items-center justify-center rounded-full border bg-secondary shadow-sm">
												<User className="h-4 w-4 text-secondary-foreground" />
											</div>
											<span className="font-semibold text-foreground">
												{post.user.name}
											</span>
										</div>
										<div className="flex items-center gap-2 border-l pl-6">
											<Calendar className="h-4 w-4" />
											<span>
												{format(
													new Date(post.created_at),
													'MMMM do, yyyy',
												)}
											</span>
										</div>
									</div>
								</div>
							</CardHeader>

							<CardContent className="px-6 pb-12 md:px-8">
								{post.image_url && (
									<div className="relative mb-10 aspect-video overflow-hidden rounded-2xl border bg-muted shadow-sm">
										<img
											src={post.image_url}
											alt={post.title}
											className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
										/>
									</div>
								)}

								{post.excerpt && (
									<div className="mb-12 rounded-r-lg border-l-4 border-primary/40 bg-muted/20 py-4 pr-4 pl-8 text-lg leading-relaxed font-medium text-muted-foreground italic">
										{post.excerpt}
									</div>
								)}

								<div className="max-w-none antialiased">
									<LexicalPreview content={post.content} />
								</div>

								{post.tags.length > 0 && (
									<div className="mt-16 border-t pt-8">
										<div className="mb-4 flex items-center gap-2 text-sm">
											<TagIcon className="h-3.5 w-3.5" />
											<span>Tags</span>
										</div>
										<div className="flex flex-wrap gap-2">
											{post.tags.map((tag) => (
												<Badge
													key={tag.id}
													variant="secondary"
													className="px-3 py-1 text-xs transition-colors hover:bg-secondary/80"
												>
													{tag.name}
												</Badge>
											))}
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					</div>

					<div className="flex flex-col gap-6 lg:col-span-1">
						<div className="sticky top-6 flex flex-col gap-6">
							<Card className="border-muted/60 shadow-sm">
								<CardHeader className="border-b border-gray-100 px-5">
									<CardTitle className="text-sm">
										Analytics
									</CardTitle>
								</CardHeader>
								<CardContent className="px-5 pb-5">
									<div className="space-y-2">
										<div className="group flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div className="rounded-md border border-sky-100 bg-sky-50 p-1.5 text-sky-600 dark:border-sky-800 dark:bg-sky-900/20 dark:text-sky-400">
													<Eye className="h-4 w-4" />
												</div>
												<span className="text-sm font-medium text-muted-foreground">
													Views
												</span>
											</div>
											<span className="text-base text-foreground">
												{post.views_count.toLocaleString()}
											</span>
										</div>

										<div className="group flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div className="rounded-md border border-emerald-100 bg-emerald-50 p-1.5 text-emerald-600 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
													<MessageSquare className="h-4 w-4" />
												</div>
												<span className="text-sm font-medium text-muted-foreground">
													Comments
												</span>
											</div>
											<span className="text-base text-foreground">
												{post.comments_count.toLocaleString()}
											</span>
										</div>

										<div className="group flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div className="rounded-md border border-rose-100 bg-rose-50 p-1.5 text-rose-600 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-400">
													<ThumbsUp className="h-4 w-4" />
												</div>
												<span className="text-sm font-medium text-muted-foreground">
													Likes
												</span>
											</div>
											<span className="text-base text-foreground">
												{post.likes_count.toLocaleString()}
											</span>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="border-muted/60 shadow-sm">
								<CardHeader className="border-b border-gray-100 px-5">
									<CardTitle className="text-sm">
										Publishing Info
									</CardTitle>
								</CardHeader>
								<CardContent className="px-5 pb-5">
									<div className="space-y-4">
										<div className="flex flex-col gap-1">
											<span className="text-sm text-muted-foreground/70">
												Created
											</span>
											<span className="text-sm text-foreground">
												{format(
													new Date(post.created_at),
													'PPP',
												)}
											</span>
										</div>
										<div className="flex flex-col gap-1">
											<span className="text-sm text-muted-foreground/70">
												Last Updated
											</span>
											<span className="text-sm text-foreground">
												{format(
													new Date(post.updated_at),
													'PPP',
												)}
											</span>
										</div>
										{post.published_at && (
											<div className="flex flex-col gap-1">
												<span className="text-sm text-muted-foreground/70">
													Published
												</span>
												<span className="text-sm text-foreground">
													{format(
														new Date(
															post.published_at,
														),
														'PPP',
													)}
												</span>
											</div>
										)}
									</div>
								</CardContent>
							</Card>

							<Card className="border-muted/60 bg-muted/20 shadow-sm">
								<CardHeader className="border-b border-gray-100 px-5">
									<CardTitle className="text-sm">
										SEO Details
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-5 px-5 pb-5">
									<div className="space-y-1.5">
										<div className="text-sm text-muted-foreground/70">
											Meta Title
										</div>
										<div className="text-sm">
											{post.meta_title ||
												'No meta title set'}
										</div>
									</div>
									<div className="space-y-1.5">
										<div className="text-sm text-muted-foreground/70">
											Meta Description
										</div>
										<div className="line-clamp-4 text-sm">
											{post.meta_description ||
												'No meta description set'}
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</AppLayout>
	);
}
