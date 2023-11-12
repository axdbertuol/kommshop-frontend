'use server'
import { LoginResponseType } from 'auth'
import authFetch from '../../auth/auth-fetch'
import { cookies } from 'next/headers'

export const refreshToken = async ({ headers }: { headers?: Headers }) => {
  const cookiesList = cookies()
  const token = cookiesList.get('token')?.value
  const user = cookiesList.get('user')?.value
  const expires = Number(cookiesList.get('tokenExpires')?.value)
  try {
    const url = process.env.REFRESH_TOKEN_ENDPOINT!
    const response = await authFetch(url, {
      method: 'POST',
      user,
      headers,
    })
    const data = (await response.json()) as LoginResponseType
    return data
  } catch (err) {
    console.log('Refresh error', err)
  }
}
