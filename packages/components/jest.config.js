module.exports = {
  setupFiles: [
    './test/utils/test_shim.js',
    './test/utils/test_setup.js',
    './test/utils/react_utils.js',
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: [
    '**/*.spec.(js|jsx)',
  ],
  collectCoverageFrom: [
    'src/**.{js|jsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'html'],
};
