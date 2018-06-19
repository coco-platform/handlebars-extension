module.exports = {
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'json', 'js'],
  moduleDirectories: ['node_modules'],
  // Coverage report
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'html'],
  // Test configuration
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\]'],
  // Coverage report
  // Test configuration
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
};
