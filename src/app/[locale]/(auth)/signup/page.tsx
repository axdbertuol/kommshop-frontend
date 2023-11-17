'use server'
import DefaultForm from '@/components/forms/DefaultForm'
import SignupForm from '@/components/forms/SignupForm'
import { signupAndSignIn } from '@/app/lib/actions/form/signup-signin'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
export type TslSignupText = {
  email: string
  password: string
  password2: string
  submit: string
  success: string
  'bottom.already': string
  'bottom.signin': string
}
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
    'bottom.already',
    'bottom.signin',
  ]
  const text = Object.fromEntries(keys.map((key) => [key, t(key)])) as TslSignupText

  return (
    <DefaultForm action={signupAndSignIn}>
      <SignupForm text={text} />
    </DefaultForm>
  )
}
