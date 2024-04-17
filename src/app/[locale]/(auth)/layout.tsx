'use server'
import { unstable_setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
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
      <div className="w-full pt-4 flex flex-col items-center md:flex md:place-content-center">
        <Image
          src={'/kshop.svg'}
          alt="kommshop"
          width={110}
          height={85}
        />
      </div>
      {children}
    </div>
  )
}
