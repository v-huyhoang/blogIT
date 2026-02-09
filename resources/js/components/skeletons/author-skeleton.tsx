import { Skeleton } from '@/components/ui/skeleton';

export function TopAuthorsSkeleton() {
	return (
		<section className="bg-secondary/10 py-24">
			<div className="container mx-auto px-6">
				<div className="mb-16 flex flex-col items-center gap-2 text-center">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-10 w-64" />
				</div>
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{[1, 2, 3, 4].map((i) => (
						<div
							key={i}
							className="flex flex-col items-center rounded-3xl border border-border/50 bg-card p-8 text-center"
						>
							<Skeleton className="mx-auto mb-6 h-24 w-24 rounded-full" />
							<Skeleton className="mb-2 h-6 w-32" />
							<Skeleton className="mb-6 h-3 w-20" />

							<div className="mb-8 flex w-full justify-center gap-6">
								<div className="flex flex-col items-center gap-1">
									<Skeleton className="h-5 w-8" />
									<Skeleton className="h-2 w-12" />
								</div>
								<div className="flex flex-col items-center gap-1">
									<Skeleton className="h-5 w-8" />
									<Skeleton className="h-2 w-12" />
								</div>
							</div>

							<Skeleton className="h-12 w-full rounded-3xl" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
