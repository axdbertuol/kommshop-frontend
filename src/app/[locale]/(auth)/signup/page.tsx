'use server'
import DefaultForm from '@/app/components/forms/DefaultForm'
import SignupForm from '@/app/components/forms/AbstractSignForm'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { IntlMessages, SignupFormValues } from '@/types/common'
import { composeValidateAuthSignup } from '@/app/lib/auth/utils'
import { Link } from '@/navigation'
import { generateTranslationObject } from '@/app/lib/intl-utils'

const initialSignupFormValues = {
  email: '',
  password: '',
  password2: '',
  success: false,
} as SignupFormValues

export default async function Page({
  params: { locale },
}: {
  params: { locale: string }
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
    <DefaultForm
      submitAction={composeValidateAuthSignup}
      initialValues={initialSignupFormValues}
      translatedErrors={errors}
      className={'w-full flex flex-col items-center md:flex md:place-content-center'}
    >
      <SignupForm
        intl={text}
        className="pt-12 px-16 md:px-0 w-full md:w-[33vw] lg:w-[20vw] flex flex-col flex-auto gap-4"
        formName="signup"
      >
        <span className="text-center">
          {text.already}{' '}
          <Link
            href="/signin"
            className="underline"
          >
            {text.signin}
          </Link>
        </span>
      </SignupForm>
    </DefaultForm>
  )
}
