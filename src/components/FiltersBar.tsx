'use client'
import React from 'react'
import FilterBadge from './buttons/FilterBadge'
import useURLSearchParams from '@/hooks/useURLSearchParams'
import { Button } from './ui/button'
import useSearchContext from '@/hooks/useSearchContext'

type Props = {
  defaultFilters: {
    label: string
    value: string
  }[]
}

async function FiltersBar() {
  const { updateSearchParams, clearSearchParams } = useURLSearchParams()
  const { filters } = useSearchContext(null)

  return (
    <div className="px-16 w-full flex flex-col items-center justify-center gap-y-8">
      <div className="flex items-center justify-center gap-y-8">
        {filters?.map((filter, index) => (
          <FilterBadge
            key={index + filter.label}
            variant={index % 2 == 0 ? 'secondary' : 'outline'}
            className="cursor-pointer rounded-lg px-4 transition-all transform-gpu hover:scale-110 focus-within:ring-2 focus-within:ring-primary"
            onClick={() => updateSearchParams('filters', filter.value, { replace: true })}
          >
            {filter.label}
          </FilterBadge>
        ))}
      </div>
      <div className="flex">
        <Button
          variant="outline"
          onClick={clearSearchParams}
          className="w-1 text-xs"
        >
          Agg
        </Button>
        <Button
          variant="outline"
          onClick={clearSearchParams}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export default FiltersBar
