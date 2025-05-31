import { create } from 'zustand';
import { INote } from '../types/note';

interface INoteStore {
	selectedNote: INote | null;
	setSelectedNote: (note: INote | null) => void;
}

export const useNoteStore = create<INoteStore>((set) => ({
	selectedNote: null,
	setSelectedNote: (Note) => {
		set((state) => {
			return { ...state, selectedNote: Note };
		});
	},
}));
