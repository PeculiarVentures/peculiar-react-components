import React, { Component } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';

/**
 * ThemeProvider component
 * @deprecated
 *  In version 0.2.0 don't need this component. Use static class names for styling elements
 */
export default class ThemeProvider extends Component {
  static propTypes = {
    theme: PropTypes.object, // eslint-disable-line
    children: PropTypes.node,
  }

  static childContextTypes = {
    theme: PropTypes.object,
  };

  static defaultProps = {
    theme: {},
    children: null,
  }

  getChildContext() {
    return {
      theme: this.props.theme,
    };
  }

  componentWillMount() {
    console.warn('WARNING! Using component `ThemeProvider` will be deprecated in version 0.2.0, please use static class names for styling elements.');
  }

  render() {
    return this.props.children;
  }
}
