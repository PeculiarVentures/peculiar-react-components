import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

import ButtonGroup from '../button_group';
import Button from '../button';
import TooltipPopper from '../tooltip/tooltip_popper';
import Typography, { textTypePropType } from '../typography';

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
 * ButtonSplit component
 */
export default class ButtonSplit extends React.Component {
  static propTypes = {
    /**
     * Inner text for root button
     */
    children: PropTypes.string.isRequired,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Button component type one of `fill` or `stroke`.
     * If `fill` - component will be have background-color from `color` props.
     * If `stroke` - component will be have border-color from `color` props.
     */
    bgType: PropTypes.oneOf(['fill', 'stroke']),
    /**
     * Button component color from theme
     */
    color: PropTypes.string,
    /**
     * Button component text color from theme
     */
    textColor: PropTypes.string,
    /**
     * Button component size
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Disables the buttons if set to true
     */
    disabled: PropTypes.bool,
    /**
     * This is what will be displayed inside the root element.
     */
    /**
     * Actions list to render in collapsed state.
     */
    actions: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string,
      icon: PropTypes.node,
      disabled: PropTypes.bool,
      onClick: PropTypes.func,
      /**
       * Typography type
       */
      type: textTypePropType,
      /**
       * Typography type for tablet
       */
      tabletType: textTypePropType,
      /**
       * Typography type for mobile
       */
      mobileType: textTypePropType,
      /**
       * Component color from theme
       */
      color: PropTypes.string,
      /**
       * Component content aligment
       */
      align: PropTypes.oneOf(['left', 'center', 'right', 'auto']),
      /**
       * The CSS class name of the root element
       */
      className: PropTypes.string,
    })),
    /**
     * Tooltip props if needed.
     */
    tooltip: PropTypes.shape({
      /**
       * If `true`, the popper arrow is shown.
       */
      arrow: PropTypes.bool,
      /**
       * The `referenceObject` is an object that provides an interface
       * compatible with Popper.js and lets you use it as replacement of
       * a real DOM node.
       */
      referenceElement: PropTypes.shape({
        clientHeight: PropTypes.number,
        clientWidth: PropTypes.number,
        getBoundingClientRect: PropTypes.func,
      }).isRequired,
      /**
       * If `true`, the popper is shown.
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
      offset: PropTypes.number,
      /**
       * Color for tooltip component.
       */
      color: PropTypes.string,
      /**
       * Z-index for tooltip component.
       */
      zIndex: PropTypes.number,
      /**
       * Use React portal for render tooltip to another elemenet.
       */
      preventOverflow: PropTypes.bool,
      /**
       * Use preventFlip for prevent flipping tooltip, when no space.
       */
      preventFlip: PropTypes.bool,
      /**
       * Class name for tooltip popper root element
       */
      classNameTooltip: PropTypes.string,
      /**
       * Class name for tooltip popper content element
       */
      classNameTooltipContent: PropTypes.string,
      /**
       * The number of milliseconds to wait before showing the tooltip.
       */
      showDelay: PropTypes.number,
    }),
  }

  static defaultProps = {
    className: undefined,
    actions: [],
    tooltip: {},
    bgType: 'fill',
    color: 'primary',
    textColor: 'white',
    size: 'medium',
    disabled: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.root = React.createRef();
  }

  componentDidMount() {
    window.document.addEventListener('mousedown', this.onDocumentClick);
  }

  componentWillUnmount() {
    window.document.removeEventListener('mousedown', this.onDocumentClick);
  }

  /**
   * onDocumentClick handler
   * @param {SytheticEvent} e
   */
  onDocumentClick = (e) => {
    const { open } = this.state;
    const root = findDOMNode(this.root.current); // eslint-disable-line
    const tooltipRoot = document.querySelector('[data-component="tooltip_popper"]');
    const { target } = e;

    if (tooltipRoot) {
      const isInRoot = contains(root, target);
      const isInTooltip = contains(tooltipRoot, target);

      if ((!isInRoot && !isInTooltip) && open) {
        this.setOpen(false);
      }
    }
  }

  /**
   * onActionClick handler
   * @param {function} handler
   * @param {SyntheticEvent} event
   */
  onActionClick = (handler, event) => {
    if (handler) {
      handler(event);
    }

    this.setOpen(false);
  }

  /**
   * setOpen handler
   * @param {boolean} condition
   */
  setOpen = (condition) => {
    this.setState({
      open: condition,
    });
  }

  renderActions = () => {
    const { actions } = this.props;

    return actions.map((action) => {
      const {
        text,
        onClick,
        disabled,
        icon,
        href,
        ...other
      } = action;

      const Component = href
        ? 'a'
        : 'button';

      return (
        <Component
          onClick={e => this.onActionClick(onClick, e)}
          href={href}
          disabled={disabled}
        >
          {icon}
          <Typography
            {...other}
          >
            {text}
          </Typography>
        </Component>
      );
    });
  }

  renderTooltip = () => {
    const { open } = this.state;
    const { tooltip, actions } = this.props;
    const {
      color,
      placement,
      ...otherTooltip
    } = tooltip;

    if (!actions.length) {
      return null;
    }

    return (
      <React.Fragment>
        <Button
          ref={this.root}
          onClick={() => this.setOpen(!open)}
        >
          icon
        </Button>
        <TooltipPopper
          open={open}
          color={color || 'white'}
          referenceElement={this.root.current || {}}
          placement={placement || 'bottom-end'}
          positionFixed
          usePortal
          {...otherTooltip}
        >
          {this.renderActions()}
        </TooltipPopper>
      </React.Fragment>
    );
  }

  render() {
    const {
      className,
      actions,
      tooltip,
      children,
      ...other
    } = this.props;

    return (
      <ButtonGroup>
        <Button {...other}>
          {children}
        </Button>
        {this.renderTooltip()}
      </ButtonGroup>
    );
  }
}
