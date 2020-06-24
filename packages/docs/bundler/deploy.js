import deployToGhPages from './utils/deploy_to_gh_pages';
import * as CONFIG from './config';

deployToGhPages(CONFIG.DST_PATH)
  .catch(() => {
    process.exit(1);
  });
