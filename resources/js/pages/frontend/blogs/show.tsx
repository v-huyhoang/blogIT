import { CommentSection } from '@/components/frontend/comment-section';
import { FooterMegaMenu } from '@/components/frontend/footer-mega-menu';
import { NewsletterMini } from '@/components/frontend/newsletter-mini';
import { PostCard } from '@/components/frontend/post-card';
import { TableOfContents } from '@/components/frontend/table-of-contents';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import GuestLayout from '@/layouts/frontend/guest-layout';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import {
	ArrowLeft,
	ArrowRight,
	Calendar,
	Clock,
	Facebook,
	Heart,
	Linkedin,
	MessageCircle,
	Twitter,
	UserPlus,
} from 'lucide-react';
import { useState } from 'react';

export default function BlogShow() {
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(124);
	const [isFollowing, setIsFollowing] = useState(false);

	const handleLike = () => {
		setIsLiked(!isLiked);
		setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
	};

	return (
		<GuestLayout>
			<Head>
				<title>The Future of AI in Software Development - BlogIT</title>
				<meta
					name="description"
					content="Explore how artificial intelligence is reshaping the landscape of coding and what it means for developers in 2026."
				/>
			</Head>

			<article className="mx-auto pb-32">
				{/* Taller Hero Header for SEO & Impact */}
				<div className="group relative mb-24 h-[48vh] min-h-[800px] w-full overflow-hidden pt-20">
					<img
						src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2500&auto=format&fit=crop"
						alt="AI Software Development"
						className="h-full w-full scale-105 object-cover transition-transform duration-[2s] ease-out group-hover:scale-100"
						loading="eager"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
					<div className="absolute right-0 bottom-0 left-0 p-12 md:p-24">
						<div className="container mx-auto px-6">
							<div className="max-w-7xl">
								<Link
									href="/f/blog"
									prefetch
									className="group mb-12 inline-flex items-center gap-3 text-xs font-black tracking-[0.4em] text-white hover:underline"
								>
									<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-3" />{' '}
									BACK TO ARTICLES
								</Link>
								<div className="mb-8 flex gap-3">
									<Badge className="rounded-full border-none bg-primary px-8 py-2 text-[10px] font-black tracking-widest text-white shadow-2xl shadow-primary/40">
										TECHNOLOGY
									</Badge>
									<Badge
										variant="outline"
										className="rounded-full border-white/20 px-8 py-2 text-[10px] font-black tracking-widest text-foreground backdrop-blur-xl"
									>
										AI REALITY
									</Badge>
								</div>
								<h1 className="mb-16 text-5xl leading-[0.8] font-black tracking-[-0.04em] text-foreground md:text-8xl">
									The Future of AI in{' '}
									<span className="text-primary italic">
										Software
									</span>{' '}
									Development.
								</h1>
								<div className="flex flex-wrap items-center gap-12 text-xs font-black tracking-[0.2em] text-muted-foreground uppercase">
									<div className="flex items-center gap-4">
										<Avatar className="h-16 w-14 rounded-2xl ring-8 ring-primary/10">
											<AvatarImage
												src="https://i.pravatar.cc/150?u=9"
												className="object-cover"
											/>
											<AvatarFallback>AJ</AvatarFallback>
										</Avatar>
										<div>
											<Link
												href="/f/author/alex-johnson"
												prefetch
												className="mb-1 block text-sm leading-none font-black text-foreground transition-colors hover:text-primary"
											>
												ALEX JOHNSON
											</Link>
											<p className="opacity-50">
												SENIOR ARCHITECT
											</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Calendar className="h-4 w-4 text-primary" />{' '}
										JAN 15, 2026
									</div>
									<div className="flex items-center gap-2">
										<Clock className="h-4 w-4 text-primary" />{' '}
										5 MIN READ
									</div>
									<div className="ml-auto flex items-center gap-8">
										<div className="flex items-center gap-3">
											<Button
												onClick={handleLike}
												variant="ghost"
												className={cn(
													'h-14 w-14 rounded-full border-2 border-border/50',
													isLiked &&
														'border-white bg-white text-red-500',
												)}
											>
												<Heart
													className={cn(
														'h-6 w-6',
														isLiked &&
															'fill-current',
													)}
												/>
											</Button>
											<span className="text-lg text-foreground">
												{likeCount}
											</span>
										</div>
										<div className="flex items-center gap-3">
											<Button
												variant="ghost"
												className="h-14 w-14 rounded-full border-2 border-border/50"
											>
												<MessageCircle className="h-6 w-6" />
											</Button>
											<span className="text-lg text-foreground">
												42
											</span>
										</div>
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
							<TableOfContents />

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
								<p className="lead mb-20 border-l-[16px] border-primary pl-12 text-4xl leading-[1.1] font-black tracking-tight text-foreground">
									Artificial intelligence is no longer a
									futuristic concept; it is actively reshaping
									how we build, deploy, and maintain software
									today.
								</p>

								<h2 id="ai-coding-assistants">
									The Rise of AI Coding Assistants
								</h2>
								<p>
									Tools like GitHub Copilot and Cursor have
									revolutionized the development workflow. By
									leveraging large language models (LLMs)
									trained on billions of lines of code, these
									assistants can predict the next lines of
									code, suggest entire functions, and even
									help with refactoring.
								</p>

								<h2 id="challenges-and-ethics">
									Challenges and Ethics
								</h2>
								<p>
									However, the integration of AI also brings
									new challenges. Developers must now become
									adept at "prompt engineering" and rigorous
									code review to ensure the AI-generated
									snippets are secure and maintainable.
								</p>

								<h2 id="glassmorphism-trends">
									Glassmorphism in Modern UI
								</h2>
								<p>
									Beyond just logic, AI is helping in UI/UX
									design. We see trends like glassmorphism
									becoming easier to implement with
									AI-generated CSS and component structures.
								</p>
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
													className="h-14 w-14 rounded-2xl border-2 transition-all hover:-translate-y-2 hover:bg-primary hover:text-white"
												>
													<Icon className="h-5 w-5" />
												</Button>
											),
										)}
									</div>
								</div>
								<div className="flex gap-3">
									{['AI', 'ARCH', 'FUTURE'].map((tag) => (
										<Badge
											key={tag}
											variant="secondary"
											className="rounded-full border-none bg-secondary px-8 py-2 text-[10px] font-black tracking-[0.3em]"
										>
											#{tag}
										</Badge>
									))}
								</div>
							</div>

							{/* Author Bio */}
							<div className="group relative mt-24 overflow-hidden rounded-3xl border border-border/50 bg-card p-16 shadow-2xl">
								<div className="relative z-10 flex flex-col items-center gap-12 text-center md:flex-row md:items-start md:text-left">
									<Avatar className="h-40 w-40 rounded-3xl shadow-2xl ring-[16px] ring-primary/5">
										<AvatarImage
											src="https://i.pravatar.cc/300?u=9"
											className="object-cover"
										/>
										<AvatarFallback>AJ</AvatarFallback>
									</Avatar>
									<div className="flex-1">
										<div className="mb-8 flex flex-col justify-between gap-8 md:flex-row md:items-center">
											<div>
												<h3 className="mb-2 text-2xl font-black tracking-tighter">
													Alex Johnson
												</h3>
												<p className="text-xs font-black tracking-[0.3em] text-primary uppercase">
													Senior Software Architect
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
											"Engineering is not just about
											making things work, it's about
											making them last."
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

							<CommentSection />
						</div>
					</div>
				</div>
			</article>

			{/* Related Posts */}
			<aside className="border-t border-border/50 bg-secondary/20 py-32">
				<div className="container mx-auto px-6">
					<div className="mb-24 flex items-end justify-between">
						<div>
							<h4 className="mb-6 text-[10px] font-black tracking-[0.5em] text-primary uppercase">
								Discovery
							</h4>
							<h2 className="text-6xl font-black tracking-tighter">
								Recommended{' '}
								<span className="text-muted-foreground">
									Perspectives
								</span>
								.
							</h2>
						</div>
						<Link
							href="/f/blog"
							className="text-xs font-black tracking-widest uppercase underline decoration-primary/20 decoration-4 underline-offset-[12px] transition-all hover:decoration-primary"
						>
							VIEW ALL ARTICLES
						</Link>
					</div>
					<div className="grid gap-16 md:grid-cols-3">
						<PostCard
							title="The Rise of Jamstack"
							excerpt="Why static sites are making a comeback."
							category="Web"
							author="Emily Chen"
							date="Jan 08, 2026"
							readTime="6 min"
							imageUrl="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&auto=format&fit=crop"
							likes={85}
							comments={12}
						/>
						<PostCard
							title="Cloud Computing Trends"
							excerpt="What to expect in the cloud industry this year."
							category="Cloud"
							author="Michael Brown"
							date="Jan 05, 2026"
							readTime="8 min"
							imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop"
							likes={210}
							comments={34}
						/>
						<PostCard
							title="Scalable APIs with Laravel"
							excerpt="Best practices for building robust APIs."
							category="Laravel"
							author="John Doe"
							date="Feb 01, 2026"
							readTime="12 min"
							imageUrl="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=600&auto=format&fit=crop"
							likes={320}
							comments={89}
						/>
					</div>
				</div>
			</aside>

			<FooterMegaMenu />
		</GuestLayout>
	);
}
