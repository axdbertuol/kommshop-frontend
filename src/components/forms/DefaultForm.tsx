'use client'
import React, { ReactElement } from 'react'
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
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any, string>
  action: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any
  ) => Promise<FormValues>
}) {
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
    <>
      <form
        action={formAction}
        className="flex max-w-md flex-col gap-4"
      >
        {childrenWithProps}
      </form>
      {state.success === false && state.error && <>{state.error}</>}
    </>
  )
}

export default DefaultForm
