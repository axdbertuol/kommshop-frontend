'use client'
import { Input } from '@/components/ui/input'
import { cn } from '@/app/lib/utils'
import React from 'react'

export function Search({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className={cn('md:w-[100px] lg:w-[300px]', className)}
      />
    </div>
  )
}
