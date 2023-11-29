import { AuthProvidersEnum, LoginResponseType } from 'kommshop-types'

describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3002/')
  })

  it('Sign in/sign up credentials flow 1', async () => {
    /*  
      Clicks sign in
      Tries to login with credentials
      Sees invalid credentials err
      Goes to sign up
      Signs up with credentials
      Password2 is typed incorrectly
      Shows error
    */
    cy.intercept({ method: 'GET', url: /.*\/signin/ }).as('signinPage')
    cy.intercept({ method: 'GET', url: /.*\/signup/ }).as('signupPage')
    cy.intercept({ method: 'POST', url: /.*\/signin/ }).as('signin')
    cy.intercept({ method: 'POST', url: /.*\/signup/ }).as('signup')
    cy.get('[data-testid="signin-button"]').should('exist').click()
    cy.wait('@signinPage').then(() => {
      cy.get('[id="provider"]').should('have.value', AuthProvidersEnum.credentials)
      cy.get('[id="email"]').should('exist').type('test@test.com')
      cy.get('[id="password"]').should('exist').type('mypass')
      cy.get('[type="submit"').should('exist').click()
      cy.wait('@signin')
      cy.get('[data-testid="error-message"]').should('contain.text', 'email')
      cy.get('[data-testid="notyet"]').should('exist').click()
    })

    // signup
    cy.wait('@signupPage').then(() => {
      cy.get('[id="provider"]').should('have.value', AuthProvidersEnum.credentials)
      cy.get('[id="email"]').should('exist').click().type('test@test.com')
      cy.get('[id="password"]').should('exist').type('mypass')
      cy.get('[id="password2"]').should('exist').type('mypass2')
      cy.get('[type="submit"').should('exist').click()
    })

    // cy.wait('@signup')
  })
})
