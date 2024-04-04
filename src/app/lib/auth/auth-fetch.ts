'use server'
import { cookies } from 'next/headers'
import {
  getAuthTokens,
  getEncryptedAuthCookie,
  setAuthCookies,
} from '../get-cookies-list'
import { Tokens } from '@/types'
import { refreshTokenApi } from '../actions/form/refresh-token'
import { isTokenExpired } from '../utils'

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
  console.log('user, token, tokenExpires, refreshToken')
  console.log(user, token, tokenExpires, refreshToken)
  if (refreshToken && isTokenExpired(tokenExpires)) {
    console.log('tokenExpired')

    headers.set('Authorization', 'Bearer ' + refreshToken)
    const newTokensJson: Tokens = await refreshTokenApi({ headers })

    headers.set('Authorization', 'Bearer ' + newTokensJson.token)
    await setAuthCookies({ user, ...newTokensJson })
    init = {
      ...init,
      headers,
    }
  } else if (!refreshToken) {
    const cookiesList = cookies()
    const authKey = process.env.AUTH_COOKIE_KEY!
    cookiesList.delete(authKey)

    return Promise.reject('Invalid refresh token, user should log in again.')
  }

  return fetch(input, init)
}
