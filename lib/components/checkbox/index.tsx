import * as React from 'react';
import classnames from 'classnames';
import { SwitchHandler, ISwitchHandlerProps } from '../switch_handler';
import CheckmarkIcon from '../../icons/checkmark';

export class Checkbox extends SwitchHandler {
  public static defaultProps: ISwitchHandlerProps = {
    labelPosition: 'left',
    bgType: 'fill',
    color: 'light_grey',
    colorOn: 'primary',
    iconColor: 'grey',
    iconColorOn: 'white',
  };

  render(): JSX.Element {
    const {
      name,
      defaultChecked,
      disabled,
      onCheck,
      checked,
      inputProps,
      label,
      labelPosition,
      labelProps,
      className,
      tabIndex,
      bgType,
      color,
      colorOn,
      iconColor,
      iconColorOn,
      ...other
    } = this.props;
    const { checkedState } = this.state;

    return (
      <div
        {...other}
        data-component="checkbox"
        data-type={bgType}
        data-checked={checkedState}
        data-disabled={disabled}
        className={classnames('checkbox', className)}
      >
        {labelPosition === 'left' ? this.renderLabel() : null}
        <input
          {...inputProps}
          tabIndex={tabIndex}
          type="checkbox"
          className="checkbox_input"
          onChange={this.onChange}
          disabled={disabled}
          checked={checkedState}
          name={name}
        />
        <div
          // tslint:disable-next-line
          className={classnames(
            'checkbox_container',
            {
              [`stroke_${color}`]: !checkedState,
              [`fill_${color}`]: !checkedState,
              [`stroke_${colorOn}`]: checkedState,
              [`fill_${colorOn}`]: checkedState,
            },
          )}
        >
          <CheckmarkIcon
            // tslint:disable-next-line
            className={classnames(
              'checkbox_icon',
              {
                [`fill_${iconColor}`]: !checkedState,
                [`fill_${iconColorOn}`]: checkedState,
              },
            )}
          />
        </div>
        {labelPosition === 'right' ? this.renderLabel() : null}
      </div>
    );
  }
}
