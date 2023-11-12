'use server'
import { LoginResponseType } from './signin'
import authFetch from '../../auth/auth-fetch'
import { cookies } from 'next/headers'

export const refreshToken = async ({ headers }: { headers?: Headers }) => {
  const cookiesList = cookies()
  const token = cookiesList.get('token')?.value
  const user = cookiesList.get('user')?.value
  const expires = Number(cookiesList.get('tokenExpires')?.value)
  try {
    const response = await authFetch('http://localhost:3334/api/auth/refresh', {
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
