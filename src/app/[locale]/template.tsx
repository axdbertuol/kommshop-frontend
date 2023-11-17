import Nav from '@/components/nav/Nav'
import React from 'react'
import { ReactNode } from 'react'

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      {children}
    </>
  )
}
