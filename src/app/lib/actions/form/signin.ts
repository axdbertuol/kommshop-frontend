'use server'
import type { LoginResponseType } from 'auth'
import { AuthProvidersEnum } from 'auth-enum'
import { cache } from 'react'
import { FormValues } from '@/components/forms/DefaultForm'
import { cookies } from 'next/headers'

export const validateSignIn = async (prevState: FormValues, formData: FormData) => {
  console.log('cheguei')
  if (!formData) return prevState
  const authProvider = formData.get('provider')
  if (authProvider === AuthProvidersEnum.credentials) {
    const email = formData.get('email')
    const password = formData.get('password')
    if (!email || !password) {
      throw new Error('Please enter a valid email or password')
    }
    // TODO: zod validate
    try {
      const signInResult: (
        | { message: string; statusCode: string }
        | { errors: string }
        | LoginResponseType
      ) & { success: boolean } = await cacheSignInCred({
        email: email.toString(),
        password: password.toString(),
      })
      console.log(signInResult)
      if (signInResult.success) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { success, ...result } = signInResult as LoginResponseType & {
          success: boolean
        }
        const cookiesList = cookies()
        Object.entries(result).forEach(([key, value]) => {
          cookiesList.set(key, JSON.stringify(value))
        })
        cookiesList.set('provider', authProvider.toLowerCase())
        console.log(cookiesList.getAll())
        return { success: true }
      }
    } catch (e) {
      console.log('signupAndSignIn: Error', e)
    }
    return { success: false }
    // signIn(authProvider.toLowerCase(), { password, email })
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
      // cache: 'no-store',
    })
    if (response) {
      console.log('oi')
      const json = await response.json()
      return { ...json, success: response.status === 200 }
    }
    return { success: false }
  } catch (err) {
    console.error(err, 'errro!')
  }
}

export const cacheSignInCred = cache(signInCred)
