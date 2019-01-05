import * as React from 'react';
import classnames from 'classnames';
import { Omit } from '../../typings';

export interface ISelectDropdownProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * This is what will be displayed inside the dropdown list
   */
  children: React.ReactNode;
  /**
   * The CSS class name of the root element
   */
  className?: string;
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
   * Component focus color from theme
   */
  colorFocus?: string;
}

export class SelectDropdown extends React.PureComponent<ISelectDropdownProps> {
  dropdownNode: HTMLElement;

  public static defaultProps: Omit<ISelectDropdownProps, 'children'> = {
    bgType: 'fill',
    color: 'light_grey',
    colorFocus: 'primary',
  };

  private getFocusedElement(): HTMLElement {
    return this.dropdownNode.querySelector('[data-has-focus="true"]');
  }

  public scrollToFocusedElement(): void {
    const focusedElement = this.getFocusedElement();

    if (focusedElement) {
      this.dropdownNode.scrollTop = focusedElement.offsetTop;
    }
  }

  render(): JSX.Element {
    const {
      children,
      className,
      bgType,
      color,
      colorFocus,
      ...other
    } = this.props;

    return (
      <div
        {...other}
        data-component="select_dropdown"
        data-type={bgType}
        // tslint:disable-next-line
        className={classnames(
          'select_dropdown',
          'round_small',
          [`stroke_${colorFocus}`],
          {
            [`fill_${color}`]: bgType === 'fill',
            fill_white: bgType === 'stroke',
          },
          className,
        )}
        ref={(node) => { this.dropdownNode = node; }}
      >
        {children}
      </div>
    );
  }
}
