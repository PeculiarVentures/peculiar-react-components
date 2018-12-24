module.exports = {
  setupFiles: [
    './test/utils/test_shim.js',
    './test/utils/test_setup.js',
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: [
    '**/*.spec.(ts|tsx)',
  ],
  collectCoverageFrom: [
    'src/**.{ts|tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'html'],
};
