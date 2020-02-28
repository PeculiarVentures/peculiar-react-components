import React from 'react';

export interface IButtonProps {
  children: React.ReactNode;
  bgType?: 'fill' | 'stroke' | 'clear';
  color?: string;
  colorText?: string;
  alignText?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
  const { children, ...other } = props;

  return (
    <button
      type="button"
      ref={ref}
      {...other}
    >
      <span key="text">
        {children}
      </span>
    </button>
  );
});

export default Button;
