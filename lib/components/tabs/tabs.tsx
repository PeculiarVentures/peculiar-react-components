import * as React from 'react';
import classnames from 'classnames';
import { Omit } from '../../typings';
import { ITabProps } from './index';

export interface ITabsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'defaultValue'> {
  /**
   * The contents of the Tabs
   */
  children: React.ReactNode;
  /**
   * The text string to use for the default tab selected
   */
  defaultValue?: string | number;
  /**
   * Makes Tabs controllable and selects the tab whose value prop matches this prop
   */
  value?: string | number;
  /**
   * Callback function that is fired when the Tabs selected value changed
   */
  onChange?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * Component color from theme
   */
  color?: string;
  /**
   * Component checked color from theme
   */
  colorOn?: string;
  /**
   * Component content aligment
   */
  align?: 'left' | 'center' | 'right';
  /**
   * The CSS class name of the root element
   */
  className?: string;
}

interface ITabsState {
  value: string | number;
}

export class Tabs extends React.PureComponent<ITabsProps, ITabsState> {
  static defaultProps: Omit<ITabsProps, 'children'> = {
    color: 'grey',
    colorOn: 'primary',
    align: 'center',
  };

  constructor(props: ITabsProps) {
    super(props);

    this.state = {
      value: props.value || props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps: ITabsProps) {
    const { value } = this.props;

    if (value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  onChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const { value: valueEvent } = e.currentTarget;
    const { onChange } = this.props;
    const { value } = this.state;

    if (value !== valueEvent) {
      if (onChange) {
        onChange(e);
      }

      this.setState({
        value: valueEvent,
      });
    }
  }

  private renderChildren(): JSX.Element[] {
    const {
      children,
      color,
      colorOn,
    } = this.props;
    const { value } = this.state;

    return React.Children.map(children, (child: React.ReactElement<ITabProps>) => {
      if (!React.isValidElement(child)) {
        return null;
      }

      return React.cloneElement(child, {
        color,
        colorOn,
        key: child.props.value,
        selected: value === child.props.value,
        onClick: this.onChange,
      });
    });
  }

  render(): JSX.Element {
    const {
      children,
      defaultValue,
      value: valueProp,
      onChange,
      color,
      colorOn,
      align,
      className,
      ...other
    } = this.props;
    const { value } = this.state;

    return (
      <div
        {...other}
        data-component="tabs"
        data-value={value}
        className={classnames([`text_${align}`], className)}
      >
        {this.renderChildren()}
      </div>
    );
  }
}
