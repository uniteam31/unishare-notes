import classNames from 'classnames';
import React, { FC, memo, useCallback } from 'react';
import { formatDate } from 'shared/lib';
import type { INote } from '../../model/types/note';
import s from './ListItem.module.scss';

interface IListItemProps extends Partial<INote> {
	onClick?: (id: INote['id']) => void;
	//
	className?: string;
}

/** Убирает все теги из текста и возвращает чистый текст */
const formatListItemText = (text?: string) => {
	const domTextElement = document.createElement('div');
	domTextElement.innerHTML = text || '';

	const clearText = Array.from(domTextElement.childNodes)
		.map((node) => node.textContent?.trim()) // убираем лишние пробелы
		.filter(Boolean) // убираем пустые строки
		.join('\n\n'); // разделяем абзацы переносами строк

	return clearText;
};

// TODO добавить автора
export const ListItem: FC<IListItemProps> = memo((props) => {
	const { title, text, className, createdAt } = props;
	//
	const { id, onClick } = props;

	const handleClick = useCallback(() => {
		if (!id) {
			return;
		}

		onClick?.(id);
	}, [id, onClick]);

	const clearText = formatListItemText(text);

	return (
		<div className={classNames(s.ListItem, className)} onClick={handleClick}>
			<div className={s.title}>{title?.length ? title : 'Нет названия'}</div>
			<div className={s.text}>{clearText?.length ? clearText : 'Нет содержимого'}</div>
			<div className={s.date}>
				{createdAt?.length ? formatDate(new Date(createdAt)) : 'Без даты создания'}
			</div>
		</div>
	);
});
