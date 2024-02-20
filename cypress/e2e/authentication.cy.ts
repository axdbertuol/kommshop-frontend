import { AuthProvidersEnum } from 'kommshop-types'

describe('example to-do app', () => {
  const user = 'john.doe@example.com'
  const userPass = 'secret'
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
      Passwords typed are not secure
      Shows error
      Passwords typed are not same
      Inserts right passwords and submits *NOT WORKING IN CYPRESS*
      Automatically goes to check email page *NOT WORKING IN CYPRESS*
      Goes to login page and logs in successfully
      Sends back to store page
      Then logs out successfully
    */
    cy.intercept({ method: 'POST', url: /.*google.*/ }, {}).as('google')
    cy.intercept({ method: 'GET', url: /.*\/signin/ }).as('signinPage')
    cy.intercept({ method: 'GET', url: /.*\/signup/ }).as('signupPage')
    cy.intercept({ method: 'GET', url: /.*\/store/ }).as('storePage')
    cy.intercept({ method: 'GET', url: /.*\/check-email/ }).as('checkEmailPage')
    cy.intercept({ method: 'POST', url: /.*\/signin/ }).as('signin')
    cy.get('[data-testid="signin-button"]').should('exist').click()
    cy.wait('@signinPage').then(() => {
      cy.get('[id="provider"]').should('have.value', AuthProvidersEnum.credentials)
      cy.get('[id="email"]').should('exist').type(user)
      cy.get('[id="password"]').should('exist').type('wrongpass')
      cy.get('[type="submit"').should('exist').click()
      cy.wait('@signin')
      cy.get('[data-testid="server-error-0"]').should('exist')
      cy.get('[data-testid="notyet"]').should('exist').click()
    })

    // signup
    cy.wait('@signupPage').then(() => {
      cy.get('[id="provider"]').should('have.value', AuthProvidersEnum.credentials)
      cy.get('[id="email"]').should('exist').click().type(user)
      cy.get('[id="password"]').should('exist').type('wrongpass')
      cy.get('[id="password2"]').should('exist').type('wrongpass2')

      cy.get('[type="submit"').should('exist').click()
      cy.get('[data-testid="error-message-password-0"]').should('exist')
      cy.get('[data-testid="error-message-password2-0"]').should('exist')

      cy.get('[id="password"]').clear().type('Myp@ssw0rd')
      cy.get('[id="password2"]').clear().type('Myp@ssword')
      cy.get('[type="submit"').click()
      cy.get('[data-testid="error-message-password2-0"]').should('exist')
    })

    cy.visit('http://localhost:3002/signin')
    cy.wait('@signinPage').then(() => {
      cy.get('[id="email"]').should('exist').type(user)
      cy.get('[id="password"]').should('exist').type(userPass)
      cy.get('[type="submit"').click()
    })
    cy.wait('@storePage').then(() => {
      cy.wait(1000).then(() => {
        cy.getCookie('auth-key').should('exist')
      })
    })
    cy.getBySelLike('trigger-button').click()
    cy.getBySelLike('logout-item').click()
    cy.wait(1000).then(() => {
      cy.getCookie('auth-key').should('not.exist')
      cy.get('[data-testid="signin-button"]').should('exist')
    })
  })
})
