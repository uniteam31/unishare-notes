import { useCallback, useState } from 'react';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';
import type { INote } from '../model/types/note';

interface IDeleteNoteProps {
	id: INote['id'];
}

type TDeleteNoteResponse = ApiResponse<null>;

export const useDeleteNote = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const deleteNote = useCallback(async ({ id }: IDeleteNoteProps) => {
		setIsLoading(true);
		setError(null);

		try {
			await axiosInstance.delete<TDeleteNoteResponse>(`/notes/${id}`);
		} catch (error) {
			const errorMessage =
				getApiResponseErrorMessage(error) || 'Произошла ошибка при удалении заметки';
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		deleteNote,
		isLoading,
		error,
	};
};
