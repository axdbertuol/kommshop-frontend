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
import QueryClientWrapper from '@/app/components/providers/QueryClientWrapper'
import SearchContextProvider from '@/app/components/providers/SearchContextProvider'
import { ThemeProvider } from '@/app/components/providers/ThemeProvider'
import { unstable_setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { getServerActionDispatcher } from 'next/dist/client/components/app-router'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.

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
  getServerActionDispatcher()
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
    <NextIntlClientProvider locale="pt">
      <HeadManagerContext.Provider value={headManager}>
        <AppRouterContext.Provider value={router}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
            <SearchContextProvider>
              <QueryClientWrapper>{component}</QueryClientWrapper>
            </SearchContextProvider>
          </ThemeProvider>
        </AppRouterContext.Provider>
      </HeadManagerContext.Provider>
    </NextIntlClientProvider>,
    options
  )
})

Cypress.on('uncaught:exception', (err, runnable) => {
  // we expect a 3rd party library error with message 'list not defined'
  // and don't want to fail the test so we return false
  if (err.message.includes('Invariant: missing action dispatcher')) {
    return false
  }
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test
})
