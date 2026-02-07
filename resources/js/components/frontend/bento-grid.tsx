import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, Clock, Heart } from 'lucide-react';
import HeaderSection from './header-section';

interface BentoItemProps {
	title: string;
	category: string;
	imageUrl: string;
	size?: 'small' | 'large' | 'medium';
	likes: number;
	readTime: string;
	className?: string;
}

function BentoItem({
	title,
	category,
	imageUrl,
	size = 'small',
	likes,
	readTime,
	className,
}: BentoItemProps) {
	return (
		<Link
			href="/f/blog/show"
			className={cn(
				'group relative overflow-hidden rounded-3xl border border-border/50 bg-secondary transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(168,85,247,0.15)]',
				size === 'large' ? 'md:col-span-2 md:row-span-2' : '',
				size === 'medium' ? 'md:col-span-2' : '',
				className,
			)}
		>
			<img
				src={imageUrl}
				className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale-[50%] transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
				alt={title}
			/>
			<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8">
				<div className="mb-4 flex translate-y-4 items-center justify-between transition-transform duration-500 group-hover:translate-y-0">
					<Badge className="rounded-full border-none bg-primary/20 px-4 text-[10px] font-black tracking-widest uppercase backdrop-blur-md">
						{category}
					</Badge>
					<div className="flex gap-4 text-[10px] font-black text-white/60">
						<span className="flex items-center gap-1">
							<Heart className="h-3 w-3" /> {likes}
						</span>
						<span className="flex items-center gap-1">
							<Clock className="h-3 w-3" /> {readTime}
						</span>
					</div>
				</div>
				<h3
					className={cn(
						'leading-[0.9] font-black tracking-tighter text-white transition-colors duration-300 group-hover:text-primary',
						size === 'large' ? 'text-4xl md:text-5xl' : 'text-2xl',
					)}
				>
					{title}
				</h3>
				<div className="mt-4 flex items-center gap-2 text-xs font-bold text-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100">
					READ ARTICLE <ArrowUpRight className="h-4 w-4" />
				</div>
			</div>
		</Link>
	);
}

export function BentoGrid() {
	return (
		<section id="bentoIndex" className="py-24">
			<div className="container mx-auto px-6">
				<div className="mb-16 flex flex-col gap-4">
					<h2 className="text-sm font-black tracking-[0.3em] text-primary uppercase">
						Curated Stories
					</h2>
					<div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
						<HeaderSection
							content="Featured"
							keyword="Perspectives"
						/>
						<Link
							href="/f/blog"
							className="group flex items-center gap-2 text-xs font-black tracking-[0.3em] text-slate-500 uppercase transition-all hover:text-primary dark:text-slate-400"
						>
							EXPLORE ALL ARTICLES{' '}
							<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
						</Link>
					</div>
				</div>

				<div className="grid auto-rows-[250px] grid-cols-1 gap-6 md:grid-cols-4">
					<BentoItem
						size="large"
						title="The Architecture of Tomorrow: Building for 2030"
						category="Architecture"
						imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
						likes={1240}
						readTime="20 MIN"
					/>
					<BentoItem
						title="Micro-animations in UX"
						category="Design"
						imageUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
						likes={850}
						readTime="8 MIN"
					/>
					<BentoItem
						title="Modern CSS Paradigms"
						category="Frontend"
						imageUrl="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=600&auto=format&fit=crop"
						likes={420}
						readTime="12 MIN"
					/>
					<BentoItem
						size="medium"
						title="Quantum Computing: A Developer's Practical Guide"
						category="Science"
						imageUrl="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop"
						likes={2100}
						readTime="25 MIN"
					/>
				</div>
			</div>
		</section>
	);
}
