'use server'
import { LoginResponseType } from 'shared-kommshop-types'
import authFetch from '../../auth/auth-fetch'

export const refreshToken = async ({ headers }: { headers?: Headers }) => {
  try {
    const url = process.env.REFRESH_TOKEN_ENDPOINT!
    const response = await authFetch(url, {
      method: 'POST',
      headers,
    })
    const data = (await response.json()) as LoginResponseType
    return data
  } catch (err) {
    console.log('Refresh error', err)
  }
}
