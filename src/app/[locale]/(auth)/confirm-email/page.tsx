'use server'
import React, { Suspense } from 'react'
import { confirmEmail } from '@/app/lib/actions/form/confirm-email'
import { redirect } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'

// token should be the hash generated from the server
async function Page({
  searchParams: { token },
  params: { locale },
}: {
  searchParams: { token?: string }
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  if (!token) {
    redirect('/not-found')
    return
  }
  await confirmEmail(token)
  return (
    <Suspense fallback={<>Confirming email..</>}>
      <p>Success!</p>
    </Suspense>
  )
}

export default Page
