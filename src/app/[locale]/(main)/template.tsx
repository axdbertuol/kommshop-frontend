import Nav from '@/app/components/nav/Nav'
import React from 'react'
import { ReactNode } from 'react'
import { getAuthTokens, getEncryptedAuthCookie } from '../../lib/get-cookies-list'

export default async function Template({ children }: { children: ReactNode }) {
  const encryptedAuthCookie = await getEncryptedAuthCookie()
  let user = null
  if (encryptedAuthCookie) {
    const authTokens = await getAuthTokens(encryptedAuthCookie)
    user = authTokens.user
  }
  return (
    <>
      <Nav user={user} />
      {children}
    </>
  )
}
