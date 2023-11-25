import React from 'react'
import CommandSearch from '@/app/components/CommandSearch'
import '@/app/globals.css'
import { Suggestion } from '@/types/common'
import * as CommandSearchList from '@/app/components/CommandSearchList'

const mock: Record<string, Suggestion[]> = {
  products: [
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
  ],
  categories: [
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
  ],
}

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
        cy.get('li>span').first().click()
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
        cy.get('[data-cy=CommandSearchList]').should('not.exist')
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

  it('should show suggestions after focusing input and typing', () => {
    cy.nextMount(
      <div className="p-8 bg-slate-50 text-slate-700 !important">
        <CommandSearch suggestions={mock} />
      </div>
    )
    cy.get('input')
      .focus()
      .type('a')
      .then(() => {
        cy.get('[data-cy=CommandSearchList]').should('be.visible')
      })
  })
})
