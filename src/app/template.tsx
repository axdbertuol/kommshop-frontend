import Nav from '@/components/nav/Nav'
import SessionProviderWrapper from '@/components/providers/SessionProviderWrapper'
import { Session } from 'next-auth'
import React from 'react'
import { ReactNode } from 'react'

export default function Template({
  children,
  props,
}: {
  children: ReactNode
  props: { session: Session }
}) {
  return (
    <SessionProviderWrapper session={props?.session}>
      <Nav />
      {children}
    </SessionProviderWrapper>
  )
}
