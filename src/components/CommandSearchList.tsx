'use client'
import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Suggestion } from '@/types/common'
import CommandSearchSuggestions from './CommandSearchSuggestions'
import getSuggestions from '@/app/lib/actions/getters/get-suggestions'
import useSearchContext from '@/hooks/useSearchContext'
import { cn } from '@/app/lib/utils'
import useDeferredFilteredData from '@/hooks/useFilteredData'

export const queryFn = async (value?: string) => {
  return new Promise((resolve) => {
    setTimeout(async () => resolve(await getSuggestions(value)), 0)
  }) as Promise<Record<string, Suggestion[]> | null>
}

function CommandSearchList({
  suggestions,
  className,
  onSelectSuggestion,
}: {
  suggestions: Record<string, Suggestion[]> | null
  className: string
  onSelectSuggestion: (value: string) => void
} & React.HTMLAttributes<HTMLElement>) {
  const { searchValue } = useSearchContext()
  const { data, isSuccess, isPreviousData, isFetching } = useQuery({
    queryKey: ['suggestions', searchValue],
    queryFn: () => queryFn(searchValue),
    initialData: suggestions,
    retry: 3,
    retryDelay: 1000,
    // cacheTime: 50,
    // suspense: true,
    // enabled: !!searchValue,
  })

  const callbackFilter = useCallback(
    () =>
      data
        ? Object.entries(data as Record<string, Suggestion[]>)
            .filter((entry) => entry?.[1].length !== 0)
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
        <div
          className={cn('flex flex-row', (isFetching || isPreviousData) && 'opacity-50')}
        >
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
