import { initFirestore } from '@auth/firebase-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cert } from 'firebase-admin/app'
import { AuthOptions, Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { JWT } from 'next-auth/jwt'
import jwtDecode from 'jwt-decode'
import { encrypt } from '@/utils/encryption'

export const firestore = initFirestore({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
})

async function refreshAccessToken(token: Token) {
  console.log('Refreshing access token', token)
  console.log(process.env.REFRESH_TOKEN_URL)
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

type SignInArgs = {
  account: {
    provider: string
    type: string
    providerAccountId: string
    access_token: string
    expires_at: number
    scope: string
    token_type: string | 'Bearer'
    id_token: string
  }
  profile: {
    iss: string
    azp: string
    aud: string
    sub: string
    name: string
    picture?: string
    given_name: string
    iat: 1698856508
    exp: 1698860108
    email_verified: boolean
    email: string
  }
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  // adapter: FirestoreAdapter(firestore),
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      id: 'sign-in',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return Promise.reject({ error: 'Invalid credentials' })
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })
        const user = await res.json()
        if (res.ok && user) {
          return { ...user, email: credentials.email }
        }
        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  events: {
    createUser(message) {
      console.log('user created', JSON.stringify(message))
    },
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token
      }
      return Promise.resolve(token)
    },
    async session({ session, token }: { session: Session; token: Token }) {
      // Send properties to the client
      // Add access_token to session
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      return Promise.resolve(session)
    },
  },
}
