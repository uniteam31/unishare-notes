import { Item } from './ui/Item/Item';
import { List } from './ui/List/List';
import { ListItem } from './ui/ListItem/ListItem';

export type { INote, TNodeData, TNoteFormFields } from './model/types/note';

type TNoteComponents = {
	List: typeof List;
	ListItem: typeof ListItem;
	Item: typeof Item;
};

/** Экспортируем обертку для компонентов, которые связаны логически */
export const Note: TNoteComponents = {
	List,
	Item,
	ListItem,
};

export { useNoteStore } from './model/slice/useNoteStore';

export { useGetNotes } from './api/useGetNotes';
export { useCreateNote } from './api/useCreateNote';
export { useUpdateNote } from './api/useUpdateNote';
export { useDeleteNote } from './api/useDeleteNote';
