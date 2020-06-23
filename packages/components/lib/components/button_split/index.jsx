import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ButtonGroup from '../button_group';
import Button from '../button';
import TooltipPopper from '../tooltip/tooltip_popper';
import Portal from '../../containers/portal';
import Typography, { textTypePropType } from '../typography';
import SelectArrowIcon from '../icons/select_arrow';

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
     * Component type one of `fill` or `stroke`.
     * If `fill` - component will have background and border from `color` props.
     * If `stroke` - component will have border from `color` props and transparent background.
     * If `clear` - component will have transparent border and transparent background.
     */
    bgType: PropTypes.oneOf(['fill', 'stroke', 'clear']),
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
     * Component full-width.
     */
    full: PropTypes.bool,
    /**
     * Actions list to render in collapsed state.
     */
    actions: PropTypes.arrayOf(PropTypes.shape({
      /**
       * This is what will be displayed inside the button
       */
      text: PropTypes.string.isRequired,
      /**
       * The URL to link to when the button is clicked
       */
      href: PropTypes.string,
      /**
       * The target to link
       */
      target: PropTypes.string,
      /**
       * Disables the button if set to true
       */
      disabled: PropTypes.bool,
      /**
       * Callback function fired when the button is clicked
       */
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
     * If `true`, the tooltip overlay will show for opened tooltip.
     */
    overlay: PropTypes.bool,
  }

  static defaultProps = {
    className: undefined,
    actions: [],
    bgType: 'fill',
    color: 'primary',
    textColor: 'white',
    size: 'medium',
    disabled: false,
    overlay: false,
    full: false,
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
    window.document.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    window.document.removeEventListener('mousedown', this.onDocumentClick);
    window.document.removeEventListener('keyup', this.onKeyUp);
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

  onKeyUp = (e) => {
    const { open } = this.state;

    if (e.code === 'Escape' && open) {
      this.setOpen(false);
    }
  }

  /**
   * onActionClick handler
   * @param {function} handler
   * @param {SyntheticEvent} event
   */
  onClickAction(event, handler) {
    if (handler) {
      handler(event);
    }

    this.setOpen(false);
  }

  onClickButtonSplit = () => {
    const { open } = this.state;

    this.setOpen(!open);
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
        href,
        target,
        ...other
      } = action;

      const Component = href
        ? 'a'
        : 'button';

      return (
        <Component
          key={text}
          onClick={e => this.onClickAction(e, onClick)}
          href={href}
          target={href ? target : undefined}
          disabled={disabled}
          className="button_split_action"
        >
          <Typography
            type="b2"
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
    const { actions, disabled } = this.props;

    if (!actions.length) {
      return null;
    }

    return (
      <React.Fragment>
        <Button
          componentRef={this.root}
          onClick={this.onClickButtonSplit}
          className="button_split"
          disabled={disabled}
        >
          <SelectArrowIcon
            className="button_split_action_icon"
          />
        </Button>
        <TooltipPopper
          placement="bottom-end"
          color="white"
          classNameTooltip="button_split_tooltip"
          classNameTooltipContent="button_split_tooltip_content"
          open={open}
          referenceElement={this.root.current || {}}
          positionFixed
          usePortal
          preventOverflow={false}
        >
          {this.renderActions()}
        </TooltipPopper>
      </React.Fragment>
    );
  }

  renderOverlay = () => {
    const { overlay } = this.props;
    const { open } = this.state;

    if (overlay) {
      return (
        <Portal>
          <div
            data-open={open}
            className={classnames(
              'tooltip_overlay',
              'fill_black',
            )}
            style={{
              opacity: open ? 0.3 : 0,
            }}
          />
        </Portal>
      );
    }

    return null;
  }

  render() {
    const {
      actions,
      children,
      overlay,
      className,
      bgType,
      color,
      textColor,
      size,
      disabled,
      full,
      ...other
    } = this.props;

    return (
      <ButtonGroup
        className={className}
        bgType={bgType}
        color={color}
        textColor={textColor}
        size={size}
        disabled={disabled}
        full={full}
      >
        <Button
          {...other}
        >
          {children}
        </Button>
        {this.renderTooltip()}
        {this.renderOverlay()}
      </ButtonGroup>
    );
  }
}
