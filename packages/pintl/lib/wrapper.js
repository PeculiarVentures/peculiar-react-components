/**
 * @author Mihail Zachepilo <mihailzachepilo@gmail.com>
 * @module PIntl/wrapper
 */

import { Component } from 'react';
import PropTypes from 'prop-types';
import { getText, getDate, getName } from './core';

/* eslint-disable react/forbid-prop-types */

/**
 * @typedef {Object} IntlContext
 * @property {getText} getText
 * @property {getName} getName
 * @property {getDate} getDate
 * @property {String} lang
 */

/**
 * This wrapper share intl interface via react context
 * props - see defaultProps docs
 * context - see getChildContext
 */
export default class IntlWrapper extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    lang: PropTypes.string,
    messages: PropTypes.object,
    inShell: PropTypes.bool,
  };

  /**
   * defaultProps
   * @type {Object}
   * @property {Component} children - React component to get context
   * @property {String} lang - language to be currently using
   */
  static defaultProps = {
    children: null,
    lang: 'en',
    messages: {},
    inShell: false,
  };

  static childContextTypes = {
    intl: PropTypes.object,
  };

  /**
   * @return {Object}
   * @property {IntlContext} intl
   */
  getChildContext() {
    return {
      intl: {
        getText: getText.bind(null, this.props.messages, this.props.inShell),
        getName: getName.bind(null, this.props.lang),
        getDate: getDate.bind(null, this.props.lang),
        lang: this.props.lang,
      },
    };
  }

  render() {
    return this.props.children;
  }
}
