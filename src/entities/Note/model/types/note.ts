import { TMeta } from 'shared/types';

/** Поля у формы заметки */
export type TNoteFormFields = {
	title?: string;
	text?: string;
};

/** Данные заметки */
export type TNodeData = TNoteFormFields & {
	ownerID: TMeta['_id'];
};

/** Целый экземпляр */
export interface INote extends TNodeData, TMeta {}
