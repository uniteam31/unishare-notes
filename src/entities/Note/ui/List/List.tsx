import classNames from 'classnames';
import React from 'react';
import { Skeleton, Warning } from 'shared/ui';
import { INote } from '../../model/types/note';
import { ListItem } from '../ListItem/ListItem';
import s from './List.module.scss';

interface IListProps {
	notes: INote[];
	selectedNodeID?: INote['_id'];
	onClickNote?: (id: INote['_id']) => void;
	//
	isLoading?: boolean;
	error?: string;
	className?: string;
}

/** Отрисовывает список заметок и отвечает за обработку состояний загрузки и ошибок */
export const List = (props: IListProps) => {
	const { notes, selectedNodeID, onClickNote } = props;
	const { isLoading, error, className } = props;

	const isNotesLoading = isLoading && !error;
	const isError = !isLoading && error;
	const isNotesEmpty = !isNotesLoading && !notes.length;

	return (
		<div className={classNames(s.List, className)}>
			{isError && <Warning text={'При загрузке заметок произошла ошибка'} theme={'red'} />}

			{isNotesEmpty && <Warning text={'Здесь вы можете создать свою заметку!'} />}

			{isNotesLoading &&
				Array.from({ length: 5 }).map((_, index) => (
					<Skeleton className={classNames(s.item, s.skeleton)} key={index} />
				))}

			{!isNotesLoading &&
				notes.map((note) => {
					return (
						<ListItem
							key={note._id}
							{...note}
							className={classNames(
								s.item,
								note._id === selectedNodeID && s.selected,
							)}
							onClick={onClickNote}
						/>
					);
				})}
		</div>
	);
};
