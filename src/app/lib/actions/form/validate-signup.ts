'use server'

import { AuthProvidersEnum } from 'kommshop-types'
import { signupCred } from './signup'
import { FormValues } from '@/components/forms/DefaultForm'
import { ErrorResponse } from '@/types/common'

export const validateAndSignup = async (prevState: FormValues, formData: FormData) => {
  if (!formData) return prevState
  const authProvider = formData.get('provider')
  if (authProvider === AuthProvidersEnum.credentials) {
    const email = formData.get('email')
    const password = formData.get('password')
    if (!email || !password) {
      return { success: false, error: 'Please enter a valid email or password' }
    }
    // TODO: zod validate
    const signupResult: Partial<ErrorResponse> & { success: boolean } = await signupCred({
      email: email.toString(),
      password: password.toString(),
    })

    return signupResult
  }
  return prevState
}
