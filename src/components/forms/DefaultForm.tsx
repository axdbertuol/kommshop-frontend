'use client'
import { cn } from '@/app/lib/utils'
import React, { ReactElement, ReactHTMLElement } from 'react'
import { useFormState } from 'react-dom'

export type FormValues = Partial<{
  email: string
  password: string
  password2: string
  success: boolean
  errors: Record<string, string>
  error: string
}>

export const initialDefaultFormValues = {
  email: '',
  password: '',
  password2: '',
  success: false,
}

function DefaultForm({
  children,
  action,
  className,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any, string>
  action: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any
  ) => Promise<FormValues>
} & React.HTMLAttributes<HTMLElement>) {
  const [state, formAction] = useFormState<FormValues, FormData>(
    action,
    initialDefaultFormValues
  )
  const childrenWithProps = React.Children.map(
    children,
    (child: ReactElement<FormValues>) =>
      React.cloneElement(child, { success: state.success, errors: state.errors })
  )
  console.log(state)
  return (
    <div className={cn(className)}>
      <form action={formAction}>{childrenWithProps}</form>
      {state.success === false && state.error && <>{state.error}</>}
    </div>
  )
}

export default DefaultForm
