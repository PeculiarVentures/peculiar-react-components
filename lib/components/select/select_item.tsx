import * as React from 'react';
import classnames from 'classnames';
import { Omit } from '../../typings';

export interface ISelectItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * This is what will be displayed inside the component
   */
  children: React.ReactNode;
  /**
   * Value for component
   */
  value: number | string;
  /**
   * Selected value for component
   */
  selected?: boolean;
  /**
   * Disabled value for component
   */
  disabled?: boolean;
  /**
   * Focus value for component
   */
  hasFocus?: boolean;
  /**
   * The CSS class name of the root element
   */
  className?: string;
  /**
   * Component text color from theme
   */
  color?: string;
  /**
   * Component text focus color from theme
   */
  colorFocus?: string;
  /**
   * Component size
   */
  size?: 'medium' | 'large';
}

export class SelectItem extends React.PureComponent<ISelectItemProps> {
  public static defaultProps: Omit<ISelectItemProps, 'children' | 'value'> = {
    color: 'black',
    colorFocus: 'primary',
    size: 'medium',
  };

  render(): JSX.Element {
    const {
      children,
      value,
      selected,
      disabled,
      hasFocus,
      className,
      color,
      colorFocus,
      size,
      ...other
    } = this.props;

    return (
      <div
        {...other}
        data-component="select_item"
        data-disabled={disabled}
        data-selected={selected}
        data-has-focus={hasFocus}
        data-value={value}
        // tslint:disable-next-line
        className={classnames(
          'select_item',
          'truncate_text',
          [`select_item_${size}`],
          {
            [`select_item_focus_${colorFocus}`]: hasFocus,
            [`text_${color}`]: !selected,
            [`text_${colorFocus}`]: selected,
          },
          className,
        )}
      >
        {children}
      </div>
    );
  }
}
