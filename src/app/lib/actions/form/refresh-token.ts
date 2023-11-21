'use server'
import { Tokens } from '@/types/common'

export const refreshTokenApi = async ({ headers }: { headers?: Headers }) => {
  const newHeaders = new Headers(headers || {})
  newHeaders.set('cache', 'no-store')
  try {
    const url = process.env.REFRESH_TOKEN_ENDPOINT!
    const response = await fetch(url, {
      method: 'POST',
      headers: newHeaders,
    })
    const data = (await response.json()) as Tokens
    return data
  } catch (err: any) {
    throw new Error('RefreshTokenApi error', err.message)
  }
}
