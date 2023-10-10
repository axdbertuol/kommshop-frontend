// 'use client'

import React from 'react'
import CommandSearch from '../CommandSearch'
import CategoriesBar from '../CategoriesBar'
import { SearchParams } from '@/types/common'
import getSuggestions from '@/app/lib/actions/get-suggestions'

type Props = {
  searchParams: SearchParams
}

async function SearchSegment({ searchParams }: Props) {
  const suggestions = await getSuggestions(searchParams.search)
  return (
    <div className="flex flex-col items-center gap-y-4 ">
      <CategoriesBar searchParams={searchParams} />
      <CommandSearch suggestions={suggestions} />
    </div>
  )
}

export default SearchSegment
