'use client'
import { Suggestion } from '@/types/common'
import { useQuery } from '@tanstack/react-query'
import CommandSearchSuggestions from './CommandSearchSuggestions'
import getSuggestions from '@/app/lib/actions/get-suggestions'
import useSearchContext from '@/hooks/useSearchContext'
import { cn } from '@/app/lib/utils'
import { useCallback } from 'react'
import useDeferredFilteredData from '@/hooks/useFilteredData'

export const queryFn = async (value?: string) => {
  return new Promise((resolve) => {
    setTimeout(async () => resolve(await getSuggestions(value)), 0)
  }) as Promise<Suggestion[] | null>
}

function CommandSearchList({
  suggestions,
  className,
  onSelectSuggestion,
}: {
  suggestions: Suggestion[] | null
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
    (type: string) => data?.filter((item) => item.type === type).filter(Boolean),
    [data]
  )
  const allSuggestions = []
  const deferredProducts = useDeferredFilteredData(() => callbackFilter('product'))
  if (deferredProducts) allSuggestions.push(deferredProducts)
  const deferredCategories = useDeferredFilteredData(() => callbackFilter('category'))
  if (deferredCategories) allSuggestions.push(deferredCategories)

  return (
    <div
      className={cn(
        'absolute top-10 flex flex-col z-30  opacity-0 w-full transition-transform rounded bg-secondary-black-400 px-4 py-2',
        className
      )}
      data-cy="CommandSearchList"
    >
      {allSuggestions.length === 0 && <span className="h-[20px]">No results found.</span>}
      {isSuccess && allSuggestions && allSuggestions?.length > 0 && (
        <div
          className={cn('flex flex-row', (isFetching || isPreviousData) && 'opacity-50')}
        >
          {allSuggestions.map((suggest, index) => {
            return (
              <CommandSearchSuggestions
                key={index}
                suggestions={suggest}
                heading={suggest?.[0]?.type}
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
