import Sidebar from '@/app/components/Sidebar'
import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode
  product: React.ReactNode
  add: React.ReactNode
}

export default function Layout({ children, product, add }: Props) {
  console.log(product)
  return (
    <>
      <div className="w-2/3 m-auto">
        <div className="flex flex-col gap-y-16 items-center bg-zinc-900 py-4">
          <Link href="/dashboard/add">Open modal</Link>
          {product}
          {children}
        </div>
      </div>
    </>
  )
}
