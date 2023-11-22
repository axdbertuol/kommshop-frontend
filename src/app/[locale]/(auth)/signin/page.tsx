'use server'
import DefaultForm from '@/components/forms/DefaultForm'
import LoginForm from '@/components/forms/CredentialsLoginForm'
import { composeValidateAuthSignin } from '@/app/lib/actions/form/signin'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { IntlMessages } from '@/types/common'

const initialSigninFormValues = {
  email: '',
  password: '',
  success: false,
}
export default async function Page({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  const t = await getTranslations('Auth.signin')
  const keys = ['email', 'password', 'submit', 'success', 'notyet', 'signup']
  const text = Object.fromEntries(
    keys.map((key) => [key, t(key)])
  ) as IntlMessages['Auth']['signin']
  return (
    <DefaultForm
      submitAction={composeValidateAuthSignin}
      initialValues={initialSigninFormValues}
      className={'w-full md:flex md:place-content-center'}
    >
      <LoginForm
        intl={text}
        className="pt-12 px-16 md:px-0 w-full md:w-[33vw] lg:w-[20vw] flex flex-col flex-auto gap-4"
      />
    </DefaultForm>
  )
}
