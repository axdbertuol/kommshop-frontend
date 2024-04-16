import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { IntlMessages } from '@/types'
import { generateTranslationObject } from '@/app/lib/intl-utils'
import ForgotPassForm from './ForgotPassForm'

export default async function Page({
  params: { locale },
}: {
  params: {
    locale: string
  }
}) {
  unstable_setRequestLocale(locale)
  const name = 'forgot'
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
      <ForgotPassForm
        intl={text}
        translatedErrors={errors}
        className="pt-12 px-16 md:px-0 w-full md:w-[33vw] lg:w-[20vw] flex flex-col flex-auto gap-4"
      />
    </div>
  )
}
