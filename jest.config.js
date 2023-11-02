const nextJest = require('next/jest')

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: './' })

// Any custom config you want to pass to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: ['/node_modules/(?!(firebase|@firebase)/)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^jose': require.resolve('jose'),
    '@panva/hkdf': require.resolve('@panva/hkdf'),
    '^uuid$': require.resolve('uuid'),
    '^preact-render-to-string$': require.resolve('preact-render-to-string'),
    '^preact$': require.resolve('preact'),
  },
})
