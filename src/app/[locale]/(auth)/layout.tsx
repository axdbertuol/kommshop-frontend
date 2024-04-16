'use server'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'

type Props = {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default async function Layout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

  return (
    <div className="min-h-screen pb-4 w-full md:w-[66vw] lg:w-[33vw] bg-primary-foreground dark:bg-neutral-800 md:mx-auto">
      {children}
    </div>
  )
}
