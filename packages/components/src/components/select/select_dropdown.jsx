import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * SelectDropdown component
 */
export default class SelectDropdown extends React.PureComponent {
  static propTypes = {
    /**
     * This is what will be displayed inside the dropdown list.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Component color from theme.
     */
    color: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    className: '',
    color: 'white',
  };

  componentDidMount() {
    this.scrollToSelectedElement();
  }

  getFocusedElement() {
    return this._refRootElement.current.querySelector('[data-focused="true"]');
  }

  getSelectedElement() {
    return this._refRootElement.current.querySelector('[aria-selected="true"]');
  }

  _refRootElement = React.createRef();

  scrollToFocusedElement() {
    const el = this.getFocusedElement();

    this.scrollToElement(el);
  }

  scrollToSelectedElement() {
    const el = this.getSelectedElement();

    this.scrollToElement(el);
  }

  scrollToElement(el) {
    if (el) {
      this._refRootElement.current.scrollTop = el.offsetTop;
    }
  }

  render() {
    const {
      children,
      className,
      color,
      ...other
    } = this.props;

    return (
      <ul
        data-component="select_dropdown"
        className={classNames(
          'select_dropdown',
          [`fill_${color}`],
          'round_small',
          'shadow',
          className,
        )}
        ref={this.refRootElement}
        role="listbox"
        {...other}
      >
        {children}
      </ul>
    );
  }
}
