import * as React from 'react';
import classnames from 'classnames';
import { BgTypeBase } from '../../common/props';

export interface IButtonProps {
  children: React.ReactNode;
  bgType?: BgTypeBase | 'clear';
  color?: string;
  colorText?: string;
  alignText?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

abstract class AbstractButton<T extends React.HTMLAttributes<any>> extends React.PureComponent<
IButtonProps & T
> {
  static defaultProps: Omit<IButtonProps, 'children'> = {
    bgType: 'fill',
    color: 'primary',
    colorText: 'white',
    alignText: 'center',
    size: 'medium',
  };

  protected getProps() {
    const {
      bgType,
      color,
      colorText,
      alignText,
      children,
      size,
      className,
      ...other
    } = this.props;

    const newClassName = classnames(
      'button',
      [`button_${size}`],
      className,
    );

    return {
      ...other,
      className: newClassName,
    };
  }

  protected renderChildren() {
    const { children } = this.props;

    return (
      <span key="text">
        {children}
      </span>
    );
  }

  public abstract render(): JSX.Element;
}

export default AbstractButton;
