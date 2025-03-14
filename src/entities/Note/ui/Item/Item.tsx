import classNames from 'classnames';
import React from 'react';
import TrashIcon from 'shared/assets/icons/trash.svg';
import { formatDate } from 'shared/lib';
import type { INote } from '../../model/types/note';
import { TextArea } from '../TextArea/TextArea';
import { TitleInput } from '../TitleInput/TitleInput';
import s from './Item.module.scss';

interface INoteProps extends INote {
	onChangeTitle: (title: string) => void;
	onChangeText: (text: string) => void;
	//
	onDelete?: (id: INote['_id']) => void;
	//
	editable?: boolean;
	className?: string;
}

// TODO задействовать поля createdAt, updatedAt
export const Item = (props: INoteProps) => {
	const { onChangeText, onChangeTitle } = props;
	const { title, text, className, editable = true } = props;
	const { _id, onDelete } = props;

	return (
		<div className={classNames(s.Item, className)}>
			{editable && <TrashIcon className={s.trashIcon} onClick={() => onDelete?.(_id)} />}

			{/*<div>{formatDate(new Date(date || 0))}</div>*/}

			<TitleInput
				value={title}
				onChange={onChangeTitle}
				placeholder={'Введите название...'}
				editable={editable}
				className={s.title}
			/>

			<TextArea initialText={text} onChange={onChangeText} editable={editable} />
		</div>
	);
};
