import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Sparkles } from 'lucide-react';

export function NewsletterMini() {
	return (
		<div className="group relative mt-12 overflow-hidden rounded-3xl border border-border/50 bg-card p-8 shadow-2xl">
			{/* Decorative background elements */}
			<div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10" />
			<div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-purple-500/5 blur-3xl transition-colors group-hover:bg-purple-500/10" />

			<div className="relative z-10">
				<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/20">
					<Mail className="h-7 w-7 text-white" />
				</div>

				<div className="mb-6">
					<h4 className="mb-2 text-xl font-black tracking-tight">
						Stay Updated!
					</h4>
					<p className="text-xs leading-relaxed font-medium text-muted-foreground">
						Get the latest tech insights delivered directly to your
						inbox weekly.
					</p>
				</div>

				<div className="space-y-3">
					<div className="group/input relative">
						<Input
							type="email"
							placeholder="your@email.com"
							className="h-12 rounded-xl border-none bg-secondary/50 px-4 text-xs transition-all focus:bg-background focus:ring-2 focus:ring-primary/20"
						/>
					</div>
					<Button className="h-12 w-full rounded-xl bg-slate-900 text-[10px] font-black tracking-widest text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-primary active:scale-[0.98] dark:bg-white dark:text-slate-900 dark:hover:bg-primary dark:hover:text-white">
						SUBSCRIBE NOW
					</Button>
				</div>

				<div className="mt-6 flex items-center gap-2 opacity-50">
					<Sparkles className="h-3 w-3 text-amber-500" />
					<p className="text-[10px] font-black tracking-[0.1em] uppercase">
						Join 5,000+ developers
					</p>
				</div>
			</div>
		</div>
	);
}
