'use server'
import type { LoginResponseType } from 'shared-kommshop-types'
import { HTTP_CODES_ENUM } from '@/enum'
import { ServerErrorResponse, SigninFormValues } from '@/types/common'
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
    console.log('url: ' + url, email, password)
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    const json = (await response.json()) as LoginResponseType & ServerErrorResponse
    console.log(response, json)
    const success = response.status === HTTP_CODES_ENUM.OK
    if (!success) {
      return {
        success,
        serverErrors: parseServerErrors(json),
      }
    }
    await setAuthCookies(json)
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
    body: JSON.stringify({ idToken }),
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  })
  const json = (await response.json()) as ServerErrorResponse & LoginResponseType

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
