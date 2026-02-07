import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function BackToTop() {
	const [isVisible, setIsVisible] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const totalHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const progress = (window.scrollY / totalHeight) * 100;
			setScrollProgress(progress);
			setIsVisible(window.scrollY > 300);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div className="fixed right-6 bottom-6 z-50">
			<button
				onClick={scrollToTop}
				className={cn(
					'group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white p-0 shadow-2xl transition-all duration-500 hover:cursor-pointer dark:bg-slate-900',
					isVisible
						? 'translate-y-0 scale-100 opacity-100'
						: 'pointer-events-none translate-y-10 scale-50 opacity-0',
				)}
				aria-label="Back to top"
			>
				{/* Progress Ring */}
				<svg className="absolute inset-0 h-full w-full -rotate-90">
					<circle
						cx="20"
						cy="20"
						r="18"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						className="text-primary/10"
					/>
					<circle
						cx="20"
						cy="20"
						r="18"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeDasharray="113.1"
						strokeDashoffset={
							113.1 - (113.1 * scrollProgress) / 100
						}
						className="text-primary transition-all duration-100"
					/>
				</svg>

				<ArrowUp className="relative z-10 h-4 w-4 text-foreground transition-transform duration-300 group-hover:-translate-y-1" />

				<div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/5 to-purple-600/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
			</button>
		</div>
	);
}
