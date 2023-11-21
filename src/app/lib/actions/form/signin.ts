'use server'
import type { LoginResponseType } from 'shared-kommshop-types'
import { AuthProvidersEnum } from '@/enum'
import { cache } from 'react'
import { FormValues } from '@/components/forms/DefaultForm'
import { ErrorResponse } from '@/types/common'
import { setAuthCookies } from '../../get-cookies-list'
import { redirect } from '@/navigation'

export const validateSignIn = async (prevState: FormValues, formData: FormData) => {
  if (!formData) return prevState
  const authProvider = formData.get('provider')
  if (authProvider === AuthProvidersEnum.credentials) {
    const email = formData.get('email')
    const password = formData.get('password')
    if (!email || !password) {
      throw new Error('Please enter a valid email or password')
    }
    // TODO: zod validate
    const signInResult: (ErrorResponse & LoginResponseType) & { success: boolean } =
      await cacheSignInCred({
        email: email.toString(),
        password: password.toString(),
      })
    console.log(signInResult)

    if (signInResult.success) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { success, ...result } = signInResult as LoginResponseType & {
        success: boolean
      }
      await setAuthCookies(result)

      return redirect('/')
    } else {
      return {
        success: signInResult.success,
        ...(signInResult.error && { error: signInResult.error }),
        ...(signInResult.errors && { errors: signInResult.errors }),
      }
    }
  }
  return prevState
}

const signInCred = async (credentials: { email: string; password: string }) => {
  // const url = new URL(`http://localhost:3334/users/${id}`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const url = process.env.SIGNIN_CREDENTIAL_ENDPOINT!

  const newCredentials = {
    email: credentials.email,
    password: credentials.password,
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newCredentials),
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    if (response) {
      const json = await response.json()
      return { ...json, success: response.status === 200 }
    }
    return { success: false }
  } catch (err) {
    console.error(err, 'errro!')
  }
}

export const cacheSignInCred = cache(signInCred)
