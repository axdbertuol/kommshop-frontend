import { defineConfig } from 'cypress'
import Cookies from 'js-cookie'
import { getAuthTokens } from './src/app/lib/get-cookies-list'

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      on('after:spec', async (spec, results) => {
        if (spec.name.includes('authentication')) {
          const authCookie = Cookies.get(process.env.AUTH_COOKIE_KEY!)
          if (!authCookie) throw new Error('Unable to get auth cookie in after method')
          const { token } = await getAuthTokens(authCookie)
          fetch('http://localhost:3334/api/v1/auth/me', {
            method: 'DELETE',
            headers: { Authorization: 'Bearer ' + token },
          })
        }
      })
      // implement node event listeners here
    },
  },
})
