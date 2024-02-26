// 'use client'
'use server'
import React, { Suspense } from 'react'
import CommandSearch from '@/components/CommandSearch'
import CategoriesBar from '@/components/CategoriesBar'
import { SearchParams } from '@/types'
import getSuggestions from '@/app/lib/actions/getters/get-suggestions'

type Props = {
  searchParams: SearchParams
}

async function SearchPage({ searchParams }: Props) {
  const suggestions = await getSuggestions(searchParams.search)
  return (
    <div className="flex flex-col items-center gap-y-4 ">
      <Suspense fallback={<>Loading...</>}>
        {suggestions && <CommandSearch suggestions={suggestions} />}
      </Suspense>
      <CategoriesBar searchParams={searchParams} />
    </div>
  )
}

export default SearchPage
