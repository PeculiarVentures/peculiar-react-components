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

  _isChildDisabled(childIndex) {
    const { children } = this.props;
    const child = children[childIndex];

    if (child && child.props) {
      return child.props.disabled;
    }

    return false;
  }

  /**
   * Returns next not disabled element focus index using decrease strategy.
   * @param {number} focusedIndex - current focused element index.
   * @returns {number}
   */
  _getPrevFocusIndex(focusedIndex) {
    const { children } = this.props;

    const getIndex = (index) => {
      let nextFocusedIndex;

      if (index - 1 < 0) {
        nextFocusedIndex = children.length - 1;
      } else {
        nextFocusedIndex = index - 1;
      }

      // Prevent `Maximum call stack size`.
      if (index === nextFocusedIndex) {
        return focusedIndex;
      }

      const isNextFocusedChildDisabled = this._isChildDisabled(nextFocusedIndex);

      if (isNextFocusedChildDisabled) {
        return getIndex(nextFocusedIndex);
      }

      return nextFocusedIndex;
    };

    return getIndex(focusedIndex);
  }

  /**
   * Returns next not disabled element focus index using increase strategy.
   * @param {number} focusedIndex - current focused element index.
   * @returns {number}
   */
  _getNextFocusIndex(focusedIndex) {
    const { children } = this.props;

    const getIndex = (index) => {
      let nextFocusedIndex;

      if (index + 1 > children.length - 1) {
        nextFocusedIndex = 0;
      } else {
        nextFocusedIndex = index + 1;
      }

      // Prevent `Maximum call stack size`.
      if (index === nextFocusedIndex) {
        return focusedIndex;
      }

      const isNextFocusedChildDisabled = this._isChildDisabled(nextFocusedIndex);

      if (isNextFocusedChildDisabled) {
        return getIndex(nextFocusedIndex);
      }

      return nextFocusedIndex;
    };

    return getIndex(focusedIndex);
  }

  focusOption(type) {
    const selectedElement = this.getSelectedElement();
    const focusedElement = this.getFocusedElement();
    let selectedIndex;
    let focusedIndex;

    if (selectedElement) {
      selectedIndex = Number(selectedElement.getAttribute('data-option-index'));
    }

    if (focusedElement) {
      focusedIndex = Number(focusedElement.getAttribute('data-option-index'));
    }

    // Use `selectedIndex` if `focusedIndex` not defined.
    if (typeof focusedIndex !== 'number') {
      focusedIndex = selectedIndex || -1;
    }

    let nextFocusedIndex;

    if (type === 'prev') {
      nextFocusedIndex = this._getPrevFocusIndex(focusedIndex);
    } else {
      nextFocusedIndex = this._getNextFocusIndex(focusedIndex);
    }

    const nextFocusedElement = this._refRootElement.current.querySelector(`[data-option-index="${nextFocusedIndex}"]`);

    if (nextFocusedElement) {
      // Remove focus from prev focused element.
      if (focusedElement) {
        focusedElement.removeAttribute('data-focused');
      }

      nextFocusedElement.setAttribute('data-focused', 'true');
      this._scrollToElement(nextFocusedElement);
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
          'shadow_medium',
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
