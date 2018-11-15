import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import TooltipPopper from './tooltip_popper';

/**
 * Check if node is root element
 * @param {object} root
 * @param {object} n
 */
function contains(root, n) {
  let node = n;

  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}

/**
 * Tooltip component
 */
export default class Tooltip extends Component {
  static propTypes = {
    /**
     * Tooltip reference element.
     */
    children: PropTypes.element.isRequired,
    /**
     * This is what will be displayed inside the tooltip.
     */
    content: PropTypes.node.isRequired,
    /**
     * Which action cause tooltip shown.
     */
    action: PropTypes.oneOf([
      'click',
      'hover',
      'focus',
    ]),
    /**
     * If `true`, the tooltip arrow is shown.
     */
    arrow: PropTypes.bool,
    /**
     * Tooltip placement.
     */
    placement: PropTypes.oneOf([
      'auto-start',
      'auto',
      'auto-end',
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-end',
      'bottom',
      'bottom-start',
      'left-end',
      'left',
      'left-start',
    ]),
    /**
     * Set this to `true` if you want popper to position it self in `fixed` mode.
     */
    positionFixed: PropTypes.bool,
    /**
     * Parent component for tooltip and reference element.
     */
    component: PropTypes.string,
    /**
     * Padding from tooltip to reference element in `px`.
     */
    offset: PropTypes.number,
    /**
     * If `true`, the tooltip is shown.
     */
    open: PropTypes.bool, // eslint-disable-line
    /**
     * Callback fired when the tooltip to be close (works only with `open` prop)
     */
    onClose: PropTypes.func,
  }

  static defaultProps = {
    action: 'hover',
    arrow: true,
    placement: 'auto',
    positionFixed: true,
    component: 'div',
    offset: 10,
    onClose() {},
  }

  constructor(props) {
    super();

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

    this.focusTime = 0;
    this.preClickTime = 0;
    this.preTouchTime = 0;
    this.parentNode = null;
  }

  componentDidMount() {
    if (this.isClickToHide()) {
      window.document.addEventListener('mousedown', this.onDocumentClick);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { open } = nextProps;

    if (open !== undefined) {
      this.setState({
        open,
      });
    }
  }

  componentWillUnmount() {
    window.document.removeEventListener('mousedown', this.onDocumentClick);
  }

  /**
   * onFocus handler
   * @param {SytheticEvent} e
   */
  onFocus(e) {
    this.fireEvents('onFocus', e);

    this.focusTime = Date.now();
    this.setOpen(true);
  }

  /**
   * onBlur handler
   * @param {SytheticEvent} e
   */
  onBlur(e) {
    this.fireEvents('onBlur', e);

    this.setOpen(false);
  }

  /**
   * onClick handler
   * @param {SytheticEvent} e
   */
  onClick(e) {
    const { open } = this.state;

    this.fireEvents('onClick', e);

    // focus will trigger click
    if (this.focusTime) {
      let preTime;

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

  /**
   * onMouseDown handler
   * @param {SytheticEvent} e
   */
  onMouseDown(e) {
    this.fireEvents('onMouseDown', e);
    this.preClickTime = Date.now();
  }

  /**
   * onMouseEnter handler
   * @param {SytheticEvent} e
   */
  onMouseEnter() {
    this.setOpen(true);
  }

  /**
   * onMouseLeave handler
   * @param {SytheticEvent} e
   */
  onMouseLeave() {
    this.setOpen(false);
  }

  /**
   * onTouchStart handler
   * @param {SytheticEvent} e
   */
  onTouchStart(e) {
    this.fireEvents('onTouchStart', e);
    this.preTouchTime = Date.now();
  }

  /**
   * onDocumentClick handler
   * @param {SytheticEvent} e
   */
  onDocumentClick(e) {
    const { onClose } = this.props;
    const { open } = this.state;
    const { target } = e;
    const root = findDOMNode(this); // eslint-disable-line

    if (!contains(root, target) && open) {
      this.setOpen(false);

      if ('open' in this.props) {
        onClose(e);
      }
    }
  }

  /**
   * Handler for show/hide tooltip
   * @param {boolean} value
   */
  setOpen(value) {
    const { open } = this.state;

    if (open !== value) {
      if (!('open' in this.props)) {
        this.setState({
          open: value,
        });
      }
    }
  }

  /**
   * Call callback event props
   * @param {string} type
   * @param {SytheticEvent} e
   */
  fireEvents(type, e) {
    const { children } = this.props;
    const callback = this.props[type];
    const childCallback = children.props[type];

    if (childCallback) {
      childCallback(e);
    }

    if (callback) {
      callback(e);
    }
  }

  createTwoChains(event) {
    const childPros = this.props.children.props;
    const props = this.props;

    if (childPros[event] && props[event]) {
      return this[`fire${event}`];
    }

    return childPros[event] || props[event];
  }

  /**
   * Check if action prop have `click` string for show tooltip
   * @return {boolean}
   */
  isClickToShow() {
    const { action } = this.props;

    return action.indexOf('click') !== -1;
  }

  /**
   * Check if action prop have `click` string for hide tooltip
   * @return {boolean}
   */
  isClickToHide() {
    const { action } = this.props;

    return action.indexOf('click') !== -1;
  }

  /**
   * Check if action prop have `hover` string for show tooltip
   * @return {boolean}
   */
  isMouseEnterToShow() {
    const { action } = this.props;

    return action.indexOf('hover') !== -1;
  }

  /**
   * Check if action prop have `hover` string for hide tooltip
   * @return {boolean}
   */
  isMouseLeaveToHide() {
    const { action } = this.props;

    return action.indexOf('hover') !== -1;
  }

  /**
   * Check if action prop have `focus` string for show tooltip
   * @return {boolean}
   */
  isFocusToShow() {
    const { action } = this.props;

    return action.indexOf('focus') !== -1;
  }

  /**
   * Check if action prop have `focus` string for hide tooltip
   * @return {boolean}
   */
  isBlurToHide() {
    const { action } = this.props;

    return action.indexOf('focus') !== -1;
  }

  /**
   * Handler for delay timer for click current work
   */
  clearDelayTimer() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      children,
      content,
      action,
      arrow,
      placement,
      positionFixed,
      component: C,
      offset,
      open: openProp,
      onClose,
      ...other
    } = this.props;
    const { open } = this.state;
    const newWrapperProps = Object.assign({}, other);
    const newChildProps = {};

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

    return (
      <C
        {...newWrapperProps}
        ref={(node) => { this.parentNode = node; }}
        data-component="tooltip"
      >
        {React.cloneElement(children, newChildProps)}
        <TooltipPopper
          open={open}
          referenceElement={this.parentNode || {}}
          placement={placement}
          positionFixed={positionFixed}
          arrow={arrow}
          offset={offset}
        >
          {content}
        </TooltipPopper>
      </C>
    );
  }
}
