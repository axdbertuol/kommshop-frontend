import { encrypt } from '@/utils/encryption'
import NextAuth, { AuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import KeycloakProvider from 'next-auth/providers/keycloak'
import jwtDecode from 'jwt-decode'

async function refreshAccessToken(token: Token) {
  console.log('Refreshing access token', token)
  const resp = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_ID ?? '',
      client_secret: process.env.KEYCLOAK_SECRET ?? '',
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token ?? '',
    }),
    method: 'POST',
  })
  const refreshToken = await resp.json()
  if (!resp.ok) throw refreshToken

  return {
    ...token,
    access_token: refreshToken.access_token,
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  }
}

type Token =
  | {
      access_token?: string
      id_token?: string
      expires_at?: number
      refresh_token?: string
    } & JWT

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  // pages: {
  //   signIn: '/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID ?? '',
      clientSecret: process.env.KEYCLOAK_SECRET ?? '',
      issuer: process.env.KEYCLOAK_ISSUER,
      // authorization: 'http://localhost:3001/signup',
    }),
  ],
  session: {
    // generateSessionToken: () => {
    //   return randomUUID?.() ?? randomBytes(32).toString('hex')
    // },
    // maxAge: 60,
    // remember: always check if keycloak session maxAge is same
    maxAge: 1800,
  },
  // events: {
  //   async signIn(message) {
  //   },
  // },
  callbacks: {
    async jwt({ token, account }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000)
      token = token as Token
      if (account) {
        // account is only available the first time this callback is called on a new session (after the user signs in)
        const newToken = {
          ...token,
          access_token: account.access_token,
          id_token: account.id_token,
          expires_at: account.expires_at ?? nowTimeStamp,
          refresh_token: account.refresh_token,
        }
        return newToken
      } else if (
        typeof token?.expires_at === 'number' &&
        nowTimeStamp < token.expires_at
      ) {
        // token has not expired yet, return it
        return token
      } else {
        // token is expired, try to refresh it
        console.log('Token has expired. Will refresh...')
        try {
          const refreshedToken = await refreshAccessToken(token)
          console.log('Token is refreshed.', refreshedToken)
          return refreshedToken
        } catch (error) {
          console.error('Error refreshing access token', error)
          return { ...token, error: 'RefreshAccessTokenError' }
        }
      }
    },
    async session({ session, token }: { session: Session; token: Token }) {
      // Send properties to the client
      let decoded
      try {
        decoded = jwtDecode(token?.access_token ?? '') as {
          realm_access: { roles: string[] }
          exp?: number
        }
      } catch (err) {
        console.log(err)
      }

      const newSession = {
        ...session,
        user: {
          ...session.user,
          roles: decoded?.realm_access.roles ?? '',
        },
        access_token: token.access_token && encrypt(token.access_token),
        id_token: token.id_token && encrypt(token.id_token),
      }
      return newSession
    },
  },
}

export default NextAuth(authOptions)
