'use server'
import { HTTP_CODES_ENUM } from '@/enum'
import { CausedServerErrorResponse, LoginResponse, ServerErrorResponse } from '@/types'
import { setAuthCookies } from '../../get-cookies-list'
import { revalidatePath } from 'next/cache'
import { getApiPath } from '../../config'
import { TCredSigninSchema, TGoogleSigninSchema } from './schemas'
import { parseServerErrors } from '../../utils'

export const signInCred = async ({
  email,
  password,
}: Omit<TCredSigninSchema, 'provider'>) => {
  try {
    const url = getApiPath('signin')
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    const json = (await response.json()) as LoginResponse | CausedServerErrorResponse
    const success = response.status === HTTP_CODES_ENUM.OK
    if (!success || response.status < 200 || response.status > 399) {
      return {
        success,
        serverErrors: parseServerErrors((json as CausedServerErrorResponse).cause),
      }
    }
    await setAuthCookies(json as LoginResponse)
    revalidatePath('/')
    return { success }
  } catch (err) {
    console.error(err, 'signInCred!')
  }
  return { email, password, success: false }
}

export const signinGoogle = async ({
  idToken,
}: Omit<TGoogleSigninSchema, 'provider'>) => {
  const url = getApiPath('google')
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ idToken, provider: 'google' }),
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  })
  const json = (await response.json()) as ServerErrorResponse & LoginResponse

  const success = response.status === HTTP_CODES_ENUM.OK
  if (success) {
    await setAuthCookies({
      token: json.token,
      user: json.user,
      refreshToken: json.refreshToken,
      tokenExpires: json.tokenExpires,
    })
    revalidatePath('/')
    return { success: success }
  }

  return {
    success,
    serverErrors: parseServerErrors(json),
  }
}
