import React from 'react'
import Sidebar from './Sidebar'
import '@/app/globals.css'

describe('<Sidebar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.nextMount(<Sidebar />)
  })
})
