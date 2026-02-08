import AppLogoIcon from '@/components/app-logo-icon';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ChevronDown, Globe } from 'lucide-react';
import { type PropsWithChildren } from 'react';

const languages = [
	{ code: 'en', label: 'English', flag: '🇺🇸' },
	{ code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
];

export default function AuthCardLayout({
	children,
	title,
	description,
}: PropsWithChildren<{
	name?: string;
	title?: string;
	description?: string;
}>) {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
			<div className="flex w-full max-w-md flex-col gap-6">
				<Link
					href={home()}
					className="flex items-center gap-2 self-center font-medium"
				>
					<div className="flex h-9 w-9 items-center justify-center">
						<AppLogoIcon className="size-9 fill-current text-black dark:text-white" />
					</div>
				</Link>

				<div className="flex flex-col gap-6">
					<Card className="rounded-xl">
						<CardHeader className="px-10 pt-8 pb-0 text-center">
							<CardTitle className="text-xl">{title}</CardTitle>
							<CardDescription>{description}</CardDescription>
						</CardHeader>
						<CardContent className="px-10 py-8">
							{children}
						</CardContent>
					</Card>

					<div className="flex items-center justify-between px-2 text-xs font-medium text-muted-foreground">
						<Link
							href={home()}
							className="flex items-center gap-2 transition-colors hover:text-primary"
						>
							<ArrowLeft className="h-3 w-3" />
							Back to Homepage
						</Link>

						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-2 transition-colors outline-none hover:text-primary">
								<Globe className="h-3 w-3" />
								<span>Select Language</span>
								<ChevronDown className="h-3 w-3 opacity-50" />
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="w-40 rounded-xl"
							>
								{languages.map((lang) => (
									<DropdownMenuItem
										key={lang.code}
										className="cursor-pointer rounded-lg"
									>
										<span className="mr-2 text-base">
											{lang.flag}
										</span>
										<span className="text-xs font-bold">
											{lang.label}
										</span>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</div>
	);
}
