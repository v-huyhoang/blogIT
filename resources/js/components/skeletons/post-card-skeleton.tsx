import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function PostCardSkeleton({
	className,
	featured = false,
}: {
	className?: string;
	featured?: boolean;
}) {
	return (
		<div
			className={cn(
				'flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md',
				featured
					? 'p-6 md:col-span-2 md:grid md:grid-cols-2 md:gap-8'
					: '',
				className,
			)}
		>
			<Skeleton
				className={cn(
					'w-full rounded-3xl',
					featured ? 'h-[500px]' : 'h-[300px]',
				)}
			/>

			<div
				className={cn('flex flex-col px-6 py-6', featured && 'md:p-2')}
			>
				<div className="mb-4 flex items-center justify-between">
					<Skeleton className="h-6 w-24 rounded-full" />
					<Skeleton className="h-4 w-20" />
				</div>

				<Skeleton
					className={cn(
						'mb-4 rounded-lg',
						featured ? 'h-12 w-3/4' : 'h-8 w-full',
					)}
				/>
				{featured && (
					<Skeleton className="mb-4 h-12 w-1/2 rounded-lg" />
				)}

				<Skeleton className="mb-2 h-4 w-full" />
				<Skeleton className="mb-6 h-4 w-2/3" />

				<div className="mt-auto flex items-center gap-4 border-t border-border/50 pt-6">
					<Skeleton className="h-10 w-10 rounded-xl" />
					<div className="flex-1 space-y-2">
						<Skeleton className="h-3 w-32" />
						<Skeleton className="h-2 w-24" />
					</div>
				</div>
			</div>
		</div>
	);
}
