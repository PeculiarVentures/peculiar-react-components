import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
import { CircularProgress } from 'lib-react-components';
import Noscript from './noscript';
import * as CONFIG from '../../bundler/config';
import s from './styles/basic_index.sass';

const RootShell = props => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>
        {props.title}
      </title>
      <meta name="description" content="Peculiar React Components" />
      <meta name="keywords" content="peculiar, react, components, ui" />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: props.inlineStyles }} />
      <link
        rel="stylesheet"
        href={`${CONFIG.GIT_URL}/assets/css/default.css`}
      />
      <noscript>
        <Noscript />
      </noscript>
    </head>
    <body>
      <div className={s.root} id="root">
        <CircularProgress />
      </div>
      <script
        type="text/javascript"
        charSet="utf-8"
        async=""
        src={`${CONFIG.GIT_URL}/index_${CONFIG.HASH}.js`}
      />
    </body>
  </html>
);

RootShell.propTypes = {
  title: PropTypes.string,
  inlineScripts: PropTypes.arrayOf(PropTypes.string), // eslint-disable-line
  inlineStyles: PropTypes.arrayOf(PropTypes.string),
};

RootShell.defaultProps = {
  title: 'App',
  inlineScripts: [],
  inlineStyles: [],
};

export default RootShell;
