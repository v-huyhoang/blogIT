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

interface PostSectionProps {
	title: string;
	headerContent: string;
	headerKeyword: string;
	data?: ResourceCollection<PostLatestHomePage> | null;
	deferredKey: string;
	readTime?: string;
	bg?: boolean;
	showAllLink?: boolean;
}

const PostSection = ({
	title,
	headerContent,
	headerKeyword,
	data,
	deferredKey,
	readTime = '5 min read',
	bg = false,
	showAllLink = false,
}: PostSectionProps) => {
	if (data === null && deferredKey === 'personalizedFeed') return null;

	return (
		<div
			className={
				bg ? 'bg-slate-50/50 py-24 dark:bg-slate-900/50' : 'py-24'
			}
		>
			<div className="container mx-auto px-6 lg:px-8">
				<div className="mb-16 flex flex-col gap-4">
					<h2 className="text-sm font-black tracking-[0.3em] text-primary uppercase">
						{title}
					</h2>
					<div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
						<HeaderSection
							content={headerContent}
							keyword={headerKeyword}
						/>
						{showAllLink && (
							<Link
								href={articlesRoute.index.url()}
								className="group flex items-center gap-2 text-xs font-black tracking-[0.3em] text-slate-500 uppercase transition-all hover:text-primary dark:text-slate-400"
							>
								VIEW ALL POSTS{' '}
								<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
							</Link>
						)}
					</div>
				</div>

				<Deferred
					data={deferredKey}
					fallback={
						<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
							<PostCardSkeleton />
							<PostCardSkeleton />
							<PostCardSkeleton />
						</div>
					}
				>
					<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
						{data?.data.map((post: PostLatestHomePage) => (
							<PostCard
								key={post.id}
								title={post.title}
								slug={post.slug}
								excerpt={post.excerpt}
								category={post.category.name}
								user={post.user}
								date={post.published_at}
								readTime={readTime}
								likes={post.likes_count}
								comments={post.comments_count}
							/>
						))}
					</div>
				</Deferred>
			</div>
		</div>
	);
};

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
			<PostSection
				title="Latest Insights"
				headerContent="Fresh"
				headerKeyword="Thinking"
				data={latestPosts}
				deferredKey="latestPosts"
				bg={true}
				showAllLink={true}
			/>

			{/* 3. Trending Posts */}
			<PostSection
				title="Trending Now"
				headerContent="Hot"
				headerKeyword="Topics"
				data={trendingPosts}
				deferredKey="trendingPosts"
				readTime="7 min read"
			/>

			{/* 4. Top Authors */}
			<Deferred data="topAuthors" fallback={<TopAuthorsSkeleton />}>
				<TopAuthorsSection topAuthors={topAuthors?.data || []} />
			</Deferred>

			{/* 5. Personalized Feed */}
			{personalizedFeed !== undefined && (
				<PostSection
					title="Recommended for You"
					headerContent="Personal"
					headerKeyword="Feed"
					data={personalizedFeed}
					deferredKey="personalizedFeed"
					readTime="6 min read"
				/>
			)}

			<PricingSection />

			<NewsletterSection />
		</GuestLayout>
	);
}
