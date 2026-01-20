import { FilterSection } from '@/components/filter-section';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { PostFilters } from '@/types/post';
import { User } from 'lucide-react';

const ALL = '__all__';

export function AuthorSection({
	filters,
	apply,
	users,
}: {
	filters: PostFilters;
	apply: (v: Partial<PostFilters>) => void;
	users: { id: number; name: string }[];
}) {
	return (
		<FilterSection title="Author" icon={<User className="size-4 text-primary" />}>
			<Select
				value={filters.user_id?.toString() ?? ALL}
				onValueChange={(v) =>
					apply({
						user_id: v === ALL ? null : Number(v),
					})
				}
			>
				<SelectTrigger className="h-9">
					<SelectValue placeholder="All authors" />
				</SelectTrigger>

				<SelectContent>
					<SelectItem value={ALL} className="hover:cursor-pointer">
						All Authors
					</SelectItem>
					{users.map((user) => (
						<SelectItem
							key={user.id}
							value={String(user.id)}
							className="hover:cursor-pointer"
						>
							{user.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</FilterSection>
	);
}
