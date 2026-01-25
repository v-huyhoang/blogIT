import { SelectFilter } from '@/components/select-filter';
import { PostFilters } from '@/types';
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
		<SelectFilter
			title="Author"
			icon={<User className="size-4 text-primary" />}
			value={filters.user_id?.toString() ?? ALL}
			onValueChange={(v) =>
				apply({
					user_id: v === ALL ? null : Number(v),
				})
			}
			options={[
				{ label: 'All Authors', value: ALL },
				...users.map((user) => ({
					label: user.name,
					value: String(user.id),
				})),
			]}
			placeholder="All authors"
		/>
	);
}
