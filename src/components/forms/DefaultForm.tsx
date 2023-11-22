'use client'
import { cn } from '@/app/lib/utils'
import React, { ReactElement, useEffect } from 'react'
import { useFormState } from 'react-dom'

function DefaultForm({
  children,
  submitAction,
  className,
  initialValues,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any, string>
  initialValues: Record<string, any>
  submitAction: (
    prevState: typeof initialValues,
    formData: FormData
  ) => Promise<typeof initialValues>
} & React.HTMLAttributes<HTMLElement>) {
  type FormValues = typeof initialValues

  const [state, formAction] = useFormState<FormValues, FormData>(
    submitAction,
    initialValues
  )

  const childrenWithProps = React.Children.map(
    children,
    (child: ReactElement<FormValues>) =>
      React.cloneElement(child, { success: state?.success, errors: state?.errors })
  )

  useEffect(() => {
    if (state.success) {
      // signup
      console.log('signup successful')
    }
  }, [state?.success])

  return (
    <div className={cn(className)}>
      <form action={formAction}>{childrenWithProps}</form>
      {state.success === false && state.error && <>{state.error}</>}
    </div>
  )
}

export default DefaultForm
