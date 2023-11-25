'use client'
import React, { ReactNode } from 'react'
import useSearchContext from '@/hooks/useSearchContext'
import { cn } from '@/app/lib/utils'

type Props = {
  children: ReactNode
} & React.HTMLAttributes<HTMLDivElement>
export default function ProductListWrapper({ children }: Props) {
  const { suggestionsListOpen } = useSearchContext()
  return (
    <div
      className={cn(
        'transition-opacity ease-in-out grid grid-flow-row md:grid-cols-3 lg:grid-cols-4 gap-4 border-t border-t-primary-300 py-8',
        suggestionsListOpen && 'transition-opacity opacity-25 ease-in-out'
      )}
    >
      {children}
    </div>
  )
}
