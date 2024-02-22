import SigninForm from '@/components/forms/SignupForm'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { IntlMessages } from '@/types'
import { Link, redirect } from '@/navigation'
import { generateTranslationObject } from '@/app/lib/intl-utils'
import { AuthProvidersEnum } from 'kommshop-types'

const initialSigninFormValues = {
  email: '',
  password: '',
  success: false,
  formName: 'signin',
  provider: AuthProvidersEnum.credentials,
}
export default async function Page({
  params: { locale },
}: {
  params: {
    locale: string
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
    <div className={'w-full flex flex-col items-center md:flex md:place-content-center'}>
      <SigninForm
        initialValues={initialSigninFormValues}
        translatedErrors={errors}
        intl={text}
        className="pt-12 px-16 md:px-0 w-full md:w-[33vw] lg:w-[20vw] flex flex-col flex-auto gap-4"
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
      </SigninForm>
    </div>
  )
}
