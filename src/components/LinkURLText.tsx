'use client'

import { cn } from '@/app/lib/utils'
import useURLSearchParams from '@/hooks/useURLSearchParams'
import { LabelValue } from '@/types/common'
import React from 'react'

export function LinkURLText({
  data,
  searchParamName,
  className,
}: {
  data: LabelValue
  searchParamName: string
} & React.HTMLAttributes<HTMLElement>) {
  const { updateSearchParams } = useURLSearchParams()

  return (
    <span
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary cursor-pointer pr-4',
        className
      )}
      onClick={() => updateSearchParams(searchParamName, data.value, { replace: true })}
    >
      {data.label}
    </span>
  )
}
