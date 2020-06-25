const rawEnv = require('./compiled_env.json');

const env = (envName, defaultVal) => {
  if (!rawEnv[envName] && !defaultVal) { throw new Error(`Must Specify '${envName}'!`); }

  return rawEnv[envName] || defaultVal;
};

// ======== Static Build Configuration ========
export const SRC_FOLDER = 'src';
export const DST_PATH = 'dst';
export const BUILD_INFO_FILENAME = 'build_info.json';

export const BUILD_INFO = env('BUILD_INFO');
export const HASH = env('HASH');
export const PORT = env('PORT');
export const URL = env('URL');

// ======== App ========
export const APP_NAME = 'Peculiar React Components';
export const GIT_URL = env('GIT_URL', 'null') !== 'null' ? env('GIT_URL') : '';
