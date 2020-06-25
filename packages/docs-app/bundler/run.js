import './compile_enviropment';
import { URL, PORT } from './config';
import makeConfig from './webpack/make';
import runServer from './server';
import { bundle } from './utils';

const debug = require('./utils/debug')('app:run');

const MODE = process.env.NODE_ENV;
const CONFIG = makeConfig(MODE);

if (MODE === 'development') {
  runServer(MODE, CONFIG).then(() => {
    debug('>');
    debug(`> Development Server Running on - ${URL}:${PORT}`);
    debug('>');
    debug('>');
  });
}

if (MODE === 'production' || MODE === 'build') {
  bundle(CONFIG);
}

if (MODE === 'server') {
  runServer(MODE, CONFIG).then(() => {
    debug('>');
    debug(`> Production Server Running on - ${URL}:${PORT}`);
    debug('>');
    debug('>');
  });
}
