import React from 'react'
import CommandSearch from './CommandSearch'
import '@/app/globals.css'

describe('<CommandSearch />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.nextMount(<CommandSearch />)
  })
})
