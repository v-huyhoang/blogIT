import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import {
	Activity,
	ChevronRight,
	Code2,
	Cpu,
	Database,
	GitBranch,
	Globe,
	Lock,
	Rocket,
	Server,
	Sparkles,
	Zap,
} from 'lucide-react';

export function HeroSection() {
	const scrollToNext = () => {
		const nextSection =
			document.getElementById('bentoIndex') ||
			document.getElementById('latest-insights');
		nextSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-white px-6 transition-colors duration-500 lg:px-12 dark:bg-[#020617]">
			{/* High-End Background: Animated Grid & Radial Glows */}
			<div className="absolute inset-0 z-0">
				<div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] dark:bg-primary/5"></div>
				<div className="absolute top-[20%] -right-[5%] h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px] dark:bg-purple-900/5"></div>

				<div
					className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
					style={{
						backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
						backgroundSize: '60px 60px',
						maskImage:
							'radial-gradient(circle at center, black, transparent 90%)',
					}}
				></div>
			</div>

			{/* Content Container - Flex-1 and justify-center to fill space */}
			<div className="relative z-10 container mx-auto flex flex-1 flex-col justify-center py-20 lg:py-32">
				<div className="grid grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
					{/* Left Content: Typography & CTAs */}
					<div className="flex flex-col items-center text-center lg:items-start lg:text-left">
						{/* Animated Badge */}
						<div className="mb-8">
							<div className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-md transition-all hover:bg-primary/10">
								<Sparkles className="h-3.5 w-3.5 animate-pulse text-primary" />
								<span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
									Modern Web Ecosystem
								</span>
							</div>
						</div>

						{/* Hero Slogan - Artistic & Horizontal focus */}
						<h1 className="text-5xl leading-[1.1] font-black tracking-tighter text-slate-900 sm:text-7xl xl:text-8xl dark:text-white">
							<span className="block">CRAFT YOUR</span>
							<span className="relative flex items-center justify-center gap-4 lg:justify-start">
								<span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-600 bg-clip-text text-transparent">
									LEGACY
								</span>
								<span className="hidden h-px flex-1 bg-slate-200 sm:block dark:bg-slate-800"></span>
							</span>
							<span className="block opacity-90">WITH CODE.</span>
						</h1>

						{/* Description */}
						<p className="mt-8 max-w-xl text-lg leading-relaxed font-medium text-slate-600 dark:text-slate-400">
							The ultimate vault for{' '}
							<span className="font-bold text-primary italic">
								web development experiences
							</span>
							. We transform fleeting insights into permanent
							wisdom through shared technical journeys.
						</p>

						{/* CTAs - Fixed overlapping on mobile */}
						<div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8 lg:justify-start">
							<Button
								asChild
								size="lg"
								className="group h-14 w-full rounded-xl bg-primary px-8 text-xs font-black tracking-widest text-white uppercase shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/40 sm:w-auto"
							>
								<Link href="/f/register">
									<span className="flex items-center gap-2">
										Get Started
										<Rocket className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
									</span>
								</Link>
							</Button>

							<Link
								href="/f/blog"
								className="group flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase transition-all hover:text-primary dark:text-slate-400"
							>
								Explore Articles
								<ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
							</Link>
						</div>
					</div>

					{/* Right Content: Artistic Website Ecosystem Visualization */}
					<div className="relative hidden lg:block">
						<div className="relative ml-auto aspect-square w-full max-w-[500px]">
							{/* Background Decorative Rings */}
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="h-full w-full animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-primary/20"></div>
								<div className="absolute h-[85%] w-[85%] animate-[spin_30s_linear_infinite_reverse] rounded-full border border-purple-500/10"></div>
								<div className="absolute h-[65%] w-[65%] animate-[spin_25s_linear_infinite] rounded-full border border-indigo-500/10"></div>
							</div>

							{/* Central Artistic Node - The Website Mockup */}
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="group relative">
									{/* Glow Effect */}
									<div className="absolute -inset-20 rounded-full bg-primary/10 blur-[80px] transition-opacity duration-700 group-hover:bg-primary/20"></div>

									{/* Central Website Frame (Browser Mockup) */}
									<div className="relative flex h-44 w-60 flex-col overflow-hidden rounded-3xl border border-white/40 bg-white/10 shadow-2xl backdrop-blur-2xl transition-all duration-700 group-hover:scale-105 dark:border-white/10 dark:bg-slate-900/30">
										{/* Browser Header */}
										<div className="flex items-center gap-1.5 border-b border-white/20 bg-white/20 px-4 py-2.5 dark:border-white/5 dark:bg-white/5">
											<div className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
											<div className="h-1.5 w-1.5 rounded-full bg-yellow-400/60" />
											<div className="h-1.5 w-1.5 rounded-full bg-green-400/60" />
											<div className="ml-2 h-1.5 w-20 rounded-full bg-slate-400/20" />
										</div>
										{/* Browser Body (Artistic Layout) */}
										<div className="flex flex-1 flex-col gap-2.5 p-3.5">
											<div className="h-2.5 w-3/4 rounded-full bg-primary/30" />
											<div className="grid grid-cols-2 gap-2.5">
												<div className="h-12 rounded-lg bg-purple-500/20" />
												<div className="h-12 rounded-lg bg-blue-500/20" />
											</div>
											<div className="mt-auto flex justify-between">
												<div className="h-1.5 w-10 rounded-full bg-slate-400/20" />
												<div className="flex gap-2">
													<Cpu className="h-2.5 w-2.5 animate-pulse text-primary" />
													<Sparkles className="h-2.5 w-2.5 text-purple-500" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Floating Ecosystem Nodes (General Web Dev Things) */}

							{/* Node 1: Code / Logic (Top) */}
							<div className="animate-float absolute top-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
									<Code2 className="h-5 w-5 text-purple-500" />
								</div>
								<span className="text-[7px] font-black tracking-[0.2em] text-slate-400 uppercase">
									Logic
								</span>
							</div>

							{/* Node 2: Data (Top Right) */}
							<div className="animate-float-delayed absolute top-12 right-12 flex flex-col items-center gap-1.5">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
									<Database className="h-5 w-5 text-indigo-500" />
								</div>
								<span className="text-[7px] font-black tracking-[0.2em] text-slate-400 uppercase">
									Storage
								</span>
							</div>

							{/* Node 3: Version Control (Right) */}
							<div className="animate-float absolute top-1/2 -right-4 flex -translate-y-1/2 flex-col items-center gap-1.5">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
									<GitBranch className="h-5 w-5 text-orange-500" />
								</div>
								<span className="text-[7px] font-black tracking-[0.2em] text-slate-400 uppercase">
									Version
								</span>
							</div>

							{/* Node 4: CDN / Global (Bottom Right) */}
							<div className="animate-float-delayed absolute right-12 bottom-12 flex flex-col items-center gap-1.5">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
									<Globe className="h-5 w-5 text-emerald-500" />
								</div>
								<span className="text-[7px] font-black tracking-[0.2em] text-slate-400 uppercase">
									Edge
								</span>
							</div>

							{/* Node 5: Infrastructure (Bottom) */}
							<div className="animate-float absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
									<Server className="h-5 w-5 text-blue-500" />
								</div>
								<span className="text-[7px] font-black tracking-[0.2em] text-slate-400 uppercase">
									Host
								</span>
							</div>

							{/* Node 6: Security (Bottom Left) */}
							<div className="animate-float-delayed absolute bottom-12 left-12 flex flex-col items-center gap-1.5">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
									<Lock className="h-5 w-5 text-red-500" />
								</div>
								<span className="text-[7px] font-black tracking-[0.2em] text-slate-400 uppercase">
									Secure
								</span>
							</div>

							{/* Node 7: Processing / Queues (Left) */}
							<div className="animate-float absolute top-1/2 -left-4 flex -translate-y-1/2 flex-col items-center gap-1.5">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
									<Activity className="h-5 w-5 text-yellow-500" />
								</div>
								<span className="text-[7px] font-black tracking-[0.2em] text-slate-400 uppercase">
									Flow
								</span>
							</div>

							{/* Node 8: Speed / AI (Top Left) */}
							<div className="animate-float-delayed absolute top-12 left-12 flex flex-col items-center gap-1.5">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/30">
									<Zap className="h-5 w-5 text-pink-500" />
								</div>
								<span className="text-[7px] font-black tracking-[0.2em] text-slate-400 uppercase">
									Core
								</span>
							</div>

							{/* Interconnecting Lines (SVG for precision) */}
							<svg
								className="absolute inset-0 -z-10 h-full w-full opacity-20 dark:opacity-30"
								viewBox="0 0 500 500"
							>
								{/* Center is at 250, 250 */}
								<g className="text-primary">
									<line
										x1="250"
										y1="250"
										x2="250"
										y2="40"
										stroke="currentColor"
										strokeWidth="1"
										strokeDasharray="4 4"
									/>
									<line
										x1="250"
										y1="250"
										x2="380"
										y2="100"
										stroke="currentColor"
										strokeWidth="1"
										strokeDasharray="4 4"
									/>
									<line
										x1="250"
										y1="250"
										x2="450"
										y2="250"
										stroke="currentColor"
										strokeWidth="1"
										strokeDasharray="4 4"
									/>
									<line
										x1="250"
										y1="250"
										x2="380"
										y2="400"
										stroke="currentColor"
										strokeWidth="1"
										strokeDasharray="4 4"
									/>
									<line
										x1="250"
										y1="250"
										x2="250"
										y2="460"
										stroke="currentColor"
										strokeWidth="1"
										strokeDasharray="4 4"
									/>
									<line
										x1="250"
										y1="250"
										x2="120"
										y2="400"
										stroke="currentColor"
										strokeWidth="1"
										strokeDasharray="4 4"
									/>
									<line
										x1="250"
										y1="250"
										x2="50"
										y2="250"
										stroke="currentColor"
										strokeWidth="1"
										strokeDasharray="4 4"
									/>
									<line
										x1="250"
										y1="250"
										x2="120"
										y2="100"
										stroke="currentColor"
										strokeWidth="1"
										strokeDasharray="4 4"
									/>
								</g>
							</svg>
						</div>
					</div>
				</div>
			</div>

			{/* Scroll Down Indicator */}
			<div className="relative z-10 mt-auto pb-10">
				<button
					onClick={scrollToNext}
					className="group flex flex-col items-center gap-3 transition-all hover:cursor-pointer"
				>
					<span className="text-[9px] font-black tracking-[0.4em] text-slate-400 uppercase opacity-60 group-hover:opacity-100">
						Scroll down
					</span>
					<div className="relative flex h-11 w-6.5 items-start justify-center rounded-full border-2 border-slate-200 p-1.5 transition-colors group-hover:border-primary/50 dark:border-slate-800">
						<div className="animate-mouse-wheel h-1.5 w-1 rounded-full bg-slate-400 transition-colors group-hover:bg-primary dark:bg-slate-600"></div>
					</div>
				</button>
			</div>
		</section>
	);
}
