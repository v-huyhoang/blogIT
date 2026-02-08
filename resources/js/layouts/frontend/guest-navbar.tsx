'use client';

import { cn } from '@/lib/utils';
import {
	Bell,
	Book,
	Check,
	Heart,
	LogIn,
	Menu,
	MessageSquare,
	Moon,
	Search,
	Settings,
	Sun,
	Zap,
} from 'lucide-react';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { useAppearance } from '@/hooks/use-appearance';
import { useScrollDirection } from '@/hooks/use-scroll-direction';
import { logout } from '@/routes';
import articlesRoute from '@/routes/articles';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLogo from '../../components/app-logo';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '../../components/ui/avatar';
import { Input } from '../../components/ui/input';

interface MenuItem {
	title: string;
	url: string;
	description?: string;
	icon?: React.ReactNode;
	items?: MenuItem[];
}

export interface GuestNavbarProps {
	className?: string;
	menu?: MenuItem[];
}

const GuestNavbar = ({
	menu = [
		{
			title: 'Explore',
			url: '#',
			items: [
				{
					title: 'Articles',
					description: 'Deep dives into tech and design',
					icon: <Book className="size-5" />,
					url: articlesRoute.index.url(),
				},
				{
					title: 'Categories',
					description: 'Browse content by domain',
					icon: <Zap className="size-5" />,
					url: '/f/categories',
				},
				{
					title: 'Tags',
					description: 'Browse content by topics',
					icon: <Zap className="size-5" />,
					url: '/f/tags',
				},
				{
					title: 'Code Snippets',
					description: 'Quick solutions for developers',
					icon: <Zap className="size-5" />,
					url: '/f/snippets',
				},
			],
		},
		{
			title: 'Pricing',
			url: '/f/user/vip',
		},
		{
			title: 'Authors',
			url: '/f/author/alex-johnson',
		},
	],
}: GuestNavbarProps) => {
	const { scrollDirection, scrollY } = useScrollDirection();
	const { auth } = usePage<SharedData>().props;
	const { appearance, updateAppearance } = useAppearance();
	const [currentLang, setCurrentLang] = useState('en');
	const [searchQuery, setSearchQuery] = useState('');

	const isVisible = scrollY < 100 || scrollDirection === 'up';
	const isScrolled = scrollY > 20;

	const notifications = [
		{
			id: 1,
			title: 'New Article',
			description: 'Alex Johnson published "The Future of AI".',
			time: '2h ago',
			unread: true,
			icon: <Book className="size-4 text-primary" />,
		},
		{
			id: 2,
			title: 'New Like',
			description: 'Sarah Lee liked your comment.',
			time: '5h ago',
			unread: true,
			icon: <Heart className="size-4 text-red-500" />,
		},
		{
			id: 3,
			title: 'Community',
			description: 'Welcome to the BlogIT community!',
			time: '1d ago',
			unread: false,
			icon: <MessageSquare className="size-4 text-blue-500" />,
		},
	];

	const languages = [
		{ code: 'en', label: 'English', flag: '🇺🇸' },
		{ code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
	];

	const searchResults = [
		{
			title: 'The Future of AI',
			category: 'Technology',
			url: articlesRoute.show.url('the-future-of-ai'),
		},
		{
			title: 'React Performance',
			category: 'Development',
			url: articlesRoute.show.url('react-performance'),
		},
		{
			title: 'System Design 101',
			category: 'Architecture',
			url: articlesRoute.show.url('system-design-101'),
		},
	].filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<header
			className={cn(
				'fixed top-0 right-0 left-0 z-50 py-4 transition-all duration-500 ease-in-out',
				isVisible ? 'translate-y-0' : '-translate-y-full',
				isScrolled
					? 'border-b border-primary/10 bg-background/80 shadow-[0_8px_30px_rgba(168,85,247,0.1)] backdrop-blur-xl'
					: 'bg-transparent',
			)}
		>
			<div className="container mx-auto px-6">
				<nav className="flex items-center justify-between">
					<div className="flex items-center gap-12">
						<Link
							href="/"
							prefetch
							className="transition-opacity hover:opacity-80"
						>
							<AppLogo />
						</Link>
						<div className="hidden items-center lg:flex">
							<NavigationMenu>
								<NavigationMenuList className="gap-2">
									{menu.map((item) => renderMenuItem(item))}
								</NavigationMenuList>
							</NavigationMenu>
						</div>
					</div>

					<div className="flex items-center gap-2 sm:gap-4">
						{/* Search Dialog */}
						<Dialog
							onOpenChange={(open) => !open && setSearchQuery('')}
						>
							<DialogTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="rounded-full text-muted-foreground transition-colors hover:cursor-pointer hover:text-primary"
								>
									<Search className="h-5 w-5" />
								</Button>
							</DialogTrigger>
							<DialogContent className="gap-0 overflow-hidden rounded-3xl border-primary/10 p-0 sm:max-w-[550px]">
								<div className="p-6 pb-4">
									<DialogHeader>
										<DialogTitle className="text-2xl font-black tracking-tighter">
											Quick Search
										</DialogTitle>
									</DialogHeader>
									<div className="relative mt-4">
										<Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
										<Input
											placeholder="Search articles, tags, authors..."
											className="h-14 rounded-2xl border-none bg-primary/5 pl-12 text-lg font-medium focus-visible:ring-primary/20"
											value={searchQuery}
											onChange={(e) =>
												setSearchQuery(e.target.value)
											}
											autoFocus
										/>
									</div>
								</div>
								<div className="custom-scrollbar h-[350px] overflow-y-auto p-6 pt-2">
									<div className="space-y-4">
										{searchQuery.length > 0 ? (
											<>
												<p className="px-2 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
													Results
												</p>
												{searchResults.length > 0 ? (
													searchResults.map(
														(result, i) => (
															<Link
																key={i}
																href={
																	result.url
																}
																className="group flex items-center justify-between rounded-2xl border border-transparent bg-secondary/50 p-4 transition-all hover:border-primary/10 hover:bg-primary/5"
															>
																<div>
																	<p className="font-black text-foreground transition-colors group-hover:text-primary">
																		{
																			result.title
																		}
																	</p>
																	<p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
																		{
																			result.category
																		}
																	</p>
																</div>
																<Zap className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
															</Link>
														),
													)
												) : (
													<p className="py-12 text-center font-medium text-muted-foreground italic">
														No results found for "
														{searchQuery}"
													</p>
												)}
											</>
										) : (
											<div className="py-12 text-center">
												<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/5">
													<Search className="h-8 w-8 text-primary opacity-20" />
												</div>
												<p className="font-medium text-muted-foreground">
													Start typing to search...
												</p>
											</div>
										)}
									</div>
								</div>
							</DialogContent>
						</Dialog>

						{/* Wishlist Icon */}
						<Link
							href={auth.user ? '/f/user/wishlist' : '/f/login'}
							prefetch
						>
							<Button
								variant="ghost"
								size="icon"
								className={cn(
									'hidden rounded-full transition-all hover:cursor-pointer sm:flex',
									auth.user
										? 'text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30'
										: 'text-muted-foreground hover:text-primary',
								)}
							>
								<Heart
									className={cn(
										'h-5 w-5 transition-transform duration-300 active:scale-125',
										auth.user && 'fill-current',
									)}
								/>
							</Button>
						</Link>

						{/* Notifications Popover */}
						<Popover>
							<PopoverTrigger asChild>
								<div className="relative hidden sm:block">
									<Button
										variant="ghost"
										size="icon"
										className="relative rounded-full text-muted-foreground transition-all hover:cursor-pointer hover:text-primary"
									>
										<Bell className="h-5 w-5" />
										<span className="absolute top-2 right-2 h-2 w-2 animate-pulse rounded-full bg-primary ring-2 ring-background"></span>
									</Button>
								</div>
							</PopoverTrigger>
							<PopoverContent
								className="w-80 overflow-hidden rounded-3xl border-primary/10 p-0 shadow-2xl"
								align="end"
							>
								<div className="border-b border-primary/5 bg-primary/5 p-6">
									<h3 className="flex items-center justify-between font-black tracking-tight">
										Notifications
										<span className="rounded-full bg-primary px-2 py-0.5 text-[10px] text-white">
											2 NEW
										</span>
									</h3>
								</div>
								<div className="custom-scrollbar h-[300px] overflow-y-auto">
									<div className="flex flex-col">
										{notifications.map((n) => (
											<div
												key={n.id}
												className={cn(
													'flex cursor-pointer gap-4 border-b border-primary/5 p-4 transition-colors last:border-0 hover:bg-primary/5',
													n.unread &&
														'bg-primary/[0.02]',
												)}
											>
												<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
													{n.icon}
												</div>
												<div className="min-w-0 flex-1">
													<p className="truncate text-sm leading-tight font-black text-foreground">
														{n.title}
													</p>
													<p className="mt-0.5 line-clamp-2 text-xs font-medium text-muted-foreground">
														{n.description}
													</p>
													<p className="mt-1.5 text-[9px] font-black tracking-widest text-primary/60 uppercase">
														{n.time}
													</p>
												</div>
												{n.unread && (
													<div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
												)}
											</div>
										))}
									</div>
								</div>
								<div className="bg-secondary/30 p-4 text-center">
									<Button
										variant="ghost"
										className="w-full text-[10px] font-black tracking-widest uppercase hover:cursor-pointer hover:text-primary"
									>
										View All Notifications
									</Button>
								</div>
							</PopoverContent>
						</Popover>

						{/* Settings Dropdown (Language & Theme) */}
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="hidden rounded-full text-muted-foreground transition-colors hover:cursor-pointer hover:text-primary sm:flex"
								>
									<Settings className="h-5 w-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="min-w-[200px] rounded-2xl border-primary/10 p-2 shadow-2xl"
							>
								<DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-black tracking-widest text-muted-foreground uppercase opacity-50">
									Appearance
								</DropdownMenuLabel>
								<div className="grid grid-cols-2 gap-2 p-1">
									<Button
										variant={
											appearance === 'light'
												? 'secondary'
												: 'ghost'
										}
										size="sm"
										className="h-8 justify-start rounded-xl px-2 hover:cursor-pointer"
										onClick={() =>
											updateAppearance('light')
										}
									>
										<Sun className="w- mr-2 h-4 text-yellow-500" />
										<span className="text-xs font-bold">
											Light
										</span>
									</Button>
									<Button
										variant={
											appearance === 'dark'
												? 'secondary'
												: 'ghost'
										}
										size="sm"
										className="h-8 justify-start rounded-xl px-2 hover:cursor-pointer"
										onClick={() => updateAppearance('dark')}
									>
										<Moon className="mr-2 h-4 w-4" />
										<span className="text-xs font-bold">
											Dark
										</span>
									</Button>
								</div>
								<DropdownMenuSeparator className="my-1 bg-border/50" />
								<DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-black tracking-widest text-muted-foreground uppercase opacity-50">
									Language
								</DropdownMenuLabel>
								{languages.map((lang) => (
									<DropdownMenuItem
										key={lang.code}
										className={cn(
											'flex items-center justify-between rounded-xl px-3 py-2 font-bold transition-all hover:cursor-pointer',
											currentLang === lang.code
												? 'bg-primary/10 text-primary'
												: 'hover:bg-secondary',
										)}
										onClick={() =>
											setCurrentLang(lang.code)
										}
									>
										<span className="flex items-center gap-3">
											<span className="text-base">
												{lang.flag}
											</span>
											<span className="text-xs">
												{lang.label}
											</span>
										</span>
										{currentLang === lang.code && (
											<Check className="h-3 w-3" />
										)}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>

						{auth.user ? (
							<Link
								href="/f/user/dashboard"
								prefetch
								className="flex items-center gap-2 pl-2"
							>
								<Avatar className="h-8 w-8 rounded-full ring-2 ring-primary/10 transition-all hover:ring-primary/70">
									<AvatarImage
										src={auth.user.avatar}
										className="object-cover"
									/>
									<AvatarFallback className="bg-primary/10 text-xs font-black text-primary uppercase">
										{auth.user.name.substring(0, 2)}
									</AvatarFallback>
								</Avatar>
							</Link>
						) : (
							<div className="hidden items-center gap-1 sm:flex">
								<div className="flex items-center rounded-full border border-primary/10 bg-primary/5 p-1 pl-1.5">
									<Button
										asChild
										variant="ghost"
										size="sm"
										className="h-8 rounded-full px-4 text-[10px] font-black tracking-widest text-muted-foreground uppercase hover:bg-transparent hover:text-primary"
									>
										<Link href="/f/login" prefetch>
											Log In
										</Link>
									</Button>
									<Button
										asChild
										size="sm"
										className="h-8 rounded-full bg-primary px-5 text-[10px] font-black tracking-widest text-white uppercase shadow-md shadow-primary/20 transition-all hover:bg-primary/90"
									>
										<Link href="/f/register" prefetch>
											Sign Up
										</Link>
									</Button>
								</div>
							</div>
						)}

						<div className="lg:hidden">
							<Sheet>
								<SheetTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="ml-1 rounded-full"
									>
										<Menu className="h-6 w-6" />
									</Button>
								</SheetTrigger>
								<SheetContent
									side="right"
									className="flex w-[320px] flex-col border-l border-primary/10 bg-background/95 p-0 backdrop-blur-xl"
								>
									<SheetHeader className="border-b border-primary/5 p-6 text-left">
										<SheetTitle>
											<AppLogo />
										</SheetTitle>
									</SheetHeader>
									<div className="custom-scrollbar flex-1 overflow-y-auto p-6 py-4">
										<div className="flex flex-col gap-8">
											{/* Navigation Section */}
											<div className="space-y-4">
												<p className="px-2 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase opacity-50">
													Menu
												</p>
												<Accordion
													type="single"
													collapsible
													className="w-full"
												>
													{menu.map((item) =>
														renderMobileMenuItem(
															item,
														),
													)}
												</Accordion>
											</div>

											{/* User Account Section */}
											{auth.user ? (
												<div className="space-y-4 border-t border-primary/5 pt-4">
													<p className="px-2 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase opacity-50">
														Account
													</p>
													<div className="grid gap-2">
														<Link
															href="/f/user/dashboard"
															className="flex items-center gap-4 rounded-2xl p-3 font-bold transition-colors hover:bg-primary/5 hover:text-primary"
														>
															<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
																<Zap className="size-5" />
															</div>
															<span className="text-sm">
																Dashboard
															</span>
														</Link>
														<Link
															href="/f/user/wishlist"
															className="flex items-center gap-4 rounded-2xl p-3 font-bold transition-colors hover:bg-primary/5 hover:text-primary"
														>
															<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
																<Heart className="size-5" />
															</div>
															<span className="text-sm">
																Wishlist
															</span>
														</Link>
														<Link
															href="/f/user/profile"
															className="flex items-center gap-4 rounded-2xl p-3 font-bold transition-colors hover:bg-primary/5 hover:text-primary"
														>
															<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
																<Settings className="size-5" />
															</div>
															<span className="text-sm">
																Profile Settings
															</span>
														</Link>
													</div>
												</div>
											) : (
												<div className="flex flex-col gap-3 border-t border-primary/5 pt-4">
													<Button
														asChild
														variant="outline"
														className="h-14 rounded-2xl border-primary/10 text-xs font-black tracking-widest uppercase hover:bg-primary/5 hover:text-primary"
													>
														<Link
															href="/f/login"
															prefetch
														>
															Log In
														</Link>
													</Button>
													<Button
														asChild
														className="h-14 rounded-2xl bg-primary text-xs font-black tracking-widest uppercase shadow-lg shadow-primary/20"
													>
														<Link
															href="/f/register"
															prefetch
														>
															Sign Up
														</Link>
													</Button>
												</div>
											)}

											{/* Preferences Section */}
											<div className="space-y-4 border-t border-primary/5 pt-4 pb-8">
												<p className="px-2 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase opacity-50">
													Preferences
												</p>
												<div className="grid grid-cols-2 gap-3">
													<Button
														variant={
															appearance ===
															'light'
																? 'secondary'
																: 'outline'
														}
														className="h-12 rounded-2xl border-primary/5"
														onClick={() =>
															updateAppearance(
																'light',
															)
														}
													>
														<Sun className="mr-2 size-4" />
														<span className="text-xs font-bold">
															Light
														</span>
													</Button>
													<Button
														variant={
															appearance ===
															'dark'
																? 'secondary'
																: 'outline'
														}
														className="h-12 rounded-2xl border-primary/5"
														onClick={() =>
															updateAppearance(
																'dark',
															)
														}
													>
														<Moon className="mr-2 size-4" />
														<span className="text-xs font-bold">
															Dark
														</span>
													</Button>
												</div>
											</div>
										</div>
									</div>

									{auth.user && (
										<div className="border-t border-primary/5 bg-primary/[0.02] p-6">
											<Link
												href={logout().url}
												method="post"
												as="button"
												className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500/5 py-4 text-xs font-black tracking-[0.2em] text-red-500 uppercase transition-colors hover:bg-red-500 hover:text-white"
											>
												<LogIn className="size-4 rotate-180" />
												Log Out
											</Link>
										</div>
									)}
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</nav>
			</div>
		</header>
	);
};

const renderMenuItem = (item: MenuItem) => {
	if (item.items) {
		return (
			<NavigationMenuItem key={item.title}>
				<NavigationMenuTrigger className="rounded-full bg-transparent px-6 text-xs font-black tracking-widest uppercase transition-all hover:bg-primary/5">
					{item.title}
				</NavigationMenuTrigger>
				<NavigationMenuContent>
					<div className="grid w-[500px] grid-cols-2 gap-4 rounded-3xl border border-primary/10 bg-background/95 p-6 shadow-2xl backdrop-blur-3xl">
						{item.items.map((subItem) => (
							<NavigationMenuLink asChild key={subItem.title}>
								<SubMenuLink item={subItem} />
							</NavigationMenuLink>
						))}
					</div>
				</NavigationMenuContent>
			</NavigationMenuItem>
		);
	}

	return (
		<NavigationMenuItem key={item.title}>
			<NavigationMenuLink asChild>
				<Link
					href={item.url}
					prefetch
					className="group inline-flex h-10 w-max items-center justify-center rounded-full px-6 py-2 text-xs font-black tracking-widest uppercase transition-all hover:bg-primary/5 hover:text-primary"
				>
					{item.title}
				</Link>
			</NavigationMenuLink>
		</NavigationMenuItem>
	);
};

const renderMobileMenuItem = (item: MenuItem) => {
	if (item.items) {
		return (
			<AccordionItem
				key={item.title}
				value={item.title}
				className="border-none"
			>
				<AccordionTrigger className="py-4 text-base font-black tracking-tighter uppercase transition-all hover:text-primary hover:no-underline [&[data-state=open]]:text-primary">
					<div className="flex items-center gap-3">
						{item.icon && (
							<div className="text-primary opacity-70">
								{item.icon}
							</div>
						)}
						{item.title}
					</div>
				</AccordionTrigger>
				<AccordionContent className="pb-4">
					<div className="ml-2 flex flex-col gap-1 border-l-2 border-primary/10 pl-4">
						{item.items.map((subItem) => (
							<Link
								key={subItem.title}
								href={subItem.url}
								prefetch
								className="group flex items-center gap-3 py-3 text-sm font-bold text-muted-foreground transition-all hover:text-primary"
							>
								{subItem.icon && (
									<div className="size-4 transition-transform group-hover:scale-110">
										{subItem.icon}
									</div>
								)}
								{subItem.title}
							</Link>
						))}
					</div>
				</AccordionContent>
			</AccordionItem>
		);
	}

	return (
		<Link
			key={item.title}
			href={item.url}
			prefetch
			className="flex items-center gap-3 py-4 text-base font-black tracking-tighter uppercase transition-all hover:text-primary"
		>
			{item.icon && (
				<div className="text-primary opacity-70">{item.icon}</div>
			)}
			{item.title}
		</Link>
	);
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
	return (
		<Link
			className="flex flex-row gap-4 rounded-3xl border border-transparent p-4 leading-none no-underline transition-all outline-none select-none hover:scale-[1.02] hover:border-primary/10 hover:bg-primary/5"
			href={item.url}
			prefetch
		>
			<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner transition-transform group-hover:rotate-6">
				{item.icon}
			</div>
			<div className="flex-1">
				<div className="mb-1.5 text-sm font-black tracking-tight uppercase">
					{item.title}
				</div>
				{item.description && (
					<p className="line-clamp-2 text-[11px] leading-relaxed font-medium text-muted-foreground/80">
						{item.description}
					</p>
				)}
			</div>
		</Link>
	);
};

export { GuestNavbar };
