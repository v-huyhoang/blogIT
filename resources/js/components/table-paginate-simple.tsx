import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export type PaginationLink = {
	url: string | null;
	label: string;
	active: boolean;
};

type Props = {
	links?: PaginationLink[];
	className?: string;
	preserveState?: boolean;
	preserveScroll?: boolean;
	replace?: boolean;
	buttonClassName?: string;
};

export function TablePaginationLinks({
	links,
	className,
	preserveState = true,
	preserveScroll = true,
	replace = false,
	buttonClassName = 'hover:cursor-pointer hover:bg-gray-900 hover:text-gray-50',
}: Props) {
	if (!links?.length) return null;

	return (
		<div
			className={['flex items-center justify-end', className]
				.filter(Boolean)
				.join(' ')}
		>
			<div className="flex flex-wrap gap-1">
				{links.map((link, i) => {
					if (!link.url) {
						return (
							<Button
								key={i}
								className={buttonClassName}
								variant={link.active ? 'default' : 'secondary'}
								size="sm"
								disabled
							>
								<span
									dangerouslySetInnerHTML={{
										__html: link.label,
									}}
								/>
							</Button>
						);
					}

					return (
						<Button
							key={i}
							asChild
							className={buttonClassName}
							variant={link.active ? 'default' : 'secondary'}
							size="sm"
						>
							<Link
								href={link.url}
								preserveState={preserveState}
								preserveScroll={preserveScroll}
								replace={replace}
								prefetch
							>
								<span
									dangerouslySetInnerHTML={{
										__html: link.label,
									}}
								/>
							</Link>
						</Button>
					);
				})}
			</div>
		</div>
	);
}
