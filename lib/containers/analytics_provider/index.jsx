import { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * AnalyticsProvider component
 */
export default class AnalyticsProvider extends PureComponent {
  static propTypes = {
    /**
     * Triggered with event name once component with gaEventName was interacted
     */
    onEvent: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    onEvent: () => null,
    children: null,
  };

  static childContextTypes = {
    gaFireEvent: PropTypes.func,
  };

  getChildContext() {
    return {
      gaFireEvent: this.props.onEvent,
    };
  }

  render() {
    return this.props.children;
  }
}
