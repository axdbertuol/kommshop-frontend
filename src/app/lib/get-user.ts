'use server'
import { revalidateTag, unstable_cache } from 'next/cache'
import { getAuthTokens, getEncryptedAuthCookie } from './get-cookies-list'

export async function getUser() {
  const encryptedAuthCookie = await getEncryptedAuthCookie()
  if (encryptedAuthCookie) {
    const authTokens = await getAuthTokens(encryptedAuthCookie)
    return authTokens.user
  }
  revalidateTag('my-app-user')
  return null
}

export const getCachedUser = unstable_cache(async () => getUser(), ['my-app-user'])
