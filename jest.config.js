module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest.base.setup.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/main.ts',
    '/src/polyfills.ts',
    '/models/',
    '/environments/',
    '/*.module.ts'
  ],
  testMatch: ['<rootDir>/src/**/*.spec.ts']
};
