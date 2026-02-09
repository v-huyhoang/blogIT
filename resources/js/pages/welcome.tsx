import { BentoGrid } from '@/components/frontend/bento-grid';
import HeaderSection from '@/components/frontend/header-section';
import { HeroSection } from '@/components/frontend/hero-section';
import { NewsletterSection } from '@/components/frontend/newsletter-section';
import { PostCard } from '@/components/frontend/post-card';
import { PricingSection } from '@/components/frontend/pricing-section';
import { TopAuthorsSection } from '@/components/frontend/top-authors-section';
import { SeoHead } from '@/components/seo-head';
import { TopAuthorsSkeleton } from '@/components/skeletons/author-skeleton';
import { BentoGridSkeleton } from '@/components/skeletons/bento-grid-skeleton';
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton';
import GuestLayout from '@/layouts/frontend/guest-layout';
import articlesRoute from '@/routes/articles';
import {
	PostLatestHomePage,
	ResourceCollection,
	TopAuthorsSectionProps,
} from '@/types';
import { Deferred, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

interface HomePageProps {
	latestPosts?: ResourceCollection<PostLatestHomePage>;
	featuredPosts?: ResourceCollection<PostLatestHomePage>;
	topAuthors?: ResourceCollection<TopAuthorsSectionProps>;
	trendingPosts?: ResourceCollection<PostLatestHomePage>;
	personalizedFeed?: ResourceCollection<PostLatestHomePage> | null;
}

export default function Welcome({
	latestPosts,
	featuredPosts,
	topAuthors,
	trendingPosts,
	personalizedFeed,
}: HomePageProps) {
	return (
		<GuestLayout>
			<SeoHead />

			<HeroSection />

			{/* 1. Featured Content */}
			<Deferred data="featuredPosts" fallback={<BentoGridSkeleton />}>
				<BentoGrid featuredPosts={featuredPosts?.data} />
			</Deferred>

			{/* 2. Latest Insights */}
			<div className="bg-slate-50/50 py-24 dark:bg-slate-900/50">
				<div className="container mx-auto px-6 lg:px-8">
					<div className="mb-16 flex flex-col gap-4">
						<h2 className="text-sm font-black tracking-[0.3em] text-primary uppercase">
							Latest Insights
						</h2>
						<div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
							<HeaderSection content="Fresh" keyword="Thinking" />
							<Link
								href={articlesRoute.index.url()}
								className="group flex items-center gap-2 text-xs font-black tracking-[0.3em] text-slate-500 uppercase transition-all hover:text-primary dark:text-slate-400"
							>
								VIEW ALL POSTS{' '}
								<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
							</Link>
						</div>
					</div>

					<Deferred
						data="latestPosts"
						fallback={
							<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
								<PostCardSkeleton />
								<PostCardSkeleton />
								<PostCardSkeleton />
							</div>
						}
					>
						<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
							{latestPosts?.data.map(
								(post: PostLatestHomePage) => (
									<PostCard
										key={`post-${post.id}`}
										title={post.title}
										slug={post.slug}
										excerpt={post.excerpt}
										category={post.category.name}
										user={post.user}
										date={post.published_at}
										readTime="5 min read"
										// imageUrl={post.image_url}
										likes={post.likes_count}
										comments={post.comments_count}
									/>
								),
							)}
						</div>
					</Deferred>
				</div>
			</div>

			{/* 3. Trending Posts */}
			<div className="py-24">
				<div className="container mx-auto px-6 lg:px-8">
					<div className="mb-16 flex flex-col gap-4">
						<h2 className="text-sm font-black tracking-[0.3em] text-primary uppercase">
							Trending Now
						</h2>
						<HeaderSection content="Hot" keyword="Topics" />
					</div>

					<Deferred
						data="trendingPosts"
						fallback={
							<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
								<PostCardSkeleton />
								<PostCardSkeleton />
								<PostCardSkeleton />
							</div>
						}
					>
						<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
							{trendingPosts?.data.map(
								(post: PostLatestHomePage) => (
									<PostCard
										key={`post-${post.id}`}
										title={post.title}
										slug={post.slug}
										excerpt={post.excerpt}
										category={post.category.name}
										user={post.user}
										date={post.published_at}
										readTime="7 min read"
										featured={false}
										likes={post.likes_count}
										comments={post.comments_count}
									/>
								),
							)}
						</div>
					</Deferred>
				</div>
			</div>

			{/* 4. Top Authors */}
			<Deferred data="topAuthors" fallback={<TopAuthorsSkeleton />}>
				<TopAuthorsSection topAuthors={topAuthors?.data || []} />
			</Deferred>

			{/* 5. Personalized Feed */}
			<div className="py-24">
				<div className="container mx-auto px-6 lg:px-8">
					<div className="mb-16 flex flex-col gap-4">
						<h2 className="text-sm font-black tracking-[0.3em] text-primary uppercase">
							Recommended for You
						</h2>
						<HeaderSection content="Personal" keyword="Feed" />
					</div>

					<Deferred
						data="personalizedFeed"
						fallback={
							<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
								<PostCardSkeleton />
								<PostCardSkeleton />
								<PostCardSkeleton />
							</div>
						}
					>
						<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
							{personalizedFeed?.data.map(
								(post: PostLatestHomePage) => (
									<PostCard
										key={`post-${post.id}`}
										title={post.title}
										slug={post.slug}
										excerpt={post.excerpt}
										category={post.category.name}
										user={post.user}
										date={post.published_at}
										readTime="6 min read"
										featured={false}
										likes={post.likes_count}
										comments={post.comments_count}
									/>
								),
							)}
						</div>
					</Deferred>
				</div>
			</div>

			<PricingSection />

			<NewsletterSection />
		</GuestLayout>
	);
}
