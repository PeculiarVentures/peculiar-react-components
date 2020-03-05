import * as React from 'react';
import classnames from 'classnames';
import { BgTypeBase } from '../../common/props';

export interface IButtonProps {
  /**
   * This is what will be displayed inside the component.
   */
  children: React.ReactNode;
  /**
   * Component type one of `fill` | `stroke` | `clear`.
   * If `fill` - component will have background-color from `color` props.
   * If `stroke` - component will have border-color from `color` props.
   * If `clear` - component will have transparent border-color and background-color.
   */
  bgType?: BgTypeBase | 'clear';
  /**
   * Component color from theme.
   */
  color?: string;
  /**
   * Component text color from theme.
   */
  colorText?: string;
  /**
   * Component size.
   */
  size?: 'small' | 'medium' | 'large';
  full?: boolean;
  rounded?: boolean;
  /**
   * Disables the button if set to `true`.
   */
  disabled?: boolean;
  /**
   * The CSS class name of the root element.
   */
  className?: string;
}

abstract class AbstractButton<T> extends React.PureComponent<
IButtonProps & T
> {
  static defaultProps: Omit<IButtonProps, 'children'> = {
    bgType: 'stroke',
    color: 'grey',
    colorText: 'black',
    size: 'medium',
  };

  protected getProps() {
    const {
      bgType,
      color,
      colorText,
      children,
      size,
      full,
      rounded,
      className,
      ...other
    } = this.props;

    const newClassName = classnames(
      'button',
      size,
      {
        [`fill_${color}`]: bgType === 'fill',
        fill_transparent: bgType !== 'fill',
        [`stroke_${color}`]: bgType !== 'clear',
        stroke_transparent: bgType === 'clear',
        [`color_${colorText}`]: colorText,
        round_small: !rounded,
        full,
        rounded,
      },
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
