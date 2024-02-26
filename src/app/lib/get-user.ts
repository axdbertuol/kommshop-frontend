'use server'
import { unstable_cache } from 'next/cache'
import { getAuthTokens, getEncryptedAuthCookie } from './get-cookies-list'

export async function getUser() {
  const encryptedAuthCookie = await getEncryptedAuthCookie()
  let user = null
  if (encryptedAuthCookie) {
    const authTokens = await getAuthTokens(encryptedAuthCookie)
    user = authTokens.user
  }
  return user
}

export const getCachedUser = unstable_cache(async () => getUser(), ['my-app-user'])
