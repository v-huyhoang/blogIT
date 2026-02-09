import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import articlesRoute from '@/routes/articles';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bookmark, Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface PostCardProps {
	// ... existing props
	title: string;
	slug: string;
	excerpt?: string | null;
	category: string;
	user?: {
		id: number;
		name: string;
		avatar: string;
	};
	date: string;
	readTime?: string;
	imageUrl?: string;
	likes?: number;
	comments?: number;
	featured?: boolean;
	className?: string;
}

export function PostCard({
	title,
	slug,
	excerpt,
	category,
	user,
	date,
	readTime,
	imageUrl,
	likes = 0,
	comments = 0,
	featured,
	className,
}: PostCardProps) {
	const [isLiked, setIsLiked] = useState(false);
	const [isWishlisted, setIsWishlisted] = useState(false);
	const [likeCount, setLikeCount] = useState(likes);
	const [showWishlistEffect, setShowWishlistEffect] = useState(false);
	const [showLikeEffect, setShowLikeEffect] = useState(false);

	const handleLike = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		const newStatus = !isLiked;
		setIsLiked(newStatus);
		setLikeCount(newStatus ? likeCount + 1 : likeCount - 1);

		if (newStatus) {
			setShowLikeEffect(true);
			setTimeout(() => setShowLikeEffect(false), 1000);
			toast.success('Post liked', {
				description: title,
				icon: <Heart className="h-4 w-4 fill-current text-red-500" />,
			});
		} else {
			toast.info('Removed from liked posts');
		}
	};

	const handleWishlist = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		const newStatus = !isWishlisted;
		setIsWishlisted(newStatus);

		if (newStatus) {
			setShowWishlistEffect(true);
			setTimeout(() => setShowWishlistEffect(false), 1000);
			toast.success('Added to wishlist', {
				description: title,
				icon: <Bookmark className="h-4 w-4 fill-current" />,
			});
		} else {
			toast.info('Removed from wishlist');
		}
	};

	return (
		<div
			className={cn(
				'group relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md transition-all duration-700 hover:bg-card hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)]',
				featured
					? 'p-6 md:col-span-2 md:grid md:grid-cols-2 md:items-center md:gap-8'
					: 'flex flex-col',
				className,
			)}
		>
			<div
				className={cn(
					'relative overflow-hidden rounded-3xl',
					featured ? 'h-[500px]' : 'h-[300px]',
				)}
			>
				<img
					src={
						imageUrl ??
						'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop'
					}
					alt={title}
					className="h-full w-full object-cover grayscale-[20%] transition-transform duration-[1.5s] ease-out group-hover:scale-105 group-hover:grayscale-0"
					loading="lazy"
				/>
				<div className="absolute inset-0 z-20 flex items-end justify-between bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
					<div className="relative">
						<AnimatePresence>
							{showLikeEffect && (
								<motion.div
									initial={{ scale: 0.5, opacity: 1 }}
									animate={{ scale: 2, opacity: 0 }}
									exit={{ opacity: 0 }}
									className="absolute inset-0 z-0 flex items-center justify-center text-red-500"
								>
									<Heart className="h-full w-full fill-current" />
								</motion.div>
							)}
						</AnimatePresence>
						<motion.div
							whileTap={{ scale: 0.8 }}
							whileHover={{ scale: 1.05 }}
						>
							<Button
								onClick={handleLike}
								variant="ghost"
								size="sm"
								className={cn(
									'relative z-10 h-10 gap-2 rounded-full border border-white/10 bg-white/20 px-6 font-bold text-white backdrop-blur-xl transition-all hover:cursor-pointer hover:bg-white hover:text-red-500',
									isLiked &&
										'border-white bg-white text-red-500',
								)}
							>
								<Heart
									className={cn(
										'h-4 w-4',
										isLiked && 'fill-current',
									)}
								/>
								<span className="text-sm">{likeCount}</span>
							</Button>
						</motion.div>
					</div>

					<div className="relative">
						<AnimatePresence>
							{showWishlistEffect && (
								<motion.div
									initial={{ scale: 0.5, opacity: 1 }}
									animate={{ scale: 2, opacity: 0 }}
									exit={{ opacity: 0 }}
									className="absolute inset-0 z-0 flex items-center justify-center text-yellow-500"
								>
									<Bookmark className="h-full w-full fill-current" />
								</motion.div>
							)}
						</AnimatePresence>
						<motion.div
							whileTap={{ scale: 0.8 }}
							whileHover={{ scale: 1.1 }}
						>
							<Button
								onClick={handleWishlist}
								variant="ghost"
								size="icon"
								className={cn(
									'relative z-10 h-10 w-10 rounded-full border border-white/10 bg-white/20 font-bold text-white backdrop-blur-xl transition-all hover:cursor-pointer hover:bg-white hover:text-yellow-500',
									isWishlisted &&
										'border-white bg-white text-yellow-500',
								)}
							>
								<Bookmark
									className={cn(
										'h-4 w-4',
										isWishlisted && 'fill-current',
									)}
								/>
							</Button>
						</motion.div>
					</div>
				</div>
			</div>

			<div
				className={cn('flex flex-col px-6 py-6', featured && 'md:p-2')}
			>
				<div className="mb-4 flex items-center justify-between">
					<Badge
						variant="secondary"
						className="rounded-full border-none bg-primary/10 px-4 py-1.5 text-[10px] font-black tracking-widest text-primary uppercase hover:bg-primary/20"
					>
						{category}
					</Badge>
					<div className="flex items-center gap-4 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
						<span className="flex items-center gap-2 transition-colors group-hover:text-primary">
							<Heart className="h-3 w-3" /> {likeCount}
						</span>
						<span className="flex items-center gap-2">
							<MessageCircle className="h-3 w-3" /> {comments}
						</span>
					</div>
				</div>

				<h3
					className={cn(
						'mb-4 leading-tight font-black tracking-tight text-foreground transition-colors duration-500 group-hover:text-primary',
						featured ? 'text-4xl md:text-5xl' : 'text-2xl',
					)}
				>
					<Link
						href={slug ? articlesRoute.show.url(slug) : '#'}
						prefetch
					>
						<span className="absolute inset-0" />
						{title}
					</Link>
				</h3>

				<p className="mb-6 line-clamp-2 text-base leading-relaxed font-medium text-muted-foreground">
					{excerpt}
				</p>

				<div className="mt-auto flex items-center gap-4 border-t border-border/50 pt-6">
					<div className="h-10 w-10 overflow-hidden rounded-xl bg-secondary p-0.5 shadow-lg ring-2 ring-primary/5">
						<img
							src={
								user?.avatar ||
								`https://i.pravatar.cc/100?u=${user?.name}`
							}
							alt={user?.name}
							className="h-full w-full rounded-lg object-cover"
						/>
					</div>
					<div className="flex-1">
						<Link
							href="/f/author/alex-johnson"
							prefetch
							className="mb-1 block text-xs leading-none font-bold tracking-widest text-foreground uppercase transition-colors hover:text-primary"
						>
							{user?.name}
						</Link>
						<p className="flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
							{date}{' '}
							<span className="h-1 w-1 animate-pulse rounded-full bg-primary"></span>{' '}
							{readTime || '5 min read'}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
