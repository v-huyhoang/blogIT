import { Skeleton } from '@/components/ui/skeleton';

export function BentoGridSkeleton() {
	return (
		<section className="py-24">
			<div className="container mx-auto px-6">
				<div className="mb-16 flex flex-col gap-4">
					<Skeleton className="h-4 w-32" />
					<div className="flex items-center justify-between">
						<Skeleton className="h-10 w-64" />
						<Skeleton className="h-4 w-48" />
					</div>
				</div>

				<div className="grid auto-rows-[250px] grid-cols-1 gap-6 md:grid-cols-4">
					<Skeleton className="h-[524px] rounded-3xl md:col-span-2 md:row-span-2" />
					<Skeleton className="h-[250px] rounded-3xl" />
					<Skeleton className="h-[250px] rounded-3xl" />
					<Skeleton className="h-[250px] rounded-3xl md:col-span-2" />
				</div>
			</div>
		</section>
	);
}
