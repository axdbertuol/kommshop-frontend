'use client'
import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Suggestion } from '@/types'
import CommandSearchSuggestions from './CommandSearchSuggestions'
import getSuggestions from '@/app/lib/actions/getters/get-suggestions'
import useSearchContext from '@/hooks/useSearchContext'
import { cn } from '@/app/lib/utils'
import useDeferredFilteredData from '@/hooks/useFilteredData'

const queryFn = async (value?: string) => {
  return new Promise((resolve) => {
    setTimeout(async () => resolve(await getSuggestions(value)), 0)
  }) as Promise<Record<string, Suggestion<'product' | 'category'>[]> | null>
}

function CommandSearchList({
  suggestions,
  className,
  onSelectSuggestion,
}: {
  suggestions: Record<string, Suggestion<'product' | 'category'>[]> | null
  className: string
  onSelectSuggestion: (value: string) => void
} & React.HTMLAttributes<HTMLElement>) {
  const { searchValue } = useSearchContext()
  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ['suggestions', searchValue],
    queryFn: () => queryFn(searchValue),
    initialData: suggestions,
    retry: 3,
    retryDelay: 1000,
    _optimisticResults: 'optimistic',
    refetchOnWindowFocus: true,
    // suspense: true,
    // enabled: !!searchValue,
  })

  const callbackFilter = useCallback(
    () =>
      data
        ? Object.entries(data as Record<string, Suggestion<'category' | 'product'>[]>)
            .filter((entry) => entry?.[1]?.length !== 0)
            .filter(Boolean)
        : [],
    [data]
  )
  const deferredSuggestions = useDeferredFilteredData(callbackFilter)

  return (
    <div
      className={cn(
        'absolute top-10 flex flex-col z-30  opacity-0 w-full transition-transform rounded bg-secondary-black-400 px-4 py-2 ease-in-out',
        className,
        isFetching && 'opacity-50'
      )}
      data-cy="CommandSearchList"
    >
      {deferredSuggestions.flat().length === 0 && (
        <span className="h-[20px]">No results found.</span>
      )}
      {isSuccess && deferredSuggestions?.length > 0 && (
        <div className={cn('flex flex-row', isFetching && 'opacity-50')}>
          {deferredSuggestions.map(([heading, suggest], index) => {
            return (
              <CommandSearchSuggestions
                key={index}
                suggestions={suggest}
                heading={heading}
                onSelectSuggestion={onSelectSuggestion}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CommandSearchList
