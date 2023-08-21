module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testMatch: ["<rootDir>/src/__tests__/*.test.ts"],
  testTimeout: 10000,
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 15,
      branches: 15,
      functions: 15,
      lines: 15,
    },
  },
};