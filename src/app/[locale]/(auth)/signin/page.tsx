'use server'
import DefaultForm from '@/app/components/forms/DefaultForm'
import LoginForm from '@/app/components/forms/AbstractSignForm'
import { composeValidateAuthSignin } from '@/app/lib/auth/utils'
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { IntlMessages } from '@/types/common'
import { Link } from '@/navigation'
import { generateTranslationObject } from '@/app/lib/intl-utils'

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
  const name = 'signin'
  const messages = (await getMessages({ locale })) as IntlMessages

  const text = await generateTranslationObject(
    'Auth.' + name,
    Object.keys(messages.Auth[name])
  )
  const errors = await generateTranslationObject(
    'Auth.errors',
    Object.keys(messages.Auth.errors),
    { method: 'rich' }
  )

  return (
    <DefaultForm
      submitAction={composeValidateAuthSignin}
      initialValues={initialSigninFormValues}
      translatedErrors={errors}
      className={
        'flex flex-col  items-center justify-center md:flex md:place-content-center'
      }
    >
      <LoginForm
        intl={text}
        className="p-12 md:w-[33vw] lg:w-[30vw] w-full flex flex-col flex-auto gap-4"
        locale={locale}
        formName={name}
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
