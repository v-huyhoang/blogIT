import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import HeaderSection from './header-section';

const topAuthors = [
	{
		name: 'Alex Johnson',
		role: 'Senior Architect',
		articles: 84,
		followers: '12k',
		avatar: 'https://i.pravatar.cc/150?u=9',
	},
	{
		name: 'Sarah Lee',
		role: 'Frontend Lead',
		articles: 56,
		followers: '8k',
		avatar: 'https://i.pravatar.cc/150?u=2',
	},
	{
		name: 'David Kim',
		role: 'Backend Expert',
		articles: 42,
		followers: '5k',
		avatar: 'https://i.pravatar.cc/150?u=3',
	},
	{
		name: 'Emily Chen',
		role: 'UX Designer',
		articles: 38,
		followers: '4.2k',
		avatar: 'https://i.pravatar.cc/150?u=4',
	},
];

export function TopAuthorsSection() {
	return (
		<section className="bg-secondary/10 py-24">
			<div className="container mx-auto px-6">
				<div className="mb-16 text-center">
					<HeaderSection
						title="Masterminds"
						content="Top"
						keyword="Authors"
					/>
				</div>
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{topAuthors.map((author) => (
						<div
							key={author.name}
							className="group rounded-3xl border border-border/50 bg-card p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-primary/50"
						>
							<Avatar className="mx-auto mb-6 h-24 w-24 ring-6 ring-primary/5 transition-all group-hover:ring-primary/20">
								<AvatarImage src={author.avatar} />
								<AvatarFallback>
									{author.name.charAt(0)}
								</AvatarFallback>
							</Avatar>
							<h4 className="mb-1 text-xl font-black">
								{author.name}
							</h4>
							<p className="mb-6 text-[10px] font-black tracking-widest text-primary uppercase">
								{author.role}
							</p>
							<div className="mb-8 flex justify-center gap-6 text-[10px] font-black tracking-widest uppercase opacity-40">
								<div>
									<span className="block text-lg text-foreground">
										{author.articles}
									</span>{' '}
									Articles
								</div>
								<div>
									<span className="block text-lg text-foreground">
										{author.followers}
									</span>{' '}
									Followers
								</div>
							</div>
							<Button
								variant="outline"
								className="h-12 w-full rounded-3xl font-bold transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-white hover:cursor-pointer"
							>
								<UserPlus className="mr-2 h-4 w-4" /> Follow
							</Button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
