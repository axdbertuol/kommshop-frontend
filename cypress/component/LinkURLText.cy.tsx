import React from 'react'
import { LinkURLText } from '@/components/LinkURLText'
import * as Navigation from '@/navigation'
import '@/app/globals.css'

describe('<LinkURLText />', () => {
  context('use mock router implementation', () => {
    it('renders', () => {
      const navigation = {
        usePathname: cy.stub().as('usePathNameStub'),
      }

      cy.stub(Navigation, 'usePathname').returns(navigation)
      cy.nextMount(
        <LinkURLText
          data={{ label: 'Teste', value: 'ing' }}
          searchParamName={'test'}
        />
      )

      cy.get('span').click()
      cy.get('@router:push').should((mock) => {
        expect(mock).to.have.been.calledOnce
      })
    })
  })
})
