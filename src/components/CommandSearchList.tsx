'use client'

import { cn } from '@/app/lib/utils'
import useDeferredFilteredData from '@/hooks/useFilteredData'
import { Suggestion } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'
import CommandSearchSuggestions from './CommandSearchSuggestions'
import fetchSuggestions from '@/app/lib/actions/getters/get-suggestions'

type Props = {
  suggestions: Record<string, Suggestion<'product'>[]> | null
  className: string
  debouncedSearchValue: string
  onSelectSuggestion: (value: string) => void
} & React.HTMLAttributes<HTMLElement>

function CommandSearchList({
  suggestions,
  className,
  onSelectSuggestion,
  debouncedSearchValue,
}: Props) {
  const { data, isSuccess, isFetching, refetch } = useQuery({
    queryKey: ['suggestions', debouncedSearchValue],
    queryFn: () => fetchSuggestions(debouncedSearchValue),
    initialData: suggestions,
    retry: 3,
    retryDelay: 1000,
    _optimisticResults: 'optimistic',
  })

  useEffect(() => {
    const fetchSuggestionsAsync = async () => {
      if (debouncedSearchValue) {
        await refetch()
      }
    }

    fetchSuggestionsAsync()

    // return () => {}
  }, [debouncedSearchValue, refetch])

  const callbackFilter = useCallback(
    () =>
      data
        ? Object.entries(data as Record<string, Suggestion<'product'>[]>)
            .filter((entry) => entry?.[1]?.length !== 0)
            .filter(Boolean)
        : [],
    [data]
  )
  const deferredSuggestions = useDeferredFilteredData(callbackFilter)

  return (
    <div
      className={cn(
        'absolute top-10 flex flex-col z-30  opacity-0 w-full transition-transform rounded bg-background border-border border px-4 py-2 ease-in-out',
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
