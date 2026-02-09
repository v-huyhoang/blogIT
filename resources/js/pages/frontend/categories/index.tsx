import { PageHeader } from '@/components/frontend/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import GuestLayout from '@/layouts/frontend/guest-layout';
import { cn } from '@/lib/utils';
import articlesRoute from '@/routes/articles';
import { ResourceCollection, SingleCategory } from '@/types';
import { Deferred, Head, Link } from '@inertiajs/react';
import { LayoutGrid, TrendingUp } from 'lucide-react';

interface CategoriesIndexProps {
	categories?: ResourceCollection<SingleCategory>;
}

const colors = [
	'from-blue-400 to-cyan-400',
	'from-red-400 to-orange-400',
	'from-purple-400 to-indigo-400',
	'from-green-400 to-emerald-400',
	'from-blue-500 to-indigo-500',
	'from-pink-400 to-rose-400',
];

export default function CategoriesIndex({ categories }: CategoriesIndexProps) {
	return (
		<GuestLayout>
			<Head title="Categories - BlogIT" />

			<PageHeader
				heading="Explore"
				highlight="Categories"
				description="Deep dives organized by domain. Find the knowledge you need, curated by our experts."
				badge="Knowledge Base"
			/>

			<div className="container mx-auto px-6 py-24">
				<div className="mb-12 flex items-center gap-3">
					<TrendingUp className="h-6 w-6 text-primary" />
					<h2 className="text-2xl font-black tracking-widest uppercase">
						Main Categories
					</h2>
				</div>

				<Deferred
					data="categories"
					fallback={
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
							{Array.from({ length: 6 }).map((_, i) => (
								<Skeleton
									key={`cat-s-${i}`}
									className="h-64 rounded-3xl"
								/>
							))}
						</div>
					}
				>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
						{categories?.data?.map((cat, index) => (
							<Link
								key={cat.id}
								href={articlesRoute.index.url({
									query: { category: cat.slug },
								})}
								className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card px-12 py-6 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_40px_80px_rgba(168,85,247,0.1)]"
							>
								<div
									className={cn(
										'absolute top-0 right-0 h-64 w-64 bg-gradient-to-br opacity-5 blur-3xl transition-opacity group-hover:opacity-20',
										colors[index % colors.length],
									)}
								></div>
								<div className="relative z-10">
									<div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 transition-all duration-500 group-hover:bg-primary group-hover:text-white">
										<LayoutGrid className="h-8 w-8" />
									</div>
									<h3 className="mb-4 text-2xl font-black tracking-tighter">
										{cat.name}
									</h3>
									<p className="text-sm leading-none font-bold tracking-widest text-muted-foreground uppercase opacity-60">
										{cat.posts_count || 0} ARTICLES
									</p>
									<div className="mt-8 flex items-center gap-2 text-xs font-black text-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100">
										VIEW ARTICLES{' '}
										<div className="h-1 w-4 rounded-full bg-primary"></div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</Deferred>
			</div>
		</GuestLayout>
	);
}
