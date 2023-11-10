'use client'
import { signupAndSignIn } from '@/app/lib/actions/form/signup-signin'
import React, { ReactNode } from 'react'
import { useFormState } from 'react-dom'

export const initialDefaultFormValues = {
  email: '',
  password: '',
  password2: '',
  provider: '',
  success: false,
}

export type FormValues = Partial<typeof initialDefaultFormValues>

function DefaultForm({ children }: { children: ReactNode }) {
  const [state, formAction] = useFormState<FormValues, FormData>(
    signupAndSignIn,
    initialDefaultFormValues
  )
  console.log(state)
  return (
    <form
      action={formAction}
      className="flex max-w-md flex-col gap-4"
    >
      {children}
    </form>
  )
}

export default DefaultForm
