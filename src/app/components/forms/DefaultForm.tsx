'use client'
import { cn } from '@/app/lib/utils'
import useMemoizedIntlErrors from '@/hooks/useMemoIntlErrors'
import { StatusErrors, StatusErrorsWithJSX } from '@/types/common'
import React, { ReactElement, useMemo, useRef } from 'react'
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
  translatedErrors: Record<string, string | ReactElement<any, string>>
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
  const formRef = useRef<HTMLFormElement>(null)

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
      React.Children.map(children, (child: ReactElement<StatusErrorsWithJSX>) =>
        React.cloneElement(child, {
          success: state?.success,
          errors: memoizedIntlErrors,
          serverErrors: memoizedIntlServerErrors,
        })
      ),
    [state?.success, memoizedIntlErrors, memoizedIntlServerErrors, children]
  )

  return (
    <form
      ref={formRef}
      className={cn(className)}
      action={formAction}
    >
      {childrenWithProps}
    </form>
  )
}

export default DefaultForm
