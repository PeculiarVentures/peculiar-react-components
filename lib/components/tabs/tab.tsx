import * as React from 'react';
import classnames from 'classnames';
import { TextType } from '../typography';
import { Omit } from '../../typings';

export interface ITabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If value prop passed to Tabs component, this value prop is also required.
   * It assigns a value to the tab so that it can be selected by the Tabs
   */
  value: string | number;
  /**
   * The contents of the Tab
   */
  children: React.ReactNode;
  /**
   * The css class name of the root element
   */
  className?: string;
  /**
   * Disabled the Tab if set to true
   */
  disabled?: boolean;
  /**
   * Selected the Tab if set to true
   */
  selected?: boolean;
  /**
   * Callback function that is fired when the Tab clicked
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * Component color from theme
   */
  color?: string;
  /**
   * Component checked color from theme
   */
  colorOn?: string;
  /**
   * Text type
   */
  type?: TextType;
}

export class Tab extends React.PureComponent<ITabProps> {
  public static defaultProps: Omit<ITabProps, 'children' | 'className' | 'value'> = {
    color: 'grey',
    colorOn: 'primary',
    type: 'h5',
  };

  render(): JSX.Element {
    const {
      className,
      disabled,
      value,
      children,
      selected,
      onClick,
      color,
      colorOn,
      type,
      ...other
    } = this.props;

    return (
      <button
        {...other}
        data-component="tab"
        data-selected={selected}
        type="button"
        value={value}
        disabled={disabled}
        onClick={onClick}
        // tslint:disable-next-line
        className={classnames(
          'tab',
          type,
          {
            [`text_${color}`]: !selected && !disabled,
            [`stroke_${colorOn}`]: selected && !disabled,
            [`text_${colorOn}`]: selected && !disabled,
            text_light_grey: disabled,
            stroke_light_grey: selected && disabled,
          },
          className,
        )}
      >
        <span>
          {children}
        </span>
      </button>
    );
  }
}
