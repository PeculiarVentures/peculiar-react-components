const fs = require('fs-extra');
const postcss = require('postcss');
const syntax = require('sugarss');
const { promisify } = require('util');
const assert = require('./assert');
const { palette, variables } = require('./default_theme');
const { colorToRgb } = require('./color_to_rgb');
const { traverseObject } = require('./traverse_object');

const readFileAsync = promisify(fs.readFile);
const outputFileAsync = promisify(fs.outputFile);

async function createTheme(opts) {
  if (!opts.out) {
    throw new Error('out option can\'t be empty');
  }

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

  const paletteRGB = Object.assign(
    {},
    opts.options.palette,
  );

  Object.keys(paletteRGB).forEach((keyName) => {
    const rgb = colorToRgb(paletteRGB[keyName]);

    paletteRGB[keyName] = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  });

  console.log(`Starting to create '${opts.name}' theme`);

  const entryFile = await readFileAsync(opts.entry);

  const postcssPlugins = [
    // for use `@import 'some.sss'`
    require('postcss-import'), // eslint-disable-line
    // for use `@each`
    require('./postcss-each.js')({ // eslint-disable-line
      colors: paletteRGB,
      fonts: opts.options.variables.fonts,
    }),
    // https://github.com/postcss/postcss-simple-vars
    require('postcss-simple-vars')({ // eslint-disable-line
      variables: Object.assign(
        {},
        paletteRGB,
        traverseObject(opts.options.variables),
      ),
    }),
    // https://github.com/postcss/postcss-custom-properties
    require('postcss-custom-properties')({ // eslint-disable-line
      variables: opts.options.palette,
      appendVariables: true,
      strict: false,
    }),
    // plugin to unwrap nested rules like how Sass does it
    require('postcss-nested'), // eslint-disable-line
    // autoprefixer
    require('autoprefixer'), // eslint-disable-line
  ];

  if (opts.minify !== false) {
    postcssPlugins.push(
      // for minification
      require('cssnano')({ // eslint-disable-line
        preset: 'default',
      }),
    );
  }

  const postcssResult = await postcss(postcssPlugins)
    .process(entryFile, {
      from: opts.entry,
      parser: syntax,
    });

  await outputFileAsync(`${opts.out}/${opts.name}.css`, postcssResult.css);

  console.log(`Theme '${opts.name}' created successfully`);
  console.log();
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
