import * as React from 'react';
import classnames from 'classnames';

export interface IRadioProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Checked attribute for `input`
   */
  checked?: boolean;
  /**
   * If true, the component will be disabled
   */
  disabled?: boolean;
  /**
   * Name attribute for `input`
   */
  name?: string;
  /**
   * Value attribute for `input`
   */
  value?: string;
  /**
   * Callback fired when the state is changed
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Properties for `<input type="radio" />` element
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Label for radio
   */
  label?: React.ReactNode;
  /**
   * Where the label will be placed next to the radio
   */
  labelPosition?: 'left' | 'right';
  /**
   * The CSS class name of the root element
   */
  className?: string;
  /**
   * The tabIndex of the `input` element
   */
  tabIndex?: number;
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
   * Component checked color from theme
   */
  colorOn?: string;
  /**
   * Component icon color from theme
   */
  iconColor?: string;
  /**
   * Component checked icon color from theme
   */
  iconColorOn?: string;
}

export class Radio extends React.PureComponent<IRadioProps> {
  public static defaultProps: IRadioProps = {
    checked: false,
    disabled: false,
    labelPosition: 'left',
    bgType: 'stroke',
    color: 'light_grey',
    colorOn: 'primary',
    iconColor: 'grey',
    iconColorOn: 'primary',
  };

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(e);
    }
  }

  render() {
    const {
      checked,
      disabled,
      name,
      value,
      onChange,
      inputProps,
      label,
      labelPosition,
      className,
      tabIndex,
      bgType,
      color,
      colorOn,
      iconColor,
      iconColorOn,
      ...other
    } = this.props;

    return (
      <div
        {...other}
        data-component="radio"
        data-type={bgType}
        data-checked={checked}
        data-disabled={disabled}
        className={classnames('radio', className)}
      >
        <input
          {...inputProps}
          tabIndex={tabIndex}
          type="radio"
          name={name}
          value={value}
          className="radio_input"
          onChange={this.onChange}
          disabled={disabled}
          checked={checked}
        />
        <div
          // tslint:disable-next-line
          className={classnames(
            'radio_container',
            {
              [`stroke_${color}`]: !checked,
              [`fill_${color}`]: !checked,
              [`stroke_${colorOn}`]: checked,
              [`fill_${colorOn}`]: checked,
            },
          )}
        >
          <div
            // tslint:disable-next-line
            className={classnames(
              'radio_tumbler',
              {
                [`fill_${iconColor}`]: !checked,
                [`fill_${iconColorOn}`]: checked,
              },
            )}
          />
        </div>
      </div>
    );
  }
}
