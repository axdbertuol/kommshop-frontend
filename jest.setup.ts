// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'node:util'
// eslint-disable-next-line @typescript-eslint/ban-types
export const testCache = <T extends Function>(func: T) => func

jest.mock('react', () => {
  const originalModule = jest.requireActual('react')
  return {
    ...originalModule,
    cache: testCache,
  }
})
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as typeof global.TextDecoder
