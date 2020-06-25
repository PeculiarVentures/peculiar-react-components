const rawEnv = require('./compiled_env.json');

const env = (envName, defaultVal) => {
  if (!rawEnv[envName] && !defaultVal) {
    throw new Error(`Must Specify '${envName}'!`);
  }

  return rawEnv[envName] || defaultVal;
};

// ======== Static Build Configuration ========
const SRC_FOLDER = 'src';
const DST_PATH = 'dst';
const BUILD_INFO_FILENAME = 'build_info.json';

const BUILD_INFO = env('BUILD_INFO');
const HASH = env('HASH');
const PORT = env('PORT');
const URL = env('URL');

// ======== App ========
const APP_NAME = 'Peculiar React Components';
const GIT_URL = env('GIT_URL', 'null') !== 'null' ? env('GIT_URL') : '';

module.exports = {
  SRC_FOLDER,
  DST_PATH,
  BUILD_INFO_FILENAME,

  BUILD_INFO,
  HASH,
  PORT,
  URL,

  APP_NAME,
  GIT_URL,
};
