import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * AnalyticsProvider component
 */
export default class AnalyticsProvider extends PureComponent {
  static PropTypes = {
    /**
     * Triggered with event name once component with gaEventName was interacted
     */
    gaFireEvent: PropTypes.func,
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
