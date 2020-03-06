import * as React from 'react';
import classnames from 'clsx';
import { EBgType, EColor } from '../../common/props';

export enum ESize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

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
  bgType?: keyof typeof EBgType | 'clear';
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
  size?: keyof typeof ESize;
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
    bgType: EBgType.stroke,
    color: EColor.grey,
    colorText: EColor.black,
    size: ESize.medium,
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
        [`fill_${color}`]: bgType === EBgType.fill,
        fill_transparent: bgType !== EBgType.fill,
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
