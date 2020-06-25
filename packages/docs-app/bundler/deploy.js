const { deployToGhPages } = require('./utils/deploy_to_gh_pages');
const CONFIG = require('./config');

deployToGhPages(CONFIG.DST_PATH)
  .catch(() => {
    process.exit(1);
  });
