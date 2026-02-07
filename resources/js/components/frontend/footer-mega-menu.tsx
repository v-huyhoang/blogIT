import { Link } from '@inertiajs/react';
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import AppLogo from '../app-logo';

export function FooterMegaMenu() {
	return (
		<footer
			className="relative overflow-hidden bg-slate-950 py-24 transition-colors duration-500"
			aria-labelledby="footer-heading"
		>
			<h2 id="footer-heading" className="sr-only">
				Footer
			</h2>

			{/* Lighting Effect / Modern Gradient */}
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute top-0 left-1/2 h-px w-full max-w-7xl -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
				<div className="absolute top-0 left-1/2 h-[400px] w-full max-w-5xl -translate-x-1/2 bg-primary/10 blur-[120px]"></div>

				{/* Artistic Grain/Noise Overlay */}
				<div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] mix-blend-overlay"></div>
			</div>

			<div className="relative z-10 container mx-auto px-6 text-white lg:px-8">
				<div className="flex flex-col gap-16 lg:flex-row lg:justify-between">
					{/* Brand Section */}
					<div className="max-w-xs space-y-8">
						<AppLogo
							className="text-white"
							textClassName="text-white"
						/>
						<p className="text-sm leading-relaxed font-medium text-slate-400">
							Architecting the future of technical storytelling.
							We preserve engineering wisdom through deep
							technical journeys and shared experiences.
						</p>
						<div className="flex gap-4">
							{[Twitter, Github, Linkedin, Instagram].map(
								(Icon, i) => (
									<a
										key={i}
										href="#"
										className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-slate-400 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-primary hover:text-white hover:shadow-primary/20"
									>
										<Icon className="h-4 w-4" />
									</a>
								),
							)}
						</div>
					</div>

					{/* Links Grid */}
					<div className="grid grid-cols-2 gap-x-12 gap-y-12 sm:grid-cols-3 md:gap-x-20">
						<div className="space-y-6">
							<h3 className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">
								Explore
							</h3>
							<ul role="list" className="space-y-4">
								{[
									{
										name: 'Latest Articles',
										href: '/f/blog',
									},
									{
										name: 'Featured Stories',
										href: '/f/blog?featured=1',
									},
									{
										name: 'Code Snippets',
										href: '/f/snippets',
									},
									{
										name: 'Tech Roadmaps',
										href: '/f/roadmaps',
									},
								].map((item) => (
									<li key={item.name}>
										<Link
											href={item.href}
											className="text-xs font-bold text-slate-400 transition-colors hover:text-primary"
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div className="space-y-6">
							<h3 className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">
								Community
							</h3>
							<ul role="list" className="space-y-4">
								{[
									{
										name: 'Top Authors',
										href: '/f/author/alex-johnson',
									},
									{
										name: 'Categories',
										href: '/f/categories',
									},
									{ name: 'Topics & Tags', href: '/f/tags' },
									{ name: 'VIP Circle', href: '/f/user/vip' },
								].map((item) => (
									<li key={item.name}>
										<Link
											href={item.href}
											className="text-xs font-bold text-slate-400 transition-colors hover:text-primary"
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div className="space-y-6">
							<h3 className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">
								Resources
							</h3>
							<ul role="list" className="space-y-4">
								{[
									{ name: 'Documentation', href: '/f/docs' },
									{
										name: 'API Explorer',
										href: '/f/api-docs',
									},
									{ name: 'OSS Projects', href: '/f/oss' },
									{
										name: 'System Status',
										href: '/f/status',
									},
								].map((item) => (
									<li key={item.name}>
										<Link
											href={item.href}
											className="text-xs font-bold text-slate-400 transition-colors hover:text-primary"
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-10 md:flex-row">
					<p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
						&copy; 2026 BlogIT Inc. All rights reserved | Version
						1.0 | Powered by{' '}
						<span className="text-primary">5 dragon princess</span>
					</p>
					<div className="flex gap-8">
						<a
							href="#"
							className="text-[9px] font-black tracking-widest text-slate-500 uppercase transition-colors hover:text-primary"
						>
							Privacy Policy
						</a>
						<a
							href="#"
							className="text-[9px] font-black tracking-widest text-slate-500 uppercase transition-colors hover:text-primary"
						>
							Terms of Service
						</a>
						<a
							href="#"
							className="text-[9px] font-black tracking-widest text-slate-500 uppercase transition-colors hover:text-primary"
						>
							Cookies
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
