import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * OfflineProvider component
 */
export default class OfflineProvider extends Component {
  static propTypes = {
    /**
     * This is what will be displayed inside the OfflineProvider
     */
    children: PropTypes.node,
  }

  static childContextTypes = {
    online: PropTypes.bool,
  };

  static defaultProps = {
    children: null,
  }

  state = {
    online: navigator.onLine,
  };

  getChildContext() {
    return {
      online: this.state.online,
    };
  }

  componentDidMount() {
    window.addEventListener('online', this.bindedOnChange);
    window.addEventListener('offline', this.bindedOnChange);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.bindedOnChange);
    window.removeEventListener('offline', this.bindedOnChange);
  }

  /**
   * onChange connection handler
   */

  onChange() {
    this.setState({
      online: navigator.onLine,
    });
  }

  bindedOnChange = this.onChange.bind(this);

  /**
   * render
   * @return {ReactElement} markup
   */

  render() {
    return this.props.children;
  }
}
