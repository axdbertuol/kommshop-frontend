'use server'
import DefaultForm from '@/components/forms/DefaultForm'
import SignupForm from '@/components/forms/CredentialsSignupForm'
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { IntlMessages, SignupFormValues } from '@/types/common'
import { composeValidateAuthSignup } from '@/app/lib/actions/form/signin'

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

  const t = await getTranslations('Auth.signup')
  const messages = (await getMessages()) as IntlMessages
  console.log(messages)
  const keys = Object.keys(messages.Auth.signup)
  const text = Object.fromEntries(
    keys.map((key) => [key, t(key)])
  ) as IntlMessages['Auth']['signup']

  return (
    <DefaultForm
      submitAction={composeValidateAuthSignup}
      initialValues={initialSignupFormValues}
      className={'w-full md:flex md:place-content-center'}
    >
      <SignupForm
        text={text}
        className="pt-12 px-16 md:px-0 w-full md:w-[33vw] lg:w-[20vw] flex flex-col flex-auto gap-4"
      />
    </DefaultForm>
  )
}
