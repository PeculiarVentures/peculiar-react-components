import * as React from 'react';
import classnames from 'classnames';
import { SwitchHandler, ISwitchHandlerProps } from '../switch_handler';

export class Switch extends SwitchHandler {
  public static defaultProps: ISwitchHandlerProps = {
    labelPosition: 'left',
    bgType: 'stroke',
    color: 'light_grey',
    colorOn: 'primary',
    iconColor: 'grey',
    iconColorOn: 'primary',
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
        data-component="switch"
        data-type={bgType}
        data-checked={checkedState}
        data-disabled={disabled}
        className={classnames('switch', className)}
      >
        {labelPosition === 'left' ? this.renderLabel() : null}
        <input
          {...inputProps}
          tabIndex={tabIndex}
          type="checkbox"
          className="switch_input"
          onChange={this.onChange}
          disabled={disabled}
          checked={checkedState}
          name={name}
        />
        <div
          // tslint:disable-next-line
          className={classnames(
            'switch_container',
            {
              [`stroke_${color}`]: !checkedState,
              [`fill_${color}`]: !checkedState,
              [`stroke_${colorOn}`]: checkedState,
              [`fill_${colorOn}`]: checkedState,
            },
          )}
        >
          <div
            // tslint:disable-next-line
            className={classnames(
              'switch_tumbler',
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
