import { BubbleMenu } from '@tiptap/react';
import type { Editor } from '@tiptap/react';
import classNames from 'classnames';
import React from 'react';
import {
	LuBold,
	LuItalic,
	LuStrikethrough,
	LuListOrdered,
	LuList,
	LuHeading1,
	LuHeading2,
} from 'react-icons/lu';
import s from './BubbleMenu.module.scss';

interface BubbleMenuComponentProps {
	editor: Editor | null;
}

export const BubbleMenuComponent: React.FC<BubbleMenuComponentProps> = ({ editor }) => {
	if (!editor) {
		return null;
	}

	return (
		<BubbleMenu editor={editor} className={s.BubbleMenu}>
			{/* Bold */}
			<button
				className={classNames(editor.isActive('bold') && s.active)}
				onClick={() => editor.chain().focus().toggleBold().run()}
			>
				<LuBold />
			</button>

			{/* Italic */}
			<button
				className={classNames(editor.isActive('italic') && s.active)}
				onClick={() => editor.chain().focus().toggleItalic().run()}
			>
				<LuItalic />
			</button>

			{/* Strike */}
			<button
				className={classNames(editor.isActive('strike') && s.active)}
				onClick={() => editor.chain().focus().toggleStrike().run()}
			>
				<LuStrikethrough />
			</button>

			{/* Header 1 */}
			<button
				className={classNames(editor.isActive('heading', { level: 1 }) && s.active)}
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			>
				<LuHeading1 />
			</button>

			{/* Header 2 */}
			<button
				className={classNames(editor.isActive('heading', { level: 2 }) && s.active)}
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			>
				<LuHeading2 />
			</button>

			{/* Bullet List */}
			<button
				className={classNames(editor.isActive('bulletList') && s.active)}
				onClick={() => editor.chain().focus().toggleBulletList().run()}
			>
				<LuList />
			</button>

			{/* Numbered List */}
			<button
				className={classNames(editor.isActive('orderedList') && s.active)}
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<LuListOrdered />
			</button>
		</BubbleMenu>
	);
};
