// 'use client'
'use server'
import React, { Suspense } from 'react'
import CommandSearch from '../CommandSearch'
import CategoriesBar from '../CategoriesBar'
import { SearchParams } from '@/types'
import getSuggestions from '@/app/lib/actions/getters/get-suggestions'

type Props = {
  searchParams: SearchParams
}

async function SearchSegment({ searchParams }: Props) {
  const suggestions = await getSuggestions(searchParams.search)
  return (
    <div className="flex flex-col items-center gap-y-4 ">
      <CategoriesBar searchParams={searchParams} />
      <Suspense fallback={<>Loading...</>}>
        {suggestions && <CommandSearch suggestions={suggestions} />}
      </Suspense>
    </div>
  )
}

export default SearchSegment
