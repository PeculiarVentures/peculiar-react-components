import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withAnalytics from '../../containers/analytics_hoc';

/**
 * Button component
 */
class Button extends React.Component {
  /**
   * Construct class name for the root element using options from props
   * @param {{
   *  align: 'left' | 'center' | 'right';
   *  size: 'small' | 'medium' | 'large';
   *  textColor: string;
   *  color: string;
   *  bgType: 'fill' | 'stroke';
   *  className: string;
   *  full: boolean;
   * }} options
   * @return {string}
   */
  static toClassName(options) {
    return classnames(
      'button',
      'round_small',
      'truncate_text',
      'break_word',
      [`text_${options.align}`],
      [`button_${options.size}`],
      [`button_text_${options.textColor}`],
      {
        [`fill_${options.color}`]: options.bgType === 'fill',
        [`stroke_${options.color}`]: options.bgType === 'stroke',
        [`text_${options.textColor}`]: options.textColor,
        button_full: options.full,
      },
      options.className,
    );
  }

  static propTypes = {
    /**
     * Component type one of `fill` or `stroke`.
     * If `fill` - component will have background and border from `color` props.
     * If `stroke` - component will have border from `color` props and transparent background.
     * If `clear` - component will have transparent border and transparent background.
     */
    bgType: PropTypes.oneOf(['fill', 'stroke', 'clear']),
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
    /**
     * The function component for render custom element
     */
    component: PropTypes.func,
    /**
     * Component ref.
     */
    componentRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.any }),
    ]),
    /**
     * Component full-width.
     */
    full: PropTypes.bool,
  };

  static defaultProps = {
    bgType: 'fill',
    color: 'primary',
    align: 'center',
    textColor: 'white',
    size: 'medium',
    href: undefined,
    onClick: null,
    disabled: false,
    className: '',
    component: undefined,
    componentRef: undefined,
    full: false,
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
      className,
      component,
      children,
      componentRef,
      full,
      ...other
    } = this.props;

    const componentProps = Object.assign({
      'data-component': 'button',
      'data-type': bgType,
      className: Button.toClassName(this.props),
      children: (
        <span>
          {children}
        </span>
      ),
    }, other);

    if (component) {
      return component(componentProps);
    }

    const isLink = this.isLink();
    const Component = isLink ? 'a' : 'button';

    return (
      <Component
        ref={componentRef}
        href={isLink ? href : null}
        {...componentProps}
      />
    );
  }
}

export default withAnalytics(Button, 'onClick');
