'use server'
import { cookies } from 'next/headers'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { decryptSymmetric, encryptSymmetric } from './encryption'
import { LoginResponse, Tokens } from '@/types'

export async function getCookiesList(): Promise<RequestCookie[]> {
  const cookieData = cookies().getAll()
  return new Promise((resolve) => resolve(cookieData))
}

export async function setAuthCookies(data: Tokens & { user: LoginResponse['user'] }) {
  const authKey = process.env.AUTH_COOKIE_KEY
  if (!authKey) return Promise.reject('No auth key provided')
  const cookiesList = cookies()
  cookiesList.delete(authKey)
  const encrypted = await encryptSymmetric(JSON.stringify(data))
  cookiesList.set(authKey, JSON.stringify(encrypted), {
    maxAge: 60 * 60 * 24 * 7, // one week,
    secure: process.env.NODE_ENV === 'production',
  })
}

export async function getEncryptedAuthCookie(): Promise<string | null> {
  const authKey = process.env.AUTH_COOKIE_KEY
  if (!authKey) return Promise.reject('No auth key provided')
  const authCookie = cookies().get(authKey)?.value
  if (!authCookie) return null
  return Promise.resolve(authCookie)
}

export async function getAuthTokens(encryptedAuthCookie: string): Promise<LoginResponse> {
  let decryptedAuthTokenKey
  try {
    const { cyphertext, iv } = JSON.parse(encryptedAuthCookie)
    decryptedAuthTokenKey = await decryptSymmetric(cyphertext, iv)
  } catch (err) {
    return Promise.reject(err)
  }
  let parsedAuthTokens: LoginResponse | undefined = undefined
  try {
    parsedAuthTokens = JSON.parse(decryptedAuthTokenKey) as LoginResponse
  } catch (err) {
    console.error('Unable to parse auth token')
    return Promise.reject(err)
  }

  return parsedAuthTokens
    ? Promise.resolve(parsedAuthTokens)
    : Promise.reject(new Error('Parsed token is empty '))
}
