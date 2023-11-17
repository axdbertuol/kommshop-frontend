'use server'
import DefaultForm from '@/components/forms/DefaultForm'
import LoginForm from '@/components/forms/CredentialsLoginForm'
import { validateSignIn } from '@/app/lib/actions/form/signin'
import { getTranslations } from 'next-intl/server'
import { IntlMessages } from '@/types/common'

export default async function Page() {
  const t = await getTranslations('Auth.signin')
  const keys = ['email', 'password', 'password2', 'submit', 'success', 'notyet', 'signup']
  const text = Object.fromEntries(
    keys.map((key) => [key, t(key)])
  ) as IntlMessages['Auth']['signin']
  return (
    <DefaultForm
      action={validateSignIn}
      className={'w-full md:flex md:place-content-center'}
    >
      <LoginForm
        intl={text}
        className="pt-12 px-16 md:px-0 w-full md:w-[33vw] lg:w-[20vw] flex flex-col flex-auto gap-4"
      />
    </DefaultForm>
  )
}
