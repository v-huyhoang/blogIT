import LexicalPreview from '@/components/editor/lexical-preview';
import { CommentSection } from '@/components/frontend/comment-section';
import HeaderSection from '@/components/frontend/header-section';
import { NewsletterMini } from '@/components/frontend/newsletter-mini';
import { PostCard } from '@/components/frontend/post-card';
import { TableOfContents } from '@/components/frontend/table-of-contents';
import { SeoHead } from '@/components/seo-head';
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import GuestLayout from '@/layouts/frontend/guest-layout';
import { cn } from '@/lib/utils';
import articlesRoute from '@/routes/articles';
import { Post, ResourceCollection, SingleTag } from '@/types';
import { Deferred, Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
	ArrowLeft,
	ArrowRight,
	Calendar,
	Clock,
	Eye,
	Facebook,
	Heart,
	Linkedin,
	MessageCircle,
	Twitter,
	UserPlus,
} from 'lucide-react';
import { useRef, useState } from 'react';

interface ArticleShowProps {
	article: {
		data: Omit<Post, 'tags'> & {
			content: string;
			tags: SingleTag[];
			meta_title: string | null;
			meta_description: string | null;
		};
	};
	relatedPosts?: ResourceCollection<Post>;
}

export default function ArticleShow({
	article: { data: article },
	relatedPosts,
}: ArticleShowProps) {
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(article.likes_count || 0);
	const [isFollowing, setIsFollowing] = useState(false);
	const [showLikeEffect, setShowLikeEffect] = useState(false);

	const commentSectionRef = useRef<HTMLDivElement>(null);

	const handleLike = () => {
		if (!isLiked) {
			setShowLikeEffect(true);
			setTimeout(() => setShowLikeEffect(false), 1000);
		}
		setIsLiked(!isLiked);
		setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
	};

	const scrollToComments = () => {
		commentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<GuestLayout>
			<SeoHead
				title={article.meta_title || article.title}
				description={article.meta_description || article.excerpt || ''}
			/>

			<article className="mx-auto pb-32">
				{/* Refined, more "friendly" Hero Header */}
				<div className="group relative mb-20 h-[40vh] min-h-[600px] w-full overflow-hidden pt-20">
					<img
						src={
							article.image_url ||
							'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2500&auto=format&fit=crop'
						}
						alt={article.title}
						className="h-full w-full scale-105 object-cover transition-transform duration-[2s] ease-out group-hover:scale-100"
						loading="eager"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
					<div className="absolute right-0 bottom-0 left-0 p-8 md:p-16">
						<div className="container mx-auto px-6">
							<div className="max-w-7xl">
								<Link
									href={articlesRoute.index.url()}
									prefetch
									className="group mb-8 inline-flex items-center gap-3 text-[10px] font-black tracking-[0.4em] text-white/80 hover:text-white"
								>
									<ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-2" />{' '}
									BACK TO ARTICLES
								</Link>
								<div className="mb-6 flex gap-3">
									<Badge className="rounded-full border-none bg-primary/90 px-6 py-1.5 text-[9px] font-black tracking-widest text-white shadow-xl backdrop-blur-md">
										{article.category.name.toUpperCase()}
									</Badge>
									{article.is_featured && (
										<Badge
											variant="outline"
											className="rounded-full border-white/20 bg-white/5 px-6 py-1.5 text-[9px] font-black tracking-widest text-white backdrop-blur-md"
										>
											FEATURED
										</Badge>
									)}
								</div>
								<h1 className="mb-10 text-4xl leading-[0.9] font-black tracking-tighter text-white sm:text-6xl md:text-7xl">
									{article.title}
								</h1>
								<div className="flex flex-wrap items-center gap-8 text-[10px] font-black tracking-[0.2em] text-white/70 uppercase">
									<div className="flex items-center gap-4">
										<Avatar className="h-14 w-12 rounded-2xl ring-4 ring-white/10">
											<AvatarImage
												src={article.user.avatar}
												className="object-cover"
											/>
											<AvatarFallback>
												{article.user.name
													.substring(0, 2)
													.toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<div>
											<Link
												href={`/f/author/${article.user.name.toLowerCase().replace(' ', '-')}`}
												prefetch
												className="mb-0.5 block text-xs leading-none font-black text-white transition-colors hover:text-primary"
											>
												{article.user.name.toUpperCase()}
											</Link>
											<p className="opacity-60">AUTHOR</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Calendar className="h-3.5 w-3.5 text-primary" />{' '}
										{article.published_at?.toUpperCase()}
									</div>
									<div className="flex items-center gap-2">
										<Clock className="h-3.5 w-3.5 text-primary" />{' '}
										8 MIN READ
									</div>
									<div className="flex items-center gap-2">
										<Eye className="h-3.5 w-3.5 text-primary" />{' '}
										{article.views_count} VIEWS
									</div>
									<div className="ml-auto flex items-center gap-6">
										<div className="relative flex items-center gap-3">
											<AnimatePresence>
												{showLikeEffect && (
													<motion.div
														initial={{
															scale: 0.8,
															opacity: 1,
														}}
														animate={{
															scale: 1.8,
															opacity: 0,
														}}
														exit={{ opacity: 0 }}
														className="absolute inset-0 z-0 flex items-center justify-center text-red-500"
													>
														<Heart className="h-full w-full fill-current" />
													</motion.div>
												)}
											</AnimatePresence>
											<motion.div
												whileTap={{ scale: 0.9 }}
												whileHover={{ scale: 1.05 }}
											>
												<Button
													onClick={handleLike}
													variant="ghost"
													className={cn(
														'relative z-10 h-12 w-12 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all',
														isLiked &&
															'border-red-500 bg-red-500 text-white',
													)}
												>
													<Heart
														className={cn(
															'h-5 w-5',
															isLiked &&
																'fill-current',
														)}
													/>
												</Button>
											</motion.div>
											<span className="text-base font-black text-white">
												{likeCount}
											</span>
										</div>
										<motion.div
											whileTap={{ scale: 0.9 }}
											whileHover={{ scale: 1.05 }}
										>
											<div className="flex items-center gap-3">
												<Button
													onClick={scrollToComments}
													variant="ghost"
													className="h-12 w-12 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-primary"
												>
													<MessageCircle className="h-5 w-5" />
												</Button>
												<span className="text-base font-black text-white">
													{article.comments_count}
												</span>
											</div>
										</motion.div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="container mx-auto px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-24 lg:grid-cols-12">
						{/* Sidebar Left: TOC */}
						<aside className="sticky top-32 hidden h-fit lg:col-span-3 lg:block">
							<TableOfContents content={article.content} />

							<NewsletterMini />

							<div className="group relative mt-20 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-purple-600 p-10 text-white shadow-2xl shadow-primary/20">
								<div className="absolute top-0 right-0 p-4 opacity-20 transition-transform duration-700 group-hover:scale-110">
									<ArrowRight className="h-24 w-24 -rotate-45" />
								</div>
								<h4 className="relative z-10 mb-4 text-xl leading-tight font-black">
									Get the Pro Version.
								</h4>
								<p className="relative z-10 mb-8 text-xs leading-relaxed font-bold text-white/80">
									Access exclusive architectural deep-dives
									and source code.
								</p>
								<Button className="relative z-10 h-12 w-full rounded-2xl bg-white text-[10px] font-black tracking-widest text-primary hover:bg-white/90">
									UPGRADE NOW
								</Button>
							</div>
						</aside>

						{/* Content Right */}
						<div className="max-w-4xl lg:col-span-9">
							<div
								id="article-content"
								className="prose-primary prose-md prose max-w-none font-medium dark:prose-invert prose-headings:font-black prose-headings:tracking-tighter prose-p:leading-[1.8] prose-p:text-foreground/90"
							>
								<LexicalPreview content={article.content} />
							</div>

							<div className="mt-32 flex flex-col justify-between gap-12 border-t border-border/50 py-16 md:flex-row md:items-center">
								<div className="flex items-center gap-8 text-[10px] font-black tracking-[0.4em]">
									<span className="uppercase opacity-40">
										SPREAD THE WORD:
									</span>
									<div className="flex gap-4">
										{[Twitter, Facebook, Linkedin].map(
											(Icon, i) => (
												<Button
													key={i}
													variant="outline"
													size="icon"
													className="h-14 w-14 rounded-2xl border-2 transition-all hover:bg-primary hover:text-white"
												>
													<Icon className="h-5 w-5" />
												</Button>
											),
										)}
									</div>
								</div>
								<div className="flex gap-3">
									{article.tags.map((tag) => (
										<Link
											key={tag.id}
											href={articlesRoute.index.url({
												query: { tag: tag.slug },
											})}
										>
											<Badge
												variant="secondary"
												className="rounded-full border-none bg-secondary px-8 py-2 text-[10px] font-black tracking-[0.3em] transition-colors hover:bg-primary hover:text-white"
											>
												#{tag.name.toUpperCase()}
											</Badge>
										</Link>
									))}
								</div>
							</div>

							{/* Author Bio */}
							<div className="group relative mt-24 overflow-hidden rounded-3xl border border-border/50 bg-card p-16 shadow-2xl">
								<div className="relative z-10 flex flex-col items-center gap-12 text-center md:flex-row md:items-start md:text-left">
									<Avatar className="h-40 w-40 rounded-3xl shadow-2xl ring-[16px] ring-primary/5">
										<AvatarImage
											src={article.user.avatar}
											className="object-cover"
										/>
										<AvatarFallback>
											{article.user.name
												.substring(0, 2)
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div className="flex-1">
										<div className="mb-8 flex flex-col justify-between gap-8 md:flex-row md:items-center">
											<div>
												<h3 className="mb-2 text-2xl font-black tracking-tighter">
													{article.user.name}
												</h3>
												<p className="text-xs font-black tracking-[0.3em] text-primary uppercase">
													Author
												</p>
											</div>
											<Button
												onClick={() =>
													setIsFollowing(!isFollowing)
												}
												className={cn(
													'h-14 rounded-2xl px-10 font-black tracking-tight shadow-xl shadow-primary/20 transition-all',
													isFollowing &&
														'bg-secondary text-secondary-foreground shadow-none',
												)}
											>
												{isFollowing ? (
													'Following Author'
												) : (
													<>
														<UserPlus className="mr-2 h-5 w-5" />{' '}
														Follow Author
													</>
												)}
											</Button>
										</div>
										<p className="mb-10 text-lg leading-relaxed font-medium text-muted-foreground italic">
											"Sharing engineering wisdom through
											deep technical journeys."
										</p>
										<div className="flex justify-center gap-16 text-[10px] font-black tracking-[0.3em] opacity-40 md:justify-start">
											<div className="flex flex-col items-center md:items-start">
												<span className="mb-2 text-3xl leading-none text-foreground">
													24
												</span>
												<span>ARTICLES</span>
											</div>
											<div className="flex flex-col items-center md:items-start">
												<span className="mb-2 text-3xl leading-none text-foreground">
													12k
												</span>
												<span>FOLLOWERS</span>
											</div>
											<div className="flex flex-col items-center md:items-start">
												<span className="mb-2 text-3xl leading-none text-foreground">
													850
												</span>
												<span>LIKES</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div ref={commentSectionRef}>
								<CommentSection />
							</div>
						</div>
					</div>
				</div>
			</article>

			{/* Related Posts */}
			{(!relatedPosts || relatedPosts.data.length > 0) && (
				<aside className="border-t border-white/5 bg-white/[0.01] py-32">
					<div className="container mx-auto px-6">
						<Deferred
							data="relatedPosts"
							fallback={
								<div className="grid gap-16 md:grid-cols-3">
									<PostCardSkeleton className="border-white/5 bg-white/[0.02]" />
									<PostCardSkeleton className="border-white/5 bg-white/[0.02]" />
									<PostCardSkeleton className="border-white/5 bg-white/[0.02]" />
								</div>
							}
						>
							<div className="mb-24 flex items-end justify-between">
								<div>
									<HeaderSection
										as="h4"
										content="Related"
										keyword="Articles"
									/>
								</div>
								<Link
									href={articlesRoute.index.url()}
									className="group flex items-center gap-2 text-xs font-black tracking-[0.3em] text-slate-500 uppercase transition-all hover:text-primary dark:text-slate-400"
								>
									View more articles{' '}
									<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
								</Link>
							</div>
							<div className="grid gap-16 md:grid-cols-3">
								{relatedPosts?.data.map((post) => (
									<PostCard
										key={post.id}
										title={post.title}
										slug={post.slug}
										excerpt={post.excerpt}
										category={post.category.name}
										user={post.user}
										date={
											post.published_at || post.created_at
										}
										readTime="8 min"
										likes={post.likes_count}
										comments={post.comments_count}
										className="border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"
									/>
								))}
							</div>
						</Deferred>
					</div>
				</aside>
			)}
		</GuestLayout>
	);
}
