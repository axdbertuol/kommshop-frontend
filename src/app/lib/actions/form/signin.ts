'use server'
import type { LoginResponseType } from 'shared-kommshop-types'
import { AuthProvidersEnum, HTTP_CODES_ENUM } from '@/enum'
import { cache } from 'react'
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
  const response: (ErrorResponse & LoginResponseType) & { success: boolean } =
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ idToken }),
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    }).then((response) => ({
      ...response.json(),
      success: response.status === HTTP_CODES_ENUM.OK,
    }))
  if (response.success) {
    await setAuthCookies(response)
    revalidatePath('/')
    return { ...response, success: response.success }
  } else {
    return {
      success: response.success,
      ...(response.error && { error: response.error }),
      ...(response.errors && { errors: response.errors }),
    }
  }
}

export const composeValidateSignin = async (
  prevState: Record<string, string | boolean | number>,
  formData: FormData
) => {
  if (!formData) return null
  const authProvider = formData.get('provider')

  const providerValidation = await schemaAuthBasic.spa({
    provider: authProvider?.toString(),
  })
  if (!providerValidation.success) {
    return { success: false, error: providerValidation.error.message }
  }

  if (authProvider === AuthProvidersEnum.credentials) {
    const credValidation = await credSigninSchema.spa(
      Object.fromEntries(formData.entries())
    )
    if (!credValidation.success) {
      return { success: false, error: credValidation.error.message }
    }

    const email = formData.get('email')!.toString()
    const password = formData.get('password')!.toString()
    const signinResult = await signInCred({ email, password })

    console.log(signinResult)
    return signinResult
  } else if (authProvider === AuthProvidersEnum.google) {
    const idToken = formData.get('idToken')!.toString()
    const googleValidation = await googleSigninSchema.spa(formData.entries())
    if (!googleValidation.success) {
      console.log(googleValidation)
      return { success: false, error: googleValidation.error.message }
    }
    const signinResult = await signinGoogle({ idToken })

    console.log(signinResult)
    return signinResult
  }
}

export const cachedComposeValidateSignin = cache(composeValidateSignin)
export const cacheSignInCred = cache(signInCred)

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
export const composeValidateAuthSignin = (...args: any[]) =>
  validateAuth(args[0], args[1], 'signin')
export const composeValidateAuthSignup = (...args: any[]) =>
  validateAuth(args[0], args[1], 'signup')
export const validateAuth = async (
  prevState: Record<string, any>,
  formData: FormData,
  endpoint: 'signin' | 'signup'
) => {
  console.log(formData, Object.fromEntries(formData.entries()))
  if (!formData) return prevState

  const authProvider = formData.get('provider')?.toString()
  if (!authProvider || !authMap[authProvider]) {
    return { ...prevState, success: false, error: 'Invalid authentication provider' }
  }

  const { schema, action } = authMap[authProvider][endpoint]
  const providerValidation = await schemaAuthBasic.spa({ provider: authProvider })
  console.log('cheguei', providerValidation)

  if (!providerValidation.success) {
    return { ...prevState, success: false, error: providerValidation.error.message }
  }
  const actionData = Object.fromEntries(
    Array.from(formData).map(([key, value]) => [key, value.toString()])
  ) as unknown as { email: string; password: string } & { idToken: string }

  const actionValidation = await schema.spa(actionData)
  if (!actionValidation.success) {
    console.log('actionValidation', actionValidation)
    return { ...prevState, success: false, error: actionValidation.error.message }
  }

  const signinResult = await action(actionData)

  console.log('signinResult', signinResult)
  return signinResult
}
