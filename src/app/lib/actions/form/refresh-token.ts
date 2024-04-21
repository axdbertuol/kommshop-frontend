'use server'
import { ServerErrorResponse, Tokens, User } from '@/types'
import { getApiPath } from '../../config'

type Response = {
  success: true
  user: User
} & Tokens

type ResponseError = {
  success: false
  error?: ServerErrorResponse['error']
}

export async function refreshTokenApi({
  refreshToken,
  headers,
}: {
  refreshToken: string
  headers?: Headers
}) {
  const newHeaders = new Headers(headers || {})
  newHeaders.set('cache', 'no-store')
  newHeaders.set('Content-Type', 'application/json')
  try {
    const url = getApiPath('refresh')
    const response = await fetch(url, {
      method: 'POST',
      headers: newHeaders,
      body: JSON.stringify({ refreshToken }),
    })
    const data = (await response.json()) as Tokens & ServerErrorResponse
    if (data.error) {
      console.log('RefreshTokenApi error', data)
      return { error: data.error, success: false } as ResponseError
    }
    return { ...data, success: true } as Response
  } catch (err: any) {
    console.log(err)
  }
  return { success: false } as ResponseError
}
