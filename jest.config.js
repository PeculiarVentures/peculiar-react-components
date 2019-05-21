module.exports = {
  setupFiles: [
    './test/test_shim.js',
    './test/test_setup.js',
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
    'lib/**/**.tsx',
    '!**/**.story.tsx',
    '!**/**.spec.tsx',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'html'],
};
