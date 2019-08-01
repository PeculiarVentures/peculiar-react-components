import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withAnalytics from '../../containers/analytics_hoc';

/**
 * Button component
 */
class Button extends PureComponent {
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
     * This is what will be displayed inside the button
     */
    children: PropTypes.node.isRequired,
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
  };

  /**
   * If component is link
   * @return {boolean}
   */
  isLink() {
    const { disabled, href } = this.props;

    return href && !disabled;
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      bgType,
      color,
      align,
      textColor,
      size,
      href,
      children,
      className,
      ...other
    } = this.props;
    const isLink = this.isLink();
    const Component = isLink ? 'a' : 'button';

    return (
      <Component
        data-component="button"
        data-type={bgType}
        href={isLink ? href : null}
        className={classNames(
          'button',
          'round_small',
          [`text_${align}`],
          [`button_${size}`],
          [`button_${bgType}_${color}`],
          [`button_text_${textColor}`],
          className,
        )}
        {...other}
      >
        {children}
      </Component>
    );
  }
}

export default withAnalytics(Button, 'onClick');
