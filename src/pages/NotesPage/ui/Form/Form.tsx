import React, { useCallback, useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Note, useDeleteNote, useNoteStore, useUpdateNote, useGetNotes } from 'entities/Note';
import type { INote, TNoteFormFields } from 'entities/Note';
import { useDebounce } from 'shared/hooks';
import { LoadScreen } from 'shared/ui';
import s from './Form.module.scss';

export const Form = () => {
	const { control, setValue, watch } = useFormContext<TNoteFormFields>();
	const { notes, mutateNotes } = useGetNotes();
	const { selectedNote, setSelectedNote } = useNoteStore();

	// TODO в будущем добавить уведомление на ошибки
	const { deleteNote, isLoading: isDeletingNote, error: deleteNoteError } = useDeleteNote();
	const { updateNote, error: updateNoteError } = useUpdateNote();

	const setSelectedNoteFormValues = useCallback(() => {
		if (!selectedNote) {
			return;
		}

		setValue('title', selectedNote.title);
		setValue('text', selectedNote.text);
	}, [selectedNote, setValue]);

	useEffect(() => {
		setSelectedNoteFormValues();
	}, [setSelectedNoteFormValues]);

	const updateCachedNote = useCallback(
		(selectedNote: INote, values: TNoteFormFields) => {
			const updatedNotes = notes.map((note) =>
				note._id === selectedNote._id ? { ...note, ...values } : note,
			);

			mutateNotes(updatedNotes, false).finally(); // обновляем кэш с новыми данными
		},
		[mutateNotes, notes],
	);

	/** Функция, посылающая новые данные заметки на сервер после ее изменения */
	const handleSubmitNoteForm = useCallback(
		(selectedNote: INote, updatedNoteValues: TNoteFormFields) => {
			/** Вызываем обновление заметки только после изменения данных формы */
			updateNote({ body: updatedNoteValues, id: selectedNote._id }).then(() => {
				updateCachedNote(selectedNote, updatedNoteValues);
			});
		},
		[updateCachedNote, updateNote],
	);

	const debouncedHandleSubmitNoteForm = useDebounce(handleSubmitNoteForm, 500);

	const getSubscribeOnNoteFormChanges = useCallback(() => {
		return watch((values) => {
			if (!selectedNote) {
				return;
			}

			debouncedHandleSubmitNoteForm(selectedNote, values);
		});
	}, [debouncedHandleSubmitNoteForm, selectedNote, watch]);

	useEffect(() => {
		const subscription = getSubscribeOnNoteFormChanges();

		/** Очистка подписки при размонтировании компонента */
		return () => subscription.unsubscribe();
	}, [getSubscribeOnNoteFormChanges]);

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

	const {
		field: { value: text, onChange: onChangeText },
	} = useController<TNoteFormFields>({
		name: 'text',
		control,
		defaultValue: selectedNote?.text,
	});

	if (isDeletingNote) {
		return <LoadScreen className={s.loader} label={'Заметка удаляется...'} />;
	}

	if (!selectedNote) {
		return;
	}

	return (
		<Note.Item
			onChangeTitle={onChangeTitle}
			onChangeText={onChangeText}
			title={title}
			text={text}
			onDelete={handleNoteDelete}
			_id={selectedNote._id}
			createdAt={selectedNote.createdAt}
			updatedAt={selectedNote.updatedAt}
			author={selectedNote.author}
		/>
	);
};
