'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'

export const isGoogleAuthEnabled =
  process.env.NEXT_PUBLIC_IS_GOOGLE_AUTH_ENABLED === 'true'
export const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  return isGoogleAuthEnabled && googleClientId ? (
    <GoogleOAuthProvider clientId={googleClientId}>{children}</GoogleOAuthProvider>
  ) : (
    children
  )
}

export default GoogleAuthProvider
