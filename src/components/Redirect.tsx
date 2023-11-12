'use server'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'

async function Redirect({ fallbackText, to }: { fallbackText: string; to: string }) {
  await new Promise((res) => setTimeout(() => res(redirect(to)), 5000))
  return <Suspense fallback={<>{fallbackText}</>} />
}

export default Redirect
