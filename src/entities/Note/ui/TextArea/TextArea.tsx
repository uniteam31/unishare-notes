import { Placeholder } from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import classNames from 'classnames';
import React from 'react';
import { BubbleMenuComponent } from '../BubbleMenu/BubbleMenu';
import s from './TextArea.module.scss';

import './Placeholder.scss';

interface ITextAreaProps {
	onChange?: (value: string) => void;
	initialText?: string;
	editable?: boolean;
}

export const TextArea = (props: ITextAreaProps) => {
	const { onChange, initialText, editable = true } = props;

	const editor = useEditor({
		extensions: [
			StarterKit,
			Placeholder.configure({
				placeholder: 'Вы можете выделить текст для форматирования',
			}),
		],
		content: initialText,
		onUpdate: ({ editor }) => {
			onChange?.(editor.getHTML());
		},
		editable,
	});

	return (
		<>
			<BubbleMenuComponent editor={editor} />

			<EditorContent editor={editor} className={classNames(s.TextArea)} />
		</>
	);
};
