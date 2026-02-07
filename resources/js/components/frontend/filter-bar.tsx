import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

export function FilterBar() {
	return (
		<div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
			<div className="relative w-full max-w-sm">
				<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					placeholder="Search articles..."
					className="rounded-full pl-10"
				/>
			</div>
			<div className="flex gap-4">
				<Select>
					<SelectTrigger className="w-[180px] rounded-full">
						<SelectValue placeholder="Category" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Categories</SelectItem>
						<SelectItem value="tech">Technology</SelectItem>
						<SelectItem value="dev">Development</SelectItem>
						<SelectItem value="design">Design</SelectItem>
					</SelectContent>
				</Select>
				<Select>
					<SelectTrigger className="w-[180px] rounded-full">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="newest">Newest First</SelectItem>
						<SelectItem value="oldest">Oldest First</SelectItem>
						<SelectItem value="popular">Most Popular</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
