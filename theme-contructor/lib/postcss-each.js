const postcss = require('postcss'); // eslint-disable-line
const vars = require('postcss-simple-vars'); // eslint-disable-line

/**
 * @example
 * // postcss usage
 * require('./postcss_each.js')({
 *  colors: [
 *    'primary',
 *    'secondary',
 *  ],
 * }),
 *
 * // css usage
 * @each $key in $colors
 *  .icon-$(key)
 *    color: $$(key)
 */
module.exports = postcss.plugin('postcss-each', (opts) => {
  const SEPARATOR = /\s+in\s+/;

  function tokenize(str) {
    return postcss.list.comma(str).map(s => s.replace(/^\$/, ''));
  }

  function checkParams(params) {
    if (!SEPARATOR.test(params)) return 'Missed "in" keyword in @each';

    const [name, values] = params.split(SEPARATOR).map(str => str.trim());

    if (!name.match(/\$[_a-zA-Z]?\w+/)) return 'Missed variable name in @each';
    if (!values.match(/(\w+\,?\s?)+/)) return 'Missed values list in @each'; // eslint-disable-line

    return null;
  }

  function paramsList(params) {
    const [name, values] = params.split(SEPARATOR).map(tokenize);

    return {
      name: name[0],
      values: opts[values[0]],
    };
  }

  function processRules(rule, params) {
    const { name, values } = params;
    let keys = [];

    if (Array.isArray(values)) {
      keys = values;
    }
    if (values instanceof Object) {
      keys = Object.keys(values);
    }

    keys.forEach((v) => {
      const vals = {
        [name]: v,
      };

      rule.nodes.forEach((node) => {
        const clone = node.clone();
        const proxy = postcss.rule({ nodes: [clone] });

        vars({ only: vals })(proxy);
        rule.parent.insertBefore(rule, clone);
      });
    });
  }

  function processLoop(css) {
    css.walkAtRules('each', processEach); // eslint-disable-line
  }

  function processEach(rule) {
    const params = ` ${rule.params} `;
    const parsedParams = paramsList(params);
    const error = checkParams(params);

    if (error) throw rule.error(error);

    processRules(rule, parsedParams);
    rule.remove();
    processLoop(rule.root());
  }

  return css => processLoop(css);
});
