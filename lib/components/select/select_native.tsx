import * as React from 'react';
import classnames from 'classnames';
import SelectArrowIcon from '../../icons/select_arrow';
import { Omit } from '../../typings';

export interface ISelectNativeProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The option elements to populate the select with.
   */
  children: React.ReactNode;
  /**
   * The select name value.
   */
  name?: string;
  /**
   * If true, the select will be disabled.
   */
  disabled?: boolean;
  /**
   * The select value.
   */
  value?: string | number;
  /**
   * The select default value.
   */
  defaultValue?: string;
  /**
   * Callback function fired when a menu item is selected.
   */
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /**
   * Element tabIndex.
   */
  tabIndex?: number;
  /**
   * Classname for the root element.
   */
  className?: string;
  /**
   * Properties applied to the select element.
   */
  inputProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
  /**
   * Arrow icon component for button show/hide dropdow
   */
  arrowComponent?: React.ReactNode;
  /**
   * Component type one of `fill` or `stroke`.
   * If `fill` - component will be have background-color from `color` props.
   * If `stroke` - component will be have border-color from `color` props.
   */
  bgType?: 'fill' | 'stroke';
  /**
   * Component color from theme.
   */
  color?: string;
  /**
   * Component text color from theme.
   */
  textColor?: string;
  /**
   * Component focus color from theme.
   */
  colorFocus?: string;
  /**
   * Component size.
   */
  size?: 'medium' | 'large';
}

export class SelectNative extends React.PureComponent<ISelectNativeProps> {
  public inputNode: HTMLSelectElement;

  public static defaultProps: Omit<ISelectNativeProps, 'children'> = {
    bgType: 'stroke',
    color: 'light_grey',
    textColor: 'black',
    colorFocus: 'primary',
    size: 'medium',
  };

  private renderOpenButton(): JSX.Element {
    const { arrowComponent } = this.props;

    return (
      <div className="select_open_button">
        {arrowComponent || <SelectArrowIcon className="select_arrow_icon" />}
      </div>
    );
  }

  render(): JSX.Element {
    const {
      children,
      name,
      disabled,
      value,
      defaultValue,
      onChange,
      tabIndex,
      className,
      inputProps,
      arrowComponent,
      bgType,
      color,
      textColor,
      colorFocus,
      size,
      ...other
    } = this.props;

    return (
      <div
        {...other}
        data-component="select"
        data-type={bgType}
        data-disabled={disabled}
        className={classnames('select', className)}
      >
        <select
          {...inputProps}
          tabIndex={tabIndex}
          multiple={false}
          // tslint:disable-next-line
          className={classnames(
            'select_field',
            'truncate_text',
            'round_small',
            [`text_${textColor}`],
            [`select_field_${size}`],
            [`select_field_focus_${colorFocus}`],
            [`stroke_${color}`],
            {
              [`fill_${color}`]: bgType === 'fill',
              fill_white: bgType === 'stroke',
            },
            // [`select_field_${bgType}_${color}`],
            // [`select_field_text_${textColor}`],
            // [`select_field_focus_${colorFocus}`],
          )}
          name={name}
          disabled={disabled}
          ref={(node) => { this.inputNode = node; }}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
        >
          {children}
        </select>
        {this.renderOpenButton()}
      </div>
    );
  }
}
