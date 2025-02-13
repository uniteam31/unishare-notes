import classNames from 'classnames';
import s from './Divider.module.scss';

export enum Direction {
	HORIZONTAL = 'horizontal',
	VERTICAL = 'vertical',
}

interface IDividerProps {
	direction?: Direction;
	className?: string;
}

export const Divider = (props: IDividerProps) => {
	const { direction = Direction.VERTICAL, className } = props;

	return <div className={classNames(s.Divider, s[direction], className)}></div>;
};
