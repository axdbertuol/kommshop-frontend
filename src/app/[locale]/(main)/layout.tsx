import Nav from '@/components/nav/Nav'
import React from 'react'
import { ReactNode } from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'
import { getUser } from '@/app/lib/get-user'

export default async function Layout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  const user = await getUser()
  return (
    <>
      <Nav user={user} />
      {children}
    </>
  )
}
