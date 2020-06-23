import React, { Component } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types'; // eslint-disable-line

/* eslint-disable class-methods-use-this, react/forbid-prop-types */

/**
 * This wrapper share intl interface via react context
 * It async loads lang modules when they needed
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

  static childContextTypes = {
    intl: PropTypes.object,
  };

  /**
   * defaultProps
   * @type {Object}
   * @property {ReactComponent} children - React component to get context
   * @property {String} lang - language to be currently using
   */
  static defaultProps = {
    children: null,
    lang: 'en',
    messages: {},
    inShell: false,
  };

  /**
   * @return {Object}
   * @property {String} lang
   * @property {function} getText
   * @property {function} getName
   */
  getChildContext() {
    return {
      intl: {
        getText: this.getText,
        getName: this.getName,
        getDate: this.getDate,
        lang: this.props.lang,
      },
    };
  }

  /**
   * @param {string} id - message path
   * @param {Object|string} args - variables to be replaced in message,
   * or string to replace "arg" variable
   * @param {number|string} context - Context to pick needed message/variable value
   * @return {string} - Formatted message
   *
   * @example // Pick message by path, replace standard variable
   * // main.yaml
   * `
   * greetings:
   *  hello: "Hello {arg}"
   * `
   * getText('main.greetings.hello', 'man'); // "Hello man"
   * @example // Pick message by context, replace custom variable
   * // main.yaml
   * `
   * greetings:
   *  hello: "Hello {who}"
   *  hi: "Hi {who}"
   * `
   * getText('main.greetings', { who: 'man' }, 'hi'); // "Hi man"
   * @example // Insert context into message, choose message variable value by numeric context
   * // main.yaml
   * `
   * zoo:
   *  banana:
   *    message: "I will give him {context} {fruit}{symbol}"
   *    fruit:
   *      2..10: bananas
   *      11+: small bananas
   *      -1-: what?
   *      _: banana
   *    symbol:
   *      11+: !!!!
   *      -1-: ???
   *      _: .
   * `
   * getText('main.zoo.banana', null, 0); // "I will give him 0 banana."
   * getText('main.zoo.banana', null, 3); // "I will give him 3 bananas."
   * getText('main.zoo.banana', null, 13); // "I will give him 13 small bananas!!!!"
   * getText('main.zoo.banana', null, -13); // "I will give him -13 what???"
   */
  getText = (id, args, context) => {
    const message = this.getObjectKey(this.props.messages, id);

    if (message) {
      if (typeof message === 'object') {
        const ctx = this.pickContext(message, context);

        if (message.message) {
          const properties = {
            ...ctx,
            ...args,
            context,
          };

          return this.prepareTextMessage(message.message, properties);
        }

        return this.prepareTextMessage(this.pickContextArgument(message, context), {
          ...args,
          context,
        });
      }

      return this.prepareTextMessage(message, args);
    }

    if (this.props.inShell) {
      if (context) {
        return `{{${id}.${context}}}`;
      }

      return `{{${id}}}`;
    }

    return '';
  };

  /**
   * @param {string} firstName
   * @param {string} lastName
   * @return {string} Formatted name
   *
   * @example // lang ru
   * getName('Bill', 'Gates') // "Gates Bill"
   *
   * @example // lang en
   * getName('Bill', 'Gates') // "Bill Gates"
   */
  getName = (firstName, lastName) => {
    const lastNamePriority = ['ru'];

    if (lastNamePriority.indexOf(this.lang) !== -1) {
      return [lastName, firstName].join('').trim();
    }

    return [firstName, lastName].join('').trim();
  };

  getDate = (date, format = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }) => {
    let dateObj = date;

    if (typeof date === 'string') {
      if (date) {
        dateObj = new Date(date);
      } else {
        return '';
      }
    }

    return new Intl.DateTimeFormat(this.props.lang, format).format(dateObj);
  }

  getObjectKey(obj, key) {
    const path = key.split('.');
    let last = obj;

    for (const k of path) {
      if (!last) {
        return '';
      }
      last = last[k];
    }

    return last;
  }

  pickContextArgument(obj, context) {
    let test = () => {};
    let res = '';

    switch (true) {
      case typeof context === 'string':
        test = key => key === context;
        break;
      case typeof context === 'number':
        test = (key) => {
          const a = /(\d+)..(\d+)/.exec(key);
          const b = /(-?\d+)(\+|-)/.exec(key);

          return (
            key == context || // eslint-disable-line eqeqeq
            (a !== null && a[1] <= context && a[2] >= context) ||
            (b !== null && (b[2] === '+' ? context >= b[1] : context <= b[1]))
          );
        };
        break;
      default:
        break;
    }

    for (const key of Object.keys(obj)) {
      if (test(key)) {
        res = obj[key];
        break;
      }
    }
    if (!res && obj._) {
      res = obj._;
    }

    return res;
  }

  pickContext(obj, context) {
    const res = {};

    Object.keys(obj).forEach((varKey) => {
      const variable = obj[varKey];

      if (typeof variable === 'object') {
        res[varKey] = this.pickContextArgument(variable, context);
      } else {
        res[varKey] = variable;
      }
    });

    return res;
  }

  prepareTextMessage(message, args) {
    if (typeof args === 'undefined') {
      return message;
    }
    let result = message;

    if (typeof args !== 'object') {
      return result.replace('{arg}', args);
    }

    const entrances = result.match(/{\w+}(?!\\)/g);
    const passed = [];

    if (entrances) {
      entrances.forEach((entrance) => {
        if (passed.indexOf(entrance) === -1) {
          passed.push(entrance);
          result = result.replace(entrance, this.prepareTextMessage(args[/\w+/.exec(entrance)[0]], args) || '');
        }
      });
    }

    return result;
  }

  render() {
    return this.props.children;
  }
}
