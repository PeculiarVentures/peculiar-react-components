const path = require('path');
const webpackConfig = require('@peculiar/webpack-scripts/webpack.config.karma');

const COVERAGE_PERCENT = 80;
const COVERAGE_PERCENT_HIGH = 90;
const KARMA_SERVER_PORT = 9876;

module.exports = function createKarmaConfig({
  coverage = true, dirname, coverageExcludes, coverageOverrides,
}) {
  const config = {
    basePath: dirname,
    frameworks: [
      'mocha',
    ],
    plugins: [
      'karma-mocha',
      'karma-coverage',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-chrome-launcher'
    ],
    browsers: [
      'ChromeHeadlessWithGPU',
    ],
    customLaunchers: {
      ChromeHeadlessWithGPU: {
        base: 'ChromeHeadless',
        flags: [
          '--headless',
          '--hide-scrollbars',
          '--mute-audio',
        ],
      },
    },
    browserDisconnectTimeout: 120000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 300000,
    colors: true,
    port: KARMA_SERVER_PORT,
    files: [
      path.join(dirname, 'test/index.ts'),
    ],
    preprocessors: {
      [path.join(dirname, 'test/index.ts')]: ['webpack'],
    },
    reporters: [
      'mocha',
    ],
    coverageReporter: {
      check: {
        each: {
          lines: COVERAGE_PERCENT,
          statements: COVERAGE_PERCENT,
          excludes: coverageExcludes,
          overrides: coverageOverrides,
        },
      },
      includeAllSources: true,
      type: 'lcov',
      watermarks: {
        lines: [COVERAGE_PERCENT, COVERAGE_PERCENT_HIGH],
        statements: [COVERAGE_PERCENT, COVERAGE_PERCENT_HIGH],
      },
    },
    singleRun: true,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: {
        children: false,
        chunks: false,
      },
    },
  };

  if (coverage) {
    config.reporters.push(
      'coverage',
    );
  }

  return config;
};
