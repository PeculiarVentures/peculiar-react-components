const storybook = require('@storybook/react/standalone');
const path = require('path');
const prepareStylesDefinitions = require('./prepare_styles');
require('../utils/pick_env_file');

function parseArg(arg) {
  const packageName = /^[^./]+$/.exec(arg);
  const packagePart = /packages\/([^./]+)/.exec(arg);
  let dir = '';
  let packageDir = '';

  if (packageName) {
    dir = path.join(__dirname, '../../packages/', packageName[0]);
    packageDir = packageName[0];
  } else {
    dir = path.join(__dirname, '../../', arg);
    packageDir = packagePart[1];
  }

  return {
    dir,
    packageDir,
  };
}

const arg = process.argv[2];
if (arg) {
  const { dir, packageDir } = parseArg(arg);

  if (packageDir) {
    if (/\.tsx$/.exec(dir)) {
      process.env.STORYBOOK_FILE = dir;
    } else {
      process.env.STORYBOOK_DIR = dir;
    }

    process.env.STORYBOOK_PACKAGE = packageDir;
  } else {
    throw new Error('Invalid path, missing package name');
  }
} else {
  throw new Error('Please specify at least package name, like: "npm run story auth"');
}

prepareStylesDefinitions()
  .then(() => (
    storybook({
      mode: 'dev',
      port: 9009,
      configDir: path.join(__dirname, '../config/.storybook'),
    })
  ))
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }

    process.exit(1);
  });
