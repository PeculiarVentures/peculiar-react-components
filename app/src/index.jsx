import React from 'react';
import { render } from 'react-dom';
import Router from './router';

const rootElement = document.getElementById('root');

render(<Router />, rootElement);

if (module.hot) {
  module.hot.accept('./router', () => {
    const NextApp = require('./router').default; // eslint-disable-line
    render(<NextApp />, rootElement); // eslint-disable-line
  });
}
