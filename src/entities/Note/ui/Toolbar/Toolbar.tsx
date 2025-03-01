import { Editor } from '@tiptap/react';
import { FC } from 'react';
import s from './Toolbar.module.scss';

interface ToolbarProps {
	editor: Editor | null;
}

export const Toolbar: FC<ToolbarProps> = ({ editor }) => {
	if (!editor) return null;

	return (
		<div className={s.Toolbar}>
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={editor.isActive('bold') ? s.active : ''}
			>
				<b>B</b>
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={editor.isActive('italic') ? s.active : ''}
			>
				<i>I</i>
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={editor.isActive('heading', { level: 1 }) ? s.active : ''}
			>
				H1
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={editor.isActive('heading', { level: 2 }) ? s.active : ''}
			>
				H2
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={editor.isActive('bulletList') ? s.active : ''}
			>
				• List
			</button>
			<button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={editor.isActive('orderedList') ? s.active : ''}
			>
				1. List
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={editor.isActive('blockquote') ? s.active : ''}
			>
				“ Quote
			</button>
			<button
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				className={editor.isActive('codeBlock') ? s.active : ''}
			>
				` Code
			</button>
		</div>
	);
};
