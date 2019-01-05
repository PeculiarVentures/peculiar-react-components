import * as React from 'react';
import classnames from 'classnames';
import { SelectDropdown, ISelectItemProps } from './';
import SelectArrowIcon from '../../icons/select_arrow';
import { Omit } from '../../typings';

// tslint:disable-next-line
export interface ISelectProps extends Omit<React.HTMLAttributes<HTMLElement>, 'placeholder' | 'onChange' | 'onFocus' | 'onBlur' | 'onKeyDown'> {
  /**
   * The option elements to populate the select with.
   */
  children: React.ReactNode;
  /**
   * The input name value.
   */
  name?: string;
  /**
   * If true, the select will be disabled.
   */
  disabled?: boolean;
  /**
   * The input value.
   */
  value?: string | number;
  /**
   * The input default value.
   */
  defaultValue?: string;
  /**
   * Callback function fired when a menu item is selected.
   */
  onChange?: (
    e: React.KeyboardEvent<HTMLDivElement> | Event,
    value: string | number,
    name: string,
  ) => void;
  /**
   * Callback function fired when a root element has focus.
   */
  onFocus?: (e: React.FocusEvent<HTMLDivElement>, name: string) => void;
  /**
   * Callback function fired when a root element lost focus.
   */
  onBlur?: (e: React.FocusEvent<HTMLDivElement>, name: string) => void;
  /**
   * Callback function fired when a key pressed on the root element.
   */
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>, name: string) => void;
  /**
   * Element tabIndex.
   */
  tabIndex?: number;
  /**
   * Classname for the root element.
   */
  className?: string;
  /**
   * The short hint displayed in the input before
   * the user enters a value
   */
  placeholder?: string | number;
  /**
   * Properties applied to the input element.
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
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
  /**
   * Select dropdown opened place
   */
  placement?: 'top' | 'bottom';
}

interface ISelectState {
  open: boolean;
  value: string | number;
  valueSelected: null | string | number;
}

export class Select extends React.PureComponent<ISelectProps, ISelectState> {
  public inputNode: HTMLInputElement;
  public dropdownNode: SelectDropdown;
  private blurTimeout: number;
  private childrenValues: (string | number)[];

  public static defaultProps: Omit<ISelectProps, 'children'> = {
    tabIndex: 0,
    bgType: 'stroke',
    color: 'light_grey',
    textColor: 'black',
    colorFocus: 'primary',
    size: 'medium',
    placement: 'bottom',
  };

  constructor(props: ISelectProps) {
    super(props);

    let value: string | number = '';

    if (props.value || typeof props.value === 'number') {
      value = props.value;
    } else if (props.defaultValue || typeof props.defaultValue === 'number') {
      value = props.defaultValue;
    }

    this.state = {
      value,
      open: false,
      valueSelected: null,
    };
  }

  componentWillReceiveProps(nextProps: ISelectProps) {
    const { value } = this.props;

    if (value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  public getValue = (): string => (
    this.inputNode.value
  )

  public setValue = (value: string | number): void => {
    this.setState({
      value,
    });
  }

  private handleItemClick(valueChild: string, e: Event): void {
    const { onChange, name, value } = this.props;

    if (value || value === valueChild) {
      this.setState({
        open: false,
      });

      if (value === valueChild) {
        return;
      }
    } else {
      this.setState({
        value: valueChild,
        open: false,
      });
    }

    if (onChange) {
      onChange(e, valueChild, name);
    }
  }

  private handleClick = (): void => {
    const { disabled } = this.props;
    const { open } = this.state;

    if (disabled) return;

    if (open) {
      this.setState({
        open: false,
      });
    } else {
      this.setState(
        { open: true },
        this.handleItemHovered,
      );
    }
  }

  private handleFocus = (e: React.FocusEvent<HTMLDivElement>): void => {
    const { onFocus, name } = this.props;

    clearTimeout(this.blurTimeout);

    if (onFocus) {
      onFocus(e, name);
    }
  }

  private handleBlur = (e: React.FocusEvent<HTMLDivElement>): void => {
    const { onBlur, name } = this.props;

    clearTimeout(this.blurTimeout);
    this.blurTimeout = window.setTimeout(this.setState.bind(this, { open: false }), 0);

    if (onBlur) {
      onBlur(e, name);
    }
  }

  private handleSpaceEnterPress(e: React.KeyboardEvent<HTMLDivElement>): void {
    const { value, name, onChange } = this.props;
    const {
      valueSelected,
      open,
    } = this.state;

    if (open && valueSelected && !value) {
      this.setState({
        value: valueSelected,
      });
    }

    if (open && valueSelected && onChange) {
      onChange(e, valueSelected, name);
    }

    this.handleClick();
  }

  private handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    const {
      onKeyDown,
      disabled,
      name,
    } = this.props;

    if (!disabled) {
      const { key, keyCode } = e;

      /**
       * escape key press
       * hide dropdown list
       */
      if (key === 'Escape') {
        this.setState({
          open: false,
        });
      }

      /**
       * space or enter key press
       * open/hide dropdown or select element in dropdown list
       */
      if (keyCode === 32 || key === 'Enter') {
        e.preventDefault();
        this.handleSpaceEnterPress(e);
      }

      /**
       * up key press
       * select prev element in dropdown list
       */
      if (key === 'ArrowUp') {
        e.preventDefault();
        this.handleItemHovered('up');
      }

      /**
       * down key press
       * select next element in dropdown list
       */
      if (key === 'ArrowDown') {
        e.preventDefault();
        this.handleItemHovered('down');
      }
    }

    if (onKeyDown) {
      onKeyDown(e, name);
    }
  }

  private handleItemHovered(type?: 'up' | 'down'): void {
    const { valueSelected, open, value } = this.state;

    if (!open) {
      return;
    }

    if (!type) {
      if (value) {
        this.setState(
          { valueSelected: value },
          this.handleScrollToElement,
        );
      } else {
        this.setState(
          { valueSelected: this.childrenValues[0] },
          this.handleScrollToElement,
        );
      }

      return;
    }

    const valueIndex = this.childrenValues.indexOf(valueSelected);
    const prevValue = this.childrenValues[valueIndex - 1];
    const nextValue = this.childrenValues[valueIndex + 1];

    if (type === 'up' && prevValue) {
      this.setState(
        { valueSelected: prevValue },
        this.handleScrollToElement,
      );
    }

    if (type === 'down' && nextValue) {
      this.setState(
        { valueSelected: nextValue },
        this.handleScrollToElement,
      );
    }
  }

  private handleScrollToElement(): void {
    if (this.dropdownNode) {
      this.dropdownNode.scrollToFocusedElement();
    }
  }

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
      onFocus,
      onBlur,
      onKeyDown,
      tabIndex,
      className,
      placeholder,
      inputProps,
      arrowComponent,
      bgType,
      color,
      textColor,
      colorFocus,
      size,
      placement,
      ...other
    } = this.props;
    const {
      open,
      value: valueState,
      valueSelected,
    } = this.state;

    this.childrenValues = [];
    let displayValue: React.ReactNode = placeholder;

    const options = React.Children.map(children, (child: React.ReactElement<ISelectItemProps>) => {
      if (!React.isValidElement(child)) {
        return null;
      }

      const {
        value: valueChild,
        children: childrenChild,
        disabled: disabledChild,
      } = child.props;
      const selected = valueState === valueChild;

      if (selected) {
        displayValue = childrenChild;
      }

      if (!disabledChild) {
        this.childrenValues.push(valueChild);
      }

      return React.cloneElement(child, {
        selected,
        size,
        colorFocus,
        color: textColor,
        children: childrenChild,
        value: valueChild,
        onClick: disabledChild ? undefined : this.handleItemClick.bind(this, valueChild),
        hasFocus: valueSelected === valueChild,
      });
    });
    const mustOpen = open && options && options.length > 0;

    return (
      <div
        {...other}
        data-component="select"
        data-type={bgType}
        data-disabled={disabled}
        data-open={mustOpen}
        data-placement={placement}
        className={classnames('select', className)}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        tabIndex={disabled ? undefined : tabIndex}
      >
        <div
          // tslint:disable-next-line
          className={classnames(
            'select_field',
            'truncate_text',
            'round_small',
            [`select_field_${size}`],
            [`select_field_focus_${colorFocus}`],
            [`stroke_${color}`],
            {
              [`fill_${color}`]: bgType === 'fill',
              fill_white: bgType === 'stroke',
              select_field_empty: !valueState,
            },
          )}
          onClick={this.handleClick}
        >
          <span
            // tslint:disable-next-line
            className={classnames(
              [`text_${textColor}`],
            )}
          >
            {displayValue}
          </span>
        </div>
        <input
          {...inputProps}
          type="hidden"
          value={valueState}
          name={name}
          ref={(node) => { this.inputNode = node; }}
          disabled={disabled}
        />
        {this.renderOpenButton()}
        {(options && options.length > 0) && ( // tslint:disable-line
          <SelectDropdown
            className="select_dropdown"
            ref={(node) => { this.dropdownNode = node; }}
            bgType={bgType}
            color={color}
            colorFocus={colorFocus}
          >
            {options}
          </SelectDropdown>
        )}
      </div>
    );
  }
}
