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
    this._scrollToSelectedElement();
  }

  getFocusedElement() {
    return this._refRootElement.current.querySelector('[data-focused="true"]');
  }

  getSelectedElement() {
    return this._refRootElement.current.querySelector('[aria-selected="true"]');
  }

  _refRootElement = React.createRef();

  _scrollToSelectedElement() {
    const el = this.getSelectedElement();

    this._scrollToElement(el);
  }

  _scrollToElement(el) {
    if (el) {
      this._refRootElement.current.scrollTop = el.offsetTop;
    }
  }

  clickToFocusedElement() {
    const el = this.getFocusedElement();

    if (el) {
      el.click();
    }
  }

  focusOption(type) {
    const { children } = this.props;
    const focusedElement = this.getFocusedElement();
    let currentIndex = -1;
    let nextIndex;

    if (!focusedElement) {
      const selectedElement = this.getSelectedElement();

      if (selectedElement) {
        currentIndex = Number(selectedElement.getAttribute('data-option-index'));
      }
    } else {
      currentIndex = Number(focusedElement.getAttribute('data-option-index'));
      focusedElement.setAttribute('data-focused', 'false');
    }

    if (type === 'prev') {
      nextIndex = currentIndex - 1;

      if (nextIndex < 0) {
        nextIndex = children.length - 1;
      }
    } else {
      nextIndex = currentIndex + 1;

      if (nextIndex > children.length - 1) {
        nextIndex = 0;
      }
    }

    const nextElement = this._refRootElement.current.querySelector(`[data-option-index="${nextIndex}"]`);

    if (nextElement) {
      nextElement.setAttribute('data-focused', 'true');
      this._scrollToElement(nextElement);
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
        ref={this._refRootElement}
        role="listbox"
        {...other}
      >
        {children}
      </ul>
    );
  }
}
