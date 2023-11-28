import React from 'react'
import { UserNav } from '@/app/components/nav/UserNav'
import '@/app/globals.css'
import { LoginResponseUserDto } from 'kommshop-types'
import * as signOut from '@/app/lib/actions/form/signout'

const mock: Partial<LoginResponseUserDto> = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@gmail.com',
  id: 123,
}
const ethb = (m: any) => expect(m).to.have.been
describe('<UserNav />', () => {
  it('renders without user and calls router:push on click', () => {
    cy.nextMount(<UserNav user={null} />)
    cy.get('button').contains('Sign in').click()
    cy.get('@router:push').should((mock) => {
      expect(mock).to.have.been.calledOnce
    })
  })
  it('renders with user', () => {
    cy.nextMount(<UserNav user={mock as LoginResponseUserDto} />)
  })
  it('opens dropdown', () => {
    cy.nextMount(<UserNav user={mock as LoginResponseUserDto} />)
    cy.get('[data-testid="trigger-button"]').click()
    cy.get('[data-testid="dropdown-content"]').should('exist')
    cy.get('[data-testid="dropdown-content-label"]')
      .should('exist')
      .contains(mock.firstName!)
      .next()
      .contains(mock.email!)
  })
  it('when clicking on profile successfully call router', () => {
    cy.nextMount(<UserNav user={mock as LoginResponseUserDto} />)
    cy.get('[data-testid="trigger-button"]').click()
    cy.get('[data-testid="dropdown-group-content"]')
      .should('exist')
      .within(() => {
        cy.get('div').contains('Profile').click()
        cy.get('@router:push').should((mock) => {
          ethb(mock).calledOnceWithExactly('/settings/profile')
        })
      })
  })
})
