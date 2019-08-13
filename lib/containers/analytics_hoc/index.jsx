import React from 'react';
import PropTypes from 'prop-types';

/**
 * AnalyticsHOC
 */
export default function withAnalytics(Component, firingEventProp = 'onClick') {
  const AnalyticsWrapper = ({ forwardRef, gaEventName, ...props }, context) => {
    const oldProp = props[firingEventProp];
    const fireEvent = (...args) => {
      if (context.gaFireEvent && gaEventName) {
        context.gaFireEvent(gaEventName);
      }

      if (typeof oldProp === 'function') {
        oldProp(...args);
      }
    };

    return (
      <Component
        {...props}
        {...{ [firingEventProp]: fireEvent }}
        ref={forwardRef}
      />
    );
  };

  const WrappedComponent = React.forwardRef((props, ref) => (
    <AnalyticsWrapper {...props} forwardRef={ref} />
  ));
  // eslint-disable-next-line
  const Element = typeof Element === "undefined" ? function() {} : Element;

  WrappedComponent.name = Component.name;
  AnalyticsWrapper.contextTypes = {
    gaFireEvent: PropTypes.func,
  };
  AnalyticsWrapper.propTypes = {
    forwardRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
    gaEventName: PropTypes.string,
  };
  AnalyticsWrapper.defaultProps = {
    forwardRef: null,
    gaEventName: '',
  };

  return WrappedComponent;
}
