module.exports = {
  roots: [''],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
