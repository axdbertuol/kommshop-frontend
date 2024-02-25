import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode
  product: React.ReactNode
  list: React.ReactNode
}

export default function Layout({ children, product, list, ...rest }: Props) {
  console.log(product)
  return (
    <div className="w-full m-auto">
      <div className="flex flex-col gap-y-16 items-center bg-zinc-900 py-4">
        <Button>
          <Link href="/dashboard/add">Add Product</Link>
        </Button>
        {product}
        {list}
        {children}
      </div>
    </div>
  )
}
