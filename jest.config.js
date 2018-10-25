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
    '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/node_modules/jest-css-modules-transform',
  },
  testMatch: [
    '**/*.spec.(js|jsx)',
  ],
  collectCoverageFrom: [
    'lib/**.{js|jsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'html'],
};
