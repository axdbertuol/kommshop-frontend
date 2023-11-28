'use server'
import DefaultForm from '@/app/components/forms/DefaultForm'
import SignupForm from '@/app/components/forms/AbstractSignForm'
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { IntlMessages, SignupFormValues } from '@/types/common'
import { composeValidateAuthSignup } from '@/app/lib/auth/utils'
import { Link } from '@/navigation'

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

  const t = await getTranslations('Auth')
  const messages = (await getMessages()) as IntlMessages
  const errors = Object.fromEntries(
    Object.keys(messages.Auth.errors).map((key) => [key, t(`errors.${key}`)])
  )
  const keys = Object.keys(messages.Auth.signup)

  const text = Object.fromEntries(
    keys.map((key) => [key, t(`signup.${key}`)])
  ) as IntlMessages['Auth']['signup']

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
