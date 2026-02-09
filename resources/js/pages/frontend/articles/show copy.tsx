import { NewsletterSection } from '@/components/frontend/newsletter-section';
import { SeoHead } from '@/components/seo-head';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import GuestLayout from '@/layouts/frontend/guest-layout';
import articlesRoute from '@/routes/articles';
import { Post, SingleTag } from '@/types';
import { Link } from '@inertiajs/react';
import {
	ArrowLeft,
	Bookmark,
	Calendar,
	Clock,
	Eye,
	Facebook,
	Heart,
	Linkedin,
	MessageCircle,
	Share2,
	Twitter,
} from 'lucide-react';

interface ArticleShowProps {
	article: {
		data: Post & {
			content: string;
			tags: SingleTag[];
			meta_title: string | null;
			meta_description: string | null;
		};
	};
}

export default function ArticleShow2({
	article: { data: article },
}: ArticleShowProps) {
	// const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

	return (
		<GuestLayout>
			<SeoHead
				title={article.meta_title || article.title}
				description={article.meta_description || article.excerpt || ''}
			/>

			{/* Article Hero Header */}
			<div className="relative overflow-hidden pt-32 pb-16 lg:pt-48 lg:pb-32">
				{/* Background Decor */}
				<div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full max-w-7xl -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]"></div>

				<div className="container mx-auto px-6 lg:px-8">
					<Link
						href={articlesRoute.index.url()}
						className="mb-8 inline-flex items-center gap-2 text-xs font-black tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
					>
						<ArrowLeft className="h-4 w-4" />
						Back to Articles
					</Link>

					<div className="mx-auto max-w-4xl text-center">
						<Badge
							variant="secondary"
							className="mb-8 rounded-full border-none bg-primary/10 px-6 py-2 text-xs font-black tracking-[0.2em] text-primary uppercase"
						>
							{article.category.name}
						</Badge>
						<h1 className="mb-8 text-4xl leading-[1.1] font-black tracking-tighter sm:text-6xl md:text-7xl">
							{article.title}
						</h1>

						<div className="flex flex-wrap items-center justify-center gap-6 text-xs font-black tracking-widest text-muted-foreground uppercase">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 overflow-hidden rounded-xl bg-secondary p-0.5 ring-2 ring-primary/5">
									<img
										src={`https://i.pravatar.cc/100?u=${article.user.name}`}
										alt={article.user.name}
										className="h-full w-full rounded-lg object-cover"
									/>
								</div>
								<span className="text-foreground">
									{article.user.name}
								</span>
							</div>
							<span className="h-1 w-1 rounded-full bg-border"></span>
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4 text-primary" />
								{article.published_at}
							</div>
							<span className="h-1 w-1 rounded-full bg-border"></span>
							<div className="flex items-center gap-2">
								<Clock className="h-4 w-4 text-primary" />8 min
								read
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Image */}
			<div className="container mx-auto px-6 lg:px-8">
				<div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-border/50 shadow-2xl">
					<img
						src={
							article.image_url ||
							'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop'
						}
						alt={article.title}
						className="aspect-[21/9] w-full object-cover"
					/>
				</div>
			</div>

			{/* Content Section */}
			<div className="container mx-auto px-6 py-24 lg:px-8">
				<div className="mx-auto flex max-w-6xl flex-col gap-16 lg:flex-row">
					{/* Social Sidebar */}
					<div className="hidden lg:block lg:w-20">
						<div className="sticky top-32 flex flex-col gap-4">
							{[
								{ icon: Twitter, color: 'hover:bg-sky-500' },
								{ icon: Facebook, color: 'hover:bg-blue-600' },
								{ icon: Linkedin, color: 'hover:bg-blue-700' },
							].map((social, i) => (
								<Button
									key={i}
									variant="outline"
									size="icon"
									className={`h-12 w-12 rounded-2xl border-border/50 bg-background transition-all hover:text-white ${social.color}`}
								>
									<social.icon className="h-5 w-5" />
								</Button>
							))}
							<div className="my-4 h-px bg-border"></div>
							<Button
								variant="ghost"
								size="icon"
								className="h-12 w-12 rounded-2xl text-muted-foreground hover:bg-primary/5 hover:text-primary"
							>
								<Share2 className="h-5 w-5" />
							</Button>
						</div>
					</div>

					{/* Article Body */}
					<div className="flex-1">
						<div
							className="prose prose-lg max-w-none prose-slate dark:prose-invert prose-headings:font-black prose-headings:tracking-tight prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-3xl"
							dangerouslySetInnerHTML={{
								__html: article.content,
							}}
						/>

						{/* Tags */}
						<div className="mt-16 flex flex-wrap gap-3 border-t border-border/50 pt-12">
							{article.tags.map((tag) => (
								<Link
									key={tag.id}
									href={articlesRoute.index.url({
										query: { tag: tag.name },
									})}
								>
									<Badge
										variant="outline"
										className="rounded-xl border-border/50 bg-secondary/30 px-4 py-2 text-[10px] font-black tracking-widest text-muted-foreground uppercase transition-all hover:border-primary hover:bg-primary hover:text-white"
									>
										#{tag.name}
									</Badge>
								</Link>
							))}
						</div>

						{/* Post Footer Interaction */}
						<div className="mt-12 flex items-center justify-between rounded-[2rem] border border-border/50 bg-slate-50/50 p-6 dark:bg-slate-900/50">
							<div className="flex items-center gap-4">
								<Button
									variant="ghost"
									className="h-14 gap-3 rounded-2xl px-8 font-black tracking-widest uppercase transition-all hover:bg-primary hover:text-white"
								>
									<Heart className="h-5 w-5" />
									{article.likes_count} Likes
								</Button>
								<Button
									variant="ghost"
									className="h-14 gap-3 rounded-2xl px-8 font-black tracking-widest uppercase transition-all hover:bg-primary hover:text-white"
								>
									<Bookmark className="h-5 w-5" />
									Save
								</Button>
							</div>
							<div className="flex items-center gap-6 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
								<span className="flex items-center gap-2">
									<Eye className="h-4 w-4" />{' '}
									{article.views_count} Views
								</span>
								<span className="flex items-center gap-2">
									<MessageCircle className="h-4 w-4" />{' '}
									{article.comments_count} Comments
								</span>
							</div>
						</div>
					</div>

					{/* Right Sidebar - Related / Author Info */}
					<div className="lg:w-80">
						<div className="sticky top-32 space-y-12">
							{/* Author Card */}
							<div className="rounded-[2.5rem] border border-border/50 bg-card p-8 shadow-sm">
								<h4 className="mb-6 text-[10px] font-black tracking-[0.3em] text-primary uppercase">
									About Author
								</h4>
								<div className="mb-6 flex items-center gap-4">
									<img
										src={`https://i.pravatar.cc/100?u=${article.user.name}`}
										alt={article.user.name}
										className="h-16 w-16 rounded-2xl object-cover ring-4 ring-primary/5"
									/>
									<div>
										<p className="text-lg font-black tracking-tight">
											{article.user.name}
										</p>
										<p className="text-[10px] font-bold text-muted-foreground">
											Tech Evangelist
										</p>
									</div>
								</div>
								<p className="mb-8 text-sm leading-relaxed text-muted-foreground">
									Deep diver into technical architectures and
									human-centric design patterns.
								</p>
								<Button className="h-12 w-full rounded-2xl font-black tracking-widest uppercase">
									Follow
								</Button>
							</div>

							{/* Share Card */}
							<div className="rounded-[2.5rem] border border-border/50 bg-slate-950 p-8 text-white shadow-xl">
								<h4 className="mb-6 text-[10px] font-black tracking-[0.3em] text-primary uppercase">
									Share Article
								</h4>
								<p className="mb-6 text-sm font-medium text-slate-400">
									Help others discover this technical journey.
								</p>
								<div className="grid grid-cols-2 gap-3">
									<Button
										variant="outline"
										className="h-12 rounded-xl border-white/10 bg-white/5 text-[10px] font-black tracking-widest uppercase transition-all hover:bg-primary"
									>
										Twitter
									</Button>
									<Button
										variant="outline"
										className="h-12 rounded-xl border-white/10 bg-white/5 text-[10px] font-black tracking-widest uppercase transition-all hover:bg-primary"
									>
										Copy Link
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<NewsletterSection />
		</GuestLayout>
	);
}
