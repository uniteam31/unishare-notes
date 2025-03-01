import React, { useCallback, useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import type { INote, TNoteFormFields } from 'entities/Note';
import { Note, useDeleteNote, useGetNotes, useNoteStore, useUpdateNote } from 'entities/Note';
import { useDebounce } from 'shared/hooks';
import { LoadScreen } from 'shared/ui';
import type { ControlledNoteFormFields } from '../../model/controlledNoteFormFields';
import s from './Form.module.scss';

export const Form = () => {
	const { control, setValue, watch } = useFormContext<ControlledNoteFormFields>();
	const { notes, mutateNotes } = useGetNotes();
	const { selectedNote, setSelectedNote } = useNoteStore();

	// TODO в будущем добавить уведомление на ошибки
	const { deleteNote, isLoading: isDeletingNote, error: deleteNoteError } = useDeleteNote();
	const { updateNote, error: updateNoteError } = useUpdateNote();

	const setSelectedNoteTitle = useCallback(() => {
		if (!selectedNote) {
			return;
		}

		setValue('title', selectedNote.title);
	}, [selectedNote, setValue]);

	useEffect(() => {
		setSelectedNoteTitle();
	}, [setSelectedNoteTitle]);

	const updateCachedNote = useCallback(
		(selectedNoteID: INote['_id'], values: TNoteFormFields) => {
			const updatedNotes = notes.map((note) =>
				note._id === selectedNoteID ? { ...note, ...values } : note,
			);

			mutateNotes(updatedNotes, false).finally(); // обновляем кэш с новыми данными
		},
		[mutateNotes, notes],
	);

	/** Функция, посылающая новые данные заметки на сервер после ее изменения */
	const handleSubmitNoteForm = useCallback(
		(selectedNoteID: INote['_id'], updatedNoteValues: TNoteFormFields) => {
			/** Вызываем обновление заметки только после изменения данных формы */
			updateNote({ id: selectedNoteID, body: updatedNoteValues }).then(() => {
				updateCachedNote(selectedNoteID, updatedNoteValues);
			});
		},
		[updateCachedNote, updateNote],
	);

	const debouncedHandleSubmitNoteForm = useDebounce(handleSubmitNoteForm, 500);

	const getSubscribeOnNoteTitleChanges = useCallback(() => {
		return watch((values) => {
			if (!selectedNote) {
				return;
			}

			debouncedHandleSubmitNoteForm(selectedNote._id, values);
		});
	}, [debouncedHandleSubmitNoteForm, selectedNote, watch]);

	useEffect(() => {
		const subscription = getSubscribeOnNoteTitleChanges();

		/** Очистка подписки при размонтировании компонента */
		return () => subscription.unsubscribe();
	}, [getSubscribeOnNoteTitleChanges]);

	const deleteNoteFromCache = useCallback(
		(id: INote['_id']) => {
			setSelectedNote(null);

			const updatedNotes = notes.filter((note) => id !== note._id);

			mutateNotes(updatedNotes, false).finally();
		},
		[mutateNotes, notes, setSelectedNote],
	);

	const handleNoteDelete = useCallback(
		(id: INote['_id']) => {
			deleteNote({ id }).then(() => {
				deleteNoteFromCache(id);
			});
		},
		[deleteNote, deleteNoteFromCache],
	);

	const {
		field: { value: title, onChange: onChangeTitle },
	} = useController<TNoteFormFields>({
		name: 'title',
		control,
		defaultValue: selectedNote?.title,
	});

	const handleChangeText = useCallback(
		(text: string) => {
			const values = {
				text,
			};

			debouncedHandleSubmitNoteForm(selectedNote?._id, values);
		},
		[debouncedHandleSubmitNoteForm, selectedNote],
	);

	if (isDeletingNote) {
		return <LoadScreen className={s.loader} label={'Заметка удаляется...'} />;
	}

	if (!selectedNote) {
		return null;
	}

	return (
		<Note.Item
			key={selectedNote._id}
			//
			onChangeTitle={onChangeTitle}
			onChangeText={handleChangeText}
			onDelete={handleNoteDelete}
			//
			_id={selectedNote._id}
			title={title}
			text={selectedNote.text}
			//
			createdAt={selectedNote.createdAt}
			updatedAt={selectedNote.updatedAt}
			author={selectedNote.author}
		/>
	);
};
