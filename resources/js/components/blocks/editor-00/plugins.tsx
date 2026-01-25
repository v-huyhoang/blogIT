import { Toggle } from '@/components/ui/toggle';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';
import { Bold, Code, Italic, Strikethrough, Underline } from 'lucide-react';
import { useState } from 'react';

import { ContentEditable } from '@/components/editor/editor-ui/content-editable';

function Toolbar() {
	const [editor] = useLexicalComposerContext();

	const onClick = (format: TextFormatType) => {
		editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
	};

	return (
		<div className="flex items-center gap-1 border-b bg-muted/40 p-2">
			<Toggle
				size="sm"
				aria-label="Toggle bold"
				onPressedChange={() => onClick('bold')}
			>
				<Bold className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				aria-label="Toggle italic"
				onPressedChange={() => onClick('italic')}
			>
				<Italic className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				aria-label="Toggle underline"
				onPressedChange={() => onClick('underline')}
			>
				<Underline className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				aria-label="Toggle strikethrough"
				onPressedChange={() => onClick('strikethrough')}
			>
				<Strikethrough className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				aria-label="Toggle code"
				onPressedChange={() => onClick('code')}
			>
				<Code className="h-4 w-4" />
			</Toggle>
		</div>
	);
}

export function Plugins() {
	const [, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

	const onRef = (_floatingAnchorElem: HTMLDivElement) => {
		if (_floatingAnchorElem !== null) {
			setFloatingAnchorElem(_floatingAnchorElem);
		}
	};

	return (
		<div className="relative">
			<Toolbar />
			<div className="relative">
				<RichTextPlugin
					contentEditable={
						<div className="">
							<div className="" ref={onRef}>
								<ContentEditable
									placeholder={'Start typing ...'}
								/>
							</div>
						</div>
					}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				{/* editor plugins */}
			</div>
			{/* actions plugins */}
		</div>
	);
}
