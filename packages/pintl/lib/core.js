/**
 * @author Mihail Zachepilo <mihailzachepilo@gmail.com>
 * @module PIntl/core
 */


function getObjectKey(obj, key) {
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

function pickContextArgument(obj, context) {
  let test = v => v;
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

function pickContext(obj, context) {
  const res = {};

  Object.keys(obj).forEach((varKey) => {
    const variable = obj[varKey];

    if (typeof variable === 'object') {
      res[varKey] = pickContextArgument(variable, context);
    } else {
      res[varKey] = variable;
    }
  });

  return res;
}

function prepareTextMessage(message, args) {
  if (typeof args === 'undefined') {
    return message;
  }
  let result = message;

  if (typeof args !== 'object') {
    return result.replace('{arg}', args);
  }

  const entrances = String(result).match(/{\w+}(?!\\)/g);
  const passed = [];

  if (entrances) {
    entrances.forEach((entrance) => {
      if (passed.indexOf(entrance) === -1) {
        passed.push(entrance);
        let toInsert = prepareTextMessage(args[/\w+/.exec(entrance)[0]], args);

        if (typeof toInsert === 'string' && !toInsert) {
          toInsert = '';
        }
        result = result.replace(entrance, toInsert);
      }
    });
  }

  return result;
}

/**
 * @param {object} messages
 * @param {boolean} inShell
 * @param {string} id - message path
 * @param {Object|string} [args] - variables to be replaced in message,
 * or string to replace "arg" variable
 * @param {number|string} [context] - Context to pick needed message/variable value
 * @return {string} - Formatted message
 *
 * @example // Pick message by path, replace standard variable
 * // main.yaml
 * `
 * greetings:
 *  hello: "Hello {arg}"
 * `
 * getText(messages, false, 'main.greetings.hello', 'man'); // "Hello man"
 * @example // Pick message by context, replace custom variable
 * // main.yaml
 * `
 * greetings:
 *  hello: "Hello {who}"
 *  hi: "Hi {who}"
 * `
 * getText(messages, false, 'main.greetings', { who: 'man' }, 'hi'); // "Hi man"
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
 * getText(messages, false, 'main.zoo.banana', null, 0); // "I will give him 0 banana."
 * getText(messages, false, 'main.zoo.banana', null, 3); // "I will give him 3 bananas."
 * getText(messages, false, 'main.zoo.banana', null, 13); // "I will give him 13 small bananas!!!!"
 * getText(messages, false, 'main.zoo.banana', null, -13); // "I will give him -13 what???"
 */
export function getText(messages, inShell, id, args, context) {
  if (inShell) {
    if (context) {
      return `{{${id}.${context}}}`;
    }

    return `{{${id}}}`;
  }

  const message = getObjectKey(messages, id);

  if (message) {
    if (typeof message === 'object') {
      const ctx = pickContext(message, context);

      if (message.message) {
        const properties = {
          ...ctx,
          ...args,
          context,
        };

        return prepareTextMessage(message.message, properties);
      }

      return prepareTextMessage(pickContextArgument(message, context), {
        ...args,
        context,
      });
    }

    return prepareTextMessage(message, args);
  }

  return '';
}

/**
 * @param {string} lang
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
export function getName(lang, firstName, lastName) {
  const lastNamePriority = ['ru'];

  if (lastNamePriority.indexOf(lang) !== -1) {
    return `${lastName} ${firstName}`.trim();
  }

  return `${firstName} ${lastName}`.trim();
}

/**
 * @param {string} lang
 * @param {string|number} date
 * @param {object} format
 * @return {string}
 */
export function getDate(lang, date, format = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
}) {
  let dateObj = date;

  if (typeof date === 'string') {
    if (date) {
      dateObj = new Date(date);
    } else {
      return '';
    }
  }

  return new Intl.DateTimeFormat(lang, format).format(dateObj);
}

