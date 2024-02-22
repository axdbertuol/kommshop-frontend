import React from 'react'
import InputBox from '@/components/forms/input/InputBox'
import '@/app/globals.css'

describe('<InputBox />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<InputBox />)
  })
  it('renders InputBox with label and input element', () => {
    cy.mount(<InputBox labelText="Label Text" />)
    cy.get('[data-testid="input-box"]').should('exist')
    cy.get('label').should('have.text', 'Label Text')
    cy.get('input').should('exist')
  })
})
