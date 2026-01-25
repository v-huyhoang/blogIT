import { nodes } from '@/components/blocks/editor-00/nodes';
import { editorTheme } from '@/components/editor/themes/editor-theme';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable as LexicalContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

interface LexicalPreviewProps {
	content: string;
	className?: string;
}

export default function LexicalPreview({
	content,
	className,
}: LexicalPreviewProps) {
	if (!content) return null;

	// Check if content is a valid Lexical JSON string
	let isLexicalJson = false;
	try {
		const parsed = JSON.parse(content);
		if (parsed && typeof parsed === 'object' && 'root' in parsed) {
			isLexicalJson = true;
		}
	} catch (e) {
		isLexicalJson = false;
		console.error(e);
	}

	if (!isLexicalJson) {
		// If not valid Lexical JSON, it might be plain HTML or text
		return (
			<div
				className={className}
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		);
	}

	const initialConfig = {
		namespace: 'Preview',
		theme: editorTheme,
		nodes,
		editable: false,
		editorState: content,
		onError: (error: Error) => {
			console.error('Lexical Preview Error:', error);
		},
	};

	return (
		<div className={className}>
			<LexicalComposer initialConfig={initialConfig}>
				<RichTextPlugin
					contentEditable={
						<LexicalContentEditable className="focus:outline-none" />
					}
					placeholder={null}
					ErrorBoundary={LexicalErrorBoundary}
				/>
			</LexicalComposer>
		</div>
	);
}
