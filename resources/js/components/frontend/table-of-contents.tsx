import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface TocItem {
	id: string;
	text: string;
	level: number;
}

export function TableOfContents({ content }: { content?: string }) {
	const [toc, setToc] = useState<TocItem[]>([]);
	const [activeId, setActiveId] = useState('');

	useEffect(() => {
		const contentArea = document.getElementById('article-content');
		if (!contentArea) return;

		const generateToc = () => {
			const headings = Array.from(contentArea.querySelectorAll('h2, h3'))
				.map((heading) => {
					// Lexical headings might not have IDs by default
					const id =
						heading.id ||
						heading.textContent
							?.toLowerCase()
							.replace(/\s+/g, '-') ||
						'';

					if (!heading.id && id) {
						heading.id = id;
					}

					return {
						id,
						text: heading.textContent || '',
						level: parseInt(heading.tagName.replace('H', '')),
					};
				})
				.filter((item) => item.id);

			setToc(headings);

			// Re-observe after generation
			headings.forEach((item) => {
				const el = document.getElementById(item.id);
				if (el) observer.observe(el);
			});
		};

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

		// Initial generation
		generateToc();

		// Since Lexical renders dynamically, we might need a MutationObserver
		const mutationObserver = new MutationObserver(() => {
			generateToc();
		});

		mutationObserver.observe(contentArea, {
			childList: true,
			subtree: true,
		});

		return () => {
			observer.disconnect();
			mutationObserver.disconnect();
		};
	}, [content]);

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
								const el = document.getElementById(item.id);
								if (el) {
									const offset = 100; // Adjust for sticky header
									const bodyRect =
										document.body.getBoundingClientRect()
											.top;
									const elementRect =
										el.getBoundingClientRect().top;
									const elementPosition =
										elementRect - bodyRect;
									const offsetPosition =
										elementPosition - offset;

									window.scrollTo({
										top: offsetPosition,
										behavior: 'smooth',
									});
								}
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
