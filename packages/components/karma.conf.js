// eslint-disable-next-line import/no-extraneous-dependencies
const { createKarmaConfig } = require('@peculiar/karma-scripts');

module.exports = (config) => {
  const baseConfig = createKarmaConfig({
    dirname: __dirname,
    coverageExcludes: [],
  });

  config.set(baseConfig);
  config.set({
    // overrides here
  });
};
