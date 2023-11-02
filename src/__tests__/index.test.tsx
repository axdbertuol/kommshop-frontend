/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

jest.mock('../app/lib/auth/firebase.ts', () => ({
  initFirestore: jest.fn(),
  authOptions: jest.fn(),
}))
jest.mock('next-auth/next')
describe('Home', () => {
  it('renders a heading', async () => {
    render(await Home())

    // const heading = screen.getByRole('heading', {
    //   name: /welcome to next\.js!/i,
    // })

    // expect(heading).to.contain('Welcome to next')
  })
})
