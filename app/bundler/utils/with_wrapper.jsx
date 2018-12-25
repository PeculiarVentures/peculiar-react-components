import React from 'react';
import PropTypes from 'prop-types';
import { makeDecorator } from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlWrapper } from 'lib-pintl';
import history from '../../packages/@core/utils/history';

try {
  require(`../../packages/${process.env.STORYBOOK_PACKAGE}/index.tsx`);
} catch (err) {
  console.warn('No store was found');
}

class FakeIntl extends React.Component {
  static childContextTypes = {
    intl: PropTypes.object,
  }

  getChildContext() {
    return {
      intl: {
        getText: arg => arg,
      },
    };
  }

  render() {
    return this.props.children;
  }
}

history.listen(action('routing'));

function getSize(value, defaultValue = '100%') {
  if (value) {
    if (typeof value === 'number') {
      return `${value}px`;
    }

    return value;
  }

  return defaultValue;
}

function getStyles(width, height, styles) {
  return {
    maxWidth: '100%',
    width: getSize(width),
    height: getSize(height, 'auto'),
    margin: '0 auto',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    ...styles,
  };
}

function withDiv(base, width, height, styles = {}) {
  if (typeof width === 'function') {
    return width(base);
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: styles.background,
        overflow: 'auto',
      }}
    >
      <div
        style={getStyles(width, height, styles)}
      >
        {base}
      </div>
    </div>
  );
}

function withStore(base) {
  return (
    <Provider store={window.store}>
      {base}
    </Provider>
  );
}

function withIntl(base, name) {
  try {
    if (typeof name === 'string') {
      // eslint-disable-next-line
      const messages = require(`../../packages/${process.env.STORYBOOK_PACKAGE}/containers/${name}/langs/en.yaml`);
      return (
        <IntlWrapper
          lang="en"
          messages={messages}
        >
          {base}
        </IntlWrapper>
      );
    }
  } catch (err) {
    console.warn(`Unable to load lang file for ${name}, falling back to fake intl`);
  }
  return (
    <FakeIntl>
      {base}
    </FakeIntl>
  );
}

export default (width, height, styles) => {
  const containerName = global.currentContainerName;
  return makeDecorator({
    name: 'withWrapper',
    parameterName: 'wrapper',
    wrapper: (storyFn, context) => {
      let base = (
        <Router history={history}>
          {
            withIntl(storyFn(context), containerName)
          }
        </Router>
      );

      if (window.store) {
        base = withStore(base);
      }

      if (width || height || styles) {
        base = withDiv(base, width, height, styles);
      }

      return base;
    },
  });
}
