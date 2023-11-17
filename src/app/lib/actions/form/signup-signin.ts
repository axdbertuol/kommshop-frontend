'use server'

import { AuthProvidersEnum } from 'kommshop-types'
import { signupCred } from './signup'
import { FormValues } from '@/components/forms/DefaultForm'

export const signupAndSignIn = async (prevState: FormValues, formData: FormData) => {
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
      const signupResult: { success: boolean } | undefined = await signupCred({
        email: email.toString(),
        password: password.toString(),
      })

      return signupResult
    } catch (e) {
      console.log('signupAndSignIn: Error')
    }

    // signIn(authProvider.toLowerCase(), { password, email })
  }
  return prevState
}
