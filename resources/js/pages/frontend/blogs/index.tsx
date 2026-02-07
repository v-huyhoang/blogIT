import { FilterBar } from '@/components/frontend/filter-bar';
import { FooterMegaMenu } from '@/components/frontend/footer-mega-menu';
import { PageHeader } from '@/components/frontend/page-header';
import { PostCard } from '@/components/frontend/post-card';
import GuestLayout from '@/layouts/frontend/guest-layout';
import { Head } from '@inertiajs/react';

export default function BlogIndex() {
	return (
		<GuestLayout>
			<Head title="Latest Articles - BlogIT" />

			<PageHeader
				heading="The Latest"
				highlight="Perspectives"
				description="Deep dives, architectural insights, and the future of software development, delivered weekly by our team of experts."
				badge="Curated Content"
			/>

			<div className="container mx-auto px-6 py-12 lg:px-8">
				<div className="mb-16">
					<FilterBar />
				</div>

				<div className="mb-24 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
					<PostCard
						title="Building Scalable APIs with Laravel"
						excerpt="Learn the best practices for building robust and scalable APIs using the Laravel framework and clean architecture."
						category="Laravel"
						author="John Doe"
						date="Feb 01, 2026"
						readTime="12 min read"
						imageUrl="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop"
						likes={320}
						comments={45}
					/>
					{[1, 2, 3, 4, 5, 6].map((i) => (
						<PostCard
							key={i}
							title={`Modern Architecture Paradigms ${i}`}
							excerpt="Exploration of how reactive systems and event-driven architecture are reshaping the modern web."
							category={
								i % 2 === 0 ? 'Architecture' : 'Development'
							}
							author={i % 2 === 0 ? 'Sarah Lee' : 'Alex Johnson'}
							date="Jan 28, 2026"
							readTime={`${8 + i} min`}
							imageUrl={`https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop`}
							likes={100 + i * 15}
							comments={10 + i * 2}
						/>
					))}
				</div>

				{/* Modern Pagination */}
				<div className="mb-24 flex items-center justify-center gap-4">
					<button className="h-14 rounded-2xl border-2 border-border/50 px-8 text-xs font-black tracking-widest uppercase transition-all hover:bg-secondary">
						Previous
					</button>
					<div className="flex items-center gap-2">
						<button className="h-14 w-14 rounded-2xl bg-primary font-black text-white shadow-xl shadow-primary/20">
							1
						</button>
						<button className="h-14 w-14 rounded-2xl font-black transition-all hover:bg-secondary">
							2
						</button>
						<button className="h-14 w-14 rounded-2xl font-black transition-all hover:bg-secondary">
							3
						</button>
					</div>
					<button className="h-14 rounded-2xl border-2 border-border/50 px-8 text-xs font-black tracking-widest uppercase shadow-lg shadow-primary/5 transition-all hover:border-primary hover:bg-primary hover:text-white">
						Next Page
					</button>
				</div>
			</div>

			<FooterMegaMenu />
		</GuestLayout>
	);
}
