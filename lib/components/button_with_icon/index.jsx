import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DeleteIcon from '../icons/delete';
import ClearIcon from '../icons/clear';
import UndoIcon from '../icons/undo';
import CrossIcon from '../icons/cross';
import ArrowLeftIcon from '../icons/arrow_left';
import ArrowRightIcon from '../icons/arrow_right';
import AddIcon from '../icons/add';
import Button from '../button';
import RotateIcon from '../icons/rotate';

export default class ButtonWithIcon extends PureComponent {
  static propTypes = {
    /**
     * The tabIndex attribute for button
     */
    tabIndex: PropTypes.number,
    /**
     * Component type one of `fill` or `stroke`.
     * If `fill` - component will be have background-color from `color` props.
     * If `stroke` - component will be have border-color from `color` props.
     */
    bgType: PropTypes.oneOf(['fill', 'stroke']),
    /**
     * Component color from theme
     */
    color: PropTypes.string,
    /**
     * Component content aligment
     */
    align: PropTypes.oneOf(['left', 'center', 'right']),
    /**
     * Component text color from theme
     */
    textColor: PropTypes.string,
    /**
     * Component size
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * The URL to link to when the button is clicked
     */
    href: PropTypes.string,
    /**
     * Callback function fired when the button is clicked
     */
    onClick: PropTypes.func,
    /**
     * Disables the button if set to true
     */
    disabled: PropTypes.bool,
    /**
     * The CSS class name of the root element
     */
    className: PropTypes.string,
    /**
     * Type of icon
     */
    icon: PropTypes.oneOf([
      'delete',
      'clear',
      'rotate',
      'undo',
      'cross',
      'arrow_left',
      'arrow_right',
      'add',
    ]),
    /**
     * Icon positon
     */
    iconPosition: PropTypes.oneOf(['left', 'right']),
    /**
     * Icon color
     */
    iconColor: PropTypes.string,
    /**
     * This is what will be displayed inside the button
     */
    iconClassName: PropTypes.string,
    /**
     * Properties applied to the input element.
     */
    iconProps: PropTypes.oneOfType([
      PropTypes.object,
    ]),
    /**
     * This is what will be displayed inside the button
     */
    children: PropTypes.node,
  };

  static defaultProps = {
    tabIndex: 0,
    bgType: 'fill',
    color: 'primary',
    align: 'center',
    textColor: 'white',
    size: 'medium',
    href: undefined,
    onClick: null,
    disabled: false,
    className: '',
    icon: 'delete',
    iconPosition: 'left',
    iconColor: 'wrong',
    iconClassName: '',
    children: null,
    iconProps: {},
  };

  renderIcon() {
    const {
      icon,
      iconColor,
      iconClassName,
      iconProps,
    } = this.props;
    const className = classNames(iconClassName, `fill_${iconColor}`, `${icon}_icon`, `stroke_${iconColor}`);

    switch (icon) {
      case 'delete':
        return (
          <DeleteIcon
            className={className}
            {...iconProps}
          />
        );

      case 'clear':
        return (
          <ClearIcon
            className={className}
            {...iconProps}
          />
        );

      case 'rotate':
        return (
          <RotateIcon
            className={className}
            {...iconProps}
          />
        );

      case 'undo':
        return (
          <UndoIcon
            className={className}
            {...iconProps}
          />
        );

      case 'cross':
        return (
          <CrossIcon
            className={className}
            {...iconProps}
          />
        );

      case 'arrow_left':
        return (
          <ArrowLeftIcon
            className={className}
            {...iconProps}
          />
        );

      case 'arrow_right':
        return (
          <ArrowRightIcon
            className={className}
            {...iconProps}
          />
        );

      case 'add':
        return (
          <AddIcon
            className={className}
            {...iconProps}
          />
        );

      default:
        return null;
    }
  }

  render() {
    const {
      iconPosition,
      children,
      ...other
    } = this.props;

    return (
      <Button
        {...other}
      >
        {iconPosition === 'left' && this.renderIcon()}
        {children}
        {iconPosition === 'right' && this.renderIcon()}
      </Button>
    );
  }
}
