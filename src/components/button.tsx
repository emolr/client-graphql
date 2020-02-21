import React from 'react';

export const Button = ({
  countdown,
  children,
  onClick,
  disabled,
  className,
  ...rest
}: any) => {
  return (
    <div className={'button ' + className} {...rest}>
      <button className="button__element" onClick={onClick} disabled={disabled}>
        {children}
      </button>
      <div
        className="button__countdown"
        style={{ width: countdown + '%' }}
      ></div>
    </div>
  );
};
