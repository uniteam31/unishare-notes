import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Note, useCreateNote, useGetNotes, useNoteStore } from 'entities/Note';
import type { INote, TNoteFormFields } from 'entities/Note';
import { FormWrapper } from 'shared/lib';
import { Button, LoadScreen, Warning } from 'shared/ui';
import { Divider } from 'shared/ui';
import { Form } from '../Form/Form';
import s from './NotesPage.module.scss';

export const NotesPage = () => {
	const { selectedNote, setSelectedNote } = useNoteStore();

	const { notes, isLoading: isNotesLoading, error: getNotesError, mutateNotes } = useGetNotes();
	const { createNote, isLoading: isNoteCreating, error: createNoteError } = useCreateNote();

	const methods = useForm<TNoteFormFields>();

	const handleNoteClick = useCallback(
		(id: INote['_id']) => {
			const note = notes.find((note) => note._id === id);

			if (!note) {
				return;
			}

			setSelectedNote(note);
		},
		[notes, setSelectedNote],
	);

	const setCreatedNoteAndMutate = useCallback(
		(createdNote: INote) => {
			setSelectedNote(createdNote);
			mutateNotes([createdNote, ...notes], false).finally();
		},
		[mutateNotes, notes, setSelectedNote],
	);

	const resetNoteFields = useCallback(() => {
		methods.setValue('title', '');
		methods.setValue('text', '');
	}, [methods]);

	const handleNoteCreate = useCallback(() => {
		createNote().then((createdNote) => {
			if (!createdNote) {
				return;
			}

			setCreatedNoteAndMutate(createdNote);
			resetNoteFields();
		});
	}, [createNote, resetNoteFields, setCreatedNoteAndMutate]);

	return (
		<div className={s.NotesPage}>
			<div className={s.notesList}>
				<Button className={s.createNoteButton} onClick={handleNoteCreate}>
					Создать заметку
				</Button>

				<Note.List
					notes={notes}
					onClickNote={handleNoteClick}
					selectedNodeID={selectedNote?._id}
					isLoading={isNotesLoading}
					error={getNotesError}
				/>
			</div>

			<Divider />

			<FormWrapper<Pick<TNoteFormFields, 'title'>> methods={methods}>
				{!isNoteCreating && createNoteError && (
					<Warning
						title={'Ошибка создания заметки'}
						text={createNoteError}
						theme={'red'}
					/>
				)}

				{isNoteCreating && <LoadScreen label={'Заметка создается'} className={s.loader} />}

				{!isNoteCreating && !createNoteError && <Form />}
			</FormWrapper>
		</div>
	);
};
