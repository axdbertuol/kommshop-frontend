'use server'
import { cookies } from 'next/headers'
import {
  getAuthTokens,
  getEncryptedAuthCookie,
  setAuthCookies,
} from '../get-cookies-list'
import { Tokens } from '@/types/common'
import { refreshTokenApi } from '../actions/form/refresh-token'

export default async function authFetch(
  input: RequestInfo | URL,
  init: (RequestInit & { user?: string }) | undefined
) {
  const headers = new Headers(init?.headers)
  console.log(headers)
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

  if (refreshToken && tokenExpires && tokenExpires <= Date.now()) {
    console.log('tokenExpired')
    const url = process.env.REFRESH_TOKEN_ENDPOINT!
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
