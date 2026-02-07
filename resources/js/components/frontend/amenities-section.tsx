import { Code, Cpu, Globe, Lock, Shield, Zap } from 'lucide-react';

const features = [
	{
		name: 'High Performance',
		description:
			'Optimized for speed and efficiency, ensuring your content loads instantly for users worldwide.',
		icon: Zap,
	},
	{
		name: 'Global Reach',
		description:
			'Connect with a global audience through our distributed content delivery network.',
		icon: Globe,
	},
	{
		name: 'Secure by Design',
		description:
			'Built with security in mind, featuring end-to-end encryption and regular security audits.',
		icon: Shield,
	},
	{
		name: 'Developer Friendly',
		description:
			'Comprehensive API documentation and developer tools to help you integrate seamlessly.',
		icon: Code,
	},
	{
		name: 'Advanced AI',
		description:
			'Leverage cutting-edge AI for content recommendations and automated moderation.',
		icon: Cpu,
	},
	{
		name: 'Private & Secure',
		description:
			'Your data belongs to you. We prioritize user privacy and data sovereignty.',
		icon: Lock,
	},
];

export function AmenitiesSection() {
	return (
		<div className="bg-secondary/20 py-24 sm:py-32">
			<div className="container mx-auto px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:text-center">
					<h2 className="text-base leading-7 font-semibold text-primary">
						Everything you need
					</h2>
					<p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Built for modern content creators
					</p>
					<p className="mt-6 text-lg leading-8 text-muted-foreground">
						Quis tellus eget adipiscing convallis sit sit eget
						aliquet quis. Suspendisse eget egestas a elementum
						pulvinar et feugiat blandit at. In mi viverra elit nunc.
					</p>
				</div>
				<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
					<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
						{features.map((feature) => (
							<div key={feature.name} className="relative pl-16">
								<dt className="text-base leading-7 font-semibold text-foreground">
									<div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
										<feature.icon
											className="h-6 w-6 text-primary-foreground"
											aria-hidden="true"
										/>
									</div>
									{feature.name}
								</dt>
								<dd className="mt-2 text-base leading-7 text-muted-foreground">
									{feature.description}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}
