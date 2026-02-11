import HeaderSection from '@/components/frontend/header-section';
import { PostCard } from '@/components/frontend/post-card';
import { SearchBox } from '@/components/search-box';
import { SeoHead } from '@/components/seo-head';
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton';
import { TablePaginationLinks } from '@/components/table-paginate-simple';
import { Button } from '@/components/ui/button';

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
import { ArticlesIndexProps, FilterContentProps } from '@/types';
import { Deferred, router } from '@inertiajs/react';
import {
	ArrowDownWideNarrow,
	ArrowUpNarrowWide,
	Filter,
	LayoutGrid,
	Search,
	Sparkles,
	Tags,
	X,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const FilterContent = ({
	search,
	setSearch,
	categories,
	tags,
	filters,
	handleCategoryChange,
	handleTagChange,
	isMobile = false,
}: FilterContentProps) => (
	<div className={cn('space-y-8', isMobile && 'space-y-6')}>
		{/* Search Section */}
		<div className="space-y-3">
			<h3 className="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase opacity-60">
				<Search className="h-3 w-3" />
				Search
			</h3>
			<SearchBox
				value={search}
				onSearch={(val) => setSearch(val)}
				onChange={(val) => setSearch(val)}
				placeholder="Type to search..."
			/>
		</div>

		<Deferred
			data={['categories', 'tags']}
			fallback={
				<div className="space-y-8">
					<div className="space-y-3">
						<Skeleton className="h-3 w-20" />
						<div className="space-y-1.5">
							{Array.from({ length: 5 }).map((_, i) => (
								<Skeleton
									key={`cat-s-${i}`}
									className="h-8 w-full rounded-lg"
								/>
							))}
						</div>
					</div>
					<div className="space-y-3">
						<Skeleton className="h-3 w-20" />
						<div className="flex flex-wrap gap-1.5">
							{Array.from({ length: 8 }).map((_, i) => (
								<Skeleton
									key={`tag-s-${i}`}
									className="h-6 w-14 rounded-md"
								/>
							))}
						</div>
					</div>
				</div>
			}
		>
			{/* Categories Section */}
			<div className="space-y-3">
				<h3 className="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase opacity-60">
					<LayoutGrid className="h-3 w-3" />
					Categories
				</h3>
				<div className="flex flex-col gap-0.5">
					<button
						onClick={() => handleCategoryChange('all')}
						className={cn(
							'flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all duration-200 hover:cursor-pointer',
							!filters.category
								? 'bg-primary/10 text-primary'
								: 'text-muted-foreground hover:bg-muted hover:text-foreground',
						)}
					>
						<span>All Topics</span>
					</button>
					{categories?.data?.map((cat) => (
						<button
							key={cat.id}
							onClick={() => handleCategoryChange(cat.slug)}
							className={cn(
								'flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all duration-200 hover:cursor-pointer',
								filters.category === cat.slug
									? 'bg-primary/10 text-primary'
									: 'text-muted-foreground hover:bg-muted hover:text-foreground',
							)}
						>
							<span className="truncate">{cat.name}</span>
							<span
								className={cn(
									'ml-2 flex h-4.5 min-w-[18px] items-center justify-center rounded-md px-1 text-[8px] font-black tabular-nums',
									filters.category === cat.slug
										? 'bg-primary text-white'
										: 'bg-muted text-muted-foreground',
								)}
							>
								{cat.posts_count || 0}
							</span>
						</button>
					))}
				</div>
			</div>

			{/* Tags Section */}
			<div className="space-y-3">
				<h3 className="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase opacity-60">
					<Tags className="h-3 w-3" />
					Popular Tags
				</h3>
				<div className="flex flex-wrap gap-1.5">
					<button
						onClick={() => handleTagChange('all')}
						className={cn(
							'rounded-md border px-2 py-1 text-[10px] font-bold transition-all duration-200 hover:cursor-pointer',
							!filters.tag
								? 'border-primary/20 bg-primary/10 text-primary'
								: 'border-border/50 bg-card text-muted-foreground hover:border-primary/30 hover:text-primary',
						)}
					>
						#all
					</button>
					{tags?.data?.map((tag) => (
						<button
							key={tag.id}
							onClick={() => handleTagChange(tag.slug || '')}
							className={cn(
								'flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-bold transition-all duration-200 hover:cursor-pointer',
								filters.tag === tag.slug
									? 'border-primary/20 bg-primary/10 text-primary'
									: 'border-border/50 bg-card text-muted-foreground hover:border-primary/30 hover:text-primary',
							)}
						>
							<span>#{tag.name}</span>
							<span
								className={cn(
									'text-[8px] font-black tabular-nums opacity-60',
									filters.tag === tag.slug
										? 'text-primary'
										: 'text-muted-foreground',
								)}
							>
								{tag.posts_count || 0}
							</span>
						</button>
					))}
				</div>
			</div>
		</Deferred>
	</div>
);

const sortOptions = [
	{ label: 'Latest', sort: 'created_at' },
	{ label: 'Views', sort: 'views_count' },
	{ label: 'Likes', sort: 'likes_count' },
];

export default function ArticlesIndex({
	articles,
	filters,
	categories,
	tags,
}: ArticlesIndexProps) {
	const [search, setSearch] = useState(filters.search || '');
	const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
	const debouncedSearch = useDebounce(search, 600);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	// Sync search state with filters prop (e.g., on back button or direct URL change)
	useEffect(() => {
		setSearch(filters.search || '');
	}, [filters.search]);

	const updateFilters = useCallback(
		(newFilters: Partial<typeof filters>) => {
			const data = {
				...filters,
				...newFilters,
				page: 1, // Reset to first page on filter change
			};

			// Clean up empty values to keep URL clean
			Object.keys(data).forEach((key) => {
				const val = data[key as keyof typeof data];
				if (val === '' || val === undefined || val === null) {
					delete data[key as keyof typeof data];
				}
			});

			router.get(articlesRoute.index.url(), data, {
				preserveState: true,
				preserveScroll: true,
				only: ['articles', 'filters'],
				onSuccess: () => {
					setIsFilterSheetOpen(false);
					scrollToTop();
				},
			});
		},
		[filters],
	);

	// Debounced search trigger
	useEffect(() => {
		const currentSearch = filters.search || '';

		// 1. If debounced value is still catching up to the current search state, wait.
		if (debouncedSearch !== search) return;

		// 2. If debounced value matches what's already in the URL, do nothing.
		if (debouncedSearch === currentSearch) return;

		// 3. Only trigger search if search is cleared OR minimum 2 characters are entered
		const isSearchValid =
			debouncedSearch.length === 0 || debouncedSearch.length >= 2;

		if (isSearchValid) {
			updateFilters({ search: debouncedSearch || undefined });
		}
	}, [debouncedSearch, search, filters.search, updateFilters]);

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
			{}, // Empty data means clear all filters
			{
				preserveState: false, // Full refresh to clean state
				preserveScroll: true,
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

	const currentSort = filters.sort || 'created_at';
	const currentDirection = filters.direction || 'desc';

	return (
		<GuestLayout>
			<SeoHead
				title="Articles"
				description="Explore our latest thoughts and insights"
			/>

			<div className="bg-muted/30 py-12 lg:py-24">
				<div className="container mx-auto px-6 lg:px-8">
					<div className="mb-16 flex flex-col gap-4">
						<div className="flex items-center gap-3">
							<div className="h-1 w-12 rounded-full bg-primary" />
							<h2 className="text-sm font-black tracking-[0.3em] text-primary uppercase">
								Knowledge Hub
							</h2>
						</div>
						<HeaderSection content="Latest" keyword="Articles" />
					</div>

					<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
						{/* Desktop Sidebar */}
						<aside className="hidden lg:col-span-3 lg:block">
							<div className="sticky top-24 rounded-2xl border border-border/40 bg-card/50 p-5 shadow-sm backdrop-blur-sm">
								<FilterContent
									search={search}
									setSearch={setSearch}
									categories={categories}
									tags={tags}
									filters={filters}
									handleCategoryChange={handleCategoryChange}
									handleTagChange={handleTagChange}
								/>
							</div>
						</aside>

						{/* Main Content: Articles */}
						<main className="lg:col-span-9">
							<div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
								<div className="flex flex-wrap items-center gap-3">
									<div className="flex items-center gap-2 rounded-xl border border-white/50 bg-white/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-md transition-all duration-300 dark:border-slate-700/50 dark:bg-slate-800/60">
										<Sparkles className="h-3.5 w-3.5 animate-pulse text-primary" />
										<span>
											Found{' '}
											<span className="font-black text-foreground">
												{articles?.total || 0}
											</span>{' '}
											Articles
											{filters.search && (
												<span className="ml-1.5 opacity-70">
													for "
													<span className="font-bold text-primary">
														{filters.search}
													</span>
													"
												</span>
											)}
										</span>
									</div>

									{showClearAll && (
										<button
											onClick={clearFilters}
											className="flex items-center gap-1.5 rounded-xl bg-muted/50 px-3 py-1.5 text-[10px] font-bold text-muted-foreground transition-all duration-200 hover:cursor-pointer hover:bg-red-50 hover:text-red-500 active:scale-95"
										>
											<X className="h-3 w-3" />
											Clear
										</button>
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
												className="h-9 rounded-xl border-border/50 bg-card px-4 shadow-sm hover:cursor-pointer lg:hidden"
											>
												<Filter className="mr-2 h-3.5 w-3.5" />
												Filters
												{hasActiveFilters && (
													<span className="ml-2 flex h-1.5 w-1.5 rounded-full bg-primary" />
												)}
											</Button>
										</SheetTrigger>
										<SheetContent
											side="left"
											className="w-[280px] overflow-y-auto rounded-r-2xl sm:w-[350px]"
										>
											<SheetHeader className="mb-8 text-left">
												<SheetTitle className="flex items-center gap-2.5 text-xl font-black tracking-tight">
													<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
														<Filter className="h-4 w-4" />
													</div>
													Filters
												</SheetTitle>
											</SheetHeader>
											<FilterContent
												search={search}
												setSearch={setSearch}
												categories={categories}
												tags={tags}
												filters={filters}
												handleCategoryChange={
													handleCategoryChange
												}
												handleTagChange={
													handleTagChange
												}
												isMobile
											/>
										</SheetContent>
									</Sheet>
								</div>

								{/* Sort Buttons */}
								<div className="flex items-center gap-1 rounded-xl border border-border/40 bg-card p-1 shadow-sm">
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
													'flex items-center gap-1 rounded-lg px-3 py-1 text-[10px] font-black tracking-widest uppercase transition-all duration-200 hover:cursor-pointer',
													isActive
														? 'bg-primary text-primary-foreground shadow-sm'
														: 'text-muted-foreground hover:bg-muted hover:text-foreground',
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
									<div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-card/30 py-32 text-center backdrop-blur-sm">
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
											className="mt-8 h-12 rounded-2xl bg-primary px-10 font-black tracking-widest uppercase shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 hover:cursor-pointer hover:shadow-xl"
										>
											Reset All Filters
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
