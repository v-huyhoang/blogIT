import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
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
import { FormEventHandler, useRef, useState } from 'react';

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
	onSubmit: (data: PostFormDataType) => void;
	submitLabel?: string;
}

type TabType = 'content' | 'seo' | 'settings';

export function PostForm({
	post,
	categories,
	tags,
	onSubmit,
	submitLabel = 'Save Post',
}: PostFormProps) {
	const [activeTab, setActiveTab] = useState<TabType>('content');
	const [imagePreview, setImagePreview] = useState<string | null>(
		post?.image_url ?? null,
	);
	const imageInputRef = useRef<HTMLInputElement>(null);

	const { data, setData, errors, processing } = useForm<PostFormDataType>({
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
	});

	const handleSubmit: FormEventHandler = (e) => {
		e.preventDefault();
		const submissionData = { ...data };
		if (post) submissionData._method = 'PUT';
		onSubmit(submissionData);
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
		const title = e.target.value;
		setData('title', title);
		if (!post) {
			const slug = title
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)+/g, '');
			setData('slug', slug);
			if (!data.meta_title) setData('meta_title', title);
		}
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

	const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
		{
			id: 'content',
			label: 'Content',
			icon: <FileText className="size-4" />,
		},
		{ id: 'seo', label: 'SEO & Media', icon: <Globe className="size-4" /> },
		{
			id: 'settings',
			label: 'Settings',
			icon: <Settings className="size-4" />,
		},
	];

	return (
		<form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-6">
			{/* Header Section */}
			<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
				<div className="flex-1 space-y-2">
					<Label htmlFor="title" className="text-lg font-bold">
						Post Title
					</Label>
					<Input
						id="title"
						value={data.title}
						onChange={handleTitleChange}
						placeholder="What's on your mind?"
						className="h-12 border-none bg-transparent text-xl font-semibold shadow-none focus-visible:ring-0 md:text-2xl"
					/>
					<div className="flex items-center gap-1 text-xs text-muted-foreground">
						<span className="font-medium">Slug:</span>
						<span>{data.slug || 'auto-generated'}</span>
					</div>
					<InputError message={errors.title} />
				</div>

				<Button
					type="submit"
					disabled={processing}
					className="h-11 px-8 font-bold shadow-lg transition-all hover:translate-y-[-1px] active:scale-95"
				>
					<Save className="mr-2 size-4" />
					{submitLabel}
				</Button>
			</div>

			<Card className="overflow-hidden border-none bg-background/50 shadow-xl backdrop-blur-sm">
				{/* Tab Navigation */}
				<div className="flex border-b bg-muted/30 px-2 pt-2">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							type="button"
							onClick={() => setActiveTab(tab.id)}
							className={cn(
								'relative flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all',
								activeTab === tab.id
									? 'text-primary'
									: 'text-muted-foreground hover:text-foreground',
							)}
						>
							{tab.icon}
							{tab.label}
							{activeTab === tab.id && (
								<div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
							)}
						</button>
					))}
				</div>

				<CardContent className="p-6">
					{/* CONTENT TAB */}
					{activeTab === 'content' && (
						<div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
							<div className="space-y-2">
								<div className="flex items-center gap-2 text-sm font-bold text-foreground">
									<Info className="size-4 text-primary" />
									Excerpt
								</div>
								<Textarea
									id="excerpt"
									value={data.excerpt}
									onChange={(e) =>
										setData('excerpt', e.target.value)
									}
									placeholder="A short summary to hook your readers..."
									rows={2}
									className="resize-none border-none bg-muted/30 focus-visible:ring-1"
								/>
								<InputError message={errors.excerpt} />
							</div>

							<div className="space-y-2">
								<div className="flex items-center gap-2 text-sm font-bold text-foreground">
									<ChevronRight className="size-4 text-primary" />
									Main Content
								</div>
								<Textarea
									id="content"
									value={data.content}
									onChange={(e) =>
										setData('content', e.target.value)
									}
									placeholder="Write your story here..."
									rows={15}
									className="border-none bg-muted/30 font-serif text-lg leading-relaxed focus-visible:ring-1"
								/>
								<InputError message={errors.content} />
							</div>
						</div>
					)}

					{/* SEO & MEDIA TAB */}
					{activeTab === 'seo' && (
						<div className="grid gap-8 md:grid-cols-[1fr_300px] animate-in fade-in slide-in-from-bottom-2 duration-300">
							<div className="space-y-6">
								<div className="rounded-xl bg-muted/20 p-6 space-y-4 border">
									<div className="flex items-center gap-2 text-sm font-bold">
										<Search className="size-4 text-primary" />
										Search Engine Optimization
									</div>
									<div className="space-y-4">
										<div className="space-y-2">
											<Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Meta Title</Label>
											<Input
												value={data.meta_title}
												onChange={(e) => setData('meta_title', e.target.value)}
												placeholder="Post title in search results"
												className="bg-background"
											/>
											<div className="flex justify-between text-[10px] text-muted-foreground">
												<span>Recommended: 50-60 chars</span>
												<span className={cn(data.meta_title.length > 60 ? "text-destructive" : "")}>
													{data.meta_title.length}/60
												</span>
											</div>
										</div>
										<div className="space-y-2">
											<Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Meta Description</Label>
											<Textarea
												value={data.meta_description}
												onChange={(e) => setData('meta_description', e.target.value)}
												placeholder="post description in search results"
												rows={3}
												className="bg-background resize-none"
											/>
											<div className="flex justify-between text-[10px] text-muted-foreground">
												<span>Recommended: 150-160 chars</span>
												<span className={cn(data.meta_description.length > 160 ? "text-destructive" : "")}>
													{data.meta_description.length}/160
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="space-y-4">
								<div className="flex items-center gap-2 text-sm font-bold">
									<ImageIcon className="size-4 text-primary" />
									Featured Image
								</div>
								<div
									className="group relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/5 transition-all hover:bg-muted/10 hover:border-primary/50"
									onClick={() => imageInputRef.current?.click()}
								>
									{imagePreview ? (
										<div className="relative h-full w-full overflow-hidden rounded-lg">
											<img
												src={imagePreview}
												alt="Preview"
												className="h-full w-full object-cover transition-transform group-hover:scale-105"
											/>
											<div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
												<p className="text-xs font-bold text-white uppercase tracking-widest">Change Image</p>
											</div>
											<button
												type="button"
												onClick={(e) => {
													e.stopPropagation();
													removeImage();
												}}
												className="absolute right-2 top-2 rounded-full bg-destructive/90 p-1.5 text-white shadow-lg transition-transform hover:scale-110"
											>
												<X className="size-4" />
											</button>
										</div>
									) : (
										<div className="flex flex-col items-center gap-3 p-4 text-center">
											<div className="rounded-full bg-muted p-4 transition-colors group-hover:bg-primary/10">
												<ImageIcon className="size-8 text-muted-foreground transition-colors group-hover:text-primary" />
											</div>
											<span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Upload Cover</span>
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
					)}

					{/* SETTINGS TAB */}
					{activeTab === 'settings' && (
						<div className="grid gap-8 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
							<div className="space-y-6">
								<div className="rounded-xl border bg-muted/10 p-6 space-y-6">
									<div className="flex items-center gap-2 text-sm font-bold">
										<Save className="size-4 text-primary" />
										Publication Status
									</div>
									<div className="grid gap-4">
										<div className="space-y-2">
											<Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Status</Label>
											<Select
												value={data.status}
												onValueChange={(v) => setData('status', v)}
											>
												<SelectTrigger className="h-10 bg-background">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="draft">Draft</SelectItem>
													<SelectItem value="pending">Pending</SelectItem>
													<SelectItem value="published">Published</SelectItem>
												</SelectContent>
											</Select>
											<InputError message={errors.status} />
										</div>

										<div className="space-y-2">
											<Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Publish Date</Label>
											<div className="relative">
												<Input
													id="published_at"
													type="datetime-local"
													value={data.published_at}
													onChange={(e) => setData('published_at', e.target.value)}
													className="h-10 bg-background"
												/>
											</div>
											<InputError message={errors.published_at} />
										</div>
									</div>
								</div>
							</div>

							<div className="space-y-6">
								<div className="rounded-xl border bg-muted/10 p-6 space-y-6">
									<div className="flex items-center gap-2 text-sm font-bold">
										<Settings className="size-4 text-primary" />
										Organization
									</div>
									<div className="grid gap-4">
										<div className="space-y-2">
											<Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Category</Label>
											<Select
												value={String(data.category_id)}
												onValueChange={(v) => setData('category_id', Number(v))}
											>
												<SelectTrigger className="h-10 bg-background">
													<SelectValue placeholder="Select category" />
												</SelectTrigger>
												<SelectContent>
													{categories.map((c) => (
														<SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
													))}
												</SelectContent>
											</Select>
											<InputError message={errors.category_id} />
										</div>

										<div className="space-y-2">
											<Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Tags</Label>
											<div className="flex flex-wrap gap-2 rounded-lg bg-background p-3 border min-h-[42px]">
												{tags.map((tag) => {
													const selected = (data.tag_ids as number[]).includes(tag.id);
													return (
														<button
															key={tag.id}
															type="button"
															onClick={() => toggleTag(tag.id)}
															className={cn(
																"rounded-full px-3 py-1 text-[11px] font-bold transition-all border",
																selected
																	? "bg-primary text-primary-foreground border-primary"
																	: "bg-muted/50 text-muted-foreground border-transparent hover:border-primary/30"
															)}
														>
															{tag.name}
														</button>
													);
												})}
											</div>
											<InputError message={errors.tag_ids} />
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</form>
	);
}
