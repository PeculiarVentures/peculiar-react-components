import path from 'path';
import developmentConfig from './config.development';
import productionConfig from './config.production';
import makeBasicConfig from './config.basic';
import * as CONFIG from '../config';

export default (mode) => {
  const basicConfig = makeBasicConfig(mode);
  const endpoints = [{
    name: 'index',
    path: './index.jsx',
  }];
  const entry = {};

  if (mode === 'development') {
    endpoints.forEach((e) => {
      if (e.name === 'index') {
        entry[e.name] = [
          `webpack-dev-server/client?${CONFIG.URL}:${CONFIG.PORT}`,
          'webpack/hot/only-dev-server',
          path.join(__dirname, '../../', CONFIG.SRC_FOLDER, e.path),
        ];
      } else {
        entry[e.name] = [
          path.join(__dirname, '../../', CONFIG.SRC_FOLDER, e.path),
        ];
      }
    });
    if (developmentConfig.plugins) {
      developmentConfig.plugins.map(plugin => basicConfig.plugins.push(plugin));
    }
    if (developmentConfig.module) {
      developmentConfig.module.rules.map(loader => basicConfig.module.rules.push(loader));
    }
    basicConfig.devtool = developmentConfig.devtool;
    basicConfig.cache = developmentConfig.cache;
  } else {
    endpoints.forEach((e) => {
      entry[e.name] = [
        path.join(__dirname, '../../', CONFIG.SRC_FOLDER, e.path),
      ];
    });
    if (productionConfig.plugins) {
      productionConfig.plugins.map(plugin => basicConfig.plugins.push(plugin));
    }
    if (productionConfig.module) {
      productionConfig.module.rules.map(loader => basicConfig.module.rules.push(loader));
    }
    basicConfig.devtool = productionConfig.devtool;
    basicConfig.cache = developmentConfig.cache;
    if (productionConfig.output) {
      basicConfig.output = productionConfig.output;
    }
  }

  basicConfig.entry = entry;

  return basicConfig;
};
