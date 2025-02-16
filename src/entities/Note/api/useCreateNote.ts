import { useCallback, useState } from 'react';
import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';
import type { INote, TNoteFormFields } from '../index';

type TCreateNoteResponse = ApiResponse<INote>;

export const useCreateNote = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const createNote = useCallback(async () => {
		const body: TNoteFormFields = {
			title: '',
			text: '',
		};

		setIsLoading(true);
		setError(null);

		try {
			const response = await axiosInstance.post<TCreateNoteResponse>('/notes', body);
			const createdNote = response.data.data;

			return createdNote;
		} catch (error) {
			const errorMessage = getApiResponseErrorMessage(error) || 'Не удалось создать заметку';
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return {
		createNote,
		isLoading,
		error,
	};
};
