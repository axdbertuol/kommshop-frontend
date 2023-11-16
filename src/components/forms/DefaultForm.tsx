'use client'
import React, { ReactNode } from 'react'
import { useFormState } from 'react-dom'

export const initialDefaultFormValues = {
  email: '',
  password: '',
  password2: '',
}

export type FormValues = Partial<typeof initialDefaultFormValues>

function DefaultForm({
  children,
  action,
}: {
  children: ReactNode
  action: (...args: any) => Promise<Record<string, string | boolean>>
}) {
  const [state, formAction] = useFormState<FormValues, FormData>(
    action,
    initialDefaultFormValues
  )
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
