import path from 'path';
import ShellBundler from '../utils/shell_bundler';
import * as CONFIG from '../config';

const NODE_ENV = process.env.NODE_ENV;
const plugins = [];
const shells = ['index'];

if (shells) {
  for (const name of shells) {
    const pathToShellDir = `../../${CONFIG.SRC_FOLDER}/shell`;
    const config = require(pathToShellDir).default; // eslint-disable-line
    const { templates } = config;
    const templatesWithFullPath = Object.assign({}, templates);

    Object.keys(templatesWithFullPath).forEach((t) => {
      templatesWithFullPath[t] = path.join(__dirname, pathToShellDir, templatesWithFullPath[t]);
    });

    if (name === 'index') {
      plugins.push(new ShellBundler({
        templatesEntry: templatesWithFullPath,
        cssToProps: true,
        props: {
          title: CONFIG.APP_NAME,
          initServiceWorker: NODE_ENV !== 'development',
          disableReactDevTools: NODE_ENV !== 'development',
        },
      }));
    } else {
      plugins.push(new ShellBundler({
        templatesEntry: templatesWithFullPath,
        outputPathName: `shells/${name}/`,
        doctype: false,
      }));
    }
  }
}

export default () => plugins;
