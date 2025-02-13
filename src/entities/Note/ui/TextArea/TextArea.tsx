import classNames from 'classnames';
import React, { ChangeEvent, TextareaHTMLAttributes } from 'react';
import s from './TextArea.module.scss';

type HTMLTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>;

interface ITextAreaProps extends HTMLTextAreaProps {
	onChange?: (value: string) => void;
	value?: string;
	//
	className?: string;
}

export const TextArea = (props: ITextAreaProps) => {
	const { onChange, value, className, ...otherProps } = props;

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value;
		onChange?.(value);
	};

	return (
		<textarea
			onChange={handleChange}
			className={classNames(s.TextArea, className)}
			value={value}
			placeholder={'Введите текст заметки...'}
			{...otherProps}
		></textarea>
	);
};
