'use server'
import { cookies } from 'next/headers'
import {
  getAuthTokens,
  getEncryptedAuthCookie,
  setAuthCookies,
} from '../get-cookies-list'
import { refreshTokenApi } from '../actions/form/refresh-token'
import { isTokenExpired } from '../utils'
import { redirect } from '@/navigation'

export default async function authFetch(
  input: RequestInfo | URL,
  init: (RequestInit & { user?: string }) | undefined
) {
  const headers = new Headers(init?.headers)
  const encryptedAuthCookie = await getEncryptedAuthCookie()
  if (!encryptedAuthCookie) return Promise.reject()

  const { user, token, tokenExpires, refreshToken } = await getAuthTokens(
    encryptedAuthCookie
  )
  headers.set('Authorization', 'Bearer ' + token)

  init = {
    ...init,
    headers,
  }

  if (refreshToken && isTokenExpired(tokenExpires)) {
    const newTokensJson = await refreshTokenApi({ refreshToken, headers })
    if (!newTokensJson.success) {
      redirect('/signin')
      return Promise.reject(newTokensJson.error)
    }
    await setAuthCookies(newTokensJson)

    headers.set('Authorization', 'Bearer ' + newTokensJson.token)
    init = {
      ...init,
      headers,
    }
  } else if (!refreshToken) {
    const cookiesList = cookies()
    const authKey = process.env.AUTH_COOKIE_KEY!
    cookiesList.delete(authKey)

    return Promise.reject()
  }

  return fetch(input, init)
}
