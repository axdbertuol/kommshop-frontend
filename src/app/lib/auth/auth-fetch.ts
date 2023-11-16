'use server'
import { cookies } from 'next/headers'
import { refreshToken } from '../actions/form/refresh-token'
import { getCookiesList } from '../get-cookies-list'
export default async function authFetch(
  input: RequestInfo | URL,
  init: (RequestInit & { user?: string }) | undefined
) {
  const headers = new Headers(init?.headers)
  const cookiesList = await getCookiesList()
  const token = cookiesList.find(({ name }) => name === 'token')?.value
  const user = cookiesList.find(({ name }) => name === 'user')?.value
  const expires = Number(cookiesList.find(({ name }) => name === 'tokenExpires')?.value)

  headers.set('Authorization', 'Bearer ' + token)

  // if (Date.now() - expires > 0) {
  //   console.log('Refreshing token')
  //   try {
  //     const data = await refreshToken({ headers, _cookies: cookiesList })
  //     headers.set('Authorization', 'Bearer ' + data?.token)
  //   } catch (err) {
  //     console.log('Error refreshing token')
  //   }
  // }

  return await fetch(input, { ...init, user, headers } as RequestInit & { user?: string })
}
