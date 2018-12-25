module.exports = {
  setupFiles: [
    './scripts/test_shim.js',
    './scripts/test_setup.js',
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
    'lib/**.{ts|tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'html'],
};
