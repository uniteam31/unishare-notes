import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import { useNavigationStore } from '../../../../../../unishare-frontend/src/entities/Navigation';
import { Note, useCreateNote, TNoteFormFields, useGetNotes, useNoteStore } from 'entities/Note';
import type { INote } from 'entities/Note';
import { FormWrapper } from 'shared/lib';
import { Button, LoadScreen, Warning, Divider } from 'shared/ui';
import { Form } from '../Form/Form';
import s from './NotesPage.module.scss';

const NotesPage = () => {
	const { selectedNote, setSelectedNote } = useNoteStore();
	// const { setCurrentService } = useNavigationStore();

	// useEffect(() => {
	// 	setCurrentService('/notes');
	// }, [setCurrentService]);

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

			<FormWrapper<TNoteFormFields> methods={methods}>
				{!isNoteCreating && createNoteError && (
					<Warning title={'Ошибка создания заметки'} text={createNoteError} />
				)}

				{isNoteCreating && <LoadScreen label={'Заметка создается'} className={s.loader} />}

				{!isNoteCreating && !createNoteError && <Form />}
			</FormWrapper>
		</div>
	);
};

export default NotesPage;
