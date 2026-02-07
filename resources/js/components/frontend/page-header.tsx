import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { ReactNode } from 'react';

interface PageHeaderProps {
	heading: string;
	highlight: string;
	description: string;
	badge?: string;
	children?: ReactNode;
	className?: string;
}

export function PageHeader({
	heading,
	highlight,
	description,
	badge,
	children,
	className,
}: PageHeaderProps) {
	return (
		<div
			className={cn(
				'relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-24 md:py-32',
				className,
			)}
		>
			<div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"></div>
			<div className="relative z-10 container mx-auto px-6 lg:px-8">
				{badge && (
					<div className="mb-6 flex items-center gap-3">
						<div className="rounded-xl bg-primary/10 p-2">
							<Sparkles className="h-5 w-5 text-primary" />
						</div>
						<span className="text-xs font-black tracking-[0.3em] text-primary uppercase">
							{badge}
						</span>
					</div>
				)}

				<div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
					<div className="max-w-4xl">
						<h1 className="mb-8 text-5xl leading-[0.85] font-black tracking-tighter text-foreground md:text-8xl">
							{heading}{' '}
							<span className="text-primary italic">
								{highlight}
							</span>
							.
						</h1>
						<p className="max-w-2xl border-l-4 border-primary/20 pl-8 text-xl leading-relaxed font-medium text-muted-foreground italic">
							{description}
						</p>
					</div>
					{children && (
						<div className="w-full md:max-w-sm">{children}</div>
					)}
				</div>
			</div>
		</div>
	);
}
