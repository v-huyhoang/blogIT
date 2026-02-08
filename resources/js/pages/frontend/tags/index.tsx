import { FooterMegaMenu } from '@/components/frontend/footer-mega-menu';
import { PageHeader } from '@/components/frontend/page-header';
import { SearchBox } from '@/components/search-box';
import GuestLayout from '@/layouts/frontend/guest-layout';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { Hash, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';

const tags = [
	{ name: 'React', count: 124, color: 'from-blue-400 to-cyan-400' },
	{ name: 'Laravel', count: 85, color: 'from-red-400 to-orange-400' },
	{
		name: 'Architectures',
		count: 64,
		color: 'from-purple-400 to-indigo-400',
	},
	{ name: 'AI', count: 110, color: 'from-green-400 to-emerald-400' },
	{ name: 'TypeScript', count: 42, color: 'from-blue-500 to-indigo-500' },
	{ name: 'UI/UX', count: 38, color: 'from-pink-400 to-rose-400' },
	{ name: 'DevOps', count: 25, color: 'from-slate-400 to-slate-600' },
	{ name: 'Microservices', count: 19, color: 'from-yellow-400 to-amber-600' },
];

export default function TagsIndex() {
	const [searchQuery, setSearchQuery] = useState('');

	const filteredTags = useMemo(() => {
		return tags.filter((tag) =>
			tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [searchQuery]);

	function onSearch(value: string) {
		setSearchQuery(value);
	}

	return (
		<GuestLayout>
			<Head title="Browse Topics - BlogIT" />

			<PageHeader
				heading="Browse by"
				highlight="Topic"
				description="Explore our curated collection of articles categorized by the technologies and paradigms that shape the modern web."
				badge="Tags Collection"
			/>

			<div className="container mx-auto px-6 py-6">
				<div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3">
					<div className="rounded-xl border bg-gray-100 p-6">
						<div className="mb-12 flex items-center gap-3">
							<TrendingUp className="h-6 w-6 text-primary" />
							<h2 className="text-xl font-black tracking-tight tracking-widest uppercase">
								Trending Topics
							</h2>
						</div>
						<div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-2">
							{tags.map((tag) => (
								<Link
									key={tag.name}
									href={`/blog?tag=${tag.name}`}
									className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl"
								>
									<div
										className={cn(
											'absolute top-0 right-0 h-32 w-32 bg-gradient-to-br opacity-5 blur-3xl transition-opacity group-hover:opacity-20',
											tag.color,
										)}
									></div>
									<div className="relative z-10">
										<Hash className="mb-6 h-6 w-6 text-primary" />
										<h3 className="mb-2 text-2xl font-black">
											{tag.name}
										</h3>
										<p className="text-sm font-bold tracking-widest text-muted-foreground uppercase opacity-60">
											{tag.count} ARTICLES
										</p>
									</div>
								</Link>
							))}
						</div>
					</div>
					<div className="rounded-xl border bg-gray-100 p-6">
						<div className="mb-12 flex items-center gap-3">
							<TrendingUp className="h-6 w-6 text-primary" />
							<h2 className="text-xl font-black tracking-tight tracking-widest uppercase">
								Popular Tags
							</h2>
						</div>
						<div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-2">
							{tags.map((tag) => (
								<Link
									key={tag.name}
									href={`/blog?tag=${tag.name}`}
									className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl"
								>
									<div
										className={cn(
											'absolute top-0 right-0 h-32 w-32 bg-gradient-to-br opacity-5 blur-3xl transition-opacity group-hover:opacity-20',
											tag.color,
										)}
									></div>
									<div className="relative z-10">
										<Hash className="mb-6 h-6 w-6 text-primary" />
										<h3 className="mb-2 text-2xl font-black">
											{tag.name}
										</h3>
										<p className="text-sm font-bold tracking-widest text-muted-foreground uppercase opacity-60">
											{tag.count} ARTICLES
										</p>
									</div>
								</Link>
							))}
						</div>
					</div>
					<div className="rounded-xl border bg-gray-100 p-6">
						<div className="mb-12 flex items-center gap-3">
							<TrendingUp className="h-6 w-6 text-primary" />
							<h2 className="text-xl font-black tracking-tight tracking-widest uppercase">
								Recently added tags
							</h2>
						</div>
						<div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-2">
							{tags.map((tag) => (
								<Link
									key={tag.name}
									href={`/blog?tag=${tag.name}`}
									className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl"
								>
									<div
										className={cn(
											'absolute top-0 right-0 h-32 w-32 bg-gradient-to-br opacity-5 blur-3xl transition-opacity group-hover:opacity-20',
											tag.color,
										)}
									></div>
									<div className="relative z-10">
										<Hash className="mb-6 h-6 w-6 text-primary" />
										<h3 className="mb-2 text-2xl font-black">
											{tag.name}
										</h3>
										<p className="text-sm font-bold tracking-widest text-muted-foreground uppercase opacity-60">
											{tag.count} ARTICLES
										</p>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-6 py-24">
				<div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
					<div className="flex items-center gap-3">
						<Hash className="h-6 w-6 text-primary" />
						<h2 className="text-2xl font-black tracking-tight tracking-widest uppercase">
							All Tags
						</h2>
					</div>
					<div className="relative w-full md:w-64">
						<SearchBox
							defaultValue={searchQuery}
							placeholder="Search tags..."
							onSearch={onSearch} // Pass the onSearch function directly
						/>
					</div>
				</div>

				<div className="grid grid-cols-3 gap-6 rounded-lg border bg-gray-100 p-6 md:grid-cols-4 lg:grid-cols-6">
					{filteredTags.length > 0 ? (
						filteredTags.map((tag, index) => (
							<Link
								key={index}
								href={`/blog?tag=${tag.name}`}
								className="overflow-hidden rounded-3xl border border-border/50 bg-card transition-colors hover:border-primary/50"
							>
								<div className="flex items-center px-4 py-2">
									<Hash className="h-4 w-4 text-muted-foreground" />
									<span className="ml-2 text-sm font-bold tracking-widest text-muted-foreground uppercase">
										{tag.name}
									</span>
								</div>
							</Link>
						))
					) : (
						<div className="col-span-full py-8 text-center text-muted-foreground">
							No tags found matching "{searchQuery}"
						</div>
					)}
				</div>
			</div>

			<FooterMegaMenu />
		</GuestLayout>
	);
}
