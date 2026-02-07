import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { Bell, Heart, Settings, Star, TrendingUp } from 'lucide-react';

export function UserSidebar() {
	const { url } = usePage();

	const isActive = (tab: string) => {
		const params = new URLSearchParams(window.location.search);
		return (
			params.get('tab') === tab ||
			(!params.get('tab') && tab === 'overview')
		);
	};

	const isPathActive = (path: string) => url.startsWith(path);

	return (
		<aside className="space-y-2 lg:col-span-3">
			<div className="sticky top-32 space-y-2 rounded-3xl border border-border/50 bg-card/50 p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
				<h2 className="mb-6 px-4 text-[10px] font-black tracking-[0.3em] uppercase opacity-30">
					User Navigation
				</h2>

				{[
					{
						id: 'overview',
						label: 'Overview',
						icon: TrendingUp,
						href: '/f/user/dashboard?tab=overview',
						active:
							isPathActive('/f/user/dashboard') &&
							isActive('overview'),
					},
					{
						id: 'wishlist',
						label: 'Wishlist',
						icon: Heart,
						href: '/f/user/wishlist',
						active: isPathActive('/f/user/wishlist'),
					},
					{
						id: 'notifications',
						label: 'Notifications',
						icon: Bell,
						href: '/f/user/dashboard?tab=notifications',
						active:
							isPathActive('/f/user/dashboard') &&
							isActive('notifications'),
					},
				].map((item) => (
					<Link
						key={item.id}
						href={item.href}
						prefetch
						className={cn(
							'group flex w-full items-center gap-4 rounded-2xl px-6 py-4 font-black transition-all duration-300',
							item.active
								? 'scale-[1.02] bg-primary text-white shadow-xl shadow-primary/30'
								: 'text-muted-foreground hover:translate-x-1 hover:bg-primary/5 hover:text-primary',
						)}
					>
						<item.icon
							className={cn(
								'h-5 w-5 transition-all duration-300',
								item.active
									? 'text-white'
									: 'group-hover:scale-110 group-hover:rotate-3',
							)}
						/>
						<span className="text-[13px] tracking-tight">
							{item.label}
						</span>
					</Link>
				))}

				<div className="mt-4 border-t border-border/50 pt-4">
					<Link
						href="/f/user/profile"
						prefetch
						className={cn(
							'group flex items-center gap-4 rounded-2xl px-6 py-4 font-bold transition-all duration-300',
							isPathActive('/f/user/profile')
								? 'bg-primary/10 text-primary'
								: 'text-muted-foreground hover:translate-x-1 hover:bg-secondary hover:text-foreground',
						)}
					>
						<Settings
							className={cn(
								'h-5 w-5 transition-transform duration-300',
								isPathActive('/f/user/profile')
									? ''
									: 'group-hover:rotate-90',
							)}
						/>
						<span className="text-[13px] tracking-tight">
							Settings
						</span>
					</Link>
					<Link
						href="/f/user/vip"
						prefetch
						className={cn(
							'group flex items-center gap-4 rounded-2xl px-6 py-4 font-bold transition-all duration-300',
							isPathActive('/f/user/vip')
								? 'bg-amber-500/10 text-amber-500'
								: 'text-amber-500 hover:translate-x-1 hover:bg-amber-500/5',
						)}
					>
						<Star
							className={cn(
								'h-5 w-5 transition-all duration-300',
								isPathActive('/f/user/vip')
									? 'fill-current'
									: 'group-hover:scale-125 group-hover:rotate-12',
							)}
						/>
						<span className="text-[13px] tracking-tight">
							VIP Member
						</span>
					</Link>
				</div>
			</div>
		</aside>
	);
}
