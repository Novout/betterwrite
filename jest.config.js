module.exports = {
  preset: 'ts-jest',
  testEnvironment: '',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/use/*.ts',
    '!**/node_modules/**',
  ],
};