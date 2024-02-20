/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils' // Use this for async tests
import Page from '../app/[locale]/(main)/store/page'

jest.mock('@/app/components/section-segments/listing-segment')
jest.mock('@/app/components/section-segments/search-segment')
describe('Page', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() => ({
      catch: jest.fn(),
      finally: jest.fn(),
      then: jest.fn(),
      json: jest.fn(),
    })) as unknown as typeof fetch
  })
  test('renders without crashing', () => {
    render(
      <Page
        params={{ username: 'test' }}
        searchParams={{}}
      />
    )
  })

  test('fetches products on mount', async () => {
    // Arrange

    render(
      <Page
        params={{ username: 'test' }}
        searchParams={{ search: 'test' }}
      />
    )
    // eslint-disable-next-line @typescript-eslint/ban-types

    const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(fetch as typeof fetch)
    const expectedFetchCalls = 2
    // Act
    // Use act to wait for the async operation to complete
    // eslint-disable-next-line @typescript-eslint/no-empty-function, testing-library/no-unnecessary-act
    await act(async () => {})

    // Assert
    // NOTE: Every server action is calls fetch twice
    expect(fetchSpy).toHaveBeenCalledTimes(expectedFetchCalls)
  })
})
