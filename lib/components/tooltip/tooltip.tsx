import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { TooltipPopper, PlacementType } from './index';
import { Omit } from '../../typings';

function contains(root: Element | Text, n: Node): boolean {
  let node = n;

  while (node) {
    if (node === root) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}

export interface ITooltipProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Tooltip reference element.
   */
  children: React.ReactElement<any>;
  /**
   * This is what will be displayed inside the tooltip.
   */
  content: React.ReactNode;
  /**
   * Which action cause tooltip shown.
   */
  action?: 'click' | 'hover' | 'focus' | 'none';
  /**
   * If `true`, the tooltip arrow is shown.
   */
  arrow?: boolean;
  /**
   * Tooltip placement.
   */
  placement?: PlacementType;
  /**
   * Set this to `true` if you want popper to position it self in `fixed` mode.
   */
  positionFixed?: boolean;
  /**
   * Parent component for tooltip and reference element.
   */
  component?: string;
  /**
   * Padding from tooltip to reference element in `px`.
   */
  offset?: number;
  /**
   * If `true`, the tooltip is shown.
   */
  open?: boolean;
  /**
   * Callback fired when the tooltip requests to be closed (works only with `open` prop).
   */
  onClose?: (e?: MouseEvent) => void;
  /**
   * The number of milliseconds to wait before automatically calling
   * the onClose function. onClose should then set the state of
   * the open prop to hide the Tooltip. This behavior is disabled by
   * default with the null value.
   */
  autoHideDuration?: number;
  /**
   * Color for tooltip component
   */
  color?: string;
}

interface ITooltipState {
  open: boolean;
}

export class Tooltip extends React.Component<ITooltipProps, ITooltipState> {
  private focusTime: number = 0;
  private preClickTime: number = 0;
  private preTouchTime: number = 0;
  private parentNode: Element = null;
  private timerAutoHide: number = null;

  public static defaultProps: Omit<ITooltipProps, 'children' | 'content'> = {
    action: 'hover',
    arrow: true,
    placement: 'auto',
    positionFixed: true,
    component: 'div',
    offset: 10,
    autoHideDuration: 0,
    color: 'white',
  };

  constructor(props: ITooltipProps) {
    super(props);

    this.state = {
      open: !!props.open,
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
  }

  componentDidMount() {
    if (this.isClickToHide()) {
      window.document.addEventListener('mousedown', this.onDocumentClick);
    }
  }

  componentWillReceiveProps(nextProps: ITooltipProps) {
    const { open } = nextProps;

    if (open !== undefined) {
      this.setState({
        open,
      });

      if (open) {
        this.setAutoHideTimer();
      } else {
        clearTimeout(this.timerAutoHide);
      }
    }
  }

  componentWillUnmount() {
    window.document.removeEventListener('mousedown', this.onDocumentClick);
  }

  onFocus(e: React.FocusEvent<HTMLElement>): void {
    this.fireEvents('onFocus', e);

    this.focusTime = Date.now();
    this.setOpen(true);
  }

  onBlur(e: React.FocusEvent<HTMLElement>): void {
    this.fireEvents('onBlur', e);

    this.setOpen(false);
  }

  onClick(e: React.MouseEvent<HTMLElement, MouseEvent>): void {
    const { open } = this.state;

    this.fireEvents('onClick', e);

    /**
     * focus will trigger click
     */
    if (this.focusTime) {
      let preTime: number;

      if (this.preClickTime && this.preTouchTime) {
        preTime = Math.min(this.preClickTime, this.preTouchTime);
      } else if (this.preClickTime) {
        preTime = this.preClickTime;
      } else if (this.preTouchTime) {
        preTime = this.preTouchTime;
      }

      if (Math.abs(preTime - this.focusTime) < 20) {
        return;
      }

      this.focusTime = 0;
    }

    this.preClickTime = 0;
    this.preTouchTime = 0;

    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (this.isClickToHide() && open || !open && this.isClickToShow()) {
      this.setOpen(!open);
    }
  }

  onMouseDown(e: React.MouseEvent<HTMLElement, MouseEvent>): void {
    this.fireEvents('onMouseDown', e);
    this.preClickTime = Date.now();
  }

  onMouseEnter(): void {
    this.setOpen(true);
  }

  onMouseLeave(): void {
    this.setOpen(false);
  }

  onTouchStart(e: React.TouchEvent<HTMLElement>): void {
    this.fireEvents('onTouchStart', e);
    this.preTouchTime = Date.now();
  }

  onDocumentClick(e: MouseEvent): void {
    const { onClose } = this.props;
    const { open } = this.state;
    const { target } = e;
    const root = findDOMNode(this);

    if (!contains(root, target as Node) && open) {
      this.setOpen(false);

      if ('open' in this.props && onClose) {
        onClose(e);
      }
    }
  }

  setOpen(value: boolean): void {
    const { open } = this.state;

    if (open !== value) {
      if (!('open' in this.props)) {
        this.setState({
          open: value,
        });
      }
    }
  }

  private setAutoHideTimer(duration?: number): void {
    const { onClose, autoHideDuration } = this.props;

    if (!onClose || !autoHideDuration) {
      return;
    }

    clearTimeout(this.timerAutoHide);

    this.timerAutoHide = window.setTimeout(
      () => {
        if (!onClose || !autoHideDuration) {
          return;
        }

        onClose();
      },
      duration || autoHideDuration || 0,
    );
  }

  fireEvents(
    type: 'onClick' | 'onMouseDown' | 'onTouchStart' | 'onFocus' | 'onBlur',
    e: any,
  ): void {
    const { children } = this.props;
    const callback: any = this.props[type];
    const childCallback = children.props[type];

    if (childCallback) {
      childCallback(e);
    }

    if (callback) {
      callback(e);
    }
  }

  createTwoChains(event: 'onClick' | 'onMouseDown' | 'onTouchStart' | 'onFocus' | 'onBlur') {
    const childPros = this.props.children.props;

    if (childPros[event] && this.props[event]) {
      return (this as any)[`fire${event}`];
    }

    return childPros[event] || this.props[event];
  }

  isClickToShow(): boolean {
    const { action } = this.props;

    return action.indexOf('click') !== -1;
  }

  isClickToHide(): boolean {
    const { action } = this.props;

    return action.indexOf('click') !== -1;
  }

  isMouseEnterToShow(): boolean {
    const { action } = this.props;

    return action.indexOf('hover') !== -1;
  }

  isMouseLeaveToHide(): boolean {
    const { action } = this.props;

    return action.indexOf('hover') !== -1;
  }

  isFocusToShow(): boolean {
    const { action } = this.props;

    return action.indexOf('focus') !== -1;
  }

  isBlurToHide(): boolean {
    const { action } = this.props;

    return action.indexOf('focus') !== -1;
  }

  render(): JSX.Element {
    const {
      children,
      content,
      action,
      arrow,
      placement,
      positionFixed,
      component,
      offset,
      open: openProp,
      onClose,
      autoHideDuration,
      color,
      ...other
    } = this.props;
    const { open } = this.state;
    const newWrapperProps: React.HTMLAttributes<HTMLElement> = { ...other };
    const newChildProps: React.HTMLAttributes<HTMLElement> = {};

    if (this.isClickToHide() || this.isClickToShow()) {
      newChildProps.onClick = this.onClick;
      newChildProps.onMouseDown = this.onMouseDown;
      newChildProps.onTouchStart = this.onTouchStart;
    } else {
      newChildProps.onClick = this.createTwoChains('onClick');
      newChildProps.onMouseDown = this.createTwoChains('onMouseDown');
      newChildProps.onTouchStart = this.createTwoChains('onTouchStart');
    }

    if (this.isMouseEnterToShow()) {
      newWrapperProps.onMouseEnter = this.onMouseEnter;
    }

    if (this.isMouseLeaveToHide()) {
      newWrapperProps.onMouseLeave = this.onMouseLeave;
    }

    if (this.isFocusToShow() || this.isBlurToHide()) {
      newChildProps.onFocus = this.onFocus;
      newChildProps.onBlur = this.onBlur;
    } else {
      newChildProps.onFocus = this.createTwoChains('onFocus');
      newChildProps.onBlur = this.createTwoChains('onBlur');
    }

    return React.createElement(
      component,
      {
        ...newWrapperProps,
        'data-component': 'tooltip',
        ref: (node) => { this.parentNode = node; },
      },
      // tslint:disable-next-line
      <React.Fragment>
        {React.cloneElement(children, newChildProps)}
        <TooltipPopper
          open={open}
          referenceElement={this.parentNode || {} as any}
          placement={placement}
          positionFixed={positionFixed}
          arrow={arrow}
          offset={offset}
          color={color}
        >
          {content}
        </TooltipPopper>
      </React.Fragment>,
    );
  }
}
