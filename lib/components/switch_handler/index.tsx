import * as React from 'react';
import { Typography, ITypographyProps } from '../typography';

export interface ISwitchHandlerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Name attribute for input tag
   */
  name?: string;
  /**
   * Initial state for input
   */
  defaultChecked?: boolean;
  /**
   * Will disable the toggle if true
   */
  disabled?: boolean;
  /**
   * Callback function that is fired when the toggle switch is toggled
   */
  onCheck?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Toggled if set to true
   */
  checked?: boolean;
  /**
   * Properties for `<input type="checkbox" />` element
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Label for toggle
   */
  label?: React.ReactNode;
  /**
   * Where the label will be placed next to the toggle
   */
  labelPosition?: 'left' | 'right';
  /**
   * `Typography` props for label
   */
  labelProps?: ITypographyProps;
  /**
   * The CSS class name of the root element
   */
  className?: string;
  /**
   * The tabIndex of the input element
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

interface ISwitchHandlerState {
  checkedState: boolean;
}

export class SwitchHandler extends React.PureComponent<ISwitchHandlerProps, ISwitchHandlerState> {
  public static defaultProps: ISwitchHandlerProps = {
    labelPosition: 'left',
    bgType: 'fill',
    color: 'light_grey',
    colorOn: 'primary',
    iconColor: 'grey',
    iconColorOn: 'white',
  };

  constructor(props: ISwitchHandlerProps) {
    super(props);

    this.state = {
      checkedState: !!(props.checked || props.defaultChecked),
    };
  }

  componentWillReceiveProps(nextProps: ISwitchHandlerProps): void {
    const { checked } = this.props;

    if (checked !== nextProps.checked) {
      this.setState({
        checkedState: nextProps.checked,
      });
    }
  }

  public onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { onCheck, onChange } = this.props;
    const { checkedState } = this.state;

    if (onCheck) {
      onCheck(e);
    }

    if (onChange) {
      onChange(e);
    }

    if (!{}.hasOwnProperty.call(this.props, 'checked')) {
      this.setState({
        checkedState: !checkedState,
      });
    }
  }

  public renderLabel(): JSX.Element {
    const { label, labelPosition, labelProps } = this.props;

    return label && (
      <Typography
        type="b2"
        color="black"
        className="switch_label"
        data-position={labelPosition}
        {...labelProps}
      >
        {label}
      </Typography>
    );
  }

  render(): JSX.Element {
    return null;
  }
}
