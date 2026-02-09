import { PageHeader } from '@/components/frontend/page-header';
import { Button } from '@/components/ui/button';
import GuestLayout from '@/layouts/frontend/guest-layout';
import { Head } from '@inertiajs/react';
import { Code2, Copy, Search } from 'lucide-react';

const snippets = [
	{
		title: 'Laravel Middleware for RBAC',
		lang: 'PHP',
		code: `public function handle(Request $request, Closure $next, ...$permissions)\n{\n    if (!$request->user()->hasAnyPermission($permissions)) {\n        abort(403);\n    }\n    return $next($request);\n}`,
		tags: ['Laravel', 'Security'],
	},
	{
		title: 'React Hook for Scroll Position',
		lang: 'TypeScript',
		code: `const useScroll = () => {\n  const [pos, setPos] = useState(0);\n  useEffect(() => {\n    const handle = () => setPos(window.scrollY);\n    window.addEventListener("scroll", handle);\n    return () => window.removeEventListener("scroll", handle);\n  }, []);\n  return pos;\n};`,
		tags: ['React', 'Hooks'],
	},
];

export default function SnippetsIndex() {
	return (
		<GuestLayout>
			<Head title="Code Snippets - BlogIT" />

			<PageHeader
				heading="Code"
				highlight="Snippets"
				description="A curated library of production-ready code snippets for your next project. Ready to copy and paste."
				badge="Dev Utilities"
			>
				<div className="relative w-full max-w-sm">
					<Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<input
						className="h-14 w-full rounded-2xl border border-border/50 bg-background pr-4 pl-12 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20"
						placeholder="Search snippets..."
					/>
				</div>
			</PageHeader>

			<div className="container mx-auto px-6 py-24">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					{snippets.map((s, i) => (
						<div
							key={i}
							className="group flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-slate-900 shadow-2xl"
						>
							<div className="flex items-center justify-between border-b border-white/5 bg-slate-900/50 p-6 backdrop-blur-md">
								<div className="flex items-center gap-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
										<Code2 className="h-5 w-5 text-primary" />
									</div>
									<div>
										<h3 className="mb-1 leading-none font-bold text-white">
											{s.title}
										</h3>
										<span className="text-[10px] font-black tracking-widest text-primary uppercase">
											{s.lang}
										</span>
									</div>
								</div>
								<Button
									variant="ghost"
									size="icon"
									className="rounded-xl text-white/40 hover:text-white"
								>
									<Copy className="h-4 w-4" />
								</Button>
							</div>
							<div className="flex-1 overflow-x-auto p-8">
								<pre className="font-mono text-sm leading-relaxed text-slate-300">
									<code>{s.code}</code>
								</pre>
							</div>
							<div className="flex gap-2 bg-white/5 px-8 py-4">
								{s.tags.map((t) => (
									<span
										key={t}
										className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-black tracking-widest text-white/40 uppercase"
									>
										{t}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</GuestLayout>
	);
}
