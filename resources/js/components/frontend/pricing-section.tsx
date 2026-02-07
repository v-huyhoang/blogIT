import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Zap } from 'lucide-react';
import HeaderSection from './header-section';

const tiers = [
	{
		name: 'Explorer',
		id: 'tier-hobby',
		href: '#',
		priceMonthly: '$0',
		description:
			"The perfect plan if you're just getting started with our product.",
		features: [
			'Access to all public articles',
			'Standard newsletter',
			'Comment on articles',
			'Reading history',
		],
		featured: false,
	},
	{
		name: 'VIP Architect',
		id: 'tier-enterprise',
		href: '#',
		priceMonthly: '$19',
		description: 'Dedicated support and infrastructure for your company.',
		features: [
			'Access to 500+ Premium Deep Dives',
			'Private Discord Community Access',
			'Monthly Live Q&A with Top Authors',
			'Ad-free Reading Experience',
			'Early Access to New Features',
			'Custom Profile Badge & Theme',
		],
		featured: true,
	},
	{
		name: 'Studio',
		id: 'tier-startup',
		href: '#',
		priceMonthly: '$59',
		description: 'Advanced features for content teams and agencies.',
		features: [
			'All VIP Features',
			'Team shared workspace',
			'Custom subdomain',
			'API Access',
			'Whitelabeling options',
		],
		featured: false,
	},
];

export function PricingSection() {
	return (
		<div className="relative overflow-hidden py-24 sm:py-32">
			<div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-[100%] bg-primary/5 blur-3xl"></div>

			<div className="container mx-auto px-6 lg:px-8">
				<div className="mx-auto mb-20 max-w-2xl text-center lg:max-w-4xl">
					<HeaderSection
						title="Membership"
						content="Choose your"
						keyword="path"
					/>
				</div>
				<div className="mx-auto grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
					{tiers.map((tier) => (
						<div
							key={tier.id}
							className={cn(
								'flex flex-col justify-between rounded-3xl p-10 ring-1 transition-all duration-500 hover:-translate-y-4',
								tier.featured
									? 'scale-105 bg-gradient-to-br from-primary/10 via-background to-purple-500/10 shadow-[0_30px_60px_rgba(168,85,247,0.15)] ring-primary'
									: 'bg-card/50 ring-border/50 backdrop-blur-md hover:shadow-2xl hover:shadow-primary/5 hover:ring-primary/20',
							)}
						>
							<div>
								<div className="mb-6 flex items-center justify-between gap-x-4">
									<h3
										id={tier.id}
										className={cn(
											'text-xl font-black tracking-tight',
											tier.featured
												? 'text-primary'
												: 'text-foreground',
										)}
									>
										{tier.name}
									</h3>
									{tier.featured && (
										<span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black tracking-widest text-primary uppercase ring-1 ring-primary/20 ring-inset">
											Most Popular
										</span>
									)}
								</div>
								<div className="mb-8 flex items-baseline gap-x-1">
									<span className="text-5xl font-black tracking-tighter text-foreground">
										{tier.priceMonthly}
									</span>
									<span className="text-sm leading-6 font-bold text-muted-foreground">
										/mo
									</span>
								</div>
								<p className="mb-10 text-sm leading-relaxed font-medium text-muted-foreground">
									{tier.description}
								</p>
								<ul
									role="list"
									className="space-y-4 text-sm leading-6 font-bold text-foreground/80"
								>
									{tier.features.map((feature) => (
										<li
											key={feature}
											className="flex items-center gap-x-3"
										>
											<div
												className={cn(
													'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
													tier.featured
														? 'bg-primary text-white'
														: 'bg-primary/10 text-primary',
												)}
											>
												<Check className="h-3 w-3" />
											</div>
											{feature}
										</li>
									))}
								</ul>
							</div>
							<Button
								className={cn(
									'mt-12 h-14 w-full rounded-xl text-lg font-black transition-all hover:cursor-pointer',
									tier.featured
										? 'bg-primary text-white shadow-xl shadow-primary/20 hover:shadow-primary/40'
										: 'bg-secondary text-foreground hover:bg-primary hover:text-white',
								)}
							>
								{tier.featured ? (
									<>
										<Zap className="mr-2 h-5 w-5 fill-current" />{' '}
										Upgrade Now
									</>
								) : (
									'Get Started'
								)}
							</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
