'use server'
import { Tokens } from '@/types/common'
import { getApiPath } from '../../config'

export const refreshTokenApi = async ({ headers }: { headers?: Headers }) => {
  const newHeaders = new Headers(headers || {})
  newHeaders.set('cache', 'no-store')
  try {
    const url = getApiPath('refresh')
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
