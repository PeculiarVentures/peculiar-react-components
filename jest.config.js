module.exports = {
  setupFiles: [
    './test/utils/test_shim.js',
    './test/utils/test_setup.js',
    './test/utils/react_utils.js',
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
  },
  testMatch: [
    '**/*.spec.(js|jsx|ts|tsx)',
  ],
  collectCoverageFrom: [
    'lib/**.{js|jsx|ts|tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'html'],
};
