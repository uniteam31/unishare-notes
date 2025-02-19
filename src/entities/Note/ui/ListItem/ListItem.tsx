import classNames from 'classnames';
import React, { FC, memo, useCallback } from 'react';
import { formatDate } from 'shared/lib';
import type { INote } from '../../model/types/note';
import s from './ListItem.module.scss';

interface IListItemProps extends Partial<INote> {
	onClick?: (id: INote['_id']) => void;
	//
	className?: string;
}

// TODO добавить автора
export const ListItem: FC<IListItemProps> = memo((props) => {
	const { title, text, className, createdAt } = props;
	//
	const { _id, onClick } = props;

	const handleClick = useCallback(() => {
		if (!_id) {
			return;
		}

		onClick?.(_id);
	}, [_id, onClick]);

	return (
		<div className={classNames(s.ListItem, className)} onClick={handleClick}>
			<div className={s.title}>{title?.length ? title : 'Нет названия'}</div>
			<div className={s.text}>{text?.length ? text : 'Нет содержимого'}</div>
			<div className={s.date}>
				{createdAt?.length ? formatDate(new Date(createdAt)) : 'Без даты создания'}
			</div>
		</div>
	);
});
