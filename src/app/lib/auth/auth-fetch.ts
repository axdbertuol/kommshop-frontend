'use server'
import {
  getAuthTokens,
  // cachedGetAuthTokens,
  getEncryptedAuthCookie,
} from '../get-cookies-list'
export default async function authFetch(
  input: RequestInfo | URL,
  init: (RequestInit & { user?: string }) | undefined
) {
  const headers = new Headers(init?.headers)
  let user: string
  const encryptedAuthCookie = await getEncryptedAuthCookie()
  if (!encryptedAuthCookie) return Promise.reject()
  try {
    const authTokens = await getAuthTokens(encryptedAuthCookie)
    headers.set('Authorization', 'Bearer ' + authTokens.token)
    user = JSON.stringify(authTokens.user)
    console.log('user', user)
  } catch (err) {
    console.error('ParseError authFetch', err)
    return Promise.reject(err)
  }
  return fetch(input, {
    ...init,
    user,
    headers,
  } as RequestInit & { user?: string })
}
