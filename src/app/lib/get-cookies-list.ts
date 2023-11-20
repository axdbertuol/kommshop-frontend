'use server'
import { cookies } from 'next/headers'
import { LoginResponseType } from 'kommshop-types'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { decryptSymmetric } from './encryption'

export async function getCookiesList(): Promise<RequestCookie[]> {
  const cookieData = cookies().getAll()
  return new Promise((resolve) => resolve(cookieData))
}

export async function getEncryptedAuthCookie(): Promise<string | null> {
  const authKey = process.env.AUTH_COOKIE_KEY
  if (!authKey) return Promise.reject('No auth key provided')
  const authCookie = cookies().get(authKey)?.value
  if (!authCookie) return null
  return Promise.resolve(authCookie)
}

export async function getAuthTokens(
  encryptedAuthCookie: string
): Promise<LoginResponseType> {
  let decryptedAuthTokenKey
  try {
    const { cyphertext, iv } = JSON.parse(encryptedAuthCookie)
    decryptedAuthTokenKey = await decryptSymmetric(cyphertext, iv)
  } catch (err) {
    return Promise.reject(err)
  }
  let parsedAuthTokens: LoginResponseType | undefined = undefined
  try {
    parsedAuthTokens = JSON.parse(decryptedAuthTokenKey) as LoginResponseType
  } catch (err) {
    console.error('Unable to parse auth token')
    return Promise.reject(err)
  }

  return parsedAuthTokens
    ? Promise.resolve(parsedAuthTokens)
    : Promise.reject(new Error('Parsed token is empty '))
}
