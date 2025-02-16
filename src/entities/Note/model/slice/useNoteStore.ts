import { create } from 'zustand';
import type { INote } from '../../index';

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
