'use server'
import DefaultForm from '@/components/forms/DefaultForm'
import SignupForm from '@/components/forms/CredentialsSignupForm'
import { validateAndSignup } from '@/app/lib/actions/form/validate-signup'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { IntlMessages } from '@/types/common'

export default async function Page({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  const t = await getTranslations('Auth.signup')
  const keys = [
    'email',
    'password',
    'password2',
    'submit',
    'success',
    'already',
    'signin',
  ]
  const text = Object.fromEntries(
    keys.map((key) => [key, t(key)])
  ) as IntlMessages['Auth']['signup']

  return (
    <DefaultForm
      action={validateAndSignup}
      className={'w-full md:flex md:place-content-center'}
    >
      <SignupForm
        text={text}
        className="pt-12 px-16 md:px-0 w-full md:w-[33vw] lg:w-[20vw] flex flex-col flex-auto gap-4"
      />
    </DefaultForm>
  )
}
