'use server'
import React, { Suspense } from 'react'
import { cachedConfirmEmail } from '@/app/lib/actions/form/confirm-email'
import { redirect } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'

async function Page({
  searchParams: { hash },
  params: { locale },
}: {
  searchParams: { hash?: string }
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  if (!hash) {
    redirect('/not-found')
    return
  }
  await cachedConfirmEmail(hash)
  return (
    <Suspense fallback={<>Confirming email..</>}>
      <p>Success!</p>
    </Suspense>
  )
}

export default Page
