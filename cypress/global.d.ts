namespace Cypress {
  interface Chainable {
    mount: typeof mount
    nextMount: (
      jsx: any | ReactNode,
      options?: (Partial<MountOptions> & { router: any; head: Head }) | undefined,
      rerenderKey?: string | undefined
    ) => Chainable<MountReturn>
    getBySelLike(
      selector: string,
      options?:
        | Partial<
            Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow
          >
        | undefined
    ): Chainable<JQuery<HTMLElement>>
    hasAuthCookie: () => boolean
  }
}
