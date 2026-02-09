import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import UserLayout from '@/layouts/frontend/user-layout';
import { Head, Link } from '@inertiajs/react';
import { Heart, Trash2 } from 'lucide-react';

export default function UserWishlist() {
	const wishlistItems = [
		{
			id: 1,
			title: 'The Future of AI in Web Development',
			category: 'Technology',
			author: 'Alex Johnson',
			readTime: '5 min read',
			image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop',
		},
		{
			id: 2,
			title: 'Mastering React Server Components',
			category: 'Development',
			author: 'Sarah Lee',
			readTime: '8 min read',
			image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
		},
		{
			id: 3,
			title: 'UI Design Trends for 2026',
			category: 'Design',
			author: 'Mike Chen',
			readTime: '6 min read',
			image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
		},
	];

	return (
		<UserLayout>
			<Head title="My Wishlist - BlogIT" />
			<div className="space-y-12">
				<header className="flex flex-col justify-between gap-6 rounded-3xl border border-primary/10 bg-gradient-to-br from-red-500/5 to-pink-500/5 p-10 md:flex-row md:items-center">
					<div>
						<h1 className="mb-2 text-4xl leading-none font-black tracking-tighter">
							My Wishlist
						</h1>
						<p className="font-medium text-muted-foreground italic">
							Articles you've saved for later reading.
						</p>
					</div>
					<div className="flex items-center gap-4">
						<div className="hidden text-right md:block">
							<p className="text-xs font-black tracking-widest uppercase opacity-40">
								Saved Items
							</p>
							<p className="font-black text-red-500">
								{wishlistItems.length} ARTICLES
							</p>
						</div>
						<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg shadow-red-500/20">
							<Heart className="h-7 w-7 fill-current" />
						</div>
					</div>
				</header>

				{wishlistItems.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{wishlistItems.map((item) => (
							<Card
								key={item.id}
								className="group overflow-hidden rounded-3xl border-border/50 bg-card p-0 shadow-sm transition-all hover:border-primary/50 hover:shadow-xl"
							>
								<div className="relative h-48 overflow-hidden">
									<img
										src={item.image}
										alt={item.title}
										className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									<Badge className="absolute top-4 left-4 border-none bg-background/80 px-3 py-1 text-[9px] font-black tracking-widest text-foreground uppercase backdrop-blur-md">
										{item.category}
									</Badge>
									<Button
										size="icon"
										variant="ghost"
										className="absolute top-4 right-4 h-9 w-9 rounded-full bg-background/80 text-red-500 backdrop-blur-md hover:bg-red-500 hover:text-white"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
								<CardContent className="p-6">
									<div className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
										<span>{item.author}</span>
										<span>•</span>
										<span>{item.readTime}</span>
									</div>
									<h3 className="mb-4 text-xl leading-tight font-black tracking-tight group-hover:text-primary">
										<Link href={route('articles.index')}>
											{item.title}
										</Link>
									</h3>
									<Button
										asChild
										variant="outline"
										className="w-full rounded-xl font-bold tracking-widest uppercase"
									>
										<Link href={route('articles.index')}>
											Read Now
										</Link>
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				) : (
					<div className="rounded-3xl border-2 border-dashed border-border/50 bg-secondary/10 py-32 text-center">
						<Heart className="mx-auto mb-6 h-16 w-16 text-muted-foreground opacity-10" />
						<h4 className="mb-2 text-2xl font-black tracking-tighter">
							Your wishlist is empty.
						</h4>
						<p className="mx-auto max-w-sm font-medium text-muted-foreground">
							Click the heart icon on any article to save it for
							later reading.
						</p>
						<Button
							asChild
							className="mt-8 rounded-full bg-primary px-8 font-black tracking-widest uppercase shadow-xl shadow-primary/20"
						>
							<Link href="/f/articles">Browse Articles</Link>
						</Button>
					</div>
				)}
			</div>
		</UserLayout>
	);
}
