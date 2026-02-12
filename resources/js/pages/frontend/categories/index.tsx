import { PageHeader } from '@/components/frontend/page-header';
import { SearchBox } from '@/components/search-box';
import { SeoHead } from '@/components/seo-head';
import { Skeleton } from '@/components/ui/skeleton';
import { useDebounce } from '@/hooks/use-debounce';
import GuestLayout from '@/layouts/frontend/guest-layout';
import { cn } from '@/lib/utils';
import articlesRoute from '@/routes/articles';
import { ResourceCollection, SingleCategory } from '@/types';
import { Deferred, Link } from '@inertiajs/react';
import { ArrowRight, LayoutGrid, Search } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';

interface CategoriesIndexProps {
	categories?: ResourceCollection<SingleCategory>;
}

const colors = [
	'from-blue-500/20 to-cyan-500/20',
	'from-red-500/20 to-orange-500/20',
	'from-purple-500/20 to-indigo-500/20',
	'from-green-500/20 to-emerald-500/20',
	'from-blue-600/20 to-indigo-600/20',
	'from-pink-500/20 to-rose-500/20',
];

const CategoryCard = memo(
	({ cat, index }: { cat: SingleCategory; index: number }) => (
		<Link
			href={articlesRoute.index.url({
				query: { category: cat.slug },
			})}
			className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/50 bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl"
		>
			<div
				className={cn(
					'absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br opacity-10 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-20',
					colors[index % colors.length],
				)}
			/>

			<div className="relative z-10 mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30">
				<LayoutGrid className="h-7 w-7 transition-transform duration-500 group-hover:rotate-12" />
			</div>

			<div className="relative z-10 flex flex-1 flex-col">
				<h3 className="mb-3 text-2xl font-black tracking-tight text-foreground transition-colors group-hover:text-primary">
					{cat.name}
				</h3>
				<p className="mb-6 line-clamp-2 text-sm leading-relaxed font-medium text-muted-foreground/70">
					{cat.description ||
						`Explore our collection of articles about ${cat.name.toLowerCase()}.`}
				</p>

				<div className="mt-auto flex items-center justify-between border-t border-border/40 pt-6">
					<div className="flex flex-col">
						<span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground/50 uppercase">
							Articles
						</span>
						<span className="text-lg font-black text-foreground/80">
							{cat.posts_count || 0}
						</span>
					</div>
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
						<ArrowRight className="h-5 w-5" />
					</div>
				</div>
			</div>
		</Link>
	),
);

CategoryCard.displayName = 'CategoryCard';

export default function CategoriesIndex({ categories }: CategoriesIndexProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const debouncedSearchQuery = useDebounce(searchQuery, 300);

	const filteredCategories = useMemo(() => {
		return (categories?.data || []).filter(
			(cat) =>
				cat.name
					.toLowerCase()
					.includes(debouncedSearchQuery.toLowerCase()) ||
				cat.description
					?.toLowerCase()
					.includes(debouncedSearchQuery.toLowerCase()),
		);
	}, [categories?.data, debouncedSearchQuery]);

	const onSearch = useCallback((value: string) => {
		setSearchQuery(value);
	}, []);

	const clearSearch = useCallback(() => {
		setSearchQuery('');
	}, []);

	return (
		<GuestLayout>
			<SeoHead />

			<PageHeader
				heading="Explore"
				highlight="Categories"
				description="Deep dives organized by domain. Find the knowledge you need, curated by our experts."
				badge="Knowledge Base"
			/>

			<div className="container mx-auto px-6 py-24">
				<div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
					<div className="flex items-center gap-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
							<LayoutGrid className="h-6 w-6" />
						</div>
						<div>
							<h2 className="text-2xl font-black tracking-tight tracking-widest uppercase">
								Browse Categories
							</h2>
							<p className="text-sm font-medium text-muted-foreground">
								Discover articles by topic area
							</p>
						</div>
					</div>
					<div className="relative w-full md:w-80">
						<SearchBox
							value={searchQuery}
							placeholder="Search categories..."
							onSearch={onSearch}
							onChange={onSearch}
						/>
					</div>
				</div>

				<Deferred
					data="categories"
					fallback={
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{Array.from({ length: 8 }).map((_, i) => (
								<Skeleton
									key={`cat-s-${i}`}
									className="h-72 rounded-[2rem]"
								/>
							))}
						</div>
					}
				>
					{filteredCategories.length > 0 ? (
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{filteredCategories.map((cat, index) => (
								<CategoryCard
									key={cat.id}
									cat={cat}
									index={index}
								/>
							))}
						</div>
					) : (
						<div className="rounded-[3rem] border border-dashed border-border/60 bg-muted/20 py-24 text-center">
							<div className="mb-6 flex justify-center">
								<div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-muted text-muted-foreground/30">
									<Search className="h-10 w-10" />
								</div>
							</div>
							<h3 className="mb-2 text-xl font-black text-foreground/70">
								No categories found
							</h3>
							<p className="mb-8 text-muted-foreground">
								We couldn't find any categories matching "
								{searchQuery}"
							</p>
							<button
								onClick={clearSearch}
								className="rounded-xl bg-primary px-6 py-3 text-sm font-black tracking-widest text-primary-foreground uppercase shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 hover:cursor-pointer hover:shadow-xl"
							>
								Clear Search
							</button>
						</div>
					)}
				</Deferred>
			</div>
		</GuestLayout>
	);
}
