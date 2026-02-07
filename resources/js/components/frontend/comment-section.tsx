import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { Textarea } from '@/components/ui/textarea';
import { login, register } from '@/routes';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Heart, MessageSquare, Reply } from 'lucide-react';
import { useState } from 'react';

interface Comment {
	id: number;
	author: string;
	avatar: string;
	date: string;
	content: string;
	likes: number;
	replies?: Comment[];
}

const mockComments: Comment[] = [
	{
		id: 1,
		author: 'John Doe',
		avatar: 'https://i.pravatar.cc/150?u=1',
		date: '2 hours ago',
		content:
			'Great article! Very informative and well-written. I especially liked the part about glassmorphism.',
		likes: 12,
		replies: [
			{
				id: 2,
				author: 'Sarah Smith',
				avatar: 'https://i.pravatar.cc/150?u=2',
				date: '1 hour ago',
				content:
					'I agree! The implementation details were very helpful.',
				likes: 5,
			},
		],
	},
	{
		id: 3,
		author: 'Mike Ross',
		avatar: 'https://i.pravatar.cc/150?u=3',
		date: '5 hours ago',
		content: 'Could you provide more examples of the space tour preview?',
		likes: 8,
	},
];

export function CommentSection() {
	const { auth } = usePage<SharedData>().props;

	return (
		<section className="mt-16 border-t border-border pt-16">
			<div className="mb-8 flex items-center gap-2">
				<MessageSquare className="h-6 w-6 text-primary" />
				<h2 className="text-2xl font-bold">
					Comments ({mockComments.length + 1})
				</h2>
			</div>

			{auth.user ? (
				<div className="mb-12">
					<h3 className="mb-4 text-lg font-semibold">
						Leave a comment
					</h3>
					<div className="flex gap-4">
						<Avatar className="h-10 w-10">
							<AvatarImage src={auth.user.avatar || ''} />
							<AvatarFallback>
								{auth.user.name.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1 space-y-4">
							<Textarea
								placeholder="Write your thoughts..."
								className="min-h-[100px] rounded-xl"
							/>
							<Button className="rounded-full px-8">
								Post Comment
							</Button>
						</div>
					</div>
				</div>
			) : (
				<div className="mb-12 rounded-2xl border border-dashed border-primary/20 bg-secondary/30 p-8 text-center">
					<p className="mb-4 text-muted-foreground">
						Please log in to participate in the discussion.
					</p>
					<div className="flex justify-center gap-4">
						<Button
							asChild
							variant="outline"
							className="rounded-full"
						>
							<Link href={login.url()}>Login</Link>
						</Button>
						<Button asChild className="rounded-full">
							<Link href={register.url()}>Sign Up</Link>
						</Button>
					</div>
				</div>
			)}

			<div className="space-y-8">
				{mockComments.map((comment) => (
					<CommentItem key={comment.id} comment={comment} />
				))}
			</div>

			{/* Pagination UI */}
			<div className="mt-16 border-t border-border pt-8">
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="#" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#" isActive>
								1
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">2</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="#" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</section>
	);
}

function CommentItem({ comment }: { comment: Comment }) {
	const [liked, setLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(comment.likes);

	const toggleLike = () => {
		if (liked) {
			setLiked(false);
			setLikeCount(likeCount - 1);
		} else {
			setLiked(true);
			setLikeCount(likeCount + 1);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex gap-4">
				<Avatar className="h-10 w-10">
					<AvatarImage src={comment.avatar} />
					<AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<div className="mb-1 flex items-center justify-between">
						<h4 className="font-bold">{comment.author}</h4>
						<span className="text-xs text-muted-foreground">
							{comment.date}
						</span>
					</div>
					<p className="mb-3 text-sm leading-relaxed text-muted-foreground">
						{comment.content}
					</p>
					<div className="flex items-center gap-6">
						<button
							onClick={toggleLike}
							className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
								liked
									? 'text-red-500'
									: 'text-muted-foreground hover:text-red-500'
							}`}
						>
							<Heart
								className={`h-3.5 w-3.5 ${liked ? 'fill-current' : ''}`}
							/>
							{likeCount}
						</button>
						<button className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary hover:underline">
							<Reply className="h-3.5 w-3.5" /> Reply
						</button>
					</div>
				</div>
			</div>

			{comment.replies && comment.replies.length > 0 && (
				<div className="ml-12 space-y-6 border-l border-border pl-6">
					{comment.replies.map((reply) => (
						<CommentItem key={reply.id} comment={reply} />
					))}
				</div>
			)}
		</div>
	);
}
