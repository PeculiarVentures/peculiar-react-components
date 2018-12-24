import * as React from 'react';
import classnames from 'classnames';

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
   * This is what will be displayed inside the button
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
  private isLink(): boolean {
    const { disabled, href } = this.props;

    return href && !disabled;
  }

  render() {
    const {
      bgType,
      color,
      textColor,
      align,
      size,
      href,
      children,
      disabled,
      className,
      ...other
    } = this.props;
    const isLink = this.isLink();
    const component = isLink ? 'a' : 'button';

    return React.createElement(component, {
      ...other,
      'data-component': 'button',
      'data-type': bgType,
      href: isLink ? href : undefined,
      className: classnames(
        'button',
        'round_small',
        [`text_${align}`],
        [`button_${size}`],
        [`button_${bgType}_${color}`],
        [`button_text_${textColor}`],
        className,
      ),
    }, children);
  }
}
