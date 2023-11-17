'use server'
import React, { Suspense } from 'react'
import { cachedConfirmEmail } from '@/app/lib/actions/form/confirm-email'
import { redirect } from 'next/navigation'

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
