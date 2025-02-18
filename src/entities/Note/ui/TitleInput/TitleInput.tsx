import classNames from 'classnames';
import React, { ChangeEvent, InputHTMLAttributes, memo } from 'react';
import s from './TitleInput.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface ITitleInputProps extends HTMLInputProps {
	onChange?: (value: string) => void;
	value?: string;
	//
	className?: string;
}

export const TitleInput = memo((props: ITitleInputProps) => {
	const { onChange, value, className, ...otherProps } = props;

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		onChange?.(value);
	};

	return (
		<input
			className={classNames(s.TitleInput, className)}
			onChange={handleChange}
			value={value}
			{...otherProps}
		></input>
	);
});
