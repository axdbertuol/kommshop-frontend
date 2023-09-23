'use client'
import React, { useEffect } from 'react'
import CommandSearch from './CommandSearch'
import FilterBadge from './FilterBadge'
import useURLSearchParams from '@/hooks/useURLSearchParams'
import { Button } from './ui/button'
import Link from 'next/link'

type Props = {
  defaultFilters: {
    label: string
    value: string
  }[]
}

async function FiltersBar({ defaultFilters }: Props) {
  const { updateSearchParams, clearSearchParams } = useURLSearchParams()
  return (
    <div className="px-16 w-full flex  items-center justify-center gap-y-8">
      {defaultFilters.map((filter, index) => (
        <FilterBadge
          key={index + filter.label}
          variant={index % 2 == 0 ? 'secondary' : 'outline'}
          className="cursor-pointer rounded-lg px-4 transition-all transform-gpu hover:scale-110 focus-within:ring-2 focus-within:ring-primary"
          onClick={() => updateSearchParams('filters', filter.value, { replace: true })}
        >
          {filter.label}
        </FilterBadge>
      ))}
      <Button
        variant="outline"
        onClick={clearSearchParams}
      >
        Reset
      </Button>
    </div>
  )
}

export default FiltersBar
