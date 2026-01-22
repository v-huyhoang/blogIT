import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Post } from '@/types/post';
import { useForm } from '@inertiajs/react';
import {
	ChevronRight,
	FileText,
	Globe,
	ImageIcon,
	Info,
	Save,
	Search,
	Settings,
	X,
} from 'lucide-react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

export interface PostFormDataType {
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	image: File | string | null;
	meta_title: string;
	meta_description: string;
	category_id: number | string;
	status: string;
	published_at: string;
	tag_ids: number[];
	_method?: string;
}

interface PostFormProps {
	post?: Post;
	categories: { id: number; name: string }[];
	tags: { id: number; name: string }[];
	action: string;
	method?: 'POST' | 'PUT';
	submitLabel?: string;
}

export function PostForm({
	post,
	categories,
	tags,
	action,
	method = 'POST',
	submitLabel = 'Save Post',
}: PostFormProps) {
	const [imagePreview, setImagePreview] = useState<string | null>(
		post?.image_url ?? null,
	);
	const imageInputRef = useRef<HTMLInputElement>(null);

	const {
		data,
		setData,
		errors,
		processing,
		post: postMethod,
	} = useForm<PostFormDataType>({
		title: post?.title ?? '',
		slug: post?.slug ?? '',
		excerpt: post?.excerpt ?? '',
		content: post?.content ?? '',
		image: post?.image ?? null,
		meta_title: post?.meta_title ?? '',
		meta_description: post?.meta_description ?? '',
		category_id: post?.category?.id ?? '',
		status: post?.status ?? 'draft',
		published_at: post?.published_at
			? new Date(post.published_at).toISOString().slice(0, 16)
			: '',
		tag_ids: post?.tags?.map((t) => t.id) ?? [],
		_method: method,
	});

	const dataRef = useRef(data);
	dataRef.current = data;

	useEffect(() => {
		const timer = setTimeout(() => {
			const currentData = dataRef.current;
			if (!post && currentData.title) {
				const slug = currentData.title
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.replace(/[^a-z0-9]+/g, '-')
					.replace(/(^-|-$)+/g, '');

				setData({
					...currentData,
					slug,
					meta_title: currentData.title,
					meta_description: currentData.title,
				});
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [data.title]);

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		postMethod(action);
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setData('image', file);
			const reader = new FileReader();
			reader.onloadend = () => setImagePreview(reader.result as string);
			reader.readAsDataURL(file);
		}
	};

	const removeImage = () => {
		setData('image', null);
		setImagePreview(null);
		if (imageInputRef.current) imageInputRef.current.value = '';
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData('title', e.target.value);
	};

	const toggleTag = (tagId: number) => {
		const currentTags = data.tag_ids as number[];
		setData(
			'tag_ids',
			currentTags.includes(tagId)
				? currentTags.filter((id) => id !== tagId)
				: [...currentTags, tagId],
		);
	};

	return (
		<form onSubmit={handleSubmit} className="mx-auto max-w-7xl space-y-6">
			{/* Header Section */}
			<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
				<div className="flex-1 space-y-2">
					<Label
						htmlFor="title"
						className="text-sm font-medium text-muted-foreground"
					>
						Post Title <span className="text-destructive">*</span>
					</Label>
					<Input
						id="title"
						value={data.title}
						onChange={handleTitleChange}
						placeholder="What's on your mind?"
						className={cn(
							'border-transparent bg-transparent text-xl font-semibold hover:border-gray-300',
							errors.title &&
								'border-destructive focus-visible:ring-destructive',
						)}
					/>
					<div className="flex items-center gap-1 text-xs text-muted-foreground">
						<span className="font-medium">Slug:</span>
						<span>{data.slug || 'auto-generated'}</span>
					</div>
					<InputError message={errors.title} />
				</div>
			</div>

			<div className="flex w-full max-w-7xl flex-col gap-6">
				<Tabs defaultValue="content">
					<TabsList>
						<TabsTrigger
							value="content"
							className="hover:cursor-pointer"
						>
							<FileText className="size-4" />
							Content
						</TabsTrigger>
						<TabsTrigger
							value="settings"
							className="hover:cursor-pointer"
						>
							<Settings className="size-4" />
							Settings
						</TabsTrigger>
						<TabsTrigger
							value="seo"
							className="hover:cursor-pointer"
						>
							<Globe className="size-4" />
							Seo & Media
						</TabsTrigger>
					</TabsList>
					<TabsContent value="content">
						<Card>
							<CardHeader>
								<CardTitle>Content</CardTitle>
								<CardDescription>
									Edit content here
								</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-6">
								<div className="space-y-6 duration-300 animate-in fade-in slide-in-from-bottom-2">
									<div className="space-y-2">
										<div className="flex items-center gap-2 text-sm text-foreground">
											<Info className="size-4 text-primary" />
											Excerpt
										</div>
										<Textarea
											id="excerpt"
											value={data.excerpt}
											onChange={(e) =>
												setData(
													'excerpt',
													e.target.value,
												)
											}
											placeholder="A short summary to hook your readers..."
											rows={2}
											className={cn(
												'resize-none border-none bg-muted/30 focus-visible:ring-1',
												errors.excerpt &&
													'ring-1 ring-destructive',
											)}
										/>
										<InputError message={errors.excerpt} />
									</div>

									<div className="space-y-2">
										<div className="flex items-center gap-2 text-sm text-foreground">
											<ChevronRight className="size-4 text-primary" />
											Main Content{' '}
											<span className="text-destructive">
												*
											</span>
										</div>
										<Textarea
											id="content"
											value={data.content}
											onChange={(e) =>
												setData(
													'content',
													e.target.value,
												)
											}
											placeholder="Write your story here..."
											rows={15}
											className={cn(
												'border-none bg-muted/30 font-serif text-lg leading-relaxed focus-visible:ring-1',
												errors.content &&
													'ring-1 ring-destructive',
											)}
										/>
										<InputError message={errors.content} />
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="settings">
						<Card>
							<CardHeader>
								<CardTitle>Settings</CardTitle>
								<CardDescription>
									Change your setting for post here
								</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-6">
								<div className="grid gap-8 duration-300 animate-in fade-in slide-in-from-bottom-2 md:grid-cols-2">
									<div className="space-y-6">
										<div className="space-y-6 rounded-xl border bg-muted/10 p-6">
											<div className="flex items-center gap-2 text-sm font-bold">
												<Save className="size-4 text-primary" />
												Publication Status
											</div>
											<div className="grid gap-4">
												<div className="space-y-2">
													<Label className="text-xs font-bold tracking-widest text-muted-foreground">
														Status{' '}
														<span className="text-destructive">
															*
														</span>
													</Label>
													<Select
														value={data.status}
														onValueChange={(v) =>
															setData('status', v)
														}
													>
														<SelectTrigger
															className={cn(
																'h-10 w-full bg-background hover:cursor-pointer',
																errors.status &&
																	'border-destructive focus:ring-destructive',
															)}
														>
															<SelectValue />
														</SelectTrigger>
														<SelectContent>
															<SelectItem
																value="draft"
																className="hover:cursor-pointer"
															>
																Draft
															</SelectItem>
															<SelectItem
																value="pending"
																className="hover:cursor-pointer"
															>
																Pending
															</SelectItem>
															<SelectItem
																value="published"
																className="hover:cursor-pointer"
															>
																Published
															</SelectItem>
														</SelectContent>
													</Select>
													<InputError
														message={errors.status}
													/>
												</div>

												<div className="space-y-2">
													<Label className="text-xs font-bold tracking-widest text-muted-foreground">
														Publish Date
													</Label>
													<div className="relative">
														<Input
															id="published_at"
															type="datetime-local"
															value={
																data.published_at
															}
															onChange={(e) =>
																setData(
																	'published_at',
																	e.target
																		.value,
																)
															}
															className={cn(
																'h-10 bg-background hover:cursor-pointer',
																errors.published_at &&
																	'border-destructive focus-visible:ring-destructive',
															)}
														/>
													</div>
													<InputError
														message={
															errors.published_at
														}
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="space-y-6">
										<div className="space-y-6 rounded-xl border bg-muted/10 p-6">
											<div className="flex items-center gap-2 text-sm font-bold">
												<Settings className="size-4 text-primary" />
												Taxonomy
											</div>
											<div className="grid gap-4">
												<div className="space-y-2">
													<Label className="text-xs font-bold tracking-widest text-muted-foreground">
														Category{' '}
														<span className="text-destructive">
															*
														</span>
													</Label>
													<Select
														value={String(
															data.category_id,
														)}
														onValueChange={(v) =>
															setData(
																'category_id',
																Number(v),
															)
														}
													>
														<SelectTrigger
															className={cn(
																'h-10 w-full bg-background hover:cursor-pointer',
																errors.category_id &&
																	'border-destructive focus:ring-destructive',
															)}
														>
															<SelectValue placeholder="Select category" />
														</SelectTrigger>
														<SelectContent>
															{categories.map(
																(c) => (
																	<SelectItem
																		className="hover:cursor-pointer"
																		key={
																			c.id
																		}
																		value={String(
																			c.id,
																		)}
																	>
																		{c.name}
																	</SelectItem>
																),
															)}
														</SelectContent>
													</Select>
													<InputError
														message={
															errors.category_id
														}
													/>
												</div>

												<div className="space-y-2">
													<Label className="text-xs font-bold tracking-widest text-muted-foreground">
														Tags
													</Label>
													<div
														className={cn(
															'flex min-h-[42px] flex-wrap gap-2 rounded-lg border bg-background p-3',
															errors.tag_ids &&
																'border-destructive',
														)}
													>
														{tags.map((tag) => {
															const selected = (
																data.tag_ids as number[]
															).includes(tag.id);
															return (
																<button
																	key={tag.id}
																	type="button"
																	onClick={() =>
																		toggleTag(
																			tag.id,
																		)
																	}
																	className={cn(
																		'rounded-full border px-3 py-1 text-xs font-bold transition-all hover:cursor-pointer',
																		selected
																			? 'border-primary bg-primary text-primary-foreground'
																			: 'border-transparent bg-muted/50 text-muted-foreground hover:border-primary/30',
																	)}
																>
																	{tag.name}
																</button>
															);
														})}
													</div>
													<InputError
														message={errors.tag_ids}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="seo">
						<Card>
							<CardHeader>
								<CardTitle>SEO and Media</CardTitle>
								<CardDescription>
									Setting SEO for post
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-8 duration-300 animate-in fade-in slide-in-from-bottom-2 md:grid-cols-[1fr_350px]">
									<div className="h-full space-y-4 rounded-xl border bg-muted/20 p-6">
										<div className="flex items-center gap-2 text-sm font-bold">
											<Search className="size-4 text-primary" />
											Search Engine Optimization
										</div>
										<div className="space-y-4">
											<div className="space-y-2">
												<Label className="text-xs font-bold tracking-wider text-muted-foreground">
													Meta Title
												</Label>
												<Input
													value={data.meta_title}
													onChange={(e) =>
														setData(
															'meta_title',
															e.target.value,
														)
													}
													placeholder="Post title in search results"
													className={cn(
														'bg-background',
														errors.meta_title &&
															'border-destructive focus-visible:ring-destructive',
													)}
												/>{' '}
												<div className="flex justify-between text-[10px] text-muted-foreground">
													<span>
														Recommended: 50-60 chars
													</span>
													<span
														className={cn(
															data.meta_title
																.length > 60
																? 'text-destructive'
																: '',
														)}
													>
														{data.meta_title.length}
														/60
													</span>
												</div>
											</div>
											<div className="space-y-2">
												<Label className="text-xs font-bold tracking-wider text-muted-foreground">
													Meta Description
												</Label>
												<Textarea
													value={
														data.meta_description
													}
													onChange={(e) =>
														setData(
															'meta_description',
															e.target.value,
														)
													}
													placeholder="post description in search results"
													rows={4}
													className={cn(
														'resize-none bg-background',
														errors.meta_description &&
															'border-destructive focus-visible:ring-destructive',
													)}
												/>{' '}
												<div className="flex justify-between text-[10px] text-muted-foreground">
													<span>
														Recommended: 150-160
														chars
													</span>
													<span
														className={cn(
															data
																.meta_description
																.length > 160
																? 'text-destructive'
																: '',
														)}
													>
														{
															data
																.meta_description
																.length
														}
														/160
													</span>
												</div>
											</div>
										</div>
									</div>

									<div className="flex h-full flex-col space-y-4 rounded-xl border bg-muted/20 p-6">
										<div className="flex items-center gap-2 text-sm font-bold">
											<ImageIcon className="size-4 text-primary" />
											Featured Image
										</div>
										<div
											className={cn(
												'group relative flex min-h-[200px] flex-1 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/5 transition-all hover:border-primary/50 hover:bg-muted/10',
												errors.image &&
													'border-destructive bg-destructive/5',
											)}
											onClick={() =>
												imageInputRef.current?.click()
											}
										>
											{imagePreview ? (
												<div className="relative h-full w-full overflow-hidden rounded-lg">
													<img
														src={imagePreview}
														alt="Preview"
														className="h-full w-full object-cover transition-transform group-hover:scale-105"
													/>
													<div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
														<p className="text-xs font-bold tracking-widest text-white">
															Change Image
														</p>
													</div>
													<button
														type="button"
														onClick={(e) => {
															e.stopPropagation();
															removeImage();
														}}
														className="absolute top-2 right-2 rounded-full bg-destructive/90 p-1.5 text-white shadow-lg transition-transform hover:scale-110"
													>
														<X className="size-4" />
													</button>
												</div>
											) : (
												<div className="flex flex-col items-center gap-3 p-4 text-center">
													<div className="rounded-full bg-muted p-4 transition-colors group-hover:bg-primary/10">
														<ImageIcon className="size-8 text-muted-foreground transition-colors group-hover:text-primary" />
													</div>
													<span className="text-xs font-bold tracking-widest text-muted-foreground">
														Upload Cover
													</span>
												</div>
											)}
											<input
												ref={imageInputRef}
												type="file"
												accept="image/*"
												onChange={handleImageChange}
												className="hidden"
											/>
										</div>
										<InputError message={errors.image} />
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
			<div>
				<Button
					type="submit"
					disabled={processing}
					className="font-bold shadow-lg hover:cursor-pointer disabled:cursor-not-allowed"
				>
					<Save className="size-4" />
					{submitLabel}
				</Button>
			</div>
		</form>
	);
}
