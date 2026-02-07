import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
	const { appearance, updateAppearance } = useAppearance();

	const isDark =
		appearance === 'dark' ||
		(appearance === 'system' &&
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-color-scheme: dark)').matches);

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
			className="h-9 w-9 rounded-full"
		>
			<Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			<Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
