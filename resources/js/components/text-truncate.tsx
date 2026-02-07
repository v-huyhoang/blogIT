import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';

export default function TruncatedText({ text }: { text: string }) {
	return (
		<HoverCard openDelay={200}>
			<HoverCardTrigger asChild>
				<p className="line-clamp-2 w-full cursor-help overflow-hidden text-sm break-words text-muted-foreground">
					{text}
				</p>
			</HoverCardTrigger>

			<HoverCardContent className="w-[400px] text-sm leading-relaxed break-words">
				{text}
			</HoverCardContent>
		</HoverCard>
	);
}
