import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import UserLayout from '@/layouts/frontend/user-layout';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes/u';
import { Head, Link, router } from '@inertiajs/react';
import { Bell, Heart, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function UserDashboard() {
	const urlParams = new URLSearchParams(
		typeof window !== 'undefined' ? window.location.search : '',
	);
	const initialTab = urlParams.get('tab') || 'overview';
	const [activeTab, setActiveTab] = useState(initialTab);

	useEffect(() => {
		const handlePopState = () => {
			const params = new URLSearchParams(window.location.search);
			setActiveTab(params.get('tab') || 'overview');
		};
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	const handleTabChange = (value: string) => {
		setActiveTab(value);
		router.get(
			dashboard().url,
			{ tab: value },
			{
				preserveState: true,
				preserveScroll: true,
				replace: true,
				only: ['tab'],
			},
		);
	};

	return (
		<UserLayout>
			<Head title="Dashboard - BlogIT" />
			<div className="space-y-12">
				<header className="flex flex-col justify-between gap-6 rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/5 to-purple-500/5 p-10 md:flex-row md:items-center">
					<div>
						<h1 className="mb-2 text-4xl leading-none font-black tracking-tighter">
							Welcome Back.
						</h1>
						<p className="font-medium text-muted-foreground italic">
							Your personalized tech feed is ready.
						</p>
					</div>
					<div className="flex items-center gap-4">
						<div className="hidden text-right md:block">
							<p className="text-xs font-black tracking-widest uppercase opacity-40">
								Current Status
							</p>
							<p className="font-black text-amber-500">
								VIP ARCHITECT
							</p>
						</div>
						<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
							<Star className="h-8 w-8 fill-current" />
						</div>
					</div>
				</header>

				<Tabs
					value={activeTab}
					onValueChange={handleTabChange}
					className="w-full outline-none"
				>
					<TabsContent
						value="overview"
						className="space-y-12 outline-none"
					>
						<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
							{[
								{
									label: 'Articles Read',
									val: '124',
									color: 'text-primary',
								},
								{
									label: 'Total Points',
									val: '2,850',
									color: 'text-purple-500',
								},
								{
									label: 'Followers',
									val: '12',
									color: 'text-blue-500',
								},
							].map((stat) => (
								<Card
									key={stat.label}
									className="rounded-3xl border-none border-border/50 bg-card/50 p-2 shadow-2xl shadow-primary/5 backdrop-blur-sm"
								>
									<CardHeader className="pb-2">
										<CardTitle className="text-[10px] font-black tracking-widest uppercase opacity-40">
											{stat.label}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div
											className={cn(
												'text-5xl font-black tracking-tighter',
												stat.color,
											)}
										>
											{stat.val}
										</div>
									</CardContent>
								</Card>
							))}
						</div>

						<section className="space-y-8">
							<div className="flex items-center justify-between">
								<h3 className="flex items-center gap-3 text-2xl font-black tracking-tight">
									<div className="h-3 w-3 animate-ping rounded-full bg-primary"></div>{' '}
									Continue Reading
								</h3>
							</div>
							<div className="grid gap-6">
								{[1, 2].map((i) => (
									<div
										key={i}
										className="group flex flex-col items-center gap-8 rounded-3xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-xl md:flex-row"
									>
										<div className="h-32 w-full shrink-0 overflow-hidden rounded-3xl shadow-lg md:w-56">
											<img
												src={`https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop`}
												className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
												alt=""
												loading="lazy"
											/>
										</div>
										<div className="flex-1 text-center md:text-left">
											<div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
												<Badge
													variant="secondary"
													className="border-none bg-primary/10 px-3 text-[9px] font-black tracking-widest text-primary uppercase"
												>
													DEVELOPMENT
												</Badge>
												<span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
													45% READ
												</span>
											</div>
											<h4 className="text-2xl leading-tight font-black tracking-tight transition-colors group-hover:text-primary">
												Mastering Reactive Systems Vol.{' '}
												{i}
											</h4>
										</div>
										<Button className="h-14 rounded-full bg-primary px-10 font-black shadow-xl shadow-primary/20">
											RESUME
										</Button>
									</div>
								))}
							</div>
						</section>
					</TabsContent>

					<TabsContent
						value="notifications"
						className="space-y-6 outline-none"
					>
						{[1, 2, 3, 4].map((i) => (
							<div
								key={i}
								className="group relative flex gap-6 rounded-3xl border border-border/50 bg-card p-8 transition-all hover:border-primary/20"
							>
								<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/5">
									<Bell className="h-6 w-6 text-primary" />
								</div>
								<div className="flex-1">
									<div className="mb-2 flex items-center justify-between">
										<h4 className="text-lg leading-none font-black text-foreground">
											New insight available
										</h4>
										<span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
											2H AGO
										</span>
									</div>
									<p className="font-medium text-muted-foreground">
										A new deep-dive on "Quantum Computing"
										has been published by an author you
										follow.
									</p>
								</div>
							</div>
						))}
					</TabsContent>

					<TabsContent value="bookmarks" className="outline-none">
						<div className="rounded-3xl border-2 border-dashed border-border/50 bg-secondary/10 py-32 text-center">
							<Heart className="mx-auto mb-6 h-16 w-16 text-muted-foreground opacity-10" />
							<h4 className="mb-2 text-2xl font-black tracking-tighter">
								Your library is empty.
							</h4>
							<p className="mx-auto max-w-sm font-medium text-muted-foreground">
								Click the heart icon on any article to save it
								for later reading.
							</p>
							<Button
								asChild
								variant="outline"
								className="mt-8 rounded-full border-2 px-8 font-bold"
							>
								<Link
									href="/f/articles"
									className="inline-flex"
								>
									Browse Articles
								</Link>
							</Button>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</UserLayout>
	);
}
