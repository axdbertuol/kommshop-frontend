'use server'
import { getEncryptedAuthCookie, getAuthTokens } from './get-cookies-list'

export async function getUser() {
  const encryptedAuthCookie = await getEncryptedAuthCookie()
  let user = null
  if (encryptedAuthCookie) {
    const authTokens = await getAuthTokens(encryptedAuthCookie)
    user = authTokens.user
  }
  return user
}
