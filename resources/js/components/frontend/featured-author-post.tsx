import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowRight, Quote } from 'lucide-react';

export function FeaturedAuthorPost() {
	return (
		<section className="relative overflow-hidden py-24">
			<div className="absolute top-1/2 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"></div>
			<div className="container mx-auto px-6">
				<div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-2xl md:p-20">
					<div className="absolute top-0 right-0 p-12 opacity-10">
						<Quote className="h-64 w-64 rotate-180" />
					</div>
					<div className="relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
						<div className="space-y-8">
							<div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/20 px-4 py-2 text-[10px] font-black tracking-widest text-primary uppercase">
								<span className="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
								Top Author Spotlight
							</div>
							<h2 className="text-4xl leading-none font-black tracking-tighter md:text-6xl">
								"The key to scalable systems isn't just code,
								it's{' '}
								<span className="text-primary italic">
									clarity
								</span>
								."
							</h2>
							<p className="max-w-lg text-lg leading-relaxed font-medium text-slate-400">
								Join Alex Johnson in his latest deep-dive on how
								to build resilient architectures that stand the
								test of time.
							</p>
							<div className="flex flex-col items-center gap-6 sm:flex-row">
								<Button className="group h-14 rounded-2xl bg-primary px-10 text-sm font-black text-white shadow-xl shadow-primary/20 hover:bg-primary/90">
									READ FULL ARTICLE{' '}
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
								</Button>
								<div className="flex items-center gap-4">
									<Avatar className="h-14 w-14 ring-4 ring-white/10">
										<AvatarImage src="https://i.pravatar.cc/150?u=9" />
										<AvatarFallback>AJ</AvatarFallback>
									</Avatar>
									<div>
										<p className="mb-1 leading-none font-bold">
											Alex Johnson
										</p>
										<p className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
											24 ARTICLES THIS YEAR
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
							<img
								src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"
								className="h-full w-full scale-105 object-cover grayscale transition-all duration-1000 hover:grayscale-0"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
