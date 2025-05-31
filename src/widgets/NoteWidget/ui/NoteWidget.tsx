import classNames from 'classnames';
import React, { useCallback } from 'react';
import { Note, useGetNotes, useNoteStore } from 'entities/Note';
import type { INote } from 'entities/Note';
import NoteIcon from 'shared/assets/icons/note.svg';
import { Skeleton, Warning } from 'shared/ui';
import { Link, Widget } from 'shared/ui';
import s from './NoteWidget.module.scss';

interface INoteWidgetProps {
	className?: string;
}

export const NoteWidget = (props: INoteWidgetProps) => {
	const { className } = props;

	const { notes, isLoading: isNotesLoading, error: notesError } = useGetNotes();
	const { setSelectedNote } = useNoteStore();

	const handleNoteClick = useCallback(
		(id: INote['id']) => {
			const selectedNote = notes.find((note) => id === note.id);

			if (!selectedNote) {
				return;
			}

			setSelectedNote(selectedNote);
		},
		[notes, setSelectedNote],
	);

	const isNotesEmpty = !notes.length;

	return (
		<div className={classNames(s.NoteWidget, className)}>
			<Widget Icon={<NoteIcon className={s.icon} />} title={'Заметки'} to={'/notes'}>
				<div className={s.notesList}>
					{isNotesLoading &&
						Array.from({ length: 2 }).map((_, index) => (
							<Skeleton className={s.skeleton} key={index} />
						))}

					{/** В данном виджете можно отобразить только 2 последние заметки */}
					{!isNotesLoading &&
						!notesError &&
						notes.slice(0, 2).map((note) => (
							<Link to={'/notes'} key={note.id}>
								<Note.ListItem
									className={s.note}
									{...note}
									onClick={handleNoteClick}
								/>
							</Link>
						))}

					{isNotesEmpty && !isNotesLoading && !notesError && (
						<Warning
							title={'Заметок нет'}
							text={'Создайте первую внутри сервиса!'}
							theme={'blue'}
						/>
					)}

					{notesError && !isNotesLoading && (
						<Warning title={'Произошла ошибка'} text={notesError} theme={'red'} />
					)}
				</div>
			</Widget>
		</div>
	);
};
