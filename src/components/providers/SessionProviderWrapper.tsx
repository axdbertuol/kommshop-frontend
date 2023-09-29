'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { ReactNode } from 'react'

export default function SessionProviderWrapper({
  children,
  session,
}: {
  children: ReactNode
  session: Session
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
