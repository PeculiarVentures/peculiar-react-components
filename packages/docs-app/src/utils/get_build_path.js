import CONFIG from '../../env/production.json';

const isProduction = process.env.NODE_ENV === 'production';
let buildPath = '/';

if (isProduction && CONFIG.PUBLIC_PATH) {
  buildPath = CONFIG.PUBLIC_PATH;
}

export default buildPath;
