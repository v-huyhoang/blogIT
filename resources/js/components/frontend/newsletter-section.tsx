import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Sparkles } from 'lucide-react';

export function NewsletterSection() {
	return (
		<div className="relative isolate px-6 py-12 sm:py-24">
			{/* Soft Background Glows */}
			<div
				className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden blur-3xl"
				aria-hidden="true"
			>
				<div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6a78f7] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
			</div>

			<div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-1 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] backdrop-blur-2xl dark:border-slate-800/40 dark:bg-slate-900/60">
				<div className="relative flex flex-col items-center gap-8 px-8 py-10 text-center sm:px-16 sm:py-14 lg:flex-row lg:text-left">
					{/* Cute Icon Cluster */}
					<div className="relative flex-shrink-0">
						<div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-purple-600 shadow-xl shadow-primary/20">
							<Mail className="h-10 w-10 animate-bounce text-white" />
						</div>
						<div className="absolute -top-2 -right-2 flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-amber-400 shadow-lg">
							<Sparkles className="h-4 w-4 text-white" />
						</div>
					</div>

					<div className="flex-1">
						<h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
							Stay in the{' '}
							<span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
								Loop!
							</span>
						</h2>
						<p className="mt-2 text-lg font-medium text-slate-600 dark:text-slate-400">
							Weekly code secrets & design treats.
						</p>

						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<div className="group relative flex-1">
								<Input
									type="email"
									placeholder="hello@world.com"
									className="h-14 rounded-xl border-none bg-white/80 px-6 text-base shadow-inner ring-1 ring-slate-200 focus:ring-2 focus:ring-primary/50 dark:bg-slate-800/80 dark:ring-slate-700"
								/>
							</div>
							<Button className="h-14 rounded-xl bg-slate-900 px-10 text-base font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-primary active:scale-95 dark:bg-white dark:text-slate-900 dark:hover:bg-primary dark:hover:text-white">
								Join Now!
							</Button>
						</div>

						<p className="mt-4 text-[10px] font-black tracking-widest text-slate-400 uppercase">
							No spam. Just pure{' '}
							<span className="text-primary">vibes</span>.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
