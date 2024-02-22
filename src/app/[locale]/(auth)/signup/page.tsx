'use server'
import SignupForm from '@/components/forms/SignupForm'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { IntlMessages, SignupFormValues } from '@/types'
import { Link, redirect } from '@/navigation'
import { generateTranslationObject } from '@/app/lib/intl-utils'
import { AuthProvidersEnum } from 'kommshop-types'

const initialSignupFormValues = {
  email: '',
  password: '',
  password2: '',
  idToken: '',
  success: false,
  provider: AuthProvidersEnum.credentials,
  formName: 'signup',
}

export default async function Page({
  params: { locale },
  searchParams,
}: {
  params: { locale: string }
  searchParams: { successAuth?: AuthProvidersEnum; email?: string }
}) {
  unstable_setRequestLocale(locale)
  const messages = (await getMessages({ locale })) as IntlMessages

  const text = await generateTranslationObject(
    'Auth.signup',
    Object.keys(messages.Auth.signup)
  )
  const errors = await generateTranslationObject(
    'Auth.errors',
    Object.keys(messages.Auth.errors),
    { method: 'rich' }
  )

  return (
    <div className={'w-full flex flex-col items-center md:flex md:place-content-center'}>
      <SignupForm
        initialValues={initialSignupFormValues}
        translatedErrors={errors}
        intl={text}
        className="pt-12 px-16 md:px-0 w-full md:w-[33vw] lg:w-[20vw] flex flex-col flex-auto gap-4"
      >
        <span className="text-center">
          {text.already}{' '}
          <Link
            href="/signin"
            className="underline"
            data-testid="already"
          >
            {text.signin}
          </Link>
        </span>
      </SignupForm>
    </div>
  )
}
