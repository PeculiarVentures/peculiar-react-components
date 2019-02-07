import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * SelectDropdown component
 */
export default class SelectDropdown extends PureComponent {
  static propTypes = {
    /**
     * This is what will be displayed inside the dropdown list
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element
     */
    className: PropTypes.string,
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
     * Component focus color from theme
     */
    colorFocus: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    className: '',
    bgType: 'fill',
    color: 'light_grey',
    colorFocus: 'primary',
  };

  /**
   * Get focused element from root element
   * @returns {object|null}
   */
  getFocusedElement() {
    return this.dropdownNode.querySelector('[data-has-focus="true"]');
  }

  dropdownNode = null;

  /**
   * Scroll root element to focused element
   */
  scrollToFocusedElement() {
    const focusedElement = this.getFocusedElement();

    if (focusedElement) {
      this.dropdownNode.scrollTop = focusedElement.offsetTop;
    }
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      children,
      className,
      bgType,
      color,
      colorFocus,
      ...other
    } = this.props;

    return (
      <div
        data-component="select_dropdown"
        className={classNames(
          'select_dropdown',
          [`stroke_${colorFocus}`],
          {
            [`fill_${color}`]: bgType === 'fill',
            fill_white: bgType === 'stroke',
          },
          'round_small',
          className,
        )}
        ref={(node) => { this.dropdownNode = node; }}
        {...other}
      >
        {children}
      </div>
    );
  }
}
