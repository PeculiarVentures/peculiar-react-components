import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ButtonGroup from '../button_group';
import Button from '../button';
import Tooltip from '../tooltip';
import Typography from '../typography';

const { children: typoChildren, ...typographyProps } = Typography.propTypes;
const { children: tooltipChildren, content: tooltipContent, ...tooltipProps } = Tooltip.propTypes;

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

    this.tooltip = React.createRef();
  }

  onActionClick = (action, event) => {
    const { onClick } = action;

    if (this.tooltip.current) {
      this.tooltip.current.setOpen(false);
    }

    if (onClick) {
      onClick(event);
    }
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
    const { tooltip, actions } = this.props;
    const { action, color, ...otherTooltip } = tooltip;

    if (!actions.length) {
      return null;
    }

    return (
      <Tooltip
        ref={this.tooltip}
        action={action || 'click'}
        content={this.renderActions()}
        color={color || 'white'}
        {...otherTooltip}
      >
        <Button>
          icon
        </Button>
      </Tooltip>
    );
  }

  render() {
    const {
      className,
      actions,
      tooltip,
      ...other
    } = this.props;

    return (
      <div
        data-component="button_split"
        className={classnames('button-split', className)}
        {...other}
      >
        <ButtonGroup>
          <Button {...other}>Button text</Button>
          {this.renderTooltip()}
        </ButtonGroup>
      </div>
    );
  }
}
