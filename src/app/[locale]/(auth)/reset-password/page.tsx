import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import ResetPassForm from './ResetPassForm'
import { notFound } from 'next/navigation'
import { IntlMessages } from '@/types'
import { generateTranslationObject } from '@/app/lib/intl-utils'

export default async function Page({
  params: { locale },
  searchParams: { token },
}: {
  params: {
    locale: string
  }
  searchParams: { token: string }
}) {
  unstable_setRequestLocale(locale)

  if (!token) {
    return notFound()
  }
  const name = 'reset'
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
      <ResetPassForm
        resetToken={token}
        translatedErrors={errors}
        intl={text}
        className="pt-12 px-16 md:px-0 w-full md:w-[33vw] lg:w-[20vw] flex flex-col flex-auto gap-4"
      />
    </div>
  )
}
