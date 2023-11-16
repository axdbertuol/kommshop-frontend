'use server'
import React, { Suspense } from 'react'
import { cachedConfirmEmail, confirmEmail } from '../../lib/actions/form/confirm-email'
import { RedirectType, redirect } from 'next/navigation'
import Redirect from '@/components/Redirect'

async function Page({ searchParams }: { searchParams: { hash?: string } }) {
  if (!searchParams?.hash) {
    redirect('/not-found')
  }
  await cachedConfirmEmail(searchParams.hash).then(() => redirect('/signin'))
  return (
    <Suspense fallback={<>Confirming email..</>}>
      <p>Success!</p>
    </Suspense>
  )
}

export default Page
