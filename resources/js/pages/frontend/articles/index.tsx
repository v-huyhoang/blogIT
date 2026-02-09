import HeaderSection from '@/components/frontend/header-section';
import { PostCard } from '@/components/frontend/post-card';
import { SeoHead } from '@/components/seo-head';
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton';
import { TablePaginationLinks } from '@/components/table-paginate-simple';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { useDebounce } from '@/hooks/use-debounce';
import GuestLayout from '@/layouts/frontend/guest-layout';
import { cn } from '@/lib/utils';
import articlesRoute from '@/routes/articles';
import {
	PaginatedResponse,
	Post,
	ResourceCollection,
	SingleCategory,
	SingleTag,
} from '@/types';
import { Deferred, router } from '@inertiajs/react';
import {
	ArrowDownWideNarrow,
	ArrowUpNarrowWide,
	Filter,
	Search,
	X,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface ArticlesIndexProps {
	articles?: PaginatedResponse<Post>;
	filters: {
		search?: string;
		category?: string;
		tag?: string;
		sort?: string;
		direction?: string;
	};
	categories?: ResourceCollection<SingleCategory>;
	tags?: ResourceCollection<SingleTag>;
}

export default function ArticlesIndex({
	articles,
	filters,
	categories,
	tags,
}: ArticlesIndexProps) {
	const [search, setSearch] = useState(filters.search || '');
	const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
	const debouncedSearch = useDebounce(search, 500);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const updateFilters = useCallback(
		(newFilters: Partial<typeof filters>) => {
			router.get(
				articlesRoute.index.url(),
				{
					...filters,
					...newFilters,
					page: 1, // Reset to first page on filter change
				},
				{
					preserveState: true,
					preserveScroll: true,
					only: ['articles', 'filters'],
					onSuccess: () => {
						setIsFilterSheetOpen(false);
						scrollToTop();
					},
				},
			);
		},
		[filters],
	);

	useEffect(() => {
		if (debouncedSearch !== (filters.search || '')) {
			updateFilters({ search: debouncedSearch });
		}
	}, [debouncedSearch, filters.search, updateFilters]);

	const handleCategoryChange = (value: string) => {
		updateFilters({ category: value === 'all' ? undefined : value });
	};

	const handleTagChange = (value: string) => {
		updateFilters({ tag: value === 'all' ? undefined : value });
	};

	const handleSortChange = (sortField: string) => {
		const currentSort = filters.sort || 'created_at';
		const currentDirection = filters.direction || 'desc';

		let newDirection = 'desc';
		if (currentSort === sortField) {
			newDirection = currentDirection === 'desc' ? 'asc' : 'desc';
		}

		updateFilters({ sort: sortField, direction: newDirection });
	};

	const clearFilters = () => {
		setSearch('');
		router.get(
			articlesRoute.index.url(),
			{},
			{
				preserveState: true,
				preserveScroll: true,
				only: ['articles', 'filters'],
				onSuccess: () => {
					setIsFilterSheetOpen(false);
					scrollToTop();
				},
			},
		);
	};

	const hasActiveFilters = !!(
		filters.search ||
		filters.category ||
		filters.tag ||
		(filters.sort && filters.sort !== 'created_at') ||
		(filters.direction && filters.direction !== 'desc')
	);

	const showClearAll = !!(filters.search || filters.category || filters.tag);

	const sortOptions = [
		{ label: 'Latest', sort: 'created_at' },
		{ label: 'Views', sort: 'views_count' },
		{ label: 'Likes', sort: 'likes_count' },
	];

	const currentSort = filters.sort || 'created_at';
	const currentDirection = filters.direction || 'desc';

	const FilterContent = ({ isMobile = false }: { isMobile?: boolean }) => (
		<div className={cn('space-y-12', isMobile && 'space-y-8')}>
			{/* Search */}
			<div className="relative">
				<Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					placeholder="Search articles..."
					className="h-12 rounded-2xl border-none bg-background pl-12 shadow-sm focus-visible:ring-primary/20"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				{search && (
					<button
						onClick={() => setSearch('')}
						className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
					>
						<X className="h-4 w-4" />
					</button>
				)}
			</div>

			<Deferred
				data={['categories', 'tags']}
				fallback={
					<div className="space-y-12">
						<div className="space-y-4">
							<Skeleton className="h-6 w-24" />
							<div className="space-y-2">
								{Array.from({ length: 5 }).map((_, i) => (
									<Skeleton
										key={`cat-s-${i}`}
										className="h-10 w-full rounded-xl"
									/>
								))}
							</div>
						</div>
						<div className="space-y-4">
							<Skeleton className="h-6 w-24" />
							<div className="flex flex-wrap gap-2">
								{Array.from({ length: 8 }).map((_, i) => (
									<Skeleton
										key={`tag-s-${i}`}
										className="h-8 w-20 rounded-lg"
									/>
								))}
							</div>
						</div>
					</div>
				}
			>
				{/* Categories List */}
				<div className="space-y-4">
					<h3 className="text-xs font-black tracking-[0.2em] text-muted-foreground uppercase">
						Categories
					</h3>
					<div className="flex flex-col gap-1">
						<button
							onClick={() => handleCategoryChange('all')}
							className={cn(
								'flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-all',
								!filters.category
									? 'bg-blue-100 text-white shadow-lg shadow-primary/20'
									: 'text-muted-foreground hover:bg-primary/5 hover:text-primary',
							)}
						>
							<span>All Categories</span>
						</button>
						{categories?.data?.map((cat) => (
							<button
								key={cat.id}
								onClick={() => handleCategoryChange(cat.slug)}
								className={cn(
									'flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-all',
									filters.category === cat.slug
										? 'bg-primary text-white shadow-lg shadow-primary/20'
										: 'text-muted-foreground hover:bg-primary/5 hover:text-primary',
								)}
							>
								<span className="truncate">{cat.name}</span>
								<span
									className={cn(
										'ml-2 rounded-lg px-2 py-0.5 text-[10px] font-black',
										filters.category === cat.slug
											? 'bg-white/20 text-white'
											: 'bg-primary/5 text-primary',
									)}
								>
									{cat.posts_count || 0}
								</span>
							</button>
						))}
					</div>
				</div>

				{/* Tags Cloud */}
				<div className="space-y-4">
					<h3 className="text-xs font-black tracking-[0.2em] text-muted-foreground uppercase">
						Popular Tags
					</h3>
					<div className="flex flex-wrap gap-2">
						<button
							onClick={() => handleTagChange('all')}
							className={cn(
								'rounded-lg px-3 py-1.5 text-xs font-bold transition-all',
								!filters.tag
									? 'bg-primary text-white shadow-md shadow-primary/10'
									: 'bg-background text-muted-foreground shadow-sm hover:bg-primary/5 hover:text-primary',
							)}
						>
							#all
						</button>
						{tags?.data?.map((tag) => (
							<button
								key={tag.id}
								onClick={() => handleTagChange(tag.slug || '')}
								className={cn(
									'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all',
									filters.tag === tag.slug
										? 'bg-primary text-white shadow-md shadow-primary/10'
										: 'bg-background text-muted-foreground shadow-sm hover:bg-primary/5 hover:text-primary',
								)}
							>
								<span>#{tag.name}</span>
								<span className="opacity-60">
									({tag.posts_count || 0})
								</span>
							</button>
						))}
					</div>
				</div>
			</Deferred>
		</div>
	);

	return (
		<GuestLayout>
			<SeoHead
				title="Articles"
				description="Explore our latest thoughts and insights"
			/>

			<div className="bg-slate-50/50 py-12 lg:py-24 dark:bg-slate-900/50">
				<div className="container mx-auto px-6 lg:px-8">
					<div className="mb-12 flex flex-col gap-4 lg:mb-16">
						<h2 className="text-sm font-black tracking-[0.3em] text-primary uppercase">
							Explore
						</h2>
						<HeaderSection content="Our" keyword="Articles" />
					</div>

					<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
						{/* Desktop Sidebar */}
						<aside className="hidden lg:col-span-3 lg:block">
							<div className="sticky top-24">
								<FilterContent />
							</div>
						</aside>

						{/* Main Content: Articles */}
						<main className="lg:col-span-9">
							<div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
								<div className="flex items-center gap-4">
									<p className="text-sm font-medium text-muted-foreground">
										Showing{' '}
										<span className="font-bold text-foreground">
											{articles?.total || 0}
										</span>{' '}
										articles
									</p>

									{showClearAll && (
										<Button
											variant="ghost"
											onClick={clearFilters}
											className="h-8 rounded-full bg-primary/5 px-4 text-xs font-bold text-primary hover:bg-primary/10"
										>
											Clear All
										</Button>
									)}

									{/* Mobile Filter Trigger */}
									<Sheet
										open={isFilterSheetOpen}
										onOpenChange={setIsFilterSheetOpen}
									>
										<SheetTrigger asChild>
											<Button
												variant="outline"
												size="sm"
												className="rounded-xl border-primary/10 bg-background lg:hidden"
											>
												<Filter className="mr-2 h-4 w-4" />
												Filters
												{hasActiveFilters && (
													<span className="ml-2 flex h-2 w-2 rounded-full bg-primary" />
												)}
											</Button>
										</SheetTrigger>
										<SheetContent
											side="left"
											className="w-[300px] overflow-y-auto sm:w-[400px]"
										>
											<SheetHeader className="mb-8 text-left">
												<SheetTitle className="text-2xl font-black tracking-tight">
													Filters
												</SheetTitle>
											</SheetHeader>
											<FilterContent isMobile />
										</SheetContent>
									</Sheet>
								</div>

								{/* Sort Buttons instead of Select to avoid UI lag */}
								<div className="flex items-center gap-1 rounded-2xl bg-slate-200/50 p-1 dark:bg-slate-800/50">
									{sortOptions.map((option) => {
										const isActive =
											currentSort === option.sort;
										return (
											<button
												key={option.sort}
												onClick={() =>
													handleSortChange(
														option.sort,
													)
												}
												className={cn(
													'flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black transition-all',
													isActive
														? 'bg-background text-primary shadow-sm'
														: 'text-muted-foreground hover:text-foreground',
												)}
											>
												{option.label}
												{isActive &&
													(currentDirection ===
													'desc' ? (
														<ArrowDownWideNarrow className="h-3 w-3" />
													) : (
														<ArrowUpNarrowWide className="h-3 w-3" />
													))}
											</button>
										);
									})}
								</div>
							</div>

							<Deferred
								data="articles"
								fallback={
									<div className="grid gap-8 sm:grid-cols-2">
										{Array.from({ length: 6 }).map(
											(_, i) => (
												<PostCardSkeleton
													key={`skeleton-${i}`}
												/>
											),
										)}
									</div>
								}
							>
								{articles?.data && articles.data.length > 0 ? (
									<>
										<div className="grid gap-8 sm:grid-cols-2">
											{articles.data.map(
												(article, index) => (
													<PostCard
														key={`article-${article.id || index}`}
														title={article.title}
														slug={article.slug}
														excerpt={
															article.excerpt
														}
														category={
															article.category
																.name
														}
														user={article.user}
														date={
															article.published_at ||
															article.created_at
														}
														readTime="5 min read"
														likes={
															article.likes_count
														}
														comments={
															article.comments_count
														}
													/>
												),
											)}
										</div>

										<div className="mt-16 flex justify-center">
											<TablePaginationLinks
												links={articles.links}
												preserveScroll={false}
											/>
										</div>
									</>
								) : (
									<div className="flex flex-col items-center justify-center py-32 text-center">
										<div className="mb-6 rounded-full bg-primary/5 p-12">
											<Search className="h-16 w-16 text-primary opacity-20" />
										</div>
										<h3 className="text-2xl font-black tracking-tight text-foreground">
											No articles found
										</h3>
										<p className="mt-2 text-muted-foreground">
											Try adjusting your search or filters
											to find what you're looking for.
										</p>
										<Button
											onClick={clearFilters}
											className="mt-8 rounded-2xl bg-primary px-8"
										>
											Clear All Filters
										</Button>
									</div>
								)}
							</Deferred>
						</main>
					</div>
				</div>
			</div>
		</GuestLayout>
	);
}
