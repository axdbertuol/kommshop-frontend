'use client'
import { cn } from '@/app/lib/utils'
import useMemoizedIntlErrors from '@/hooks/useMemoIntlErrors'
import {
  IntlMessages,
  SigninFormValues,
  SignupFormValues,
  StatusErrors,
  StatusUnsuccessful,
} from '@/types'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import InputBox from './input/InputBox'
import { Button } from '../ui/button'
import { Separator } from '@radix-ui/react-separator'
import WarningBox from '../text/Error'
import handleFormDataSubmission from '@/app/lib/actions/form/submit-auth'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { useRouter } from '@/navigation'
import { AuthProvidersEnum } from '@/enum'
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any, string>
  initialValues: StatusErrors & (SignupFormValues | SigninFormValues)
  translatedErrors: Record<string, string | ReactElement<unknown, string>>
  intl: Partial<IntlMessages['Auth']['signup'] & IntlMessages['Auth']['signin']>
} & React.HTMLAttributes<HTMLElement>

function DefaultForm({
  className,
  initialValues,
  translatedErrors,
  intl,
  children,
}: Props) {
  type FormValues = typeof initialValues

  const [state, formAction] = useFormState<FormValues, FormData>(
    handleFormDataSubmission,
    initialValues
  )
  const router = useRouter()
  const handleGoogleAuthSuccess = async (credentials: CredentialResponse) => {
    if (!credentials?.credential) return
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const formData = new FormData(formRef.current!)
    setProvider(AuthProvidersEnum.google)
    formData?.set('idToken', credentials.credential)
    formData?.set('provider', AuthProvidersEnum.google)
    const names = ['email', 'password', 'password2']
    names.forEach((value: string) => formData?.delete(value))
    await handleFormDataSubmission({ ...state }, formData).then(
      (resp) => resp.success && router.push('/dashboard')
    )
  }

  const { pending } = useFormStatus()
  const [provider, setProvider] = useState(AuthProvidersEnum.credentials)

  const required = initialValues.provider === AuthProvidersEnum.credentials

  const formRef = useRef<HTMLFormElement>(null)

  const memoizedIntlServerErrors = useMemoizedIntlErrors<
    StatusUnsuccessful['serverErrors']
  >((state as StatusErrors)?.serverErrors, translatedErrors)

  const memoizedIntlErrors = useMemoizedIntlErrors<StatusUnsuccessful['errors']>(
    (state as StatusErrors)?.errors,
    translatedErrors
  )

  useEffect(() => {
    if (state?.success) {
      if (
        state.formName === 'signup' &&
        state.provider === AuthProvidersEnum.credentials
      ) {
        router.push(
          '/check-email?email=' + (state as SignupFormValues | SigninFormValues).email
        )
      } else {
        router.push('/dashboard')
      }
    }
  }, [router, state])

  return (
    <form
      ref={formRef}
      className={cn(className, 'transition-all', pending ? 'opacity-30' : ' opacity-1')}
      action={formAction}
    >
      <h2 className="font-thin text-lg text-center">{intl.heading}</h2>
      <input
        type="hidden"
        id="provider"
        name="provider"
        value={provider}
      />
      <input
        type="hidden"
        id="formName"
        name="formName"
        value={initialValues.formName}
      />
      {state.formName === 'signup' && (
        <>
          <InputBox
            autoComplete="firstName"
            id="firstName"
            name="firstName"
            disabled={pending}
            aria-disabled={pending}
            placeholder="John"
            required={required}
            type="text"
            labelText={intl.firstname}
            errors={memoizedIntlErrors?.['firstName']}
          />
          <InputBox
            autoComplete="lastName"
            id="lastName"
            name="lastName"
            disabled={pending}
            aria-disabled={pending}
            placeholder="Jones"
            required={required}
            type="text"
            labelText={intl.lastname}
            errors={memoizedIntlErrors?.['lastName']}
          />
        </>
      )}
      <InputBox
        autoComplete="email"
        id="email"
        name="email"
        disabled={pending}
        aria-disabled={pending}
        placeholder="name@example.com"
        required={required}
        type="text"
        labelText={intl.email}
        errors={memoizedIntlErrors?.['email']}
      />
      <InputBox
        id="password"
        name="password"
        autoComplete="new-password"
        disabled={pending}
        aria-disabled={pending}
        required={required}
        type="password"
        labelText={intl.password}
        errors={memoizedIntlErrors?.['password']}
      />
      {intl?.password2 && (
        <InputBox
          id="password2"
          name="password2"
          autoComplete="confirm-password"
          disabled={pending}
          aria-disabled={pending}
          required={required}
          type="password"
          labelText={intl.password2}
          errors={memoizedIntlErrors?.['password2']}
        />
      )}
      <Button
        type="submit"
        aria-disabled={pending}
        disabled={pending}
        className="w-[50%] mt-6 self-center"
      >
        {intl.submit}
      </Button>
      <div
        className={cn(
          memoizedIntlServerErrors
            ? 'flex border-l-2 border-r-2 shadow-md border-red-500  rounded-md transition-all animate-in'
            : 'hidden scale-0'
        )}
      >
        <div className="pl-4 self-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="flex flex-col">
          {memoizedIntlServerErrors &&
            Object.values(memoizedIntlServerErrors).map((errors) =>
              errors.map((error, index) => (
                <WarningBox
                  key={index}
                  className=" rounded-md py-2 px-4"
                >
                  <span
                    className={cn('text-left text-xs font-light text-red-600')}
                    data-testid={'server-error-' + index}
                  >
                    {error}
                  </span>
                </WarningBox>
              ))
            )}
        </div>
      </div>
      <span className="text-center font-thin text-sm">{intl.providersText}</span>
      <div className="flex w-full py-2 items-center dark:bg-white bg-neutral-300 place-content-center gap-2 rounded-lg">
        <GoogleLogin
          onSuccess={handleGoogleAuthSuccess}
          // locale={getLocaleWebPattern(locale ?? defaultLocale)}
          size="large"
          ux_mode="popup"
          type="standard"
          shape="circle"
          text={intl.googleText as 'signin_with' | 'signup_with'}
        />
      </div>
      <Separator className="dark:bg-slate-200 " />
      {children}
    </form>
  )
}

export default DefaultForm
