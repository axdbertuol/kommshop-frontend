'use client'

import React from 'react'
import FiltersBar from '../FiltersBar'
import CommandSearch from '../CommandSearch'

type Props = {
  defaultFilters: {
    label: string
    value: string
  }[]
}

async function SearchSegment({ defaultFilters }: Props) {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <FiltersBar defaultFilters={defaultFilters} />
      <CommandSearch defaultFilters={defaultFilters} />
    </div>
  )
}

export default SearchSegment
