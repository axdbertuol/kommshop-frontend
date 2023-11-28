'use server'
import DefaultForm from '@/app/components/forms/DefaultForm'
import LoginForm from '@/app/components/forms/AbstractSignForm'
import { composeValidateAuthSignin } from '@/app/lib/auth/utils'
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { IntlMessages } from '@/types/common'
import { Link } from '@/navigation'

const initialSigninFormValues = {
  email: '',
  password: '',
  success: false,
}

export default async function Page({
  params: { locale },
}: {
  params: {
    locale: string
    messages: IntlMessages
  }
}) {
  unstable_setRequestLocale(locale)

  const t = await getTranslations('Auth')
  const messages = (await getMessages()) as IntlMessages
  const errors = Object.fromEntries(
    Object.keys(messages.Auth.errors).map((key) => [key, t(`errors.${key}`)])
  )
  const keys = Object.keys(messages.Auth.signin)

  const text = Object.fromEntries(
    keys.map((key) => [key, t(`signin.${key}`)])
  ) as IntlMessages['Auth']['signin']

  return (
    <DefaultForm
      submitAction={composeValidateAuthSignin}
      initialValues={initialSigninFormValues}
      translatedErrors={errors}
      className={'w-full flex flex-col items-center md:flex md:place-content-center'}
    >
      <LoginForm
        intl={text}
        className="pt-12 px-16 md:px-0 w-full md:w-[33vw] lg:w-[20vw] flex flex-col flex-auto gap-4"
        locale={locale}
        formName="signin"
      >
        <span className="text-center">
          {text.notyet}{' '}
          <Link
            href={'/signup'}
            className="underline"
            data-testid="notyet"
          >
            {text.signup}
          </Link>
        </span>
      </LoginForm>
    </DefaultForm>
  )
}
