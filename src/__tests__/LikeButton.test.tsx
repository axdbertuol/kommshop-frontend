/**
 * @jest-environment jsdom
 */
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LikeButton from '@/app/components/buttons/LikeButton'

describe('LikeButton', () => {
  test('should toggle fill color on click', async () => {
    render(<LikeButton />)
    const likeButton = screen.getByTestId('like-button')

    // Initial state
    expect(likeButton).toHaveAttribute('fill', 'none')
    // Click the button
    await act(async () => await userEvent.click(likeButton))

    // Check updated state
    expect(likeButton).toHaveAttribute('fill', 'red')

    // Click again
    await act(async () => await userEvent.click(likeButton))

    // Check if the state is toggled back
    expect(likeButton).toHaveAttribute('fill', 'none')
  })
})
