import SessionProviderWrapper from '@/utils/SessionProviderWrapper'
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
    <SessionProviderWrapper session={props?.session}>{children}</SessionProviderWrapper>
  )
}
