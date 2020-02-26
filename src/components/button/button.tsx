import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import './button.scss';

export interface ButtonProps {
  selected?: boolean;
}

export const Button: FunctionComponent<ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  selected,
  ...rest
}) => {
  const buttonClasses = cn([
    {
      'po-button': true,
      'po-button--is-selected': selected
    },
    className
  ]);

  return (
    <div className={buttonClasses}>
      <button className="po-button__element" {...rest}>
        {children}
      </button>
    </div>
  );
};

export default Button;
