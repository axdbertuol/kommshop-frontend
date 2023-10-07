'use client'
import { Suggestion } from '@/types/common'
import { useQuery } from '@tanstack/react-query'
import CommandSearchSuggestions from './CommandSearchSuggestions'
import { fetchSuggestions } from '@/app/lib/actions/get-suggestions'
import useSearchContext from '@/hooks/useSearchContext'
import { cn } from '@/app/lib/utils'
import { useCallback } from 'react'
import useDeferredFilteredData from '@/hooks/useFilteredData'

function CommandSearchList({
  suggestions,
  open,
}: {
  suggestions: Suggestion[] | null
  open: boolean
}) {
  const { searchValue } = useSearchContext()
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['suggestions', searchValue],
    queryFn: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(
          async () => resolve(await fetchSuggestions(searchValue ?? undefined)),
          1000
        )
      }) as Promise<Suggestion[] | null>
    },
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
  const deferredProducts = useDeferredFilteredData(() => callbackFilter('product'))
  const deferredCategories = useDeferredFilteredData(() => callbackFilter('category'))
  const allSuggestions = [deferredProducts, deferredCategories].filter(Boolean)
  return (
    <div
      className={cn(
        'absolute top-10 flex flex-col z-30  opacity-0 w-full transition-transform rounded bg-secondary-black-400 px-4 py-2',
        open && 'h-fit opacity-100 transition-transform translate-y-0'
      )}
    >
      {allSuggestions.flat().length === 0 && (
        <span className="h-[20px]">No results found.</span>
      )}
      {isSuccess && allSuggestions && allSuggestions?.length > 0 && (
        <div className="flex flex-row">
          {allSuggestions.map((suggest, index) => {
            return (
              <CommandSearchSuggestions
                key={index}
                suggestions={suggest}
                heading={suggest?.[0]?.type}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CommandSearchList
