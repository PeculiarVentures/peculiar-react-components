require('ts-node').register({ // eslint-disable-line
  compilerOptions: {
    module: 'commonjs',
  },
});
const Path = require('path');
const themeConstructor = require('lib-theme-contructor'); // eslint-disable-line
const base = Path.join(__dirname, '../../src/themes');

module.exports = (name, output) => themeConstructor.createThemes([{
  name,
  entry: Path.join(__dirname, '../../node_modules/lib-react-components/lib/styles/index.sss'),
  out: output,
  options: require(Path.join(base, `${name}.ts`)).default, // eslint-disable-line
}]);
