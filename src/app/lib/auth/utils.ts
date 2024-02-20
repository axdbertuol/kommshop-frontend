'use server'
import { AuthProvidersEnum } from 'kommshop-types'
import { z, ZodSchema } from 'zod'
import {
  googleSigninSchema,
  credSigninSchema,
  credSignupSchema,
  TCredSigninSchema,
  TCredSignupSchema,
  TGoogleSigninSchema,
} from '../actions/form/schemas'
import { signInCred, signinGoogle } from '../actions/form/signin'
import { signupCred } from '../actions/form/signup'
import { parseZodErrors } from '../utils'
import {
  SigninFormValues,
  SignupFormValues,
  StatusErrors,
  StatusSuccessful,
  StatusUnsuccessful,
} from '@/types'

export const getAuthMap = () => {
  const authMap = {
    [AuthProvidersEnum.google.toString()]: {
      signin: {
        schema: googleSigninSchema,
        action: signinGoogle,
      },
      signup: {
        schema: googleSigninSchema,
        action: signinGoogle,
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
  return authMap
}

export const handleFormDataSubmission = async (
  prevState: StatusErrors & (SignupFormValues | SigninFormValues),
  formData: FormData
): Promise<StatusErrors & (SignupFormValues | SigninFormValues)> => {
  console.log('prevState', prevState)
  console.log('formData', Object.fromEntries(formData.entries()))
  if (!formData) return prevState
  const authMap = getAuthMap()
  const data = Object.fromEntries(
    Array.from(formData).map(([key, value]) => [key, value.toString()])
  ) as (TCredSigninSchema & TCredSignupSchema & TGoogleSigninSchema) & {
    formName: 'signin' | 'signup'
  }
  const { provider, formName, ...actionData } = data

  if (!provider || !authMap?.[provider] || !formName || !authMap[provider]?.[formName]) {
    return {
      formName,
      provider,
      success: false,
      error: 'Invalid authentication provider and/or formName',
    }
  }
  const { action, schema } = authMap[provider][formName]

  const validateResult = await validateAuth<z.infer<typeof schema>>(data, schema)
  if (!validateResult?.success) {
    console.log('aqui', validateResult)
    return { provider, formName, ...validateResult } as StatusUnsuccessful &
      (SignupFormValues | SigninFormValues)
  }
  const actionResult = await action({ ...actionData })
  if (!actionResult.success) {
    console.log('actionResulterror ', actionResult)

    return { provider, formName, success: false, serverErrors: actionResult.serverErrors }
  }
  console.log('actionResult ', actionResult)

  return { ...actionData, provider, formName, success: true } as StatusSuccessful &
    (SignupFormValues | SigninFormValues)
}

export async function validateAuth<T>(data: Record<string, any>, schema: ZodSchema<T>) {
  const actionValidation = await schema.spa(data)
  if (!actionValidation.success) {
    return parseZodErrors<T>(actionValidation.error)
  }
  return actionValidation
}
