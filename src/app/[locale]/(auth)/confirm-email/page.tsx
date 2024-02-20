'use server'
import React, { Suspense } from 'react'
import { cachedConfirmEmail } from '@/app/lib/actions/form/confirm-email'
import { redirect } from '@/navigation'

async function Page({ searchParams: { hash } }: { searchParams: { hash?: string } }) {
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
