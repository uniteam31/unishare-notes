import { useCallback, useState } from 'react';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import { ApiResponse } from 'shared/types';
import type { INote, TNoteFormFields } from '../model/types/note';

interface IUpdateNoteProps {
	id: INote['_id'];
	body: TNoteFormFields;
}

type TUpdateNoteResponse = ApiResponse<INote>;

export const useUpdateNote = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const updateNote = useCallback(async ({ id, body }: IUpdateNoteProps) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await axiosInstance.put<TUpdateNoteResponse>(`/notes/${id}`, body);
			const updatedNote = response.data.data;

			return updatedNote;
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) || 'Произошла ошибка при обновлении заметки';
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		updateNote,
		isLoading,
		error,
	};
};
