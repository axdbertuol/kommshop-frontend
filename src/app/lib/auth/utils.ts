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
import { formDataErrorResponse } from '../utils'

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

const handleFormDataSubmission = async (
  prevState: Record<string, any>,
  formData: FormData,
  validate: typeof validateAuth
) => {
  if (!formData) return prevState
  const authMap = getAuthMap()
  const data = Object.fromEntries(
    Array.from(formData).map(([key, value]) => [key, value.toString()])
  ) as (TCredSigninSchema & TCredSignupSchema & TGoogleSigninSchema) & {
    formName: 'signin' | 'signup'
  }
  const { provider, formName, ...actionData } = data

  if (!provider || !authMap?.[provider] || !formName || !authMap[provider]?.[formName]) {
    return { success: false, error: 'Invalid authentication provider and/or formName' }
  }
  const { action, schema } = authMap[provider][formName]

  const validateResult = await validate<z.infer<typeof schema>>(data, schema)
  if (!validateResult?.success) {
    console.log(validateResult)
    return { ...validateResult, ...prevState }
  }
  const actionResult = await action({ ...actionData })
  if (!actionResult.success) {
    // treat server errors
    return { success: false, serverErrors: actionResult?.serverErrors }
  }
  return { ...actionResult, serverErrors: actionResult }
}

export async function validateAuth<T>(data: Record<string, any>, schema: ZodSchema<T>) {
  const actionValidation = await schema.spa(data)
  if (!actionValidation.success) {
    return formDataErrorResponse<T>(actionValidation.error)
  }
  return actionValidation
}

export const composeValidateAuthSignin = (...args: any[]) =>
  handleFormDataSubmission(args[0], args[1], validateAuth)
export const composeValidateAuthSignup = (...args: any[]) =>
  handleFormDataSubmission(args[0], args[1], validateAuth)
