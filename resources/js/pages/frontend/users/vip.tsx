import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import UserLayout from '@/layouts/frontend/user-layout';
import { Head } from '@inertiajs/react';
import { Check, Star, Zap } from 'lucide-react';

export default function VipMembership() {
	return (
		<UserLayout>
			<Head title="VIP Membership - BlogIT" />
			<div className="w-full">
				<div className="mx-auto mb-16 max-w-4xl text-center">
					<div className="mb-6 inline-flex animate-pulse rounded-2xl bg-amber-500/10 p-3 text-amber-500">
						<Star className="h-10 w-10 fill-current" />
					</div>
					<h1 className="mb-8 text-5xl leading-none font-black tracking-tighter md:text-7xl">
						Unleash the{' '}
						<span className="text-amber-500">Power</span> of
						Knowledge.
					</h1>
					<p className="text-xl leading-relaxed text-muted-foreground">
						Join our exclusive VIP circle and get access to premium
						deep-dives, private community, and direct access to top
						industry authors.
					</p>
				</div>

				<div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
					{/* Free Plan */}
					<div className="flex flex-col items-center rounded-3xl border border-border bg-card/50 p-10">
						<h3 className="mb-2 text-2xl font-bold">Explorer</h3>
						<p className="mb-8 text-center text-sm text-muted-foreground">
							Perfect for casual readers who want to stay
							informed.
						</p>
						<div className="mb-8 text-5xl font-black">
							$0<span className="text-lg opacity-40">/mo</span>
						</div>
						<ul className="mb-10 w-full space-y-4">
							{[
								'Access to all public articles',
								'Standard newsletter',
								'Comment on articles',
								'Reading history',
							].map((f) => (
								<li
									key={f}
									className="flex items-center gap-3 text-sm font-medium"
								>
									<div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 text-green-500">
										<Check className="h-3 w-3" />
									</div>
									{f}
								</li>
							))}
						</ul>
						<Button
							variant="outline"
							className="w-full rounded-full border-2 py-6 font-bold"
						>
							Current Plan
						</Button>
					</div>

					{/* VIP Plan */}
					<div className="relative flex flex-col items-center overflow-hidden rounded-3xl border-2 border-amber-500 bg-gradient-to-br from-amber-500/10 to-transparent p-10 shadow-[0_30px_60px_rgba(245,158,11,0.15)]">
						<div className="absolute top-0 right-0 p-6">
							<Badge className="border-none bg-amber-500 px-4 font-bold text-white">
								MOST POPULAR
							</Badge>
						</div>
						<h3 className="mb-2 text-2xl font-bold text-amber-500">
							VIP Architect
						</h3>
						<p className="mb-8 text-center text-sm text-muted-foreground">
							For serious developers who want an unfair advantage.
						</p>
						<div className="mb-8 text-5xl font-black text-foreground">
							9<span className="text-lg opacity-40">/mo</span>
						</div>
						<ul className="mb-10 w-full space-y-4">
							{[
								'Access to 500+ Premium Deep Dives',
								'Private Discord Community Access',
								'Monthly Live Q&A with Top Authors',
								'Ad-free Reading Experience',
								'Early Access to New Features',
								'Custom Profile Badge & Theme',
							].map((f) => (
								<li
									key={f}
									className="flex items-center gap-3 text-sm font-bold"
								>
									<div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg shadow-amber-500/40">
										<Zap className="h-3 w-3 fill-current" />
									</div>
									{f}
								</li>
							))}
						</ul>
						<Button className="w-full scale-105 rounded-full bg-amber-500 py-6 font-bold shadow-xl shadow-amber-500/40 transition-all hover:bg-amber-600">
							Upgrade to VIP
						</Button>
					</div>
				</div>
			</div>
		</UserLayout>
	);
}
