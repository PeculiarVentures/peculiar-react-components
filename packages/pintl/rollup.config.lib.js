import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import { version } from './package.json';

const banner = `
/*
 * Copyright ${new Date().getFullYear()}, Pentatonica.co
 * PIntl v${version}
 */
`;

const FORMATS = {
  UMD: 'umd', // Universal Module Definition, works as amd, cjs and iife all in one
  CJS: 'cjs', // CommonJS, suitable for Node and Browserify/Webpack
  ES: 'es', // Keep the bundle as an ES module file
};

function getConfig(entry, plugins = [], outputName, format, min) {
  return {
    input: `lib/${entry}`,
    external: ['react', 'prop-types'],
    plugins: [
      resolve({
        jsnext: true,
        main: true,
      }),
      ...plugins,
    ],
    output: [
      {
        file: `dist/${outputName}.${format}${min ? '.min' : ''}.js`,
        format,
        name: 'PIntl',
        banner,
        globals: {
          react: 'React',
          'prop-types': 'PropTypes',
        },
      },
    ],
  };
}

export default [
  getConfig(
    'index.js',
    [babel()],
    'index',
    FORMATS.CJS,
  ),
  getConfig(
    'index.js',
    [babel()],
    'index',
    FORMATS.UMD,
  ),
  getConfig(
    'index.js',
    [babel(), uglify()],
    'index',
    FORMATS.UMD,
    true,
  ),
  getConfig(
    'index.js',
    [babel({ babelrc: false, presets: ['stage-0'] })],
    'index',
    FORMATS.ES,
  ),
  getConfig(
    'index.js',
    [babel(), uglify()],
    'index',
    FORMATS.ES,
    true,
  ),
];