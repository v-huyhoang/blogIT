import { Editor } from '@/components/blocks/editor-00/editor';
import InputError from '@/components/input-error';
import { MultiSelect } from '@/components/multi-select';
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
	DEBOUNCE_DELAY,
	POST_STATUS_DRAFT,
	POST_STATUS_PENDING,
	POST_STATUS_PUBLISHED,
	POST_STATUS_SCHEDULE,
	SEO_DESCRIPTION_MAX_LENGTH,
	SEO_TITLE_MAX_LENGTH,
} from '@/constants';
import { cn } from '@/lib/utils';
import { Post } from '@/types';
import { useForm } from '@inertiajs/react';
import { SerializedEditorState } from 'lexical';
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
import { FormEventHandler, useEffect, useMemo, useRef, useState } from 'react';

export interface PostFormDataType {
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	image?: File | string | null;
	meta_title: string;
	meta_description: string;
	category_id: number | string;
	status: number;
	is_featured: boolean;
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
		image: undefined,
		meta_title: post?.meta_title ?? '',
		meta_description: post?.meta_description ?? '',
		category_id: post?.category?.id ?? '',
		status: post?.status ?? POST_STATUS_DRAFT,
		is_featured: post?.is_featured ?? false,
		published_at:
			post?.publish_at || post?.published_at
				? (() => {
						const date = new Date(
							post.publish_at || post.published_at || '',
						);
						return new Date(
							date.getTime() - date.getTimezoneOffset() * 60000,
						)
							.toISOString()
							.slice(0, 16);
					})()
				: '',
		tag_ids: post?.tags?.map((t) => t.id) ?? [],
		_method: method,
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!post && data.title) {
				const slug = data.title
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.replace(/[^a-z0-9]+/g, '-')
					.replace(/(^-|-$)+/g, '');

				setData((prev) => ({
					...prev,
					slug,
					meta_title: prev.meta_title || prev.title,
					meta_description: prev.meta_description || prev.title,
				}));
			}
		}, DEBOUNCE_DELAY);

		return () => clearTimeout(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data.title]);

	const initialEditorState = useMemo(() => {
		if (!data.content) return undefined;

		if (data.content.trim().startsWith('{')) {
			try {
				return JSON.parse(data.content) as SerializedEditorState;
			} catch (e) {
				console.error('Error parsing content JSON:', e);
			}
		}

		return {
			root: {
				children: [
					{
						children: [
							{
								detail: 0,
								format: 0,
								mode: 'normal',
								style: '',
								text: data.content,
								type: 'text',
								version: 1,
							},
						],
						direction: 'ltr',
						format: '',
						indent: 0,
						type: 'paragraph',
						version: 1,
					},
				],
				direction: 'ltr',
				format: '',
				indent: 0,
				type: 'root',
				version: 1,
			},
		} as unknown as SerializedEditorState;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [post?.id]);

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

	const [activeTab, setActiveTab] = useState<'content' | 'settings' | 'seo'>(
		'content',
	);

	const tabs = [
		{ id: 'content', label: 'Content', icon: FileText },
		{ id: 'settings', label: 'Settings', icon: Settings },
		{ id: 'seo', label: 'SEO & Media', icon: Globe },
	] as const;

	return (
		<form onSubmit={handleSubmit} className="mx-auto max-w-7xl space-y-6">
			{/* Title Input - Always Visible */}
			<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
				<div className="flex-1 space-y-2">
					<Label className="text-md font-medium">
						Post Title <span className="text-destructive">*</span>
					</Label>
					<Input
						value={data.title}
						onChange={(e) => setData('title', e.target.value)}
						placeholder="What's on your mind?"
						className={cn(
							'w-full bg-transparent text-2xl',
							errors.title &&
								'border-destructive ring-0 ring-destructive focus-visible:ring-destructive',
						)}
					/>
					<div className="text-xs text-muted-foreground">
						Slug: {data.slug || 'auto-generated'}
					</div>
					<InputError message={errors.title} />
				</div>
			</div>

			<div className="flex flex-col gap-6">
				{/* Simple Tab Buttons */}
				<div className="flex w-fit items-center gap-1 rounded-lg bg-muted p-1">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							type="button"
							onClick={() => setActiveTab(tab.id)}
							className={cn(
								'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all hover:cursor-pointer',
								activeTab === tab.id
									? 'bg-background shadow-sm'
									: 'text-muted-foreground hover:bg-background/50',
							)}
						>
							<tab.icon className="size-4" />
							{tab.label}
						</button>
					))}
				</div>

				<div className="mt-4">
					{/* Content Tab - Hidden by CSS only */}
					<div
						className={activeTab === 'content' ? 'block' : 'hidden'}
					>
						<Card>
							<CardHeader>
								<CardTitle>Content</CardTitle>
								<CardDescription>
									Main post content and summary
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="space-y-2">
									<Label className="flex items-center gap-2">
										<Info className="size-4 text-primary" />{' '}
										Excerpt
									</Label>
									<Textarea
										value={data.excerpt}
										onChange={(e) =>
											setData('excerpt', e.target.value)
										}
										placeholder="A short summary..."
										rows={3}
										className={cn(
											'w-full bg-muted/30',
											errors.excerpt &&
												'border-destructive ring-destructive focus-visible:ring-destructive',
										)}
									/>
									<InputError message={errors.excerpt} />
								</div>

								<div className="space-y-2">
									<Label className="flex items-center gap-2">
										<ChevronRight className="size-4 text-primary" />{' '}
										Main Content{' '}
										<span className="text-destructive">
											*
										</span>
									</Label>
									<div>
										<Editor
											editorSerializedState={
												initialEditorState
											}
											onSerializedChange={(value) =>
												setData(
													'content',
													JSON.stringify(value),
												)
											}
											className={cn(
												errors.content &&
													'border-destructive ring-0 ring-destructive',
											)}
										/>
									</div>
									<InputError message={errors.content} />
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Settings Tab - Hidden by CSS only */}
					<div
						className={
							activeTab === 'settings' ? 'block' : 'hidden'
						}
					>
						<Card>
							<CardHeader>
								<CardTitle>Settings</CardTitle>
								<CardDescription>
									Publication and classification
								</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-8 md:grid-cols-2">
								<div className="space-y-6">
									<div className="space-y-6 rounded-xl border bg-muted/10 p-6">
										<Label className="flex items-center gap-2 font-bold">
											<Save className="size-4 text-primary" />{' '}
											Publication
										</Label>
										<div className="space-y-4">
											<div className="space-y-2">
												<Label>Status</Label>
												<Select
													value={data.status.toString()}
													onValueChange={(v) =>
														setData(
															'status',
															Number(v),
														)
													}
												>
													<SelectTrigger
														aria-invalid={
															!!errors.status
														}
														className={cn(
															'w-full bg-background',
															errors.status &&
																'border-destructive ring-destructive focus:ring-destructive',
														)}
													>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem
															value={POST_STATUS_DRAFT.toString()}
														>
															Draft
														</SelectItem>
														<SelectItem
															value={POST_STATUS_PENDING.toString()}
														>
															Pending
														</SelectItem>
														<SelectItem
															value={POST_STATUS_SCHEDULE.toString()}
														>
															Schedule
														</SelectItem>
														<SelectItem
															value={POST_STATUS_PUBLISHED.toString()}
														>
															Published
														</SelectItem>
													</SelectContent>
												</Select>
												<InputError
													message={errors.status}
												/>
											</div>
											<div className="flex items-center justify-between rounded-lg border p-4">
												<Label>Featured Post</Label>
												<Switch
													checked={data.is_featured}
													onCheckedChange={(v) =>
														setData(
															'is_featured',
															v,
														)
													}
												/>
											</div>
											{(data.status ===
												POST_STATUS_SCHEDULE ||
												data.status ===
													POST_STATUS_PUBLISHED) && (
												<div className="space-y-2">
													<Label>
														{data.status ===
														POST_STATUS_SCHEDULE
															? 'Scheduled For'
															: 'Publish Date'}
													</Label>
													<Input
														type="datetime-local"
														value={
															data.published_at
														}
														onChange={(e) =>
															setData(
																'published_at',
																e.target.value,
															)
														}
														className={cn(
															'w-full bg-background',
															errors.published_at &&
																'border-destructive ring-destructive focus-visible:ring-destructive',
														)}
													/>
													<InputError
														message={
															errors.published_at
														}
													/>
												</div>
											)}
										</div>
									</div>
								</div>
								<div className="space-y-6">
									<div className="space-y-6 rounded-xl border bg-muted/10 p-6">
										<Label className="flex items-center gap-2 font-bold">
											<Settings className="size-4 text-primary" />{' '}
											Taxonomy
										</Label>
										<div className="space-y-4">
											<div className="space-y-2">
												<Label>
													Category{' '}
													<span className="text-destructive">
														*
													</span>
												</Label>
												<Select
													value={
														data.category_id
															? String(
																	data.category_id,
																)
															: ''
													}
													onValueChange={(v) =>
														setData(
															'category_id',
															Number(v),
														)
													}
												>
													<SelectTrigger
														aria-invalid={
															!!errors.category_id
														}
														className={cn(
															'w-full bg-background',
															errors.category_id &&
																'border-destructive ring-destructive focus:ring-destructive',
														)}
													>
														<SelectValue placeholder="Select category" />
													</SelectTrigger>
													<SelectContent>
														{categories.map((c) => (
															<SelectItem
																key={c.id}
																value={String(
																	c.id,
																)}
															>
																{c.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<InputError
													message={errors.category_id}
												/>
											</div>
											<div className="space-y-2">
												<Label>Tags</Label>
												<div
													className={cn(
														'w-full rounded-md',
														errors.tag_ids &&
															'ring-1 ring-destructive',
													)}
												>
													<MultiSelect
														options={tags.map(
															(t) => ({
																label: t.name,
																value: t.id,
															}),
														)}
														selected={data.tag_ids}
														onChange={(v) =>
															setData(
																'tag_ids',
																v as number[],
															)
														}
													/>
												</div>
												<InputError
													message={errors.tag_ids}
												/>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* SEO Tab - Hidden by CSS only */}
					<div className={activeTab === 'seo' ? 'block' : 'hidden'}>
						<Card>
							<CardHeader>
								<CardTitle>SEO and Media</CardTitle>
								<CardDescription>
									Search engine optimization
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-8 md:grid-cols-[1fr_350px]">
									<div className="space-y-4 rounded-xl border bg-muted/20 p-6">
										<Label className="flex items-center gap-2 font-bold">
											<Search className="size-4 text-primary" />{' '}
											SEO
										</Label>
										<div className="space-y-4">
											<div className="space-y-2">
												<Label>Meta Title</Label>
												<Input
													value={data.meta_title}
													onChange={(e) =>
														setData(
															'meta_title',
															e.target.value,
														)
													}
													className={cn(
														'w-full bg-background',
														errors.meta_title &&
															'border-destructive ring-destructive focus-visible:ring-destructive',
													)}
												/>
												<div className="flex justify-between text-[10px] text-muted-foreground">
													<span>
														Recommended:{' '}
														{SEO_TITLE_MAX_LENGTH}
													</span>
													<span
														className={cn(
															data.meta_title
																.length >
																SEO_TITLE_MAX_LENGTH &&
																'text-destructive',
														)}
													>
														{data.meta_title.length}
														/{SEO_TITLE_MAX_LENGTH}
													</span>
												</div>
											</div>
											<div className="space-y-2">
												<Label>Meta Description</Label>
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
													rows={4}
													className={cn(
														'w-full bg-background',
														errors.meta_description &&
															'border-destructive ring-destructive focus-visible:ring-destructive',
													)}
												/>
												<div className="flex justify-between text-[10px] text-muted-foreground">
													<span>
														Recommended:{' '}
														{
															SEO_DESCRIPTION_MAX_LENGTH
														}
													</span>
													<span
														className={cn(
															data
																.meta_description
																.length >
																SEO_DESCRIPTION_MAX_LENGTH &&
																'text-destructive',
														)}
													>
														{
															data
																.meta_description
																.length
														}
														/
														{
															SEO_DESCRIPTION_MAX_LENGTH
														}
													</span>
												</div>
											</div>
										</div>
									</div>
									<div className="space-y-4 rounded-xl border bg-muted/20 p-6">
										<Label className="flex items-center gap-2 font-bold">
											<ImageIcon className="size-4 text-primary" />{' '}
											Cover
										</Label>
										<div
											className={cn(
												'group relative flex min-h-[200px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed',
												errors.image
													? 'border-destructive bg-destructive/5'
													: 'hover:border-primary/50',
											)}
											onClick={() =>
												imageInputRef.current?.click()
											}
										>
											{imagePreview ? (
												<>
													<img
														src={imagePreview}
														className="h-full w-full object-cover"
													/>
													<div className="absolute inset-0 flex items-center justify-center bg-black/40 font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
														Change
													</div>
													<button
														type="button"
														onClick={(e) => {
															e.stopPropagation();
															removeImage();
														}}
														className="absolute top-2 right-2 rounded-full bg-destructive p-1.5 text-white"
													>
														<X className="size-4" />
													</button>
												</>
											) : (
												<div className="flex flex-col items-center gap-2 text-muted-foreground">
													<ImageIcon className="size-8" />
													<span>Upload Image</span>
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
					</div>
				</div>
			</div>

			<div className="border-t pt-4">
				<Button
					type="submit"
					disabled={processing}
					className="font-bold shadow-lg hover:cursor-pointer"
				>
					<Save className="size-4" /> {submitLabel}
				</Button>
			</div>
		</form>
	);
}
