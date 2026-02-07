import { cn } from '@/lib/utils';
import AppLogoIcon from './app-logo-icon';

interface AppLogoProps {
	className?: string;
	iconClassName?: string;
	textClassName?: string;
}
export default function AppLogo({
	className,
	iconClassName,
	textClassName,
}: AppLogoProps) {
	return (
		<div className={cn('group flex items-center gap-3', className)}>
			<div
				className={cn(
					'relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-primary/25',
					iconClassName,
				)}
			>
				<div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
				<AppLogoIcon className="z-10 size-6 fill-white drop-shadow-sm transition-transform duration-500 group-hover:rotate-12" />
			</div>
			<div className="flex flex-col">
				<span
					className={cn(
						'text-2xl font-black tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary',
						textClassName,
					)}
				>
					BlogIT
					<span className="text-primary group-hover:text-foreground">
						.
					</span>
				</span>
			</div>
		</div>
	);
}
