import type { TNoteFormFields } from 'entities/Note';

/** В заметке напрямую через react hook forms контролируется только title, за text отвечает редактор из библиотеки  */
export type ControlledNoteFormFields = Pick<TNoteFormFields, 'title'>;
