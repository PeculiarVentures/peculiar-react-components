import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

import ButtonGroup from '../button_group';
import Button from '../button';
import TooltipPopper from '../tooltip/tooltip_popper';
import Typography from '../typography';

const { children: typoChildren, ...typographyProps } = Typography.propTypes;
const {
  children: tooltipChildren,
  referenceElement: tooltipContent,
  ...tooltipProps
} = TooltipPopper.propTypes;

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
    ...Button.propTypes,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Actions list to render in collapsed state.
     */
    actions: PropTypes.arrayOf(PropTypes.shape({
      ...typographyProps,
      text: PropTypes.string.isRequired,
      href: PropTypes.string,
      icon: PropTypes.node,
      disabled: PropTypes.bool,
      onClick: PropTypes.func,
    })),
    /**
     * Tooltip props if needed.
     */
    tooltip: PropTypes.shape(tooltipProps),
  }

  static defaultProps = {
    className: '',
    actions: [],
    tooltip: {},
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
   * @param {object} action
   * @param {SyntheticEvent} event
   */
  onActionClick = (action, event) => {
    const { onClick } = action;

    if (action.disabled) {
      return null;
    }

    if (onClick) {
      onClick(event);
    }

    this.setOpen(false);

    return null;
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

      const TextComponent = (
        <Typography
          {...other}
        >
          {text}
        </Typography>
      );

      const Component = href ? (
        <a
          href={href}
        >
          {TextComponent}
        </a>
      ) : TextComponent;

      return (
        <button
          onClick={e => this.onActionClick(action, e)}
          disabled={disabled}
        >
          {icon && icon}
          {Component}
        </button>
      );
    });
  }

  renderTooltip = () => {
    const { open } = this.state;
    const { tooltip, actions } = this.props;
    const {
      action,
      color,
      placement,
      ...otherTooltip
    } = tooltip;

    if (!actions.length) {
      return null;
    }

    return (
      <React.Fragment>
        <Button onClick={() => this.setOpen(!open)}>
          icon
        </Button>
        <TooltipPopper
          open={open}
          action={action || 'click'}
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
      <div
        data-component="button_split"
        ref={this.root}
        style={{
          display: 'inline-block',
        }}
      >
        <ButtonGroup>
          <Button {...other}>
            {children}
          </Button>
          {this.renderTooltip()}
        </ButtonGroup>
      </div>
    );
  }
}
