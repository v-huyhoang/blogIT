import { BentoGrid } from '@/components/frontend/bento-grid';
import { FooterMegaMenu } from '@/components/frontend/footer-mega-menu';
import HeaderSection from '@/components/frontend/header-section';
import { HeroSection } from '@/components/frontend/hero-section';
import { NewsletterSection } from '@/components/frontend/newsletter-section';
import { PostCard } from '@/components/frontend/post-card';
import { PricingSection } from '@/components/frontend/pricing-section';
import { TopAuthorsSection } from '@/components/frontend/top-authors-section';
import GuestLayout from '@/layouts/frontend/guest-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function Welcome() {
	return (
		<GuestLayout>
			<Head title="Home - BlogIT" />

			<HeroSection />

			<BentoGrid />

			{/* News Feed / Latest Insights - Moved Up & Enhanced */}
			<div className="bg-slate-50/50 py-24 dark:bg-slate-900/50">
				<div className="container mx-auto px-6 lg:px-8">
					<div className="mb-16 flex flex-col gap-4">
						<h2 className="text-sm font-black tracking-[0.3em] text-primary uppercase">
							Latest Insights
						</h2>
						<div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
							<HeaderSection content="Fresh" keyword="Thinking" />
							<Link
								href="/f/blog"
								className="group flex items-center gap-2 text-xs font-black tracking-[0.3em] text-slate-500 uppercase transition-all hover:text-primary dark:text-slate-400"
							>
								VIEW ALL POSTS{' '}
								<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
							</Link>
						</div>
					</div>

					<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
						<PostCard
							title="The Future of AI in Software Development - 2026 Predictions and Trends"
							excerpt="Explore how artificial intelligence is reshaping the landscape of coding and what it means for developers.Explore how artificial intelligence is reshaping the landscape of coding and what it means for developers."
							category="Technology"
							author="Alex Johnson"
							date="Jan 15, 2026"
							readTime="5 min read"
							imageUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop"
							likes={1240}
							comments={84}
						/>
						<PostCard
							title="Optimizing React Performance"
							excerpt="Tips and tricks to make your React applications faster and smoother."
							category="Development"
							author="Sarah Lee"
							date="Jan 12, 2026"
							readTime="7 min read"
							imageUrl="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
							likes={850}
							comments={42}
						/>
						<PostCard
							title="Understanding Microservices Architecture"
							excerpt="A comprehensive guide to building scalable systems using microservices."
							category="Architecture"
							author="David Kim"
							date="Jan 10, 2026"
							readTime="10 min read"
							imageUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop"
							likes={1500}
							comments={92}
						/>
					</div>
				</div>
			</div>

			<TopAuthorsSection />

			<PricingSection />

			<NewsletterSection />
			<FooterMegaMenu />
		</GuestLayout>
	);
}
