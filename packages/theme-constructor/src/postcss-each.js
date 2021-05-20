const postcss = require('postcss');
const vars = require('postcss-simple-vars');

const SEPARATOR = /\s+in\s+/;

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
const plugin = (opts = {}) => {
  const hasPlugins = opts && opts.plugins;
  const hasAfterEach = hasPlugins && opts.plugins.afterEach && opts.plugins.afterEach.length;
  const hasBeforeEach = hasPlugins && opts.plugins.beforeEach && opts.plugins.beforeEach.length;

  function tokenize(string) {
    return postcss.list.comma(string).map(str => str.replace(/^\$/, ''));
  }

  function processParams(params) {
    const [name, values] = params.split(SEPARATOR).map(tokenize);

    return {
      name: name[0],
      values: opts[values[0]],
    };
  }

  function processEach(rule) {
    try {
      const params = processParams(rule.params);
      const proxy = new postcss.Root();

      Object.keys(params.values).forEach((keyName) => {
        rule.nodes.forEach((node) => {
          const clone = node.clone();

          proxy.append(clone);
        });

        const processor = postcss([
          vars({
            only: {
              [params.name]: keyName,
            },
          }),
        ]);

        // eslint-disable-next-line no-unused-expressions
        processor.process(proxy).root;
      });

      rule.parent.insertBefore(rule, proxy);
      rule.remove();
    } catch (error) {
      throw rule.error(error);
    }
  }

  function rulesExists(css) {
    let rulesLength = 0;

    css.walkAtRules('each', () => {
      rulesLength += 1;
    });

    return rulesLength;
  }

  function processLoop(css, afterEach, beforeEach) {
    if (afterEach) {
      css = postcss(afterEach).process(css).root;
    }

    css.walkAtRules('each', (rule) => {
      processEach(rule);
      processLoop(rule.root());
    });

    if (beforeEach) {
      css = postcss(beforeEach).process(css).root;
    }

    if (rulesExists(css)) {
      processLoop(css, afterEach, beforeEach);
    }
  }

  if (hasAfterEach || hasBeforeEach) {
    return {
      postcssPlugin: 'postcss-each',
      Once: css => processLoop(
        css,
        hasAfterEach && opts.plugins.afterEach,
        hasBeforeEach && opts.plugins.beforeEach,
      ),
    };
  }

  return {
    postcssPlugin: 'postcss-each',
    AtRule: {
      each: processEach,
    },
  };
};

plugin.postcss = true;

module.exports = plugin;
