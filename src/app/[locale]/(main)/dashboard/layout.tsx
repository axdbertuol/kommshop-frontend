'use server'

import React from 'react'
import Sidebar from '@/components/Sidebar'

type Props = {
  children: React.ReactNode
}

export default async function Layout({ children }: Props) {
  return (
    <section className="w-full  h-full">
      <Sidebar />
      {children}
    </section>
  )
}
