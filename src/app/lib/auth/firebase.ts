import { FirestoreAdapter, initFirestore } from '@auth/firebase-adapter'
import { cert } from 'firebase-admin/app'
import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const firestore = initFirestore({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
})

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
  adapter: FirestoreAdapter(firestore),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn(params) {
      // console.log('asd', params?.account)
      // console.log('dsad', params?.profile)
      // if (account.provider === 'google') {
      //   return profile.email_verified && profile.email.endsWith('@example.com')
      // }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  },
}
