const { deployToGhPages } = require('./utils/deploy_to_gh_pages');

deployToGhPages('dist')
  .catch(() => {
    process.exit(1);
  });
