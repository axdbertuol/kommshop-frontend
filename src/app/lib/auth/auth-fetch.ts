'use server'
import { cookies } from 'next/headers'
import { refreshToken } from '../actions/form/refresh-token'
export default async function authFetch(
  input: RequestInfo | URL,
  init: (RequestInit & { user?: string }) | undefined
) {
  const headers = new Headers(init?.headers)
  const cookiesList = cookies()
  const token = cookiesList.get('token')?.value
  const user = cookiesList.get('user')?.value
  const expires = Number(cookiesList.get('tokenExpires')?.value)

  headers.set('Authorization', 'Bearer ' + token)

  if (Date.now() - expires > 0) {
    console.log('Refreshing token')
    try {
      const data = await refreshToken({ headers })
      headers.set('Authorization', 'Bearer ' + data?.token)
    } catch (err) {
      console.log('Error refreshing token')
    }
  }

  return fetch(input, { ...init, user, headers } as RequestInit & { user?: string })
}
