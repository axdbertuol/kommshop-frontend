import { generateTranslationObject } from '@/app/lib/intl-utils'
import { Link } from '@/navigation'
import { IntlMessages } from '@/types/common'
import { getMessages } from 'next-intl/server'
import React from 'react'

async function Page({
  locale,
  searchParams,
}: {
  locale: string
  searchParams: { email: string }
}) {
  const messages = (await getMessages({ locale })) as IntlMessages

  const text = await generateTranslationObject(
    'Auth.signup',
    Object.keys(messages.Auth.signup)
  )
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <Link
        href={'/store'}
        className="underline "
      >
        Back to store
      </Link>
      <div
        className={
          'm-auto flex gap-2 w-full flex-col items-center pt-12 px-16 md:px-0 md:w-[33vw] lg:w-[24vw] md:place-content-center'
        }
      >
        <span className="font-extralight">{text.success}</span>
        <a href={`mailto:${searchParams.email}`}>{searchParams.email}</a>
      </div>
    </div>
  )
}

export default Page
