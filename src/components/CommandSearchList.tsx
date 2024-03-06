'use client'
import getSuggestions from '@/app/lib/actions/getters/get-suggestions'
import { cn } from '@/app/lib/utils'
import useDeferredFilteredData from '@/hooks/useFilteredData'
import { Suggestion } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import CommandSearchSuggestions from './CommandSearchSuggestions'

const queryFn = async (value?: string) => {
  return new Promise((resolve) => {
    setTimeout(async () => resolve(await getSuggestions(value)), 0)
  }) as Promise<Record<string, Suggestion<'product'>[]> | null>
}

function CommandSearchList({
  suggestions,
  className,
  onSelectSuggestion,
  debouncedSearchValue,
}: {
  suggestions: Record<string, Suggestion<'product'>[]> | null
  className: string
  debouncedSearchValue: string
  onSelectSuggestion: (value: string) => void
} & React.HTMLAttributes<HTMLElement>) {
  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ['suggestions', debouncedSearchValue],
    queryFn: () => queryFn(debouncedSearchValue),
    initialData: suggestions,
    retry: 3,
    retryDelay: 1000,
    _optimisticResults: 'optimistic',
  })

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
