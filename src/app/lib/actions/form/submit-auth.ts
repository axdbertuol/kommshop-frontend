'use server'

import {
  StatusErrors,
  SignupFormValues,
  SigninFormValues,
  StatusUnsuccessful,
  StatusSuccessful,
} from '@/types'
import { z } from 'zod'
import { validateAuth } from '../../auth/utils'
import {
  TCredSigninSchema,
  TCredSignupSchema,
  TGoogleSigninSchema,
  credSigninSchema,
  credSignupSchema,
  googleSigninSchema,
} from './schemas'
import { AuthProvidersEnum } from 'kommshop-types'
import { signinGoogle, signInCred } from './signin'
import { signupCred } from './signup'

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

export default async function handleFormDataSubmission(
  prevState: StatusErrors & (SignupFormValues | SigninFormValues),
  formData: FormData
): Promise<StatusErrors & (SignupFormValues | SigninFormValues)> {
  if (!formData) return prevState

  const data = Object.fromEntries(
    Array.from(formData).map(([key, value]) => [key, value.toString()])
  ) as (TCredSigninSchema & TCredSignupSchema & TGoogleSigninSchema) & {
    formName: 'signin' | 'signup'
  }
  const { provider, formName, ...actionData } = data
  console.log(formData)
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
    return { provider, formName, ...validateResult } as StatusUnsuccessful &
      (SignupFormValues | SigninFormValues)
  }
  const actionResult = await action({ ...actionData })
  if (!actionResult.success) {
    return { provider, formName, success: false, serverErrors: actionResult.serverErrors }
  }

  return { ...actionData, provider, formName, success: true } as StatusSuccessful &
    (SignupFormValues | SigninFormValues)
}
