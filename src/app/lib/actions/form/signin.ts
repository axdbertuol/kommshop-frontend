'use server'
import type { LoginResponseType } from 'shared-kommshop-types'
import { AuthProvidersEnum, HTTP_CODES_ENUM } from '@/enum'
import { ErrorResponse, SigninFormValues } from '@/types/common'
import { setAuthCookies } from '../../get-cookies-list'
import { revalidatePath } from 'next/cache'
import { getApiPath } from '../../config'
import { signupCred } from './signup'
import {
  credSigninSchema,
  credSignupSchema,
  googleSigninSchema,
  schemaAuthBasic,
} from './schemas'

export const validateSignIn = async (formData: FormData) => {
  if (!formData) return null
  const authProvider = formData.get('provider')
  const validation = await schemaAuthBasic
    .spa({ provider: authProvider?.toString() })
    .then(async (result) => {
      if (result.success) {
        let result
        switch (authProvider) {
          case AuthProvidersEnum.google:
            // make request to google then validate
            break
          case AuthProvidersEnum.credentials:
            result = await credSigninSchema.spa({
              email: formData.get('email'),
              password: formData.get('password'),
            })
            return result
          default:
            return { error: 'Invalid auth provider' }
        }
      }
    })

  return validation
}

const signInCred = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<SigninFormValues> => {
  try {
    const url = getApiPath('signin')
    console.log('url: ' + url, email, password)
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    const json = await response.json()
    console.log(response)
    const success = response.status === HTTP_CODES_ENUM.OK
    if (success) {
      await setAuthCookies(json)
      revalidatePath('/')
      return { ...json, success }
    } else {
      return {
        success,
        ...(json.error && { error: json.error }),
        ...(json.errors && { errors: json.errors }),
      }
    }
  } catch (err) {
    console.error(err, 'signInCred!')
  }
  return { email, password, success: false }
}

export const signinGoogle = async ({ idToken }: { idToken?: string }) => {
  const url = getApiPath('google')
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ idToken }),
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  })
  const json = (await response.json()) as ErrorResponse & LoginResponseType

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
    success: success,
    ...(json.error && { error: json.error }),
    ...(json.errors && { errors: json.errors }),
  }
}

const authMap = {
  [AuthProvidersEnum.google.toString()]: {
    signin: {
      schema: googleSigninSchema,
      action: signinGoogle,
    },
    signup: {
      schema: googleSigninSchema, // Adjust if needed
      action: signinGoogle, // Adjust if needed
    },
  },
  [AuthProvidersEnum.credentials.toString()]: {
    signin: {
      schema: credSigninSchema,
      action: signInCred,
    },
    signup: {
      schema: credSignupSchema,
      action: signupCred,
    },
  },
  // Add more providers if needed
}

export const validateAuth = async (
  prevState: Record<string, any>,
  formData: FormData,
  endpoint: 'signin' | 'signup'
) => {
  if (!formData) return prevState

  const authProvider = formData.get('provider')?.toString()
  if (!authProvider || !authMap[authProvider]) {
    return { ...prevState, success: false, error: 'Invalid authentication provider' }
  }

  const { schema, action } = authMap[authProvider][endpoint]
  const providerValidation = await schemaAuthBasic.spa({ provider: authProvider })

  if (!providerValidation.success) {
    return { ...prevState, success: false, error: providerValidation.error.message }
  }
  const actionData = Object.fromEntries(
    Array.from(formData).map(([key, value]) => [key, value.toString()])
  ) as unknown as { email: string; password: string } & { idToken: string }

  const actionValidation = await schema.spa(actionData)
  if (!actionValidation.success) {
    return { ...prevState, success: false, error: actionValidation.error.message }
  }

  const signinResult = await action(actionData)

  console.log('signinResult', signinResult)
  return signinResult
}

export const composeValidateAuthSignin = (...args: any[]) =>
  validateAuth(args[0], args[1], 'signin')
export const composeValidateAuthSignup = (...args: any[]) =>
  validateAuth(args[0], args[1], 'signup')
