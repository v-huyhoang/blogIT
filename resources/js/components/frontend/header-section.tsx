import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

type HeaderSectionProps = {
	content: string;
	keyword: string;
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & ComponentPropsWithoutRef<'h1'>;

export default function HeaderSection({
	content,
	keyword,
	as: Tag = 'h3',
	className,
	...props
}: HeaderSectionProps) {
	return (
		<Tag
			className={clsx(
				'text-4xl leading-[0.9] font-black tracking-tighter md:text-6xl',
				className,
			)}
			{...props}
		>
			{content}{' '}
			<span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
				{keyword}{' '}
			</span>
			.
		</Tag>
	);
}
