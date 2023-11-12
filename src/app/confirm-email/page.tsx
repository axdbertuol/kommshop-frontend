import React, { Suspense } from 'react'
import { confirmEmail } from '../lib/actions/form/confirm-email'
import { redirect } from 'next/navigation'
import Redirect from '@/components/Redirect'

async function Page({ searchParams }: { searchParams: { hash?: string } }) {
  if (!searchParams?.hash) {
    redirect('/not-found')
  }
  await confirmEmail(searchParams.hash).then(async () => {
    new Promise((res) => setTimeout(() => res(redirect('/signin')), 5000))
  })
  return (
    <Suspense fallback={<>Confirming email..</>}>
      <p>Success!</p>
    </Suspense>
  )
}

export default Page
