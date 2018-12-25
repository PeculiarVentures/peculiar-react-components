const path = require('path');
const deployToGhPages = require('../utils/deploy_to_gh_pages');
const getClientEnvironment = require('../utils/env');

const env = getClientEnvironment();

deployToGhPages(path.resolve(__dirname, `../../${env.raw.OUTPUT_FOLDER}`))
  .then(() => {
    console.log('> SUCCESS: Finished Uploading files to gh-pages!');
  })
  .catch((err) => {
    console.log(`> FAILED: Uploading files to gh-pages: ${err}`);
    process.exit(1);
  });
