import React, { Suspense } from 'react'
import CommandSearch from '@/components/CommandSearch'
import { SearchParams } from '@/types'
import fetchSuggestions from '@/app/lib/actions/getters/get-suggestions'

type Props = {
  searchParams: SearchParams
}

export default async function SearchPage({ searchParams }: Props) {
  const suggestions = await fetchSuggestions(searchParams.search)

  return (
    <div className="flex flex-col items-center gap-y-4 ">
      <CommandSearch suggestions={suggestions} />
    </div>
  )
}
