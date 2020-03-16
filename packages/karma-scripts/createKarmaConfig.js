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
      'karma-typescript',
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
      {
        pattern: 'src/**/*.ts',
      },
    ],
    preprocessors: {
      '**/*.ts': [
        'karma-typescript',
      ],
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
  };

  if (coverage) {
    config.reporters.push(
      'coverage',
      'karma-typescript',
    );
  }

  return config;
};
