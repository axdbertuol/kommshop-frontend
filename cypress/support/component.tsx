/* eslint-disable @typescript-eslint/no-namespace */
// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
import { MountOptions, MountReturn, mount } from 'cypress/react18'
import { HeadManagerContext } from 'next/dist/shared/lib/head-manager-context.shared-runtime'
// eslint-disable-next-line @next/next/no-document-import-in-page
import { Head } from 'next/document'
import { ReactNode } from 'react'
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      nextMount: (
        jsx: ReactNode,
        options?: (Partial<MountOptions> & { router: any; head: Head }) | undefined,
        rerenderKey?: string | undefined
      ) => Chainable<MountReturn>
    }
  }
}

Cypress.Commands.add('mount', mount)
Cypress.Commands.add('nextMount', (component, options) => {
  const createRouter = (params: any) => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '',
    back: cy.stub().as('router:back'),
    forward: cy.stub().as('router:forward'),
    push: cy.stub().as('router:push'),
    reload: cy.stub().as('router:reload'),
    replace: cy.stub().as('router:replace'),
    isReady: true,
    ...params,
  })
  const router = createRouter(options?.router || {})

  const createHeadManager = (params: any) => ({
    updateHead: cy.stub().as('head:updateHead'),
    mountedInstances: new Set(),
    updateScripts: cy.stub().as('head:updateScripts'),
    scripts: new Set(),
    getIsSsr: () => false,
    appDir: false,
    nonce: '_',
    ...params,
  })
  const headManager = createHeadManager(options?.head || {})

  // import('/cypress/images/fallback.png').then((image) => {
  //   cy.intercept('_next/image*', {
  //     statusCode: 200,
  //     headers: { 'Content-Type': 'image/png' },
  //     body: image.default,
  //   })
  // })

  return mount(
    <HeadManagerContext.Provider value={headManager}>
      <AppRouterContext.Provider value={router}>{component}</AppRouterContext.Provider>
    </HeadManagerContext.Provider>,
    options
  )
})
