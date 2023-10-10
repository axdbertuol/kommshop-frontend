import React from 'react'
import CommandSearch from './CommandSearch'
import '@/app/globals.css'
import { LabelValue } from '@/types/common'
import * as CommandSearchList from './CommandSearchList'

const mock: (LabelValue & { _id: string; type: string })[] = [
  {
    _id: '',
    type: 'product',
    label: 'product',
    value: 'product',
  },
  {
    _id: '',
    type: 'product',
    label: 'product',
    value: 'product',
  },
  {
    _id: '',
    type: 'category',
    label: 'category',
    value: 'category',
  },
]

describe('<CommandSearch />', () => {
  beforeEach(() => {
    cy.stub(CommandSearchList, 'queryFn').as('queryFn')
  })
  it('renders', () => {
    cy.nextMount(
      <div className="p-8 bg-slate-50 text-slate-700 !important">
        <CommandSearch suggestions={mock} />
      </div>
    )
  })
  it('should show suggestions list when clicking input', () => {
    cy.nextMount(
      <div className="p-8 bg-slate-50 text-slate-700 !important">
        <CommandSearch suggestions={mock} />
      </div>
    )
    cy.get('input')
      .click()
      .then(() => {
        cy.get('[data-cy=CommandSearchList]').should('be.visible')
      })
  })
  it('should show suggestions list when typing', () => {
    cy.nextMount(
      <div className="p-8 bg-slate-50 text-slate-700 !important">
        <CommandSearch suggestions={mock} />
      </div>
    )
    cy.get('input')
      .click()
      .type('product')
      .then(() => {
        cy.get('[data-cy=CommandSearchList]').should('be.visible')
      })
  })
  it('should click suggestion and show value in input', () => {
    cy.nextMount(
      <div className="p-8 bg-slate-50 text-slate-700 !important">
        <CommandSearch suggestions={mock} />
      </div>
    )
    cy.get('input')
      .click()
      .then(() => {
        cy.get('li>span[role=listitem]').first().click()
      })
    cy.get('input').should('contain.value', 'product')
  })
  it('should not show suggestions after submitting', () => {
    cy.nextMount(
      <div className="p-8 bg-slate-50 text-slate-700 !important">
        <CommandSearch suggestions={mock} />
      </div>
    )
    cy.get('button[type=submit]')
      .click()
      .then(() => {
        cy.get('[data-cy=CommandSearchList]').should('not.be.visible')
      })
  })
  it('should clear search value after submit', () => {
    cy.nextMount(
      <div className="p-8 bg-slate-50 text-slate-700 !important">
        <CommandSearch suggestions={mock} />
      </div>
    )
    cy.get('button[type=submit]')
      .click()
      .then(() => {
        cy.get('input').should('not.contain.value')
      })
  })
})
