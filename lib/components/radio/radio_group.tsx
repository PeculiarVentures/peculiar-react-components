import * as React from 'react';
import { IRadioProps } from './index';

export interface IRadioGroupProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The content of the component
   */
  children: React.ReactNode;
  /**
   * The name used to reference the value of the control
   */
  name: string;
  /**
   * The `value` property of the radio button that will be
   * selected by default. This takes precedence over the `checked` property
   * of the `Radio` elements
   */
  defaultValue?: string;
  /**
   * Value of the selected radio button
   */
  value?: string;
  /**
   * Change callback
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IRadioGroupState {
  valueState: string;
}

export class RadioGroup extends React.PureComponent<IRadioGroupProps, IRadioGroupState> {
  constructor(props: IRadioGroupProps) {
    super(props);

    this.state = {
      valueState: props.value || props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps: IRadioGroupProps) {
    const { value } = this.props;

    if (value !== nextProps.value) {
      this.setState({
        valueState: nextProps.value,
      });
    }
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, onChange } = this.props;

    if (onChange) {
      onChange(e);
    }

    if (!value) {
      this.setState({
        valueState: e.target.value,
      });
    }
  }

  private renderChildren(): JSX.Element[] {
    const {
      children,
      name,
    } = this.props;
    const { valueState } = this.state;

    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return null;
      }

      return React.cloneElement(child, {
        name,
        key: index,
        checked: valueState === (child.props as IRadioProps).value,
        onChange: this.onChange,
      } as IRadioProps);
    });
  }

  render(): JSX.Element {
    const {
      children,
      name,
      defaultValue,
      value,
      onChange,
      ...other
    } = this.props;

    return (
      <div
        {...other}
        data-component="radio_group"
      >
        {this.renderChildren()}
      </div>
    );
  }
}
