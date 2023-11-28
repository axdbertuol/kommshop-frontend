'use client'
import { cn } from '@/app/lib/utils'
import useMemoizedIntlErrors from '@/hooks/useMemoIntlErrors'
import { StatusErrors } from '@/types/common'
import React, { ReactElement, useMemo } from 'react'
import { useFormState } from 'react-dom'

function DefaultForm({
  children,
  submitAction,
  className,
  initialValues,
  translatedErrors,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any, string>
  initialValues: Record<string, unknown> & Partial<StatusErrors>
  translatedErrors: Record<string, string>
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

  const memoizedIntlServerErrors = useMemoizedIntlErrors<typeof state.serverErrors>(
    state.serverErrors,
    translatedErrors
  )

  const memoizedIntlErrors = useMemoizedIntlErrors<typeof state.errors>(
    state.errors,
    translatedErrors
  )

  const childrenWithProps = useMemo(
    () =>
      React.Children.map(children, (child: ReactElement<FormValues>) =>
        React.cloneElement(child, {
          success: state?.success,
          errors: memoizedIntlErrors,
        })
      ),
    [state?.success, memoizedIntlErrors, children]
  )

  return (
    <div className={cn(className)}>
      <form action={formAction}>{childrenWithProps}</form>
      {memoizedIntlServerErrors &&
        Object.values(memoizedIntlServerErrors).map((errors, index) => (
          <span key={index}>{errors.join(' ')}</span>
        ))}
    </div>
  )
}

export default DefaultForm
