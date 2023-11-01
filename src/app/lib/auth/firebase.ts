import { FirestoreAdapter, initFirestore } from '@auth/firebase-adapter'
import { cert } from 'firebase-admin/app'
import { AuthOptions, Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import admin from 'firebase-admin'
import { AdapterUser } from 'next-auth/adapters'

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
      profile(profile, tokens) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile?.role ?? 'client',
        }
      },
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
    async signIn(params) {
      console.log(params)
      return true
    },
    session({
      session,
      user,
    }: {
      session: Session
      user: AdapterUser & { role?: string }
    }) {
      if (user.role) {
        const newSession = {
          ...session,
          user: {
            ...session.user,
            role: user.role,
          },
        }
        return newSession
      }
      return session
    },
  },
}
