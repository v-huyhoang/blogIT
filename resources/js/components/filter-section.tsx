import React from 'react';

export function FilterSection({
	title,
	icon,
	children,
}: {
	title: string;
	icon?: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<div className="space-y-3 pb-2 last:pb-0">
			<div className="flex items-center gap-2 text-[13px] font-semibold text-foreground/80">
				{icon}
				{title}
			</div>
			<div className="grid gap-2">{children}</div>
		</div>
	);
}
