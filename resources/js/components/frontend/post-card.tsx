import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface PostCardProps {
	title: string;
	excerpt: string;
	category: string;
	author: string;
	date: string;
	readTime: string;
	imageUrl: string;
	likes?: number;
	comments?: number;
	featured?: boolean;
	className?: string;
}

export function PostCard({
	title,
	excerpt,
	category,
	author,
	date,
	readTime,
	imageUrl,
	likes = 0,
	comments = 0,
	featured,
	className,
}: PostCardProps) {
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(likes);

	const handleLike = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsLiked(!isLiked);
		setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
	};

	return (
		<div
			className={cn(
				'group relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md transition-all duration-700 hover:-translate-y-2 hover:bg-card hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)]',
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
					src={imageUrl}
					alt={title}
					className="h-full w-full object-cover grayscale-[20%] transition-transform duration-[1.5s] ease-out group-hover:scale-110 group-hover:grayscale-0"
					loading="lazy"
				/>
				<div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
					<Button
						onClick={handleLike}
						variant="ghost"
						size="sm"
						className={cn(
							'h-10 gap-2 rounded-full border border-white/10 bg-white/20 px-6 font-bold text-white backdrop-blur-xl transition-all hover:bg-white hover:text-primary',
							isLiked && 'border-white bg-white text-red-500',
						)}
					>
						<Heart
							className={cn('h-4 w-4', isLiked && 'fill-current')}
						/>
						<span className="text-sm">{likeCount}</span>
					</Button>
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
					<Link href="/f/blog/show" prefetch>
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
							src={`https://i.pravatar.cc/100?u=${author}`}
							alt={author}
							className="h-full w-full rounded-lg object-cover"
						/>
					</div>
					<div className="flex-1">
						<Link
							href="/f/author/alex-johnson"
							prefetch
							className="mb-1 block text-xs leading-none font-bold tracking-widest text-foreground uppercase transition-colors hover:text-primary"
						>
							{author}
						</Link>
						<p className="flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
							{date}{' '}
							<span className="h-1 w-1 animate-pulse rounded-full bg-primary"></span>{' '}
							{readTime}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
