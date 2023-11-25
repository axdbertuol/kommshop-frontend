import React from 'react'
import LikeButton from '@/app/components/buttons/LikeButton'
import '@/app/globals.css'

describe('<LikeButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LikeButton />)
  })
})
