import { FooterMegaMenu } from '@/components/frontend/footer-mega-menu';
import { PageHeader } from '@/components/frontend/page-header';
import { PostCard } from '@/components/frontend/post-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GuestLayout from '@/layouts/frontend/guest-layout';
import { Head } from '@inertiajs/react';
import { Badge, Github, Heart, Twitter, UserPlus } from 'lucide-react';
import { useState } from 'react';

export default function AuthorShow() {
	const [isFollowing, setIsFollowing] = useState(false);

	return (
		<GuestLayout>
			<Head title="Alex Johnson - Author Profile" />

			<PageHeader
				heading="Author"
				highlight="Profile"
				description="Get to know the experts sharing their knowledge and insights with the community."
				badge="Community"
			/>

			<div className="container mx-auto px-6 py-12">
				{/* Header Profile */}
				<div className="mb-16 flex flex-col items-center gap-12 md:flex-row md:items-start">
					<Avatar className="h-48 w-48 shadow-2xl ring-[12px] ring-primary/5">
						<AvatarImage src="https://i.pravatar.cc/300?u=9" />
						<AvatarFallback>AJ</AvatarFallback>
					</Avatar>
					<div className="flex-1 text-center md:text-left">
						<div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-center">
							<div>
								<h1 className="mb-2 text-5xl font-black tracking-tighter">
									Alex Johnson
								</h1>
								<p className="text-sm font-bold tracking-widest text-primary uppercase">
									Senior Software Architect & Writer
								</p>
							</div>
							<div className="flex justify-center gap-3">
								<Button
									size="lg"
									onClick={() => setIsFollowing(!isFollowing)}
									className={cn(
										'rounded-full px-8 font-bold shadow-xl shadow-primary/20',
										isFollowing &&
											'bg-secondary text-secondary-foreground shadow-none',
									)}
								>
									{isFollowing ? (
										'Following'
									) : (
										<>
											<UserPlus className="mr-2 h-5 w-5" />{' '}
											Follow Author
										</>
									)}
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="h-12 w-12 rounded-full border-2"
								>
									<Twitter className="h-5 w-5" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="h-12 w-12 rounded-full border-2"
								>
									<Github className="h-5 w-5" />
								</Button>
							</div>
						</div>
						<p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
							Passionate about building scalable systems and
							exploring the intersection of AI and human
							creativity. Writing about architecture, React, and
							the future of web dev since 2012.
						</p>
						<div className="flex justify-center gap-10 md:justify-start">
							<div className="text-center">
								<div className="text-2xl font-black">2.4k</div>
								<div className="text-[10px] font-bold tracking-widest uppercase opacity-50">
									Followers
								</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-black">84</div>
								<div className="text-[10px] font-bold tracking-widest uppercase opacity-50">
									Articles
								</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-black">15k</div>
								<div className="text-[10px] font-bold tracking-widest uppercase opacity-50">
									Likes
								</div>
							</div>
						</div>
					</div>
				</div>

				<Tabs defaultValue="articles" className="w-full">
					<TabsList className="mb-12 h-auto w-full justify-start gap-8 rounded-none border-b border-border bg-transparent p-0">
						<TabsTrigger
							value="articles"
							className="rounded-none border-b-2 border-transparent bg-transparent px-0 py-4 text-lg font-bold data-[state=active]:border-primary data-[state=active]:bg-transparent"
						>
							Articles
						</TabsTrigger>
						<TabsTrigger
							value="about"
							className="rounded-none border-b-2 border-transparent bg-transparent px-0 py-4 text-lg font-bold data-[state=active]:border-primary data-[state=active]:bg-transparent"
						>
							About
						</TabsTrigger>
						<TabsTrigger
							value="activity"
							className="rounded-none border-b-2 border-transparent bg-transparent px-0 py-4 text-lg font-bold data-[state=active]:border-primary data-[state=active]:bg-transparent"
						>
							Activity
						</TabsTrigger>
					</TabsList>

					<TabsContent value="articles">
						<div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<PostCard
									key={i}
									title={`Advanced Architectural Patterns Vol. ${i}`}
									excerpt="Exploring the depths of software architecture in modern enterprise environments."
									category="Architecture"
									author="Alex Johnson"
									date="FEB 02, 2026"
									readTime="15 MIN READ"
									imageUrl={`https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop`}
									likes={120 + i * 10}
									comments={15 + i}
								/>
							))}
						</div>
					</TabsContent>

					<TabsContent value="about">
						<div className="prose prose-lg max-w-3xl dark:prose-invert">
							<h3>Biography</h3>
							<p>
								Alex Johnson is a seasoned software engineer
								with a career spanning over two decades. He has
								worked at companies like Google, Meta, and
								various high-growth startups.
							</p>
							<h3>Skills</h3>
							<div className="not-prose flex flex-wrap gap-2">
								{[
									'React',
									'Node.js',
									'Laravel',
									'System Design',
									'AI/ML',
									'Cloud Native',
								].map((s) => (
									<Badge
										key={s}
										className="rounded-full px-4 py-1"
									>
										{s}
									</Badge>
								))}
							</div>
						</div>
					</TabsContent>

					<TabsContent value="activity">
						<div className="space-y-8">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="flex items-start gap-4 rounded-3xl bg-secondary/20 p-6"
								>
									<div className="rounded-full bg-primary/10 p-2 text-primary">
										<Heart className="h-5 w-5 fill-current" />
									</div>
									<div>
										<p className="font-bold">
											Liked a post{' '}
											<span className="font-normal text-muted-foreground">
												by
											</span>{' '}
											Sarah Smith
										</p>
										<p className="font-bold text-primary">
											10 tips for clean code in 2026
										</p>
										<p className="mt-2 text-xs opacity-50">
											2 HOURS AGO
										</p>
									</div>
								</div>
							))}
						</div>
					</TabsContent>
				</Tabs>
			</div>

			<FooterMegaMenu />
		</GuestLayout>
	);
}

const cn = (p0: string, p1: string | boolean, ...classes: []) =>
	classes.filter(Boolean).join(' ');
