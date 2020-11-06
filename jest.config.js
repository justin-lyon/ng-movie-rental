module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest.base.setup.ts'],

  testMatch: ["<rootDir>/src/**/*.spec.ts"]
}