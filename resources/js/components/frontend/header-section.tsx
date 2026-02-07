import clsx from 'clsx';

interface HeaderSectionProps {
	title?: string;
	content: string;
	keyword: string;
	as?: 'h1' | 'h2' | 'h3';
	className?: string;
}

export default function HeaderSection({
	title,
	content,
	keyword,
	as: Tag = 'h3',
	className,
}: HeaderSectionProps) {
	return (
		<>
			{title && (
				<h2 className="mb-4 text-sm font-black tracking-[0.3em] text-primary uppercase">
					{title}
				</h2>
			)}
			<Tag
				className={clsx(
					'text-4xl leading-[0.9] font-black tracking-tighter md:text-6xl',
					className,
				)}
			>
				{content}{' '}
				<span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
					{keyword}{' '}
				</span>
				.
			</Tag>
		</>
	);
}
