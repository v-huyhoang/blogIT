import { PageHeader } from '@/components/frontend/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import GuestLayout from '@/layouts/frontend/guest-layout';
import { cn } from '@/lib/utils';
import articlesRoute from '@/routes/articles';
import { ResourceCollection, SingleTag } from '@/types';
import { Deferred, Head, Link } from '@inertiajs/react';
import { Hash, TrendingUp } from 'lucide-react';

interface TagsIndexProps {
	tags?: ResourceCollection<SingleTag>;
}

const colors = [
	'from-blue-400 to-cyan-400',
	'from-red-400 to-orange-400',
	'from-purple-400 to-indigo-400',
	'from-green-400 to-emerald-400',
	'from-blue-500 to-indigo-500',
	'from-pink-400 to-rose-400',
	'from-slate-400 to-slate-600',
	'from-yellow-400 to-amber-600',
];

export default function TagsIndex({ tags }: TagsIndexProps) {
	return (
		<GuestLayout>
			<Head title="Browse Topics - BlogIT" />

			<PageHeader
				heading="Browse by"
				highlight="Topic"
				description="Explore our curated collection of articles categorized by the technologies and paradigms that shape the modern web."
				badge="Tags Collection"
			/>

			<div className="container mx-auto px-6 py-24">
				<div className="mb-12 flex items-center gap-3">
					<TrendingUp className="h-6 w-6 text-primary" />
					<h2 className="text-2xl font-black tracking-widest uppercase">
						Trending Topics
					</h2>
				</div>

				<Deferred
					data="tags"
					fallback={
						<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
							{Array.from({ length: 12 }).map((_, i) => (
								<Skeleton
									key={`tag-s-${i}`}
									className="h-40 rounded-3xl"
								/>
							))}
						</div>
					}
				>
					<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
						{tags?.data?.map((tag, index) => (
							<Link
								key={tag.id}
								href={articlesRoute.index.url({
									query: { tag: tag.slug },
								})}
								className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl"
							>
								<div
									className={cn(
										'absolute top-0 right-0 h-32 w-32 bg-gradient-to-br opacity-5 blur-3xl transition-opacity group-hover:opacity-20',
										colors[index % colors.length],
									)}
								></div>
								<div className="relative z-10">
									<Hash className="mb-6 h-6 w-6 text-primary" />
									<h3 className="mb-2 text-2xl font-black">
										{tag.name}
									</h3>
									<p className="text-sm font-bold tracking-widest text-muted-foreground uppercase opacity-60">
										{tag.posts_count || 0} ARTICLES
									</p>
								</div>
							</Link>
						))}
					</div>
				</Deferred>
			</div>
		</GuestLayout>
	);
}
