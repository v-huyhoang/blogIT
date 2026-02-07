import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface TocItem {
	id: string;
	text: string;
	level: number;
}

export function TableOfContents() {
	const [toc, setToc] = useState<TocItem[]>([]);
	const [activeId, setActiveId] = useState('');

	useEffect(() => {
		// Only target headings inside the article content container
		const contentArea = document.getElementById('article-content');
		if (!contentArea) return;

		const headings = Array.from(contentArea.querySelectorAll('h2, h3'))
			.map((heading) => ({
				id:
					heading.id ||
					heading.textContent?.toLowerCase().replace(/\s+/g, '-') ||
					'',
				text: heading.textContent || '',
				level: parseInt(heading.tagName.replace('H', '')),
			}))
			.filter((item) => item.id);

		setToc(headings);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{ rootMargin: '-100px 0% -80% 0%' },
		);

		contentArea
			.querySelectorAll('h2, h3')
			.forEach((heading) => observer.observe(heading));

		return () => observer.disconnect();
	}, []);

	if (toc.length === 0) return null;

	return (
		<nav className="space-y-6">
			<div className="mb-8 flex items-center gap-3">
				<div className="h-px w-8 bg-primary"></div>
				<h4 className="text-[10px] font-black tracking-[0.3em] text-foreground/40 uppercase">
					On this page
				</h4>
			</div>
			<ul className="space-y-4">
				{toc.map((item) => (
					<li
						key={item.id}
						className={cn(
							'transition-all duration-500',
							item.level === 3 ? 'ml-4' : '',
						)}
					>
						<a
							href={`#${item.id}`}
							className={cn(
								'block border-l-2 py-1 pl-4 text-sm transition-all duration-300',
								activeId === item.id
									? 'translate-x-1 border-primary font-black text-primary'
									: 'border-transparent font-medium text-muted-foreground hover:border-border hover:text-foreground',
							)}
							onClick={(e) => {
								e.preventDefault();
								document
									.getElementById(item.id)
									?.scrollIntoView({ behavior: 'smooth' });
							}}
						>
							{item.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
