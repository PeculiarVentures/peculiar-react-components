import * as React from 'react';
import classnames from 'classnames';
import { Omit } from '../../typings';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Component type one of `fill` or `stroke`.
   * If `fill` - component will be have background-color from `color` props.
   * If `stroke` - component will be have border-color from `color` props.
   */
  bgType?: 'fill' | 'stroke';
  /**
   * Component color from theme
   */
  color?: string;
  /**
   * Component text color from theme
   */
  textColor?: string;
  /**
   * Component content aligment
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Component size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * The URL to link to when the button is clicked
   */
  href?: string;
  /**
   * This is what will be displayed inside the component
   */
  children: React.ReactNode;
  /**
   * Disables the button if set to true
   */
  disabled?: boolean;
  /**
   * The CSS class name of the root element
   */
  className?: string;
}

export class Button extends React.Component<IButtonProps> {
  public static defaultProps: Omit<IButtonProps, 'children'> = {
    bgType: 'fill',
    color: 'primary',
    align: 'center',
    textColor: 'white',
    size: 'medium',
  };

  private isLink(): boolean {
    const { disabled, href } = this.props;

    return href && !disabled;
  }

  private renderChildren(): JSX.Element {
    const { children } = this.props;

    return (
      <span>
        {children}
      </span>
    );
  }

  render(): JSX.Element {
    const {
      bgType,
      color,
      textColor,
      align,
      size,
      href,
      children,
      className,
      ...other
    } = this.props;
    const isLink = this.isLink();
    const component = isLink ? 'a' : 'button';

    return React.createElement(
      component,
      {
        ...other,
        'data-component': 'button',
        'data-type': bgType,
        href: isLink ? href : undefined,
        className: classnames(
          'button',
          'round_small',
          'truncate_text',
          [`button_${size}`],
          [`text_${align}`],
          [`text_${textColor}`],
          [`stroke_${color}`],
          [`fill_${color}`],
          className,
        ),
      },
      this.renderChildren(),
    );
  }
}
