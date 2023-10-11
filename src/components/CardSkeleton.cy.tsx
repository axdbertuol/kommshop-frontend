import React from 'react'
import CardSkeleton from './CardSkeleton'
import '@/app/globals.css'

describe('<CardSkeleton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CardSkeleton />)
  })
})
