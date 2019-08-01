const fs = require('fs-extra');
const postcss = require('postcss');
const syntax = require('sugarss');
const traverse = require('traverse');
const assert = require('./assert');
const { palette, variables } = require('./default_theme.js');

function traverseObject(obj, prefix = '') {
  const traversedObj = traverse(obj);
  const newObj = {};

  traversedObj.paths().forEach((jsonPath) => {
    const val = traversedObj.get(jsonPath);

    if (typeof val !== 'object') {
      newObj[`${prefix}${jsonPath.join('-')}`] = val;
    }
  });

  return newObj;
}

function createTheme(opts) {
  opts.options.palette = Object.assign({}, palette, opts.options.palette);
  opts.options.variables = Object.assign({}, variables, opts.options.variables);

  assert.check(
    opts,
    { type: 'object', message: 'options parameter is not valid' },
    {
      name: { type: 'string', message: 'name option is required' },
      entry: { type: 'string', message: 'entry option is required' },
      out: { type: 'string', message: 'out option is required' },
      options: { type: 'object', message: 'options option is not valid' },
    },
  );

  assert.check(
    opts.options.palette,
    { type: 'object', message: 'options.palette parameter is not valid' },
    {
      white: { type: 'string', message: 'options.palette.white option is required' },
      light_grey: { type: 'string', message: 'options.palette.light_grey option is required' },
      grey: { type: 'string', message: 'options.palette.grey option is required' },
      wrong: { type: 'string', message: 'options.palette.wrong option is required' },
    },
  );

  assert.check(
    opts.options.variables,
    { type: 'object', message: 'options.variables parameter is not valid' },
  );

  return new Promise((resolve, reject) => {
    fs.readFile(opts.entry, (err, data) => {
      if (err) {
        return reject(err);
      }

      return postcss([
        // for use `@import 'some.sss'`
        require('postcss-import'), // eslint-disable-line
        // for use `@each`
        require('./postcss-each.js')({ // eslint-disable-line
          colors: opts.options.palette,
          fonts: opts.options.variables.fonts,
        }),
        // for use `$var`
        require('postcss-simple-vars')({ // eslint-disable-line
          variables: Object.assign({},
            opts.options.palette,
            traverseObject(opts.options.variables),
          ),
        }),
        // for use `--var`
        require('postcss-custom-properties')({ // eslint-disable-line
          variables: opts.options.palette,
          appendVariables: true,
          strict: false,
        }),
        // for use `rgba(#fff, .1)`
        require('postcss-hexrgba'), // eslint-disable-line
        // plugin to unwrap nested rules like how Sass does it
        require('postcss-nested'), // eslint-disable-line
        // autoprefixer
        require('autoprefixer'), // eslint-disable-line
        // for minification
        require('cssnano')({ // eslint-disable-line
          preset: 'default',
        }),
      ])
        .process(data, {
          from: opts.entry,
          parser: syntax,
        })
        .then((result) => {
          fs.outputFile(`${opts.out}/${opts.name}.css`, result.css, (error) => {
            if (error) {
              reject(error);
            } else {
              console.log(`Theme '${opts.name}' created successfully!`);
              resolve();
            }
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

function createThemes(themes) {
  if (!Array.isArray(themes)) {
    throw Error('Expected array!');
  }

  const jobs = [];

  for (let i = 0; i < themes.length; i += 1) {
    jobs.push(createTheme(themes[i]));
  }

  return Promise.all(jobs);
}

module.exports = {
  createThemes,
};
